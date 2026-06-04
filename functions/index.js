const functions = require('firebase-functions');
const {defineSecret} = require('firebase-functions/params');
const stripeSecret = defineSecret('STRIPE_SECRET');
exports.createCheckoutSession = functions.https.onRequest({secrets:[stripeSecret]},async (req, res) => {
  const stripe = require('stripe')('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');
  const ORIGINS = ['https://vivaceevents.com','https://www.vivaceevents.com'];
  const origin = req.headers.origin;
  if (ORIGINS.includes(origin)) res.set('Access-Control-Allow-Origin', origin);
  res.set('Access-Control-Allow-Methods','POST,OPTIONS');
  res.set('Access-Control-Allow-Headers','Content-Type');
  if (req.method==='OPTIONS'){res.status(204).send('');return;}
  try {
    const {priceId,userId,email,plan} = req.body;
    const session = await stripe.checkout.sessions.create({payment_method_types:['card'],mode:'subscription',customer_email:email,line_items:[{price:priceId,quantity:1}],success_url:'https://vivaceevents.com/?payment=success',cancel_url:'https://vivaceevents.com/?payment=cancelled',metadata:{userId,plan},allow_promotion_codes:true});
    res.json({url:session.url});
  } catch(e){console.error(e);res.status(500).json({error:'Failed'});}
});
