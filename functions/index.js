const functions = require('firebase-functions');
const {defineSecret} = require('firebase-functions/params');
const stripeSecret = defineSecret('STRIPE_SECRET');
const auddSecret = defineSecret('AUDD_API_KEY');

const ORIGINS = ['https://vivaceevents.com','https://www.vivaceevents.com','https://vivaceevents-1a8ff.web.app','https://vivaceevents-1a8ff.firebaseapp.com'];
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
      subscription_data:{ trial_period_days: 90 },
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

// ─── $1 Verification Charge ──────────────────────────────────────────────────
exports.chargeVerification = functions.https.onRequest({secrets:[stripeSecret]}, async (req, res) => {
  const stripe = require('stripe')(stripeSecret.value());
  setCORS(req, res);
  if (req.method === 'OPTIONS') { res.status(204).send(''); return; }
  const { paymentMethodId, email, name, uid } = req.body;
  if (!paymentMethodId || !email) { res.status(400).json({ error: 'Missing required fields' }); return; }
  try {
    // Create Stripe customer with card on file
    const customer = await stripe.customers.create({
      email: email,
      name: name || email,
      payment_method: paymentMethodId,
      invoice_settings: { default_payment_method: paymentMethodId }
    });
    // Charge $1 one-time
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100,
      currency: 'usd',
      customer: customer.id,
      payment_method: paymentMethodId,
      confirm: true,
      description: 'Vivace Events — one-time account verification',
      metadata: { uid: uid || '', type: 'verification' },
      automatic_payment_methods: { enabled: true, allow_redirects: 'never' }
    });
    if (paymentIntent.status === 'succeeded') {
      res.json({ success: true, customerId: customer.id });
    } else {
      res.status(400).json({ error: 'Payment not completed' });
    }
  } catch (e) {
    console.error('chargeVerification error:', e.message);
    res.status(400).json({ error: e.message || 'Payment failed' });
  }
});
// ─── END Verification Charge ─────────────────────────────────────────────────

// ─── Create Subscription ──────────────────────────────────────────────────────
exports.createSubscription = functions.https.onRequest({secrets:[stripeSecret]}, async (req, res) => {
  const stripe = require('stripe')(stripeSecret.value());
  setCORS(req, res);
  if (req.method === 'OPTIONS') { res.status(204).send(''); return; }
  const { uid, planId, priceId, customerId } = req.body;
  if (!uid || !priceId) { res.status(400).json({ error: 'Missing fields' }); return; }
  try {
    let custId = customerId;
    // Create customer if not exists
    if (!custId) {
      const admin = require('firebase-admin');
      if (!admin.apps.length) admin.initializeApp();
      const userDoc = await admin.firestore().collection('users').doc(uid).get();
      const userData = userDoc.data() || {};
      const customer = await stripe.customers.create({
        email: userData.email || '',
        name: userData.name || '',
        metadata: { uid }
      });
      custId = customer.id;
      await admin.firestore().collection('users').doc(uid).update({ stripeCustomerId: custId });
    }
    // Cancel any existing subscription first
    const existingSubs = await stripe.subscriptions.list({ customer: custId, status: 'active', limit: 1 });
    for (const sub of existingSubs.data) {
      await stripe.subscriptions.cancel(sub.id);
    }
    // Create new subscription with 90-day free trial (card saved, charged on day 91)
    const subscription = await stripe.subscriptions.create({
      customer: custId,
      items: [{ price: priceId }],
      trial_period_days: 90,
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      trial_settings: { end_behavior: { missing_payment_method: 'cancel' } },
      expand: ['latest_invoice.payment_intent'],
    });
    if (subscription.status === 'active' || subscription.status === 'trialing') {
      res.json({ success: true, subscriptionId: subscription.id });
    } else {
      // Need payment confirmation
      const pi = subscription.latest_invoice?.payment_intent;
      if (pi && pi.status === 'requires_payment_method') {
        res.json({ success: false, error: 'No payment method. Please verify account first.' });
      } else {
        res.json({ success: true, subscriptionId: subscription.id });
      }
    }
  } catch (e) {
    console.error('createSubscription:', e.message);
    res.status(400).json({ error: e.message });
  }
});

// ─── Change Subscription (Downgrade at period end) ────────────────────────────
exports.changeSubscription = functions.https.onRequest({secrets:[stripeSecret]}, async (req, res) => {
  const stripe = require('stripe')(stripeSecret.value());
  setCORS(req, res);
  if (req.method === 'OPTIONS') { res.status(204).send(''); return; }
  const { uid, planId, priceId, subscriptionId, atPeriodEnd } = req.body;
  if (!subscriptionId || !priceId) { res.status(400).json({ error: 'Missing fields' }); return; }
  try {
    const sub = await stripe.subscriptions.retrieve(subscriptionId);
    const itemId = sub.items.data[0]?.id;
    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
      proration_behavior: atPeriodEnd ? 'none' : 'create_prorations',
      items: [{ id: itemId, price: priceId }],
    });
    res.json({ success: true });
  } catch (e) {
    console.error('changeSubscription:', e.message);
    res.status(400).json({ error: e.message });
  }
});

// ─── Cancel Subscription ──────────────────────────────────────────────────────
exports.cancelSubscription = functions.https.onRequest({secrets:[stripeSecret]}, async (req, res) => {
  const stripe = require('stripe')(stripeSecret.value());
  setCORS(req, res);
  if (req.method === 'OPTIONS') { res.status(204).send(''); return; }
  const { uid, subscriptionId } = req.body;
  if (!subscriptionId) { res.status(400).json({ error: 'Missing subscriptionId' }); return; }
  try {
    await stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: true });
    res.json({ success: true });
  } catch (e) {
    console.error('cancelSubscription:', e.message);
    res.status(400).json({ error: e.message });
  }
});
// ─── END Subscription Functions ───────────────────────────────────────────────

// ─── Push Notifications (Ensemble Messaging) ──────────────────────────────────
// v2 Firestore trigger. Listens for new docs in "pushQueue" and sends push to
// recipient's devices — works even when the app is closed. FREE (Firebase Cloud Messaging).
const {onDocumentCreated} = require('firebase-functions/v2/firestore');

exports.sendEnsemblePush = onDocumentCreated('pushQueue/{docId}', async (event) => {
  const admin = require('firebase-admin');
  if (!admin.apps.length) admin.initializeApp();

  const snap = event.data;
  if (!snap) return null;
  const data = snap.data() || {};
  const toEmail = data.toEmail;
  const title = data.title || 'Vivace Events';
  const body = data.body || '';
  const emergency = data.emergency ? 'true' : 'false';
  const muteBypass = !!data.emergency; // emergencies pierce mute

  if (!toEmail) { try { await snap.ref.delete(); } catch(e){} return null; }

  try {
    const usersSnap = await admin.firestore()
      .collection('users')
      .where('email', '==', toEmail)
      .limit(1)
      .get();

    if (usersSnap.empty) { await snap.ref.delete(); return null; }

    const userDoc = usersSnap.docs[0];
    const user = userDoc.data() || {};

    // Respect mute — but emergencies always pierce through
    if (user.muteGroupMessages && !muteBypass) {
      await snap.ref.delete();
      return null;
    }

    const tokens = user.pushTokens || [];
    if (tokens.length === 0) { await snap.ref.delete(); return null; }

    const message = {
      tokens: tokens,
      notification: { title: title, body: body },
      data: { emergency: emergency, title: title, body: body },
      webpush: {
        headers: { Urgency: emergency === 'true' ? 'high' : 'normal' },
        notification: {
          icon: '/icon-192.png',
          badge: '/icon-192.png',
          requireInteraction: emergency === 'true',
          vibrate: emergency === 'true' ? [300,100,300,100,300] : [200,100,200]
        }
      }
    };

    const resp = await admin.messaging().sendEachForMulticast(message);

    // Remove dead tokens
    const bad = [];
    resp.responses.forEach((r, i) => {
      if (!r.success) {
        const code = r.error && r.error.code;
        if (code === 'messaging/registration-token-not-registered' ||
            code === 'messaging/invalid-registration-token') {
          bad.push(tokens[i]);
        }
      }
    });
    if (bad.length) {
      const good = tokens.filter(t => !bad.includes(t));
      await userDoc.ref.update({ pushTokens: good });
    }
  } catch (e) {
    console.error('sendEnsemblePush error:', e);
  }

  try { await snap.ref.delete(); } catch(e){}
  return null;
});
// ─── END Push Notifications ───────────────────────────────────────────────────
