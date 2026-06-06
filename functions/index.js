const functions = require('firebase-functions');
const {defineSecret} = require('firebase-functions/params');
const stripeSecret = defineSecret('STRIPE_SECRET');

const ORIGINS = ['https://vivaceevents.com','https://www.vivaceevents.com'];
const PLATFORM_FEE = 0.05; // 5%

function setCORS(req, res) {
  const origin = req.headers.origin;
  if (ORIGINS.includes(origin)) res.set('Access-Control-Allow-Origin', origin);
  res.set('Access-Control-Allow-Methods','POST,OPTIONS');
  res.set('Access-Control-Allow-Headers','Content-Type');
}

// ─── EXISTING: Subscription Checkout ─────────────────────────────
exports.createCheckoutSession = functions.https.onRequest({secrets:[stripeSecret]}, async (req, res) => {
  const stripe = require('stripe')(stripeSecret.value());
  setCORS(req, res);
  if (req.method==='OPTIONS'){res.status(204).send('');return;}
  try {
    const {priceId,userId,email,plan} = req.body;
    if(!priceId||!userId){res.status(400).json({error:'Missing fields'});return;}
    const session = await stripe.checkout.sessions.create({
      payment_method_types:['card'],
      mode:'subscription',
      customer_email:email,
      line_items:[{price:priceId,quantity:1}],
      success_url:'https://vivaceevents.com/?payment=success',
      cancel_url:'https://vivaceevents.com/?payment=cancelled',
      metadata:{userId,plan},
      allow_promotion_codes:true
    });
    res.json({url:session.url});
  } catch(e){
    console.error('Stripe error:',e.message);
    res.status(500).json({error:'Failed'});
  }
});

// ─── NEW: Create Stripe Connect Account for Musician ─────────────
exports.createConnectAccount = functions.https.onRequest({secrets:[stripeSecret]}, async (req, res) => {
  const stripe = require('stripe')(stripeSecret.value());
  setCORS(req, res);
  if (req.method==='OPTIONS'){res.status(204).send('');return;}
  try {
    const {userId, email, name} = req.body;
    if(!userId||!email){res.status(400).json({error:'Missing fields'});return;}

    // Check if account already exists
    let accountId = req.body.stripeAccountId;

    if(!accountId) {
      // Create new Express account
      const account = await stripe.accounts.create({
        type: 'express',
        email: email,
        capabilities: {
          card_payments: {requested: true},
          transfers: {requested: true},
        },
        business_type: 'individual',
        individual: {email: email},
        metadata: {userId, name: name||email}
      });
      accountId = account.id;
    }

    // Create onboarding link
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: 'https://vivaceevents.com/?connect=refresh',
      return_url: 'https://vivaceevents.com/?connect=success',
      type: 'account_onboarding',
    });

    res.json({url: accountLink.url, accountId});
  } catch(e){
    console.error('Connect error:',e.message);
    res.status(500).json({error:e.message});
  }
});

// ─── NEW: Pay Musician via Stripe Connect ─────────────────────────
exports.createGigPayment = functions.https.onRequest({secrets:[stripeSecret]}, async (req, res) => {
  const stripe = require('stripe')(stripeSecret.value());
  setCORS(req, res);
  if (req.method==='OPTIONS'){res.status(204).send('');return;}
  try {
    const {amount, currency, musicianAccountId, gigId, gigTitle, managerId, musicianId} = req.body;
    if(!amount||!musicianAccountId||!gigId){res.status(400).json({error:'Missing fields'});return;}

    const amountCents = Math.round(parseFloat(amount) * 100);
    const platformFeeCents = Math.round(amountCents * PLATFORM_FEE);

    // Create payment intent with application fee
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: currency || 'usd',
      application_fee_amount: platformFeeCents,
      transfer_data: {
        destination: musicianAccountId,
      },
      metadata: {gigId, gigTitle: gigTitle||'', managerId: managerId||'', musicianId: musicianId||''},
      description: `Vivace Events — ${gigTitle||'Gig payment'}`,
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: amountCents,
      platformFee: platformFeeCents,
      musicianReceives: amountCents - platformFeeCents
    });
  } catch(e){
    console.error('Payment error:',e.message);
    res.status(500).json({error:e.message});
  }
});

// ─── NEW: Get Connect Account Status ─────────────────────────────
exports.getConnectStatus = functions.https.onRequest({secrets:[stripeSecret]}, async (req, res) => {
  const stripe = require('stripe')(stripeSecret.value());
  setCORS(req, res);
  if (req.method==='OPTIONS'){res.status(204).send('');return;}
  try {
    const {accountId} = req.body;
    if(!accountId){res.status(400).json({error:'Missing accountId'});return;}
    const account = await stripe.accounts.retrieve(accountId);
    res.json({
      id: account.id,
      chargesEnabled: account.charges_enabled,
      payoutsEnabled: account.payouts_enabled,
      detailsSubmitted: account.details_submitted,
    });
  } catch(e){
    res.status(500).json({error:e.message});
  }
});
