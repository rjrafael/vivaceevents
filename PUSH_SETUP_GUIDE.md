# 🔔 Push Notifications — Setup Guide

You have **3 files** to deploy and **1 key** to grab. Follow in order.

---

## STEP 1 — Get your VAPID key (2 minutes, free)

1. Go to **Firebase Console** → your project (vivaceevents-1a8ff)
2. Click the **⚙️ gear** → **Project settings**
3. Click the **Cloud Messaging** tab
4. Scroll to **Web Push certificates**
5. Click **Generate key pair**
6. Copy the long key string it shows (starts with "B…")

---

## STEP 2 — Paste the VAPID key into index.html

In your `index_final.html`, find this line (near the top):

```
const VAPID_KEY="REPLACE_WITH_VAPID_KEY";
```

Replace `REPLACE_WITH_VAPID_KEY` with the key you copied:

```
const VAPID_KEY="B...your-key-here...";
```

(You can do this in Notepad — Ctrl+H, find `REPLACE_WITH_VAPID_KEY`, replace with your key.)

---

## STEP 3 — Put the 3 files in place

1. **index_final.html** → copy to your folder as `index.html` (as always)
2. **firebase-messaging-sw.js** → copy to the **SAME folder** (root). This file MUST be at the root so it lives at `vivaceevents.com/firebase-messaging-sw.js`

```powershell
cd C:\Users\rafae\Desktop\vivaceevents
copy /Y "$env:USERPROFILE\Downloads\index_final.html" index.html
copy /Y "$env:USERPROFILE\Downloads\firebase-messaging-sw.js" firebase-messaging-sw.js
```

---

## STEP 4 — Add the Cloud Function

1. Open **sendPush_function.js** (the file I gave you)
2. Copy its contents
3. Paste it at the **bottom** of your existing `functions/index.js`
   (Don't duplicate `require` lines or `admin.initializeApp()` — they're already at the top of your index.js. Just paste the `exports.sendEnsemblePush = ...` part.)

---

## STEP 5 — Deploy everything

```powershell
cd C:\Users\rafae\Desktop\vivaceevents
git add index.html firebase-messaging-sw.js
git commit -m "Push notifications: SW + FCM + mute + emergency"
git push origin main
firebase deploy --only hosting
firebase deploy --only functions:sendEnsemblePush
```

---

## STEP 6 — Test it

1. Open **vivaceevents.com** (Ctrl+F5)
2. Tap the **🔔 bell** → you'll see **"Turn on alerts"** → tap it → Allow
3. On **iPhone:** you must first **install Vivace to your home screen** (Share → Add to Home Screen), THEN open it from the home screen, THEN allow notifications. (Apple's rule for web push.)
4. On **Android/desktop:** just tap Allow.
5. Now go to a folder → 🎭 Stage → 📣 Notify → send yourself a test message
6. **Close the app / lock the phone** → the push should appear on your lock screen 🎉

---

## What you now have

- 🔔 **Push notifications** — alerts even when the app is closed/locked
- 🔕 **Mute group messages** — each person can silence chatter (bell → toggle)
- 🚨 **Emergency pierces mute** — emergency broadcasts always alert, even if muted
- 🛠️ **Service Worker** — bonus: also helps with caching (fewer Ctrl+F5 problems)

---

## Notes

- **Cost:** Push is 100% FREE (Firebase Cloud Messaging). No Twilio needed.
- **SMS (texts):** still optional for later — only if you want texts to non-app-users. That needs a Twilio account.
- If push doesn't fire, check: (1) VAPID key pasted correctly, (2) firebase-messaging-sw.js is at the root, (3) the Cloud Function deployed, (4) user tapped "Allow".
