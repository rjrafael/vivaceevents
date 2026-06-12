// ════════════════════════════════════════════════════════════════
//  VIVACE EVENTS — PUSH NOTIFICATION CLOUD FUNCTION
//  Add this to your existing functions/index.js, then deploy with:
//      firebase deploy --only functions:sendEnsemblePush
//
//  It listens for new docs in the "pushQueue" collection and sends
//  a real push notification to the recipient's devices (works even
//  when the app is closed / phone is locked).
// ════════════════════════════════════════════════════════════════

const functions = require('firebase-functions');
const admin = require('firebase-admin');
// admin.initializeApp() is already called once at the top of your index.js — don't call it twice.

exports.sendEnsemblePush = functions.firestore
  .document('pushQueue/{docId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const toEmail = data.toEmail;
    const title = data.title || '📣 Vivace Events';
    const body = data.body || '';
    const emergency = data.emergency ? 'true' : 'false';
    const muteBypass = !!data.emergency; // emergencies pierce mute

    if (!toEmail) { await snap.ref.delete(); return null; }

    try {
      // Find the recipient user by email
      const usersSnap = await admin.firestore()
        .collection('users')
        .where('email', '==', toEmail)
        .limit(1)
        .get();

      if (usersSnap.empty) { await snap.ref.delete(); return null; }

      const userDoc = usersSnap.docs[0];
      const user = userDoc.data();

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

      // Clean up dead tokens
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

    await snap.ref.delete();
    return null;
  });
