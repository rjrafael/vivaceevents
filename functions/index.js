const functions = require('firebase-functions');
const {defineSecret} = require('firebase-functions/params');
const stripeSecret = defineSecret('STRIPE_SECRET');
const auddSecret = defineSecret('AUDD_API_KEY');

const ORIGINS = ['https://vivaceevents.com','https://www.vivaceevents.com'];
const PLATFORM_FEE = 0.05;

function setCORS(req, res) {
  const origin = req.headers.origin;
  if (ORIGINS.includes(origin)) res.set('Access-Control-Allow-Origin', origin);
  res.set('Access-Control-Allow-Methods','POST,OPTIONS');
  res.set('Access-Control-Allow-Headers','Content-Type');
}

// ─── Subscription Checkout ────────────────────────────────────────
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

// ─── AudD Copyright Check ─────────────────────────────────────────
// FREE tier: 300 requests/month — enough for early stage
// Checks audio URL against 160M track database
exports.checkCopyright = functions.https.onRequest({secrets:[auddSecret]}, async (req, res) => {
  setCORS(req, res);
  if (req.method==='OPTIONS'){res.status(204).send('');return;}
  try {
    const {audioUrl} = req.body;
    if(!audioUrl){res.status(400).json({error:'Missing audioUrl'});return;}

    const apiKey = auddSecret.value();

    // If no API key set yet, skip check (during development)
    if(!apiKey || apiKey === 'not_set') {
      console.log('AudD API key not configured — skipping copyright check');
      res.json({isCopyrighted:false,message:'Copyright check skipped (API key not configured)',track:null});
      return;
    }

    const https = require('https');
    const url = require('url');

    // Call AudD API
    const postData = JSON.stringify({
      url: audioUrl,
      return: 'apple_music,spotify',
      api_token: apiKey
    });

    const options = {
      hostname: 'api.audd.io',
      port: 443,
      path: '/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const result = await new Promise((resolve, reject) => {
      const req2 = https.request(options, (res2) => {
        let data = '';
        res2.on('data', (chunk) => { data += chunk; });
        res2.on('end', () => {
          try { resolve(JSON.parse(data)); }
          catch(e) { reject(new Error('Invalid response')); }
        });
      });
      req2.on('error', reject);
      req2.write(postData);
      req2.end();
    });

    if (result.status === 'success' && result.result) {
      // Copyright match found!
      res.json({
        isCopyrighted: true,
        message: `Copyright match: "${result.result.title}" by ${result.result.artist}`,
        track: result.result
      });
    } else {
      // No match — original content
      res.json({isCopyrighted: false, message: 'No copyright issues detected', track: null});
    }

  } catch(e) {
    console.error('AudD error:', e.message);
    // On API error, let upload proceed (don't block musicians due to API issues)
    res.json({isCopyrighted: false, message: 'Copyright check unavailable', track: null});
  }
});

// ─── Stripe Connect: Create Account ──────────────────────────────
exports.createConnectAccount = functions.https.onRequest({secrets:[stripeSecret]}, async (req, res) => {
  const stripe = require('stripe')(stripeSecret.value());
  setCORS(req, res);
  if (req.method==='OPTIONS'){res.status(204).send('');return;}
  try {
    const {userId, email, name, stripeAccountId} = req.body;
    if(!userId||!email){res.status(400).json({error:'Missing fields'});return;}

    let accountId = stripeAccountId;
    if(!accountId) {
      const account = await stripe.accounts.create({
        type: 'express',
        email: email,
        capabilities: {card_payments:{requested:true},transfers:{requested:true}},
        business_type: 'individual',
        individual: {email: email},
        metadata: {userId, name: name||email}
      });
      accountId = account.id;
    }

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

// ─── Stripe Connect: Gig Payment ─────────────────────────────────
exports.createGigPayment = functions.https.onRequest({secrets:[stripeSecret]}, async (req, res) => {
  const stripe = require('stripe')(stripeSecret.value());
  setCORS(req, res);
  if (req.method==='OPTIONS'){res.status(204).send('');return;}
  try {
    const {amount, currency, musicianAccountId, gigId, gigTitle, managerId, musicianId} = req.body;
    if(!amount||!musicianAccountId||!gigId){res.status(400).json({error:'Missing fields'});return;}

    const amountCents = Math.round(parseFloat(amount) * 100);
    const platformFeeCents = Math.round(amountCents * PLATFORM_FEE);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: currency || 'usd',
      application_fee_amount: platformFeeCents,
      transfer_data: {destination: musicianAccountId},
      metadata: {gigId, gigTitle:gigTitle||'', managerId:managerId||'', musicianId:musicianId||''},
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

// ─── Stripe Connect: Get Status ───────────────────────────────────
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
