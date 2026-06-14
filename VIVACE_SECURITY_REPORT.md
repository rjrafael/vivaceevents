# 🔐 Vivace Events — Security Review
**Date:** June 12, 2026 · **Reviewed by:** Claude (against current Firebase/Firestore production standards)
**Scope:** Firestore rules, client code, auth, data exposure, secrets

> **Bottom line:** The app is in **good shape overall** — no exposed secrets, sensible owner-based rules on most collections, and private contact info correctly separated. **But there is ONE serious issue that cancels out the guest-privacy work you just did**, plus a handful of medium/low items worth tightening before a public launch. None require panic; the critical one should be fixed soon.

---

## 🔴 CRITICAL — ✅ FIXED (June 12, 933620)

### C1. The seating plan is publicly readable AND contains every guest's email, phone, and secret code
- **Rule:** `event_seating` → `allow read: if true`
- **What's inside that document:** the entire plan — every guest's **name, table, email, phone, and their "unguessable" secret code.**
- **Why it's serious:** the event ID sits in *every* guest's QR link (`?seat=EVENTID`). Anyone who gets **one** guest's link has the event ID, and can fetch the whole seating document directly from the database — reading **all** names, **all** emails, **all** phones, and **all** secret codes.
- **The irony:** this silently undoes the secure per-guest-code system. The codes are only "unguessable" if the list of codes is secret — but the list is sitting in a world-readable document.
- **Real-world impact:** for a diplomatic/VIP event, one leaked guest link exposes the entire confidential guest list and contact details. That's exactly the scenario you were protecting against.

**The fix (the right architecture):** the public guest page should **not** read the full plan. Split it:
1. Keep the full plan (`event_seating`) **owner-only** (`allow read: if signedIn() && organizerId == request.auth.uid`).
2. Create a **separate, minimal public lookup** — one tiny document **per guest code**, containing only what that guest needs: `{ name, table, seat, eventId }` (NO email, NO phone, NO other guests, NO other codes). The guest page reads only their own code's document.
3. Event details (venue/time/etc.) can live in a separate public `event_public/{eventId}` doc — safe, since it's the same info you'd print on an invitation.

This keeps the guest experience identical (tap link → see seat + details) while making it **impossible** to harvest the list.

---

## 🟠 HIGH — fix before public launch

### H1. RSVP responses are world-readable and world-writable
- **Rule:** `event_rsvp` → `allow read: if true; allow create, update: if true`
- **Read problem:** anyone with the event ID can read **every** RSVP — who's coming, dietary needs, plus-ones. Same leak as C1.
- **Write problem:** anyone can write/overwrite **any** RSVP (no validation). A bad actor could spam thousands of fake RSVPs or overwrite real ones, poisoning the organizer's dashboard.
- **Fix:** scope reads to the organizer only (move the dashboard read behind owner auth via a Cloud Function or owner-readable mirror). For writes, at minimum validate the document shape and that the `code` matches a real guest; ideally route RSVP writes through a Cloud Function that checks the code server-side. A lighter interim fix: keep create open but lock the document ID to `eventId_code` and reject writes where those fields don't match the body (you already key it this way — enforce it in the rule).

### H2. `mail` collection — any signed-in user can queue an email
- **Rule:** `mail` → `allow create: if signedIn()` with no check on the `from`/sender.
- **Risk:** a logged-in user could queue arbitrary emails through your sending infrastructure (the Firebase "Trigger Email" extension), i.e. use your domain to send spam/phishing.
- **Fix:** validate in the rule that the mail document is tied to the creator (e.g. store `createdBy == request.auth.uid` and check it), and/or rate-limit. Long term, send all mail via a Cloud Function rather than letting clients write to `mail` directly.

### H3. Confirm Cloud **Storage** rules (separate from Firestore)
- Storage has its **own** ruleset; locking Firestore does **not** lock Storage. This is one of the most common Firebase leaks (the research flagged it explicitly).
- **Action:** In Firebase Console → Storage → Rules, confirm it is **not** `allow read, write: if true`. It should require auth and, ideally, scope writes to the user's own path. (Your repo doesn't contain a `storage.rules`, so this needs a console check.)

---

## 🟡 MEDIUM — tighten soon

### M1. `connections` is fully open to any signed-in user
- `allow read, write: if signedIn()` — any user can read or overwrite **any** connection document. Scope writes to the participants.

### M2. `notifications` — any signed-in user can create notifications for anyone
- `allow create: if signedIn()` with no recipient check. Someone could spam notifications to other users. Validate the sender / recipient.

### M3. `meta` counter is client-writable
- `allow write: if signedIn()` on the signup counter. A user could tamper with the "Founding Member" count. Low impact, but move increments to a Cloud Function or transaction-guard it.

### M4. `notifications`, `lessons`, `giftCodes`, `invites`, `stripeWaitlist` use broad `if signedIn()`
- These let any logged-in user read/write broadly. Not catastrophic (requires an account), but tighten to owner/participant scope where you can.

### M5. XSS — guest names rendered via `innerHTML` without escaping
- Guest names, tags, and event details are inserted into HTML with template strings (`innerHTML`) in many places (≈218 innerHTML uses). A guest named `<img onerror=...>` (or a malicious CSV upload) could inject script that runs on the **organizer's** screen or another guest's page.
- **Fix:** add one `escapeHtml()` helper and wrap user-supplied values (names, dietary text, notes, tags, addresses) before injecting. This is a focused, mechanical fix.

---

## 🟢 GOOD — things already done right

- ✅ **No exposed secrets.** Stripe secret, AudD key, etc. are server-side. The Firebase `apiKey` in the client is *public by design* (it's an identifier, not a secret) — correct.
- ✅ **Private contact info is separated** (`users_private` is owner-only read) — this is exactly the right pattern and stops bulk email/phone harvesting from profiles.
- ✅ **Owner-scoped rules** on gigs, venues, broadcasts, ratings, radioTracks, organizer_events, rosterFolders, etc. — solid.
- ✅ **Default-deny fallback** (`match /{document=**} { allow read,write: if false }`) — excellent; unknown collections are locked.
- ✅ **Clever invited-user claim pattern** on `rosterMembers` / `event_guests` (email-matched placeholder claiming) — well designed.
- ✅ **No `eval`/`new Function`.** The two `document.write` uses are for print windows with controlled content (still worth escaping guest names there too — see M5).
- ✅ **Auth** uses standard Firebase methods (Google/Facebook/Phone/Email) — no custom crypto, no homemade tokens.

---

## 📋 Recommended order of work

1. **C1** — re-architect the guest seat lookup (per-code public doc, full plan owner-only). *This is the big one.*
2. **H1** — lock down RSVP reads + validate writes (pairs naturally with C1).
3. **H3** — verify Storage rules in the console (5-minute check).
4. **H2** — secure the `mail` path.
5. **M5** — add `escapeHtml()` for all user input.
6. **M1–M4** — tighten the broad `if signedIn()` rules.

Items 1 + 2 are the same architectural change and protect the same data, so they're best done together as one focused build.

---

## ⚙️ Operational reminders (from prior notes, still relevant)
- 🔑 **Stripe secret key** was due to rotate ~June 13 — rotate in Stripe dashboard, update via `firebase functions:secrets:set STRIPE_SECRET`.
- 🔑 **Facebook App Secret** was pasted in chat earlier — reset it in Facebook → Settings → Basic if not already done.
- 🛡️ Consider enabling **Firebase App Check** before public launch (blocks API abuse from outside your app).
- 🔒 Restrict the Firebase **API key** in Google Cloud Console to only the APIs you use (defense-in-depth against quota abuse).

---

*This review covers the client code and Firestore rules in the repo. It does not replace a professional penetration test, which is worth commissioning before a large public or diplomatic launch. Claude is not a security firm; treat this as a strong informed starting point, not a legal/compliance certification.*
