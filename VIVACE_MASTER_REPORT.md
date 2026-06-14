# 🎼 VIVACE EVENTS — MASTER REPORT
**Last updated:** June 10, 2026 (afternoon — Day 2 mega session)
**Owner:** Rafael "Rafa" Javadov · rafael.javadov@gmail.com · Virtual Studio Orchestra LLC (Washington DC)

> Single source of truth. Replace the old report with this one.
> To resume in a new chat: upload this file + current index.html.

---

## 📍 CURRENT STATE (all LIVE & deployed)

- **Live site:** https://vivaceevents.com
- **Current file size:** `index.html` = **691043 bytes** (latest — includes editable email flow)
- **firestore.rules:** 8783 bytes (includes usernames + pushQueue + users_private)
- **GitHub:** github.com/rjrafael/vivaceevents (main)
- **Firebase project:** vivaceevents-1a8ff
- **Working folder:** C:\Users\rafae\Desktop\vivaceevents
- **Tech:** single index.html · Firebase (Hosting/Auth/Firestore/Storage/Functions v2/FCM) · Stripe + Connect · jsPDF · AudD

---

## ✅ SHIPPED THIS WEEK

### Identity (the Facebook-proof layers)
- ✅ **Username system** — permanent unique @handle, locked at code level, NO edit pencil (cannot change once claimed)
- ✅ **Editable email (Layer 2)** — ✏️ pencil → secure modal: re-auth + Firebase verification link + previous-email tracking + Google/Facebook/Phone user detection
- ✅ **Notify managers on email change** — checkbox default YES, sends in-platform notification to all connected managers
- ✅ **previousEmails[] in users_private** — future dedup foundation
- ✅ **Welcome + username confirmation emails** — branded, never send password
- ✅ **$1 universal verification** — replaces email verification

### TOS
- ✅ 10 checkboxes → 1, scrollable terms, version tracking, Google/FB/phone hole closed

### Security (huge upgrade today)
- ✅ **users_private collection** — locked vault (email/phone/pushTokens/stripeCustomerId/etc.)
- ✅ Firestore rule: `allow read: if isOwner(userId)` — only owner reads sensitive data
- ✅ Auto-migration on next login (silent, one-time per user)
- ✅ UI leaks fixed (no email in public profiles or search)

### Firefox Fix
- ✅ Dynamic FCM import (skips on Firefox so it doesn't crash) — Art Levine's bug fixed

### Communication (built earlier)
- ✅ Ensemble messaging (📣 Notify): section / pick-people / emergency
- ✅ Stage Manager role, push notifications (FCM), mute toggle, phone/WhatsApp/text buttons

### Stage / Seating
- ✅ Chart with 3 themes, edit instrument, move section, smart initials, tooltips, Chamber template

### Smart Roster Queue — Phase 1 (partial)
- ✅ Folders (create/rename/delete), add musicians (manual/+myself/phone/WhatsApp), basic queue order
- ✅ **Job Sheet PDF v1** — header, booking, payment, parking, dress code (6 presets), notes, legal

### Profile UX
- ✅ Dark text fixed, compact corner buttons, email pencil, username 🔒, name ✏️

---

## 🔲 ROADMAP — WHAT'S LEFT

### Smart Roster Queue
**Phase 1 finish:**
- 🔲 CSV bulk import
- 🔲 Drag-drop folder reordering

**Phase 2 — The Wheel:**
- 🔲 Queue position visible to musicians
- 🔲 Auto-rotation after gig

**Phase 3 — Smart Automation:**
- 🔲 Auto-invitation from queue (#1 first)
- 🔲 Decline → next in queue
- 🔲 Broadcast → Reserve folder routing
- 🔲 Multi-manager view
- 🔲 **Job Sheet PDF v2** — per-section dress codes, music schedule, repertoire, signature line

**Phase 4 — Accountability:**
- 🔲 Queue penalties wired to 72-hour cancellation
- 🔲 Removal notifications (3 options) both directions
- 🔲 Manager rating drop on cancel-after-assign
- 🔲 Front-of-queue compensation

### Identity
- 🔲 **Layer 2 (dedup popup):** Manager-side email dedup → 3-choice popup (Use existing / Use+notes / Create separate)
- 🔲 **Layer 4:** Claim-on-signup merge (most delicate — build last)

### Other pending
- 🔲 #8 Union member toggle, #10 Facebook Login (App ID: 1724461911903145), #11 Trial system, #12 Founding Member badge
- 🔲 Gifter reward, Stripe webhooks, remove Pay Musician button, Stripe same-card detection

### 🔴 Urgent
- 🔴 **www. domain certificate** — security warning on www. (Firefox shown)
- 🔴 **Stripe secret key rotation** (~expires mid-June)
- 🟡 DMCA agent registration ($6/yr copyright.gov) + dmca@vivaceevents.com

---

## 🔑 LOCKED RULES

- **$1 = universal verification.** No email verification.
- **Username = PERMANENT.** Locked in `claimUsername`. Anti-impersonation.
- **Email = changeable.** Solves Facebook lockout. Notify managers default YES.
- **Email = dedup key + in-platform messaging.** Phone = emergency layer on top.
- **Communication targeted by default.** Section/pick normal; "everyone" emergency-only.
- **Emergency pierces mute.** Always.
- **Queue fairness is core.**
- **Privacy by design.** Sensitive data in users_private (DB wall).

---

## ⚙️ TECH GOTCHAS

- Firebase Functions = v2 (`onDocumentCreated`)
- "Skipped (No changes detected)" = file wasn't replaced
- PowerShell: `Copy-Item -Force` not `copy /Y`
- Inline onclick needs `window.fnName=`
- Dark on dark: use #aaa/#ccc/#C9A84C
- Firestore: users, **users_private** (NEW), rosterFolders, rosterMembers, notifications, mail, pushQueue, usernames, gigs, applications, contracts, responses
- VAPID key line 150, jsPDF CDN line 16
- Firefox: dynamic FCM import
- Email change: re-auth required, uses `verifyBeforeUpdateEmail`; Google/FB/Phone users see explainer

---

## 📌 NEXT BUILD OPTIONS (tonight)

A. **Phase 1 finish:** CSV bulk import (close to ship)
B. **Phase 3 auto-rotation:** The fair-queue core (high value)
C. **www. cert + Stripe key rotation:** Urgent operational

Rafa decides when back after 9 PM.

---

## 👥 REAL USERS
- Rafa: rafael.javadov@gmail.com (Agent Pro, @rafaeljavadov)
- Test: violinmastrclasslive@gmail.com (@violinms)
- First external: Art Levine, alevine@alumni.berklee.edu (Berklee alum, Firefox user, bug fixed)

---

## 🔴 NEEDS AUDIT (flagged June 10 evening) — PAYMENT/TRIAL RECONCILIATION
**Possible conflict between two payment setups built at different times:**
- **June 7 setup:** 14-day free trial → $1/month × 3 months (founding member) → regular price ($14 Pro / $39 Studio)
- **This week setup:** $1 ONE-TIME universal verification (hard wall, all new users)

**Questions to resolve:**
1. Are these the SAME $1 or TWO different charges?
2. Does the 14-day trial still apply, or did $1-verification replace it?
3. Is anyone at risk of being double-charged?
4. After 3 months at $1/mo — does regular price auto-kick-in correctly via Stripe?

**To audit:** Claude checks code (checkTrialStatus, createSubscription Cloud Function, price IDs). Rafa checks Stripe dashboard (products, trial price IDs, subscription settings). Reconcile so there is NO conflict and NO double charge. DO THIS AFTER the CSV invite flow.

---

## 🧪 FULL TEST CHECKLIST (do when fresh — start to end)

### A. Identity & Signup (Incognito, fresh email)
1. Open vivaceevents.com incognito → signup screen shows
2. Terms: ONE scrollable box + ONE checkbox; Google/FB/Phone/Create greyed until checked
3. Check the box → all signup buttons activate
4. Sign up with new email → pay $1 → lands in app
5. "Choose username" popup appears → type → "✓ Available!" green → claim
6. Welcome email arrives + username confirmation email arrives (with @handle + login email)
7. Profile shows: name ✏️ editable, @username 🔒 permanent, email ✏️ editable

### B. Editable Email (Facebook-proof)
8. Profile → ✏️ next to email → modal opens
9. Google/FB/Phone user → sees "managed by Google" explainer (can't edit)
10. Email/password user → full edit flow: enter new email + password + notify-managers checkbox → "verification link sent"

### C. Security (the privacy locks)
11. Firebase Console → users_private collection exists, holds email/phone
12. Public users doc has NO email/phone (moved to private)
13. Search/discover shows names/usernames, never emails

### D. CSV Import + Invite Flow (the big one)
14. Manager → open/create a folder
15. + Add → "📥 Import from CSV" → paste test CSV → Preview → shows added/skipped/errors → Confirm → success
16. Folder shows status counter: 🟢 joined · 🟡 invited · ⚪ to invite
17. Each person has correct badge (joined/invited/not-invited)
18. Tap ✉️ on a not-invited person → copy-link + email options appear
19. Copy link → paste somewhere → it's the magic invite link (vivaceevents.com/?inv=...)
20. "Invite next batch" → emails up to 25, skips already-invited
21. Open invite link in incognito → sign up with that email → pay $1 → auto-linked to roster (status flips to joined, no duplicate)

### E. Job Sheet PDF
22. Fill a gig → tap 📄 Job Sheet next to applicant → pick dress code → Generate → PDF downloads correctly

### F. Communication
23. Stage → tap seat → Call/WhatsApp/Text buttons (if phone on file)
24. Notify (section / pick people / emergency) → push arrives
25. Mute toggle works; emergency pierces mute

### G. Firefox
26. Open in Firefox → app loads (no grey screen), everything works except push

---

## 💰 PRICING ARCHITECTURE — TO DECIDE (fresh session, big decision)

**The Shopify model (Rafa likes this):**
- Pay $1 once (verification + unlocks everything)
- 3 months (90 days) FULL access, $0/month
- Day 90 → $39/month auto-begins (card already on file)
- This replaces the current 14-day trial in code (getTrialDaysLeft returns 14 now → change to 90)

**Proposed free vs paid buckets (common-sense draft, NOT final):**
- 🆓 FREE FOREVER: Students + Artists (participate, perform, learn, get booked)
- 💰 PAID (Shopify trial → $39/mo): Managers + Teachers + Organizers (organize, hire, earn)
- ONE payment covers ALL roles (no per-role fees). Highest tier used = what you pay.
- Multi-role: if you ever touch a paid tool (manage people, organize events), you're on paid; free roles included.

**OPEN QUESTIONS (discuss fresh):**
1. Confirm free = Students+Artists, paid = Managers+Teachers+Organizers?
2. Organizer edge cases — they spend (hire) more than earn; still paid tier? (leaning yes)
3. "Manager gets 1 free gig/week"? — Rafa floated, Claude advised skip (complicates; 3-month trial is cleaner)
4. Actual dollar amounts per tier (was $14 Pro / $39 Studio earlier — reconcile)
5. RECONCILE with existing Stripe: $1 verification price ID + $1/mo×3 trial price IDs already exist. Does Stripe need reconfig for true 90-day-free-then-$39 model?

**THEN BUILD (after pricing locked):**
- Beautiful artistic countdown clock ("87 days of full access left ✨" → "3 days left, plan continues at $X/mo")
- Tier education UI (what's free vs paid, what you get, gentle/colorful/non-corporate)
- Update all "14-day" text → "3 months"

---

## 🔒🌍 PUBLIC vs PRIVATE — THE FOUNDATIONAL DECISION (breakthrough June 10)

**THE CORE TENSION Rafa identified:**
If a manager invites their private roster and those musicians become publicly searchable, OTHER managers can poach them. → Manager won't bring their "secret players" → won't adopt the platform. This is the #1 marketplace trust problem.

**THE SOLUTION — Public/Private modes:**
- 🌍 PUBLIC: "I want to be found." → appears in search/discovery. Opt-IN. The marketplace/growth engine.
- 🔒 PRIVATE (DEFAULT): "These are MY people." → invisible to other managers, not searchable, sealed.

**KEY RULE:**
- Manager/organizer invites someone via private link → that person is PRIVATE to that group (NOT dumped into public search)
- Default = private. You only become publicly discoverable if YOU opt in.
- Protects: managers keep secret rosters secret · organizers keep communities sealed (diplomatic-community use case) · musicians who want exposure can opt into public

**The manager pitch this enables:**
"Bring your private roster — they stay YOURS, nobody can poach them. If any musician WANTS more work, they can opt into discovery. You lose nothing, gain organization tools."

**Organizer + non-musician attendees:**
- Organizers can build PRIVATE groups (e.g. private film screening, diplomatic community of 20)
- Attendees (NON-musicians) sign up, pay $1, attend — sealed in the organizer's private group
- They do NOT appear in public, do NOT interact with the musician marketplace
- "The group is not shareable" — organizer controls who's in

**TO BUILD (fresh session — foundational, touches search + rules + invites):**
1. Public/Private toggle per user (default private)
2. Invited-via-link people tagged private to that group, NOT public search
3. Search/discovery only shows opt-in PUBLIC users
4. Firestore rules enforce: private members only visible to their group owner
5. Organizer private groups (sealed, non-musician attendees, $1 each, walled off)
6. Reconcile with existing "Profile visibility: Public — anyone can find you in search" toggle already on profile

**PRIORITY: This is more foundational than the trial countdown or tier pricing. Build privacy architecture BEFORE heavy public-discovery features.**

---

## ⚖️ LEGAL — MUSICIAN FREEDOM vs ROSTER PRIVACY (researched June 10)

**THE LAW (researched, confirmed):**
- CANNOT lock musicians or block them from freelancing/joining other rosters
- Multi-platform work MUST be allowed (locking = worker-misclassification exposure)
- No mandatory exclusivity (even soft incentives = legal risk)
- Non-poaching agreements between managers can VIOLATE ANTITRUST (DOJ)
- Musicians must set own rates, accept/decline freely, no platform penalty

**THE PRECISE DISTINCTION (this is the resolution):**
- 🔒 Manager controls: keep MY ROSTER LIST private (others can't see WHO is on it) — LEGAL
- 🌍 Musician controls: whether THEY personally go public / freelance / join other rosters — THEIR RIGHT
- Privacy of the LIST = legal. Locking the PERSON = illegal.

**REQUIRED DISCLOSURE to managers (Rafa's instinct was correct):**
Show when manager builds a roster:
"Your roster is private — other managers can't see who's on it. But musicians on Vivace are independent professionals. Each is free to be discovered publicly or join other rosters if they choose. You cannot restrict a musician's ability to work freely — their presence on your private roster simply stays private to you."

**WHY THIS PROTECTS VIVACE:**
If Vivace lets managers lock/restrict musicians → Vivace liable for antitrust + worker misclassification. The disclosure + musician-freedom design is Vivace's legal SHIELD.

**TO BUILD (with the public/private architecture):**
1. Manager roster LIST = private (legal)
2. Each musician = free to opt into public discovery (required)
3. Disclosure notice shown to managers when building rosters
4. NO feature that lets a manager lock/block a musician from other work
5. Anti-discrimination + free-to-work language in TOS

NOTE: Claude is not a lawyer — Rafa should have a real attorney review the final TOS + roster disclosure before public launch.

---

## ✅ SHIPPED June 10-11 (mega session)
- CSV bulk import (200 cap, injection-safe, audit trail)
- Full invite system (link-first, ban-safe, 25/batch email cap) + auto-link on signup (no duplicates)
- Invite status tracking (joined/invited/to-invite counter + badges)
- Public/private privacy architecture (anti-poaching) + manager legal disclosure banner
- Founding Member badge (first 100 users, gold, numbered)
- Union member toggle (self-declared, optional)
- Organizer sealed guest groups (private events, non-musician attendees, $1 each) + FIXED missing organizer_events rule
- 90-day countdown clock (color shifts green→red as time runs) + tier education (free vs paid)

## 🔴 ONLY REMAINING: Stripe 90-day trial setup (NOT URGENT — ~90 days runway)
**CONFIRMED MODEL:** $1 verification once at signup (already exists) → 90 days totally FREE → then $39/mo.
**Old $1/month×3 prices: already removed by Rafa.**
**TO DO in Stripe dashboard (15 min, do together):**
1. dashboard.stripe.com → Products
2. On the $39/month plan's price → set "Free trial" = 90 days (Option A, dashboard setting — simplest)
   OR add trial_period_days:90 in createCheckoutSession Cloud Function (Option B, code)
3. Keep $1 verification SEPARATE (one-time, at signup) — do NOT bundle with the subscription
4. Verify no double-charge: $1 once + 90 free + $39/mo after
**Code already says "Pay $1 today, 3 months free" — matches the model. TRIAL_DAYS=90 set in index.html.**

---

## 🟡 OPEN QUESTION (next session) — Tier ladder for Agency & Organizer
Not yet locked: where Organizer and Agency sit on the paid tier ladder.
- Current plans: Pro (~$14) · Studio ($39) · Agency (higher) · Teacher Pro/Studio
- Need to decide: Is Agency the TOP tier? Where does Organizer fall — same as Manager, or its own tier?
- Roles confirmed: users hold multiple roles; ONE payment = highest tier used. Artist/Student = free. Manager/Teacher/Organizer = paid bucket.
- TODO: map each role → tier → price clearly. Decide if Agency/Organizer need higher-level pricing.
- ALSO TODO: add TOS clause "promotional trial terms (3 months free) are for new members only and may change at any time at Vivace's discretion" (trial-abuse protection).

---

## ✅ ORGANIZER TIER LADDER — LOCKED (titles confirmed by Rafa)

**Organizer track:**
- 🆓 Participant / Guest (Free) — group members & guests; attend, RSVP, join; LIMITED features (cannot create events or hire musicians; can request to upgrade/host)
- 🟢 Event Organizer ($39/mo) — create private events, sealed guest groups, hire musicians, manage ONE community
- 🟣 Event Master ($149/mo) — TOP tier, EQUAL to Agency — multiple events/communities, sub-organizers, white-label, priority support

**FULL UNIFIED LADDER (all tracks):**
- Free: Artist · Student · Participant/Guest
- $14: Agent Pro · Teacher Pro
- $39: Agent Studio · Teacher Studio · Event Organizer
- $149: Agency · Event Master (top tier)

**Key decisions:**
- "Event Master" chosen as top organizer title (Rafa liked it over Administrator) — equal to Agency level
- Organizer slots into EXISTING price points ($39, $149) — no new prices invented
- Participant/Guest = free, limited; CAN request to host their own event (upgrade path)
- One payment covers all roles; highest tier used applies

**TODO (next session — not built yet):**
- Build the Event Organizer ($39) and Event Master ($149) tiers into billing/plans code
- Define exact Participant/Guest limits (what they can/can't do)
- Add Stripe price IDs for Event Organizer + Event Master

---

## 💰 MASTER PRICING TABLE (LOCKED — June 11)

### Entry (everyone)
| Item | Price | Notes |
|------|-------|-------|
| Verification | $1 once | At signup. The ONLY entry charge. Then 3 months free. |

### 🎻 Artist / Student
| Tier | Price | Gets |
|------|-------|------|
| Artist | Free forever | Profile, reel, apply to gigs, join groups, calendar |
| Student | Free forever | Learn, book lessons, get discovered |

### 🎯 Agent / Manager
| Tier | Price | Gets |
|------|-------|------|
| Free | $0 | Apply to gigs, join groups when invited, browse |
| Agent Pro | $14/mo | Unlimited rosters, broadcast, cherry-pick, post gigs |
| Agent Studio | $39/mo | Pro + featured posts, CSV export, analytics |
| Agency | $149/mo | + sub-agents, white-label, API, dedicated manager |

### 👨‍🏫 Teacher
| Tier | Price | Gets |
|------|-------|------|
| Teacher Basic | $0 | Up to 5 lessons/mo, bookings, calendar |
| Teacher Pro | $14/mo | Unlimited lessons, verified badge, roster, reel |
| Teacher Studio | $39/mo | Group classes, masterclasses, course builder |

### 🎪 Organizer (titles LOCKED, NOT built yet)
| Tier | Price | Gets |
|------|-------|------|
| Participant / Guest | Free | Attend, RSVP, join (limited; can request to host) |
| Event Organizer | $39/mo | Create events, sealed groups, hire musicians, 1 community |
| Event Master | $149/mo | Multiple communities, sub-organizers, white-label (=Agency) |

### 🎙️ Vivace Radio (add-on)
| Tier | Price | Gets |
|------|-------|------|
| Radio Basic | $9/mo | 2× per day airplay |
| Radio Pro | $19/mo | 5× per day airplay |
| Radio Featured | $39/mo | 10× per day airplay |

### Unified price points
- $0 — Artist, Student, Participant/Guest, free tiers of Agent & Teacher
- $1 — one-time verification at signup
- $9/$19/$39 — Radio add-on
- $14 — Pro (Agent/Teacher)
- $39 — Studio (Agent/Teacher) · Event Organizer
- $149 — Agency · Event Master (top)

### Rules
- One payment covers all roles; highest tier used applies
- 3 months free for all new paid users (after $1 verification)
- Free roles: Artist, Student, Participant/Guest
- NO $14 Host tier for Organizers (decided: Free → $39 → $149 is cleaner)

---

## 📅 NEXT SESSION SCHEDULE (in priority order)

### 🔴 PRIORITY 1 — Build Organizer tiers into code
- Add Event Organizer ($39) + Event Master ($149) plan cards to billing screen
- Create Stripe price IDs for both
- Define + enforce Participant/Guest limits (what they can/can't do)
- Add "request to host" upgrade path for Participants

### 🔴 PRIORITY 2 — Stripe billing setup (the real money config)
- Add 90-day FREE trial to the $39 + $149 plans (dashboard "Free trial" = 90 days)
- Keep $1 verification separate (one-time)
- Verify no double-charge: $1 once → 90 free → then plan
- Rotate Stripe secret key (~mid-June, may be overdue)

### 🟡 PRIORITY 3 — Quick cosmetic + legal fixes
- Fix "$19/mo" → "$39/mo" on profile Subscription button (line ~8799 area)
- Reconcile planLabels if needed
- Add TOS clause: "promotional trial terms (3 months free) are for new members only and may change at any time at Vivace's discretion"

### 🟡 PRIORITY 4 — www certificate
- Firebase Console → Hosting → Add custom domain → www.vivaceevents.com
- Add DNS record at registrar → auto-cert → www warning gone
- OR set up www → non-www redirect

### 🟢 PRIORITY 5 — DMCA + deeper caching (lower urgency)
- DMCA agent registration at copyright.gov (~$6/yr) + create dmca@vivaceevents.com
- Apply firebase.json cache headers (firebase_hosting_headers.txt) for server-level cache fix

### 🟢 FUTURE — Smart Roster Phase 2+
- Queue position visible to musicians, auto-rotation
- Phase 3: auto-invitation, decline→next, Reserve folder, Job Sheet PDF v2
- Phase 4: queue penalties, removal notifications (3 options), rating drop

---

## ✅ ALSO SHIPPED (end of June 11 session)
- Always-visible trial banner on main profile (purple→pink gradient #3, auto-switches to amber urgent in final 5 days, taps to billing). Solves: nobody misses their trial status / no surprise charges.
- Pricing language cleanup (removed all old "$1/month × 3" + "Regular price" → now "3 months free → choose a plan")
- Verification wall escape (Sign out button — verify OR leave, no trapped users, no unverified access)
- TOS checkbox fixed (pure visual toggle, no input element — works on single tap)
- No-cache meta tags added (caching was causing old-version flip-flop)
- Blank page fix (broken apostrophe in countdown)

## RESUME NEXT TIME — START HERE
Say "let's start with Priority 1" (or pick any). Current file size: 741552 bytes (after trial banner).
Everything live at vivaceevents.com. All synced to GitHub.

---

## 🌐 TRANSLATION — PERMANENT RULE (locked June 11)

**STANDING INSTRUCTION for all future work:**
Every time Claude adds or changes ANY user-facing text, Claude MUST automatically:
1. Add the text to the T dictionary in ALL 6 languages (en, es, it, ru, fr, de)
2. Wrap the text in t('keyname') instead of hardcoding English
3. Do this in the SAME step as building the feature — never as a separate task

Rafa should NOT have to ask for translation each time. It's part of "the packaging" of every update.

**HOW THE SYSTEM WORKS:**
- T = a dictionary object with 6 language blocks (T.en, T.es, T.it, T.ru, T.fr, T.de)
- t('key') function looks up the current language's text
- setLang() switches language + persists choice (sessionStorage + UP.lang)
- ~179 keys currently; profile screen ~99% translated

**CRITICAL BUG TO AVOID (caused 3 blank pages):**
- NEVER let a bulk find-replace hit the T dictionary itself → creates circular refs like key:'${t('key')}'
- NEVER create quote-nesting like '${t('x')}' inside a single-quoted string in a ternary
- ALWAYS after wrapping strings: check `grep -c ":'\${t('"` AND `grep -c "'\${t('"` BOTH = 0
- ALWAYS extract + execute the T object in node to confirm it parses before shipping
- Wrap strings ONE context at a time with specific surrounding HTML, not broad text matches

**REMAINING TO TRANSLATE (future sessions):**
- Profile: gift card details, $19→$39 button, radio plan prices (mostly done)
- Screens not yet started: Feed, Find/Discover, Manager, Post gig, Calendar modal, all popups/modals
- Approach: screen by screen, test each language, deploy, next

---

## 🟢 STRIPE TAX (informational — NOT urgent, June 11)
Stripe sent an email confirming payments are working + suggesting the optional "Stripe Tax" add-on.
- Stripe account ID: acct_1TeF4aR49hhPnbua (business location: Virginia)
- Stripe Tax = optional add-on that auto-calculates/collects sales tax
- If enabled, would need a VA tax permit/registration number
- NOT urgent — depends on whether musician-booking services are even taxable in VA
- ACTION (LATER): consult a real accountant about VA sales-tax obligations + whether to enable Stripe Tax, before scaling transaction volume
- Claude is not a tax advisor — this needs a professional

---

## 📅 TRANSLATION SCHEDULE — TASK MENU (resume here)

**GOAL: Fully translate the app, screen by screen (all 6 languages)**

### ✅ DONE
- Profile screen (~99%)

### 🔴 NEXT — finish remaining (in order):
1. **Profile last bits** (quick): $19→$39 button + translate it, gift card details, radio plan prices
2. **Feed screen** (home / gigs list) — most-used screen
3. **Find / Discover screen** (search musicians)
4. **Manager screen** (rosters, gigs, broadcast)
5. **Post a gig** (the + button form)
6. **Popups & modals** (editors, calendar modal, gift sending, etc.)

### HOW (the proven process per screen):
- Add new keys to T dictionary in ALL 6 langs (after an existing anchor line)
- Wrap each English string in t('key') — ONE context at a time, specific HTML match
- After each batch: check `grep -c ":'\${t('"` = 0 AND `grep -c "'\${t('"` = 0
- Extract + run T object in node to confirm it parses
- node --check full script
- Deploy + test one language (RU is easy to spot)

### CURRENT FILE: 768779 bytes (Event Organizer role just translated)

## 📋 FULL TASK MENU (everything pending)
🔴 = important · 🟡 = medium · 🟢 = low/later
- 🔴 Finish translation (screens above) — IN PROGRESS
- 🔴 Reconcile $19 → $39 on subscription button (line ~9158)
- 🔴 Build Organizer tiers into code (Participant/Event Organizer $39/Event Master $149)
- 🟡 Stripe: add 90-day free trial to plans (dashboard) + rotate secret key
- 🟡 www.vivaceevents.com certificate (security warning)
- 🟢 Stripe Tax — consult accountant (VA sales tax) — not urgent
- 🟢 DMCA agent registration ($6/yr) + dmca@vivaceevents.com
- 🟢 firebase.json cache headers (deeper cache fix)
- 🟢 Smart Roster Phase 2+ (queue visibility, auto-rotation, etc.)

---

## ✅ ORGANIZER PLANS — BUILT into billing (June 11)
Added to billingHTML: Participant/Guest ($0), Event Organizer ($39), Event Master ($149).
- organizerPlans array defined (line ~7973)
- Rendering section "🎪 For Event Organizers" added after teacher plans
- prices object updated with participant/event_organizer/event_master
- Confirmed model: NO $14 organizer tier (Free → $39 → $149)
- DECISION LOCKED: one ladder, features adapt to role; organizers see only event tools, not bothered by musician features, but unlocked if they want them

## 🔴 TODO — Stripe price IDs for organizer plans (REQUIRED for payments to work)
The plan CARDS display, but clicking "Get started" won't charge until Stripe price IDs exist.
- In Stripe dashboard: create 2 recurring prices:
  - Event Organizer = $39/month
  - Event Master = $149/month
- Then add those price IDs to selectPlan()/createCheckoutSession in the code
- (Participant is free — no Stripe price needed)
- Do together with the 90-day trial Stripe setup

---

## 💡 FUTURE IDEA — Event Production Suite (Organizer premium feature)
**Rafa's idea (June 11) — NOT building now, saved for future roadmap. Stick with current plan.**

The insight: reuse the orchestra seating-chart engine (already built) to solve organizers' visual layout problems. Three connected tools:

**1. 🎤 Podium / Run-of-Show (timed schedule + stage diagram)**
- Who speaks when (8:00 person A, 8:15 person B, etc.) — timed run sheet
- Stage layout: podium, microphone stand, head table positions
- Performer slots: which musician plays at what time, their name
- Guest speakers from audience, etc.

**2. 🪑 Guest Seating Floor Plan (the big one)**
- Visual table layout (like orchestra chart, but tables instead of chairs)
- Choose table SHAPES: round, square, rectangle, etc. (offer 3-4 shapes)
- Set seats-per-table (configurable)
- Assign guests to specific seats/tables (Table 1, Table 125...)
- Color-coded tables, named/numbered tables
- Click-to-assign (reuse orchestra chart logic)
- Critical for diplomatic/formal events with assigned seating
- Solves the "guests wander looking for their seat" problem

**3. 🎻 Performer Schedule**
- Musician name + time slot + what they're playing
- Ties into existing roster system

**Why it's strong:**
- Reuses the hardest part already built (seating chart engine)
- Perfect Event Master ($149) premium feature — big events = big production = will pay
- Unique differentiator: booking + seating + run-of-show in ONE place = full event production tool, not just booking
- Solves real gala/event pain

**Build approach (when/if approved):** phases — Seating floor plan first, then Run-of-Show, then Performer schedule. Big build (2nd biggest after orchestra chart). Gate behind Event Master tier.

---

## 💡 FUTURE IDEA — Guest Email Delivery (no-platform-needed) — pairs with Event Production Suite
**Rafa's idea (June 11) — NOT building now, saved for roadmap.**

The insight: guests should get event info by EMAIL even if they're NOT on the platform. Removes friction + acts as a growth engine.

**How it works:**
- Organizer sets up event (seating, run-of-show, updates) → hits "Send to guests"
- Platform guests → get it in-app
- Non-platform guests → get a personalized EMAIL ("You're at Table 25, starts 8pm, here's the schedule")
- Email has a magic link → opens a no-login guest page with their seat + event details + optional "Join Vivace" button
- Guests can join the platform if they want (click + confirm) but are NOT forced to
- Works for: initial invite, any updates, final send-out, presets

**Why it's smart:**
- Zero friction for guests (diplomats/gala guests won't download an app just to find their table)
- GROWTH ENGINE: every event email is a soft invite to Vivace — organizers market the platform for us
- Matches how real events work (invites go by email)

**Considerations to weigh (Rafa flagged "needs to be considered"):**
- 📧 Email deliverability — bulk event emails risk spam flags; use proper email service, throttled (we learned this with bulk-invite limits)
- 🔒 Privacy — send PER-GUEST emails (each person sees only their own table/info, NOT the whole guest list)
- ✅ Consent — include easy "not interested"/unsubscribe so it's not spammy
- 🎟️ Magic link per guest → no-login guest detail page

**Connection:** This is the DELIVERY SYSTEM for the Event Production Suite. Together = complete event tool. Both gated behind Event Organizer / Event Master tiers.

---

## 💡 FUTURE IDEA — Event Check-In / Live Entry (researched June 11)
**Rafa's idea + Claude research — NOT building now, saved for roadmap.**

**Rafa's questions answered:**
- Organizer can know how many guests are in the building (live count) — YES
- Non-platform guests get an entry LINK (not app download) → open in browser → show code → staff admits — YES
- Staff (on platform) don't need QR — they tap "I'm here" — YES, two paths
- Works offline with cached guest list (industry standard)

**Market research finding:** QR check-in, digital tickets, facial recognition, badge printing = TABLE STAKES (everyone has them — Eventbrite, Cvent, vFairs, Eventdex). Don't compete on the code itself.

**THE UNIQUE ANGLE (don't copy Eventbrite — be "the live room"):**
1. 🪑 **Check-in → live seating map**: guest checks in → their seat turns GREEN on organizer's floor plan → watch the room fill in real time. NOBODY ties check-in to a visual seat map. (Reuses orchestra seating engine.)
2. 🎫 **No-app entry pass**: guest gets browser LINK (not app) → seat + entry code → staff taps to admit. Call it "entry pass" not "ticket" (we're not selling tickets, we're admitting guests).
3. 🎻 **Unified status board**: musicians + guests on ONE live screen ("3/5 musicians arrived, 80/120 guests in"). We already have the musicians — competitors don't.
4. 👥 **Staff self-check-in**: platform users tap "I'm here" (no QR); guests use link/code. Two paths, one board.

**Positioning:** Eventbrite = ticketing-first. Vivace = "the live room" — booking + seating + check-in + run-of-show in ONE real-time picture. Competitors can't easily copy (they lack the musician/booking side).

**Tech notes:** QR generation is free (simple JS library), works offline with cached list. The value isn't a fancier code (NFC etc.) — it's WHAT the code connects to (live seat map). Gate behind Event Organizer / Event Master.

**This completes the Event Production Suite trilogy:** (1) Seating + Run-of-show, (2) Guest email delivery, (3) Live check-in. Together = full event production platform nobody else has.

---

## ✅ TRANSLATION — MAJOR MILESTONE COMPLETE (June 11)
The whole app is now broadly multilingual in 6 languages (EN/ES/IT/RU/FR/DE).
- Grew from 134 → 270 translation calls; ~184 → 359 dictionary keys per language (×6 = ~2,154 translations)
- Current file: 823476 bytes, deployed & live

**Screens translated (deployed):**
- Profile ~99% · Billing ~90% · Feed ~85% · Discover/Find ~80% · Manager ~85% · Post-gig ~85%
- Editor modals (genres/formats/instruments/skills/contact) · Calendar modal · Notifications · Gift section

**Remaining minor/scattered bits (low priority, pick off anytime):**
- Toast/confirmation messages ("Saved!", "Group created!", etc.)
- Radio player labels
- Deep-flow popups (gift redemption, apply confirmations)
- "From:" label in calendar range bar

**KEY LEARNING — blank-page causes & the reliable safeguard:**
Bulk text replacement can hit the T dictionary and create self-references:
- `key:'${t('key')}'` (circular) — caught by grep ":'${t('"
- `key:''+t('key')+''` or `key:t('key')` (self-ref) — NOT caught by grep, only by executing the dictionary
- Quote-nesting `'${t('x')}'` inside single-quoted ternary — caught by grep "'${t('"
THE RELIABLE TEST: extract the `const T={...}` object and EXECUTE it in node (not just node --check). This catches ALL three failure modes. node --check alone passes broken self-refs. ALWAYS run the dictionary-execution test before shipping any translation batch.

---

## ✅ STRIPE SECRET KEY — CLEANED UP (June 11, DONE)
- Was: 5 messy secret keys (security risk, confusing)
- Now: ONE clean live key = sk_live_...osOC ("Vivace Events Firebase Function", created Jun 7, last used Jun 10)
- Firebase STRIPE_SECRET confirmed = sk_live_...kJcosOC (the osOC key) — matches, all correct
- Expired/removed all unused old keys (hMdA, nDzP, and the auto-expired KQZb/s50F)
- Publishable key (pk_live_...) untouched — it's public, normal
- NO redeploy was needed — the live osOC key was never touched, payments uninterrupted
- LEARNING: Stripe has no "Delete" for standard keys — use "Expire key" (••• menu) which permanently revokes. NEVER expire the live key without first creating new + updating Firebase secret + redeploying functions.

---

## ✅ PAYMENT/TRIAL AUDIT + 90-DAY TRIAL FIX (June 11, DONE & DEPLOYED)

**AUDIT RESULT — no double-charge risk found:**
- chargeVerification = exactly $1 once (amount:100), separate function, correct
- createSubscription cancels any existing sub first (no stacking) — good
- $1 verification and subscriptions are separate paths — NO double-charge
- GAP FOUND: backend had NO trial logic — "3 months free" was only visual; code would have charged immediately on subscribe

**FIX APPLIED (functions/index.js, deployed):**
- createCheckoutSession: added `subscription_data:{ trial_period_days: 90 }`
- createSubscription: added `trial_period_days: 90` + `trial_settings:{ end_behavior:{ missing_payment_method:'cancel' }}`
- Now: pick paid plan → 90-day trial (card saved, $0) → day 91 charges automatically; no card by day 91 → cancels cleanly
- $1 verification untouched, still separate
- File now 417 lines, deployed via `firebase deploy --only functions`, committed to GitHub (commit aa3ad41)

**STILL TODO (test when convenient):** subscribe with a test account → confirm Stripe shows "Trialing" not "Active", trial end ~90 days out.

**Payment functions in index.js:** createCheckoutSession, chargeVerification, createSubscription, changeSubscription, cancelSubscription, createConnectAccount, createGigPayment, getConnectStatus, checkCopyright (AudD), sendEnsemblePush.

---

## ✅ ORGANIZER PLANS — FULLY WIRED TO CHARGE (June 11, DONE)
Stripe Price IDs created + wired into code:
- Event Organizer $39/mo = price_1ThKOBR49hhPnbuaOzdcT4L4
- Event Master $149/mo = price_1ThKQHR49hhPnbuaPQql5bE2
- participant = free
Added to PRICE_IDS map (line ~9241), prices display object, and planOrder array.
Organizer plans now end-to-end: display ✅ + Stripe prices ✅ + wired to charge ✅ + 90-day trial ✅
File: 823678 bytes. Stripe products also have descriptions (90-day trial mentioned).

NOTE: Stripe catalog has some duplicate products (old Jun 3-5 versions with "2 prices" + clean Jun 8 versions). Not urgent — code uses specific price IDs. Could clean up old duplicates later (archive them).

## CURRENT PRICE_IDS MAP (all live):
pro=price_1TgBjO · studio=price_1TgBq9 · agency=price_1TeMR8 · teacher_pro=price_1TgC3Q · teacher_studio=price_1TgC7E · verification=price_1TgBLG · event_organizer=price_1ThKOB · event_master=price_1ThKQH · teacher_basic/participant=free

---

## 🐛 BLANK PAGE FIX (June 11) — quote-nesting bug, RESOLVED
Cause: 3 translation strings had ${t('...')} inside SINGLE-QUOTED strings (not backtick templates), breaking JS syntax. Browser error: "Uncaught SyntaxError: Unexpected identifier 'noNotifications'" at line 2751.
The 3 bugs:
- noNotifications (notifications empty state, ternary)
- noMembersYet (group members empty state, ternary)
- carpoolNone (carpool empty state, assigned to el.innerHTML='...')
Fix: replaced ${t('key')} with string concatenation '...'+t('key')+'...' in all three.
File: 823681 bytes.

KEY LEARNING — STRONGER PRE-SHIP CHECK (critical):
The bug pattern is ${t('...')} inside a single-quoted string — it passes a naive check but breaks at runtime. node --check on the EXTRACTED FULL SCRIPT catches it (it's a real syntax error). MUST verify ALL <script> blocks pass node --check AND scan whole file for: (innerHTML=|[?:]\s*)'[^'`\n]*\$\{t\('  before shipping. Three failure modes total now documented:
1. key:'${t('key')}' circular — grep ":'${t('"
2. key:t('key') or key:''+t('key')+'' self-ref — only caught by executing dictionary
3. ${t('x')} inside single-quoted string (NOT a template literal) — caught by node --check on full extracted script; THIS caused the June 11 blank page
ALWAYS run BOTH: (a) execute the T dictionary in node, AND (b) node --check the full extracted script. Together they catch all 3.

---

## ✅ www.vivaceevents.com CERTIFICATE — DONE (June 11)
Added www.vivaceevents.com as a custom domain in Firebase Hosting, set to REDIRECT to vivaceevents.com.
- Status: "Working" ✅ (redirect active)
- Firebase auto-creates SSL cert for www → security warning fixed
- Redirect (not separate site) chosen = best practice: one canonical address, better SEO (no duplicate content), less maintenance, modern standard (like google.com/facebook.com)
- www is now secure AND forwards to clean main domain
- Note: full cert propagation can take some time but setup is complete
- Firebase Console was glitchy during setup (spinning button looped, "domain already exists" meant it actually succeeded on a background retry) — not user error

---

## ✅ TOS TRIAL-ABUSE CLAUSE — DONE (June 11)
Added promotional trial terms in 2 places:
1. Billing page policy box (short version): new members only, one per person, can change/withdraw anytime, multiple accounts prohibited
2. Full TOS Subscription & Billing section (full version): adds circumvention prohibited, $1 verification separate & non-refundable
File: 824776 bytes.
NOTE: Claude is not a lawyer — clause is reasonable/clear protection, but a real attorney review recommended if scaling significantly.

---

## ✅ STRIPE PRODUCT CLEANUP — DONE (June 11)
Archived all old duplicate products (Jun 3-5 versions with old $19/$49 pricing + old $1/mo×3 trial model).
- Final state: Active: 8 · Archived: 6
- 8 CLEAN active products (all single-price, correct): Event Master $149, Event Organizer $39, Teacher Studio $39, Teacher Pro $14, Agent Studio $39, Agent Pro $14, Vivace Verification $1, Agency $149
- Verified safe before archiving: old duplicates used different price IDs (e.g. price_1Tf6Ry, price_1TeMN4) NOT in the live PRICE_IDS map; all had 0 active subscriptions; all used outdated pricing ($19 Agent Pro vs current $14, $49 Teacher Studio vs current $39)
- Archive ≠ delete (recoverable), out of the way, revenue reports now clean

---

## ✅ 90-DAY TRIAL — TESTED & VERIFIED WORKING (June 11)
Live test with virtualstudioorchestra@gmail.com (test account, already verified):
- Subscribed to Agent Pro → Stripe shows "Free trial ends Sep 9" ✅ (Jun 11 + 90 days)
- $0 charged (Payments page showed only the 3 old $1 verifications, NO $14) ✅
- $14/mo scheduled to begin AFTER trial ✅
- CONFIRMED: the whole payment system (trial + price IDs + $0 during trial) works end-to-end

**BUG FOUND & FIXED:** The upgrade confirm modal (showUpgradeConfirm) had misleading text "Your verified card will be charged $14 immediately" — WRONG, since trial charges $0. Fixed to: "🎁 90-day free trial — card on file, not charged today, $14/mo begins after trial, cancel anytime." Button changed from "Confirm upgrade — $14/mo" to "Start 90-day free trial". File: 824897 bytes.

**CLEANUP TODO:** Cancel the test subscription (virtualstudioorchestra Agent Pro, trialing) so it doesn't charge $14 on Sep 9 — or leave it (won't charge till then).

---

## 📕 REFUND & CANCELLATION CHEAT-SHEET (how-to, for Rafa)

### KEY RULE: Trial vs Charged
- **In trial (before day 91):** $0 was charged → just CANCEL, no refund needed
- **After charged (real $14+):** → REFUND in Payments

### HOW TO CANCEL A SUBSCRIPTION:
1. https://dashboard.stripe.com/subscriptions → Active tab
2. Click the subscription
3. Top-right "Actions" (or "...") → Cancel subscription
4. Choose "Immediately" (or "at end of period" to let trial run out)
5. Confirm. Canceled subs move to the "Canceled" tab.
- During trial = $0, clean cancel, no money involved.

### HOW TO REFUND A REAL CHARGE:
1. https://dashboard.stripe.com/payments
2. Find the charge (search by customer email/amount)
3. Click the payment → "Refund" button (top-right)
4. Full or partial refund → pick reason → confirm
5. Money returns to card in 5-10 business days (automatic)

### IMPORTANT REFUND FACTS:
- Stripe's fee (~2.9%+30¢) is NOT returned to you on a refund — refunding $14 costs you ~70¢; refunding $1 basically loses the fee. Normal across all platforms.
- Refunds are FINAL (can't undo)
- Easy within 90 days of the charge

### POLICY STANCE (per TOS we wrote):
- "All fees non-refundable. Exceptions only for verified billing errors."
- Not OBLIGATED to refund, but CAN as goodwill (good for reputation)
- Accidental trial signup → just cancel (no charge)
- $1 verification → tiny, refunding loses the fee; can refund as goodwill OR explain it's non-refundable one-time verification per TOS
- Real monthly charge → case-by-case: refund genuine errors, hold firm on buyer's remorse

### TEST DONE (Jun 11): Created test sub (virtualstudioorchestra), confirmed "Trialing/$0/ends Sep 9", then canceled cleanly. Whole flow verified working.

---

## 📕 TAX RESEARCH — Virginia SaaS/subscriptions (June 11)
**Claude researched; NOT a tax advisor — accountant consult recommended before scaling.**

KEY FINDINGS:
- ✅ Virginia does NOT currently tax SaaS / digital subscriptions / electronically-delivered software (multiple 2026 sources confirm). Vivace subscriptions (Agent Pro etc.) = cloud-based electronic access = EXEMPT in VA. Rafa's instinct ("everywhere says no tax") is correct.
- ⚠️ ECONOMIC NEXUS (other states): if Vivace exceeds $100,000 gross sales OR 200+ transactions in a given state, must register + collect sales tax there even with no physical presence. Rafa is far below this now — TRACK as it grows.
- ⚠️ PROPOSED CHANGE: Virginia HB 900 would START taxing SaaS/digital services (potentially 2027). MONITOR — could change Vivace's obligations.
- ⚠️ $1 verification fee + gig payments (Connect) are different categories — accountant should review.

ACTION NOW: Do NOT set up tax collection yet. Do NOT need Stripe Tax yet. VA exempts SaaS + Rafa below all thresholds.
ACTION LATER: (1) consult a VA accountant/tax pro (~1hr, ~$200-300) before scaling — confirms situation, when to start collecting, handles law changes. (2) Turn on Stripe Tax (optional add-on, auto-calculates/collects) when crossing thresholds. (3) Watch HB 900.

REFUND CLARIFICATION (Jun 11): Canceling a subscription during the trial = $0 charged = NOTHING to refund. Refund (separate action) only applies to real charges, done via Payments → Refund button.

---

## 🐛 MESSAGES "LOADS FOREVER" BUG — FIXED (June 11)
Symptom: profile → Messages section spun "Loading..." forever, never stopped.
ROOT CAUSE: `conversations` Firestore collection had NO security rule = silent deny-all (same class as the earlier `availability` bug). Query failed → empty catch block → spinner never cleared.
THREE FIXES:
1. firestore.rules: ADDED `conversations` rule (read if signedIn; create/update if uid in participants; delete if uid in resource participants) — THE ROOT FIX
2. firestore.rules: FIXED `messages` rule field mismatch — code uses `senderId` but rule checked `fromId` (would've blocked message creation). Changed rule to senderId.
3. index.html loadMyMessages(): empty catch{} → now logs error + shows "No messages yet" instead of infinite spinner
Both deployed (hosting 825229 + firestore:rules). CONFIRMED WORKING: Messages now shows "No messages yet" cleanly.
Harmless deploy warnings: "Unused function isOwnerEmail" + "Invalid variable name request" — cosmetic, rules compiled fine.

## ✅ FACEBOOK LOGIN — WORKING (June 11)
Setup complete: Firebase Facebook provider enabled (App ID 1724461911903145 + secret), redirect URI added in Facebook (https://vivaceevents-1a8ff.firebaseapp.com/__/auth/handler), OAuth settings + allowed domains configured.
TESTED: popup appears, recognizes app + user. Rafa's own login hit `auth/account-exists-with-different-credential` — EXPECTED because founder account already exists via email/Google with same email. NOT a setup failure — works for NEW users. Business verification "In review" is for ADVANCED data access, NOT needed for basic email/public_profile login (those are standard access).
OPTIONAL: enable Firebase account-linking (same email) so founder's own FB login also works. Added diagnostic console.error logging to the FB catch block (harmless, helps debug real user issues).
⚠️ SECURITY TODO: Rafa pasted the FB App Secret in chat (85ddf...) — RESET it in Facebook → Settings → Basic → App Secret → Reset, then update Firebase with new secret.

---

## ✅ PRIVACY POLICY PAGE — CREATED & DEPLOYED (June 11)
Created standalone privacy.html (4913 bytes) at https://vivaceevents.com/privacy.html — confirmed live & loading.
Reason: Facebook requires a real privacy URL that loads directly. The old `/privacy` just loaded the SPA app (not a standalone page). data-deletion.html already existed & worked; privacy.html now matches it.
Content: data collection, Facebook Login section (email + public_profile only, no posting/friends access), no-data-selling, Stripe/Firebase processors, retention/deletion, security, children (under 13), changes, contact.
Files in project root now: index.html, data-deletion.html, privacy.html

## 🔵 FACEBOOK PUBLISH — remaining optional step (June 11)
App status: "Unpublished" (Development mode = only owner/testers can FB-login).
- App Review: NOT NEEDED (only uses email + public_profile = standard access, auto-granted)
- Business verification "In review": NOT NEEDED for basic login
- Dashboard shows: "Customize Authenticate" ✅ + "testing requirements" ✅ done; Business verification / App Review = optional grey circles
TODO to go Live for all users: (1) update Facebook Settings→Basic Privacy Policy URL to https://vivaceevents.com/privacy.html (was /privacy which loaded the app), (2) click Publish/make Live.
NOT URGENT: Google + email + phone login already work for everyone. Facebook is one more option. Can publish later.

---

## ✅ PERSONAL INFO REMOVED FROM PUBLIC — uses company gmail (June 11)
Rafa's request: remove personal name "Rafael Javadov" + personal email from everywhere public; use company identity instead.
Changed (3 files): index.html (10 support@ + 1 dmca@ + 1 manager@), privacy.html (4), data-deletion.html (2) → ALL now virtualstudioorchestra@gmail.com
- Name fallback 'Rafael' → 'there'
- Contact line in Terms → virtualstudioorchestra@gmail.com
- DECISION: use virtualstudioorchestra@gmail.com (real inbox Rafa controls) for NOW instead of support@vivaceevents.com — avoids setting up email forwarding for ~300 emails. Can upgrade to support@vivaceevents.com later (it's already the standard the code used).
KEPT (intentional, invisible to users): 6 founder-access code checks (CU.email==='rafael.javadov@gmail.com') — these grant Rafa admin/founder powers and are code logic, NOT user-facing. Must stay.
Files: index_final.html 825327 bytes, privacy.html, data-deletion.html
TODO: update Facebook Settings→Basic contact email to virtualstudioorchestra@gmail.com + privacy URL to /privacy.html

---

## ✅ EMAIL SWAP — DEPLOYED via in-place PowerShell edit (June 11)
The browser download kept failing (files not landing in Downloads — only old Jun 4 files there). SOLUTION: edited index.html in-place with PowerShell instead of downloading:
`(Get-Content index.html -Raw) -replace 'support@vivaceevents\.com','virtualstudioorchestra@gmail.com' -replace 'dmca@...' -replace 'manager@...' | Set-Content index.html -NoNewline`
Result: 10 instances now virtualstudioorchestra@gmail.com, deployed live (commit 243e506).
LEARNING: when browser downloads fail repeatedly, use in-place PowerShell -replace on the existing file instead of fighting the download. Much simpler for tired user.
NOTE: privacy.html + data-deletion.html still need deploying with gmail (they were prepared but the email swap there may not be live yet — verify/deploy when fresh). The 'Rafael'→'there' name fallback change is also only in the Claude workspace copy, not critical (rarely-seen fallback).

---

## 🔴 UNRESOLVED (June 11, low priority): /privacy page routing
PROBLEM: vivaceevents.com/privacy (and /privacy.html) loads the main APP instead of the standalone privacy policy page. Console shows "privacy.html:8746 Already verified — skipping" = app code running at that URL.
ROOT CAUSE: firebase.json rewrite "source":"**" → "/index.html" catches the privacy URL.
ATTEMPTS MADE (none worked yet):
1. Glob exclusion: "source":"!/**/*.@(html|css|js...)" — didn't work
2. Explicit per-file rewrites /privacy.html → /privacy.html — didn't work
3. Created privacy/ FOLDER with index.html inside + rewrite /privacy → /privacy/index.html + cleanUrls:true — deployed (287 files) but STILL loads app even in incognito
CURRENT firebase.json: cleanUrls:true, rewrites [/privacy→/privacy/index.html, /data-deletion→/data-deletion.html, **→/index.html]
LIKELY REMAINING CAUSE: Firebase CDN edge cache serving stale response (can take time to clear), OR cleanUrls conflict.
NEXT STEPS TO TRY (when fresh): (a) wait 10-30 min for CDN cache, retest incognito; (b) try removing cleanUrls or setting trailingSlash:false; (c) Firebase serves real files before rewrites, so /privacy/index.html SHOULD work — verify the folder actually deployed by checking Firebase console Hosting file list; (d) as last resort, host privacy page elsewhere or use a different path.
IMPACT: LOW — only needed for Facebook app publishing (optional; Google/email/phone login work for everyone). App itself works perfectly. NOT blocking anything urgent.

---

## 📋 MASTER TO-DO LIST (as of June 11, end of session)

### 🔴 IMPORTANT (bring up first next session)
1. **FIX /privacy page routing** — loads app instead of privacy page. firebase.json rewrite issue. Needed for Facebook publishing. (Full diagnosis + next steps documented above. Try CDN cache wait first.)
2. **Reset Facebook App Secret** — it was pasted in chat (security). Facebook → Settings → Basic → App Secret → Reset → update Firebase with new secret.

### 🟡 MEDIUM
3. **Update Facebook Settings→Basic**: contact email → virtualstudioorchestra@gmail.com, Privacy Policy URL → working privacy URL (after #1 fixed)
4. **Publish Facebook app** to Live (optional — Google/email/phone login already work for everyone)
5. **Verify privacy.html + data-deletion.html** show gmail correctly once routing fixed
6. **Last translation sweep** — any remaining untranslated toasts/labels (radio, misc)

### 🟢 LATER / LOW PRIORITY
7. **DMCA agent registration** (~$6/yr at copyright.gov) — needed before Radio public launch; create dmca@ email (currently points to gmail)
8. **Stripe Tax** — consult VA accountant before scaling (VA doesn't tax SaaS now; watch $100K nexus + HB 900)
9. **firebase.json cache headers** — deeper performance/cache optimization
10. **Smart Roster Phase 2-4** — the queue/rotation system (Phase 1 done)

### 💡 FUTURE FEATURES (captured, not building yet — gate behind Event Organizer/Master tiers)
11. **Event Production Suite** — guest seating floor plan + podium/run-of-show + performer schedule (reuse orchestra seating engine)
12. **Guest Email Delivery** — non-platform guests get event info by email (magic link, no-login guest page) — GROWTH ENGINE
13. **Live Check-In** — "be the live room": real-time check-in lights up seating map, no-app entry-pass link, unified musicians+guests status board

### ✅ DONE THIS SESSION (June 10-11) — for reference
Translation (6 languages) · Organizer plans (built+wired+Stripe+tested) · 90-day trial (tested live, works) · Stripe keys cleaned (5→1) · Stripe products cleaned (8 active, 6 archived) · trial message fixed · blank page fixed (3 quote-nest bugs) · www certificate · TOS trial-abuse clause · Messages-loads-forever bug fixed · Facebook login set up (works for new users) · privacy.html + data-deletion.html created · personal info removed (→ company gmail everywhere) · refund/cancel cheat-sheet + VA tax research documented

---

## ✅ GUEST SEATING FLOOR PLAN — BUILT (June 11, Event Production Suite Phase 1)
The ORGANIZER guest table seating (galas/diplomatic events) — NOT the orchestra chart. First piece of the Event Production Suite.
FEATURES (full version per Rafa's choice): tables with 3 shapes (round/square/rectangle), configurable seats (2-12), 8 auto-assigned colors, click-to-assign guests (tap seat→pick guest→shows initials), stats bar (tables/seats/seated/waiting), guest entry BOTH ways (auto-pulls event's existing guests + type/paste names one-per-line or comma-sep), rename/delete tables (delete returns guests to waiting list), saves to event_seating Firestore collection (one doc per event, reloads on reopen).
PLACEMENT: "🪑 Seating Floor Plan" button (orange) on each organizer event card, below Find Musicians + Manage Guests.
NEW: window.openSeating, addTable, deleteTable, renameTable, seatClick, assignSeat, seatRemoveGuest, addSeatGuests, saveSeating. New firestore rule event_seating (organizer owns, deployed). SEAT_TABLE_COLORS array.

BUGS FIXED during build:
1. Organizer events DISAPPEARING after refresh — loadOrganizerEvents used where('userId')+orderBy('timestamp') = needs composite index, failed silently → empty. FIX: removed orderBy, sort in JS instead (no index needed). Same pattern as messages/notifications bugs.
2. Seating chart graphics — seats positioned OUTSIDE table card (clipped) + initials cut off. FIX: expanded viewBox 150→180 (padding), pulled seats inward (rx/ry reduced), overflow:hidden on card, bigger initials font.

NOT YET DONE: translations for seating UI (English only for now — Rafa testing design first, translate once locked). File: 839313 bytes.
NEXT in Event Production Suite: (2) Podium/Run-of-Show, (3) Performer Schedule, then Guest Email Delivery + Live Check-In.

---

## ✅ ORGANIZER EVENTS DISAPPEARING — FIXED & CONFIRMED (June 11)
Was: events saved to Firestore but vanished from the My Events list after refresh. Root cause: loadOrganizerEvents used where('userId')+orderBy('timestamp') = composite index required, query failed silently → empty list. FIX: removed orderBy, sort in JS. DEPLOYED + CONFIRMED WORKING — events now save and persist after refresh.
KEY CLARIFICATION (caused confusion during testing): events are PRIVATE PER ACCOUNT (where userId==CU.uid). The "jan" event with 3 seating tables was created on Rafa's FOUNDER account (rafael.javadov), but he was viewing the list on his virtualstudioorchestra TEST account → correctly showed 0 events. This is correct private behavior, NOT a bug. Confirmed by creating fresh event on virtualstudioorchestra account → it appeared and stayed.
Seating data also confirmed persisting (openSeating loads saved plan by eventId — the 3 tables came back correctly).

NOTE: graphics geometry fix (839313, seats-fit-inside-card) was prepared but NOT deployed — current live is 839210 (functional but seats may clip on some tables). Apply 839313 graphics fix next session via in-place edit if needed. Also still pending: seating UI translations (English only currently).

---

## ✅ ORGANIZER EVENTS — TIMING BUG FIXED & CONFIRMED (June 11, FINAL)
The REAL root cause (deeper than the index issue): on HARD REFRESH, the organizer page rendered organizerHTML() BEFORE loadOrganizerEvents() finished (it was fire-and-forget via setTimeout), then never re-rendered → showed "No events yet" even though events existed. Worked on normal nav because _orgEvents was pre-loaded at login; only hard-refresh exposed the gap.
FIX: loadOrganizerEvents now calls render() after events load (with window._orgRendering guard flag to prevent infinite loop — render→load→render). Line 1205: only schedules load if !window._orgRendering.
DEPLOYED (839540) + CONFIRMED by Rafa: "Visible now!" — events persist on hard refresh.
This pattern (async load + setTimeout render + no re-render) could affect other lazy-loaded sections — watch for it.

---

## ✅ SEATING — UNSAVED CHANGES WARNING (June 11, Rafa's UX insight)
Problem Rafa flagged: save button is at the bottom (easy to miss/scroll past); closing the seating modal without saving = lose up to 40 min of guest-assignment work, no warning. Best-practice fix needed.
SOLUTION: dirty-tracking + diplomatic confirm dialog.
- window._seatingDirty flag set true by all 7 change functions (addTable, deleteTable, renameTable, seatClick-remove, assignSeat, seatRemoveGuest, addSeatGuests); reset false on open + after save.
- ✕ button now calls safeCloseSeating() → if dirty, shows dialog; if clean, closes silently (no nagging).
- Dialog (showSeatingCloseDialog): "💾 Save your seating plan? You have unsaved changes." → 3 buttons: "Save & close" (green, saves then closes), "Discard changes" (red), "Keep editing" (gray, dismiss).
- saveSeating now returns true/false + resets dirty flag.
File: 841742 bytes. English only (translate later with rest of seating UI).

---

## ⏸️ PENDING DEPLOY (next session): Unsaved-changes warning (841742)
The unsaved-changes warning feature IS BUILT and verified (compiles clean) but NOT deployed — browser downloads stopped working entirely tonight (file wouldn't land in Downloads at all, even with recursive search). Current LIVE = 839540 (seating works fully, just no close-warning yet).
The ready file is saved as index_with_unsaved_warning_READY.html (841742 bytes) in outputs. Next session: deploy it (download should hopefully work fresh, OR do via in-place edits).
What it adds (all built, just needs deploying): window._seatingDirty tracking on 7 change functions, safeCloseSeating() on ✕ button, diplomatic "Save your seating plan?" dialog (Save & close / Discard / Keep editing), saveSeating resets dirty + returns bool.
LOW PRIORITY: it's polish (prevents accidental data loss), not a bug. Seating works fine without it.

---

## ✅ SEATING — FULL SEAT MANAGEMENT + 2-LEVEL DELETE (June 12, Rafa's UX vision)
Rafa's insight: seating was too static. Organizers (esp. diplomatic/formal events where WHO sits WHERE matters for protocol) need to rearrange freely without deleting tables. Built:

TAP A SEATED GUEST → action menu (showSeatActions):
- ↔️ Move to another seat (seatMove/doSeatMove) — lists all empty seats across all tables, pick destination
- 🔄 Swap with another guest (seatSwap/doSeatSwap) — pick any other seated guest, they trade seats (the critical one)
- 🔒 Lock/unlock seat (seatToggleLock) — locked seat turns GOLD (#C9A84C) + 🔒 icon in chart; locked guests can't be moved/swapped/removed until unlocked (protects head table/VIPs from accidental changes)
- ↩️ Remove from seat (seatRemove) — back to waiting list, table stays

TWO-LEVEL DELETE WARNING (deleteTable → showDeleteTableDialog):
- Level 1 (empty table): gentle "This table is empty, nothing lost"
- Level 2 (table WITH people): strong ⚠️ warning, LISTS the seated guests' names, explains they go to waiting list (not deleted), makes "No, keep the table" the green/safe button. confirmDeleteTable does the actual delete.

All mark _seatingDirty=true (works with unsaved-changes warning). All compile clean. File: 851816 bytes. English only (translate later).

PENDING/NEXT: drag-and-drop seating (Rafa wanted "both menu + drag" — menu built first as reliable mobile foundation; add drag next session on top, test menu first). Also still: graphics polish, seating translations, privacy routing.

---

## 🪑 SEATING SYSTEM — BUILD TASK LIST (June 12, working through one-by-one)
Based on research of top 2025-26 event seating tools (Eventdex, SeatPlanning, RSVPify). Industry standards: drag-drop, conflict-prevention, color groups, auto-distribute, PDF/QR export.

### ✅ TIER 1 — DONE (foundation, already beats many tools)
- [x] Create tables (round/square/rectangle, 2-12 seats)
- [x] Add guests (type + paste + auto-pull event guests)
- [x] Assign guest to seat (tap empty → pick)
- [x] Remove from seat (→ waiting list)
- [x] Move guest to any empty seat (cross-table)
- [x] Swap two guests (cross-table)
- [x] Lock/unlock seat (gold + 🔒, protects VIP/head-table placements)
- [x] Delete table — 2-level warning (empty=gentle, has-people=strong + lists names)
- [x] Stats bar (tables/seats/seated/waiting)
- [x] Save/reload (event_seating collection)
- [x] Unsaved-changes warning on close

### 🔨 TIER 2 — HIGH VALUE (build next, one by one)
- [x] T2.1 — Auto-fill DONE (852896, deployed): teal "✨ Auto-seat all waiting guests (N)" button in waiting box, only shows when guests waiting + empty seats exist, seats in table order, handles not-enough-seats gracefully
- [x] T2.2 — Drag-and-drop DONE (857835): drag waiting-guest CHIP onto a TABLE (big mobile-friendly target, not tiny seats). Pointer Events (mouse+touch), floating ghost label, table highlights green on hover, drops into next open seat. dropGuestOnTable + setupSeatingDrag. Tap-menu still handles seat-to-seat moves/swaps.
- [x] T2.3 — Color groups DONE (879345): 7 built-in groups (Special Guest/VIP/Speaker/Sponsor/Family/Staff/Press) + CUSTOM TAGS (type own e.g. Musician/Donor/Dancer, save/delete, per-event). MULTI-TAG (guest can have several, shown as stacked colored rings). Legend, seat-menu chips, tooltip. PRINT BY TAG (3rd format: clean list per tag with table+seat). guestGroups()/allGroups()/customTags helpers.

### 🔨 TIER 3 — SHORTCUTS (later)
- [x] T3.1 — Clear table DONE (890345): all movable guests → waiting, respects locked seats
- [x] T3.2 — Move whole table DONE (890345): move everyone to a table with enough empty seats, respects locked
- [x] T3.3 — Swap two tables DONE (890345): tables trade all guests, handles different sizes (overflow→waiting)
- [x] T3.4 — Rotate seats DONE (890345): shifts everyone one seat around the table

### 🔨 TIER 4 — OUTPUT (the finale, premium features)
- [ ] T4.1 — Export seating to PDF (print for venue, reuse jsPDF)
- [x] T4.2 — QR seating finder DONE (897020): organizer "📱 Guest QR code" button → saves + shows QR (api.qrserver.com) + copy link + print QR poster. Link = vivaceevents.com/?seat=EVENTID
- [x] T4.3 — Guest-facing view DONE (897020): public no-login route CS=find-seat (?seat=EVENTID param, checked BEFORE login gate in render). findSeatHTML branded page, loadFindSeat loads plan, doFindSeat searches name→shows table+seat big. Firestore event_seating rule changed to allow read:if true (public)

### 🔨 TIER 5 — POLISH
- [ ] T5.1 — Seating UI translations (6 languages)
- [ ] T5.2 — Graphics geometry polish (seat positioning fine-tune)

MATH NOTE: Move + Swap = mathematically complete (any arrangement reachable). Everything else = click-saving shortcuts.

---

## ✅ SEATING — FULL NAMES VISIBLE (June 12, Rafa's UX request)
Problem: initials (RJ/CV) on seats don't tell organizer WHO it is.
SOLUTION (2 ways): (1) full-name list under each table card — color-matched dots, 🔒 for locked, tap name → opens seat menu; (2) SVG <title> tooltip on each seat → hover (desktop) / long-press (mobile) shows full name.
Initials stay on visual chart (clean), full names readable below. Deployed 853772.

---

## ✅ SEATING/EVENTS — "No events" FLASH FIXED (June 12)
Problem: opening Organizer page briefly flashed "No events yet / Create First Event" before events loaded (scary, looked like events gone). Side effect of the async-load timing.
FIX: distinguish loading (window._orgEvents===undefined) from truly-empty ([]). While loading → show "⏳ Loading your events…" + stats show "…". Only show "No events yet" empty state once actually loaded with 0 events. Deployed 854093.

---

## ✅ FIRST-LOAD FLASH FIXED — branded boot splash (June 12)
Problem: on first page load, blank/unstyled flash for a millisecond before JS initialized + render() ran.
FIX: added boot-splash inside #app div — instant "VivaceEvents" branded screen + green spinner (bootspin keyframe), shows immediately, auto-replaced when render() sets el.innerHTML. Professional load like big apps. Deployed 854625.

---

## ✅ SEATING — PRINT/EXPORT PDF + SMART INITIALS + DRAG SCROLL (June 12)
Deployed 868060.

SMART INITIALS (smartInitials helper): first letter of first word + first letter of last word. "Rafael Javadov"→RJ, "Artist 1"→A1, single name→first 2 letters. Applied to seat circles + seat-action avatar. (Other app avatars still use substring(0,2) — only seating updated.)

T4.1 PRINT/EXPORT PDF DONE (openSeatingPrint dialog → generateSeatingPDF, uses jsPDF already loaded):
- Format: Visual layout (draws tables+seats+initials, jsPDF circles/rects) OR Name list (text: Table → Seat N → full name)
- Names toggle (show/hide on visual)
- WHICH TABLES: checkbox per table, pick any combination (all, or 1+3+10, etc.), "select all/none" shortcut
- Branded header (green bar, event title, date), footer (Virtual Studio Orchestra LLC)
- PDF AUTO-OPENS in new tab (window.open blob) so user prints OR saves from their viewer = industry standard; falls back to download if popup blocked
- Math = {any table combo} × {visual|list} × {names on|off}

DRAG AUTO-SCROLL: while dragging a guest near top/bottom edge of modal, auto-scrolls (couldn't reach off-screen tables before). 60px edge zone, 12px/move.

NEXT: T2.3 color groups (VIP/Family/Sponsor tags), T4.2 QR seating finder, T4.3 guest-facing view, then Tier 3 shortcuts + Tier 5 translations.

---

## ✅ SEATING T2.3 COMPLETE — Color groups + custom tags + multi-tag + print-by-tag (June 12, 879345)
- 7 built-in groups: Special Guest (pink #E8419B), VIP (gold), Speaker (purple), Sponsor (blue), Family (red), Staff (teal), Press (orange). SEAT_GROUPS array.
- MULTI-TAG: guest holds an ARRAY (g.groups). Stacked colored rings on seat (radius 14.5+ri*2.5). guestGroups(g) helper normalizes old single g.group → array (backward compat).
- CUSTOM TAGS: user types own (Musician/Donor/Dancer/Magician/etc), auto-assigned color from CUSTOM_TAG_COLORS, stored in window._seating.customTags (per-event, persists on save). addCustomTag (dedupes by label), deleteCustomTag (confirms, removes from all guests). allGroups()=SEAT_GROUPS+customTags. groupById uses allGroups.
- Tag picker (renderGroupPicker): multi-select toggle (toggleSeatGroup), built-in + custom sections, "➕ Create custom tag" input, 🗑️ delete per custom tag. "Done" returns to seat menu.
- Legend at top shows groups in use (allGroups). Seat menu shows all tags as chips. Tooltip lists tags.
- PRINT BY TAG: 3rd print format "🏷️ By tag" → pick which tags (checkboxes w/ counts) → PDF makes color-headed list section per tag ("VIP (5): Name — Table, Seat"). Tables-section vs tags-section toggle in seatPrintFmtUI. PDF visual also draws multi-rings.

🪑 SEATING NOW HAS: tables/shapes, assign/move/swap/lock/remove, auto-fill, drag-drop (+autoscroll), 2-level delete warning, unsaved warning, full names, smart initials (RJ), color groups + custom tags + multi-tag, PDF export (visual/by-table/by-tag, pick any combo). Very feature-complete.

REMAINING seating: Tier 3 shortcuts (clear table, move whole table, swap tables, rotate), T4.2 QR finder, T4.3 guest-facing view, T5 translations + graphics polish.

---

## ✅ SEATING — AUTO-SAVE (Google Docs style) (June 12, 881394)
Rafa lost work by accidentally closing → wanted auto-save. Researched industry standard (debounced auto-save + status indicator is the winning pattern; ~3-5s after last change).
BUILT:
- markDirty() helper replaces all 15 _seatingDirty=true calls → sets dirty + triggers scheduleAutoSave()
- 3-SECOND DEBOUNCE: scheduleAutoSave clears+resets timer on each change (no server hammer); doAutoSave calls saveSeating(true) silent
- STATUS INDICATOR (setSaveStatus) in header: ● Editing… (gray) → ⟳ Saving… (gold) → ✓ Saved (green) / ⚠ Not saved (red)
- AUTO-SAVE TOGGLE (toggleAutoSave) in header: 🟢/⚪ pill, persists via localStorage 'vv_seating_autosave' (default ON)
- saveSeating(silent) param: silent=true skips toast + button text change (for auto-save)
- Manual Save button still works; unsaved-changes warning stays as backup
Result: no more lost work on accidental close. "Fanciest platform" touch.

---

## ✅ SEATING — DEFAULT TAGS + organized sections (June 12, 882148)
Rafa wanted common tags pre-loaded (no typing). Added 5 default PERFORMER tags + reorganized.
SEAT_GROUPS now 13 built-in, picker organized into 2 sections (renderGroupPicker filters by roleIds):
- ROLE: Special Guest, VIP, Speaker, Sponsor, Donor, Family, Staff, Press
- PERFORMER: Musician, Singer, Dancer, MC, Performer
- YOUR CUSTOM TAGS: user-created (Magician, Chef, etc. via ➕ input)
Donor correctly placed in ROLE (Rafa caught it was wrongly under Performer). All multi-select, stackable. Custom-tag creation still available for extras.

---

## ✅ SEATING TIER 3 COMPLETE — table shortcuts (June 12, 890345)
✏️ button now opens TABLE MENU (showTableMenu) instead of just rename. Options:
- ✏️ Rename (renameTable, kept)
- 🔁 Rotate seats (tableRotate) — shifts guest array by 1 (last→first), wraps. Needs 2+ guests.
- ➡️ Move everyone to another table (tableMoveAll/doTableMoveAll) — fills empty seats at destination, respects locked, disables targets without enough room
- 🔄 Swap with another table (tableSwap/doTableSwap) — tables trade all guests, different sizes OK (overflow→waiting)
- 🧹 Clear table (tableClear) — movable guests→waiting, LOCKED seats stay, confirms first
All disable when N/A, all markDirty (auto-save), all respect locks. 

🪑 SEATING STATUS: Tiers 1,2,3 DONE + auto-save + 13 default tags. REMAINING: T4.2 QR finder, T4.3 guest-facing view, T5 translations + graphics polish. Then Event Production Suite Part 2 (Podium/Run-of-Show), Part 3 (Performer Schedule).

---

## ✅ SEATING T4.2 + T4.3 — QR FINDER + GUEST VIEW (June 12, 897020 + rule deploy)
Premium feature (paid tools charge for this). Built together (same feature):
- ORGANIZER: "📱 Guest QR code" button (purple) in seating modal. showSeatingQR saves first (silent), generates QR via api.qrserver.com (no library needed), shows QR + URL + copy-link (copySeatLink) + print-poster (printSeatingQR opens formatted "Find Your Seat" print page).
- GUEST (no login): URL vivaceevents.com/?seat=EVENTID. render() checks CS==='find-seat' BEFORE the !CU login gate (key — guests aren't logged in). findSeatHTML = branded green page. loadFindSeat queries event_seating by eventId. doFindSeat = type name → searches all tables → shows matches with table+seat in big text. No app, no login, works on any phone.
- FIRESTORE RULE: event_seating read changed to "if true" (public) so guests can load. Deployed via firestore:rules. (Privacy note: anyone with the hard-to-guess eventId link can see seating — standard for guest finders.)
- Warnings on deploy (isOwnerEmail unused, request var name) are pre-existing + harmless.

🪑 SEATING NEARLY COMPLETE: Tiers 1,2,3,4 DONE. ONLY T5 LEFT: translations (6 lang) + graphics polish. Then Event Production Suite Part 2 (Podium/Run-of-Show) + Part 3 (Performer Schedule).

---

## ✅ SEATING — QR FINDER PRIVACY FIX (June 12, 899218) — Rafa's insight
Problem Rafa caught: open partial-search let anyone with the QR link fish for names / browse the whole guest list = privacy leak (bad for diplomatic/confidential events).
FIX (always private, default safe): doFindSeat now EXACT full-name match only (g.name===q, not includes). Search on button press / Enter (not live oninput — no leak as they type). Shows only the matching guest's own seat. Message: "Type your full name exactly as on your invitation." Can't discover guest list by typing partial letters.
NOTE for tester: scanning QR while logged in shows YOUR account (app sees login) — must test in Incognito/logged-out to see guest finder.

---

## ✅ SEATING — SECURE PER-GUEST CODES (June 12, 904942) — Rafa's security insight
MAJOR security fix. Rafa caught: name-search let anyone look up anyone's seat by knowing their name = unsafe for diplomatic events. Researched: high-end tools use "unguessable" unique codes per guest (not names).
SOLUTION (always secure, no name search at all):
- gcode() generates 6-char unguessable code (no ambiguous chars: abcdefghjkmnpqrstuvwxyz23456789). ensureGuestCodes() assigns to every seated guest (dedup), runs on showGuestLinks.
- Each guest's code stored as g.code in the plan (persists/saves).
- Personal link = vivaceevents.com/?seat=EVENTID&g=CODE → goes STRAIGHT to that guest's seat (no name typing). render reads ?g= into window._findSeatCode.
- loadFindSeat: if code present → finds guest by g.code, shows ONLY their seat (welcome screen, big table number). If NO code → "🔒 Use your personal link" message (can't browse). If bad code → "seat not found".
- OLD name-search (doFindSeat) removed from flow (function still in file, unused, harmless).
- ORGANIZER: "🔐 Personal guest links" button → showGuestLinks → lists each seated guest + their personal link, copy (copyGuestLink) + share (shareGuestLink) per guest. Generic QR (showSeatingQR) now labeled "for staff/check-in tablet" since guests need personal links.
- Generic /?seat=EVENTID (no code) → secure "use your personal link" screen. event_seating still public-read (needed to load plan), but codes protect individual seats.

⚠️ STILL TO BUILD (Rafa approved BOTH bulk methods — sending 200 links one-by-one is impractical):
- [x] METHOD 1 DONE (907749): 🖨️ PRINT ALL GUEST QR CARDS — printAllGuestCards opens printable sheet, one dashed-border card per guest (Vivace header + name + their personal QR via api.qrserver.com + table). Cut + place on seats. Each QR has guest unique code. Plus shareAllGuestLinks (📤 share full list). Buttons clarified: "🔐 Send guests their seat (secure individual codes)" primary + "📱 General event QR (staff)" secondary.
- METHOD 2 (build after): 📧 EMAIL ALL GUESTS — needs optional email field per guest; one click → each gets personal link via mail collection ("Hi NAME, here's your seat: LINK").
- Individual copy/share already done (for one-off VIPs).

---

## ✅ SEATING — GUEST CONTACTS + BULK SEND (June 12, 913019) — Method 2 done
Rafa's rule built exactly: email→email, phone→WhatsApp, both→both, neither→print card.
- CONTACT FIELDS: seat menu → "📇 Add email/phone" (seatEditContact/saveSeatContact) → g.email + g.phone stored on guest (optional).
- BULK EMAIL: "📧 Email everyone their seat link" (sendAllSeatEmails) → loops guests, emails each one WITH email their OWN secure link via mail collection (branded HTML, "Find my seat" button). Confirms first, shows summary toast: "Sent N emails · X phone-only · Y need cards".
- WHATSAPP: phone-only guests get 💬 button on their row (waGuestLink → wa.me/PHONE?text=...). Free, works today (no paid SMS service).
- Guest rows show 📧/📱 status icons. Removed misleading "Share full list" (leaked privacy).
- Note: real auto-SMS would need Twilio (paid, not set up); WhatsApp tap-link used instead = free + works now.

⚠️ NEXT (Rafa asked, approved direction): BULK CSV/EXCEL UPLOAD for big events (3000 guests). Spreadsheet cols: Name, Email, Phone, Table. Upload → auto-seat + auto-code all at once. App has SheetJS capability. "Spreadsheet IS their folder" — no separate folder system. Pairs with bulk-email = 3000 guests in minutes.

---

## ✅ SEATING — BULK CSV/EXCEL UPLOAD (June 12, 918165)
For big events (3000 guests). Added SheetJS lib (xlsx.full.min.js cdnjs 0.18.5, handles BOTH xlsx + csv).
- "📤 Upload guest list" button in seating waiting-area.
- openGuestUpload dialog: shows column format (Name·Email·Phone·Table), ⬇️ downloadGuestTemplate (CSV template), 📁 file picker (.csv/.xlsx/.xls).
- handleGuestFile: FileReader → XLSX.read → sheet_to_json. processGuestRows: flexible case-insensitive header matching (Name/Guest, Email/Mail, Phone/Mobile/Cell, Table/Table Name). Has Table col → find-or-create table (round, 10 seats, grows +2 if full) + seat there. No table → waiting list. Auto-assigns secure codes later via ensureGuestCodes. Stores email/phone. Summary toast.

⚠️ NEXT 2 FEATURES (Rafa's insight, approved — building event-details FIRST then RSVP):
- FEATURE A — EVENT DETAILS on guest seat page: venue name, full address, date, time, dress code, parking, map link (auto from address), custom notes. Guest's secure link shows seat + ALL info (where/when/how to arrive — "Table 3" alone is useless).
- FEATURE B — RSVP/CONFIRMATION: guest taps Yes/No/Maybe + dietary needs + plus-ones on their page. Saves response. Organizer live dashboard: confirmed/declined/maybe counts + who needs what. Two-way RSVP system.

---

## ✅ SEATING — FEATURE A: EVENT DETAILS on guest page (June 12, 923454)
Rafa caught: "Table 3" alone is useless — guest needs venue/address/time/directions. Also caught DUPLICATION (Create Event form already has Venue+Date).
SOLUTION (no double-typing):
- "📍 Event details" button in seating modal (after stats). openEventDetails dialog: Venue, Address, Date, Time, Building/Floor/Room, Dress code, Parking, Notes. edField() helper. saveEventDetails → window._seating.details{}.
- NO DUPLICATION: openSeating now loads parent event's venue+date (window._seatingEvent from organizer_events). openEventDetails PRE-FILLS venue+date from event ("pulled from your event — edit if needed"). Organizer types venue once (in Create Event), reused here. Only adds EXTRA arrival info.
- GUEST PAGE (loadFindSeat): below table number, shows detailsBlock — 🏛️Venue, 📅When (date·time), 📍Address (+auto Google Maps link), 🚪Building, 👔Dress, 🅿️Parking, Notes. Only shows fields that are filled.

⚠️ NEXT — FEATURE B: RSVP/CONFIRMATION (approved, design locked):
Guest taps Yes/No/Maybe + dietary needs + plus-ones on their seat page → saves response → organizer LIVE DASHBOARD (confirmed/declined/maybe counts + who needs what). Two-way RSVP. Build next.

---

## ✅ SEATING — FEATURE B: TWO-WAY RSVP / CONFIRMATION (June 12, 931821 + rule)
Rafa's insight: organizer needs to know who's coming. Built full two-way RSVP.
GUEST SIDE (on secure seat page, loadFindSeat): "Will you attend?" → ✅Yes / 🤔Maybe / ❌No buttons (setRsvp). Yes/Maybe reveal 🍽️ dietary needs + 👥 plus-ones fields. submitRsvp → setDoc event_rsvp/{eventId_code}. No → saves immediately. loadExistingRsvp pre-fills if they already responded (remembers choice). "✓ Thank you" confirmation after.
ORGANIZER SIDE: "📋 RSVP responses (who's coming)" button in seating → showRsvpDashboard. Loads all event_rsvp for this event. Live count cards: Coming/Maybe/Can't/No-reply (no-reply = totalSeated - responded). "N of M responded · +X extra guests". 🍽️ Dietary needs summary box (for catering). Full lists per category (name + plusOnes + table + dietary).
DATA: event_rsvp collection {eventId, code, name, table, response, dietary, plusOnes, at}. Keyed eventId_code (guest writes own only). Firestore rule: read if true, create/update if true (guests not logged in), delete if signedIn. Deployed via firestore:rules.

🪑 SEATING NOW A COMPLETE EVENT SYSTEM: tables, secure per-guest QR codes, bulk upload, bulk email/WhatsApp, print cards, event details (venue/time/parking/map), two-way RSVP dashboard. Tiers 1-4 + extras all done. REMAINING: T5 translations (6 lang) + graphics polish.
NEXT BIG PIECES (Event Production Suite): Part 2 Podium/Run-of-Show, Part 3 Performer Schedule.

## 🔧 FIX (931816): RSVP dashboard had syntax error — apostrophe in "Can't" template literal broke with bad escaping (\\'). Changed card label to "No". LESSON: apostrophes inside nested template-literal string args are risky; node --check per-script can miss it since it's a runtime parse issue in browser. Avoid apostrophes in inline JS string args within template literals.

## 🔧 UX FIX (932129): Per-guest Copy buttons (in Personal guest links list) had no visual feedback — copy worked but user couldn't tell tap registered. Fixed: copyGuestLink(url,btn) now flashes the tapped button green with "✓ Copied!" for 1.4s then restores. Rafa caught this by behavior. LESSON: every copy/action button needs immediate visible feedback at the point of tap, not just a toast (toast can be missed/behind modal).

## 🔧 IMPORTANT FIX (932416): Guest seat link showed SIGN-IN page / hijacked logged-in users to their dashboard. ROOT CAUSE: onAuthStateChanged set CS=lastScreen, OVERRIDING the find-seat route that window.load had set (timing/override bug). FIX: check ?seat= param at the TOP of onAuthStateChanged — if present, set CS='find-seat', render(), return immediately (before lastScreen logic). Now guest links ALWAYS open the seat page directly — whether viewer is logged out (real guest) OR logged in. Guests NEVER need to sign in/create account. Rafa found this by testing the actual link. CONFIRMED bug, critical for the whole guest-facing feature to work.

---

## 🔐 SECURITY REVIEW (June 12) — see VIVACE_SECURITY_REPORT.md for full details
Did full security audit vs current Firebase/Firestore production standards. Summary:

🔴 CRITICAL — C1: event_seating has `allow read: if true` BUT the plan doc contains every guest's name+email+phone+secret code. Event ID is in every guest QR link (?seat=EVENTID), so anyone with ONE guest link can fetch the whole doc = harvest entire guest list + contacts + all codes. THIS SILENTLY DEFEATS the secure per-guest-code system. FIX: split — full plan owner-only; create separate minimal public per-code lookup doc {name,table,seat,eventId} (no contacts, no other guests); event details in separate public event_public/{eventId}. Guest page reads only their own code's doc.

🟠 HIGH:
- H1: event_rsvp `allow read,write: if true` — anyone can read ALL rsvps (names/dietary/coming) or spam/overwrite fake ones. Fix together with C1 (same data-exposure pattern). Enforce doc id = eventId_code matches body; route writes via Cloud Function ideally.
- H2: mail collection `create if signedIn` no from-check — user could queue arbitrary emails (spam/phish via our domain). Add createdBy check / move to Cloud Function.
- H3: VERIFY STORAGE RULES in Firebase console (separate from Firestore, often forgotten) — must NOT be `if true`.

🟡 MEDIUM:
- M1 connections read,write if signedIn (any user overwrites any) — scope to participants.
- M2 notifications create if signedIn (spam anyone) — validate recipient.
- M3 meta write if signedIn (counter tamper) — Cloud Function/transaction.
- M4 lessons/giftCodes/invites/stripeWaitlist broad signedIn — tighten to owner.
- M5 XSS: ~218 innerHTML uses, guest names/dietary/notes/CSV NOT escaped — malicious name like <img onerror> runs on organizer/guest screen. Add escapeHtml() helper, wrap all user input.

🟢 GOOD (already right): no exposed secrets (Stripe/AudD server-side; firebase apiKey public by design = correct); users_private owner-only (stops contact harvest); owner-scoped rules on most collections; default-deny fallback match /{document=**} if false; clever email-matched placeholder-claim pattern (rosterMembers/event_guests); standard Firebase auth; no eval.

RECOMMENDED ORDER: 1) C1 + H1 together (same architectural fix — split public per-code lookup from private full plan; ~30-45min). 2) H3 storage console check (5min). 3) H2 mail. 4) M5 escapeHtml. 5) M1-M4 tighten broad rules.

OPS REMINDERS: rotate Stripe secret (~June 13); reset FB App Secret (pasted in chat earlier); enable Firebase App Check before launch; restrict Firebase API key in GCP console.
NOTE: not a pen-test substitute; recommend professional pen-test before large/diplomatic public launch.

---

## ✅ SECURITY FIX C1 + H1 (June 12, 933620 + rules) — CRITICAL hole closed
Fixed the public-plan data exposure. Architecture split:
- event_seating (full plan + all contacts + all codes) → NOW PRIVATE: read only if signedIn && organizerId==auth.uid.
- NEW seat_lookup/{eventId}_{code}: PUBLIC but minimal — ONLY {eventId,organizerId,code,name,table,seat}. One doc per guest. No email/phone, no other guests, no full plan. Guest page reads ONLY their own code's doc (getDoc by exact id).
- NEW event_public/{eventId}: PUBLIC but only {details} (venue/time/parking — invitation-safe). Guest page reads details from here.
- publishSeatLookup() runs inside saveSeating(): writes event_public + one seat_lookup doc per coded guest (Promise.all). Re-runs every save so moves/edits update automatically.
- loadFindSeat REWRITTEN: no longer reads event_seating plan. Reads seat_lookup/{eventId_code} for seat + event_public/{eventId} for details. No code → "use personal link". Bad code → "seat not found".
- H1 RSVP: rule split allow get:if true (single doc by unguessable id — guest reads own prior answer) vs allow list:if signedIn (only organizer queries all — no public harvest). create/update requires rsvpId==eventId+'_'+code (can't spam arbitrary docs).
MIGRATION: existing events saved under old system need ONE re-save (Send guests their seat / Save) to publish seat_lookup + event_public docs. Told Rafa to re-save "jan".
KNOWN MINOR: removed guests leave stale seat_lookup doc (harmless, points to old seat) — could add cleanup later.
STILL TODO from security report: H2 (mail from-check), H3 (verify Storage rules in console), M1-M4 (tighten broad signedIn rules), M5 (escapeHtml for XSS). C1+H1 were the big ones.

---

## ✅ RSVP RECEIPT + NO-ACCIDENTAL-SUBMIT FIX (June 13, 936029)
Rafa caught: RSVP submitted without clear choice (the "No" button auto-submitted instantly = accidental send) AND no receipt/proof of what was sent.
FIXES:
- REMOVED auto-submit on "No" (was the bug). Now NO answer sends until user deliberately taps "Send my response".
- "Send my response" button DISABLED (greyed, opacity 0.5) until a choice (yes/maybe/no) is tapped — setRsvp enables it. No surprise sends.
- DATED RECEIPT (showRsvpReceipt): after send (or on reopening link), shows "✓ Your response is recorded" + answer label (✅ Yes attending / 🤔 Maybe / ❌ Not attending) + plus-ones + dietary + "Recorded on June 12, 2026 at 3:45 PM" (fmtRsvpDate) + "Change my response" button (editRsvp).
- loadExistingRsvp now calls showRsvpReceipt so returning guests SEE their current answer + date = proof/record for disputes.
- Decision: guests CAN change answer anytime (fair — plans change), but every change re-timestamped (record always reflects current truth + when).

---

## ✅ STRIPE KEY ROTATED (June 13) — DONE
Old sk_live_...osOC rotated. New key set via `firebase functions:secrets:set STRIPE_SECRET`, redeployed all 8 payment functions (createSubscription, createConnectAccount, chargeVerification, changeSubscription, cancelSubscription, createGigPayment, getConnectStatus, createCheckoutSession), old secret version removed. Final key never exposed in chat (was rolled one extra time after an interim key got pasted). Payments running on clean new key. ✅

## 🔄 RESUME POINT FOR NEXT CHAT (June 13)
LATEST DEPLOYED: index.html = 936029 (RSVP receipt + no-accidental-submit fix, deployed + live).
ALL WORKING: secure seating (C1+H1 fixed), secure per-guest links, bulk upload, bulk email/WhatsApp, print QR cards, event details, two-way RSVP with dated receipt.

NEXT TASKS (in priority order):
1. CACHE-FRESHNESS FIX (firebase.json cache-control headers) — so guests ALWAYS get latest version, no hard-refresh. NEED to see current firebase.json first (run: Get-Content firebase.json). Rafa's single-file PWA; SW (firebase-messaging-sw.js) is push-only, does NOT cache app. Fix = set index.html Cache-Control no-cache so browser always revalidates.
2. Remaining SECURITY items from VIVACE_SECURITY_REPORT.md: H2 (mail from-check), H3 (VERIFY Storage rules in Firebase console — not in repo), M1 (connections scope), M2 (notifications recipient), M3 (meta counter), M4 (broad signedIn rules), M5 (escapeHtml for XSS — ~218 innerHTML, wrap guest names/dietary/notes/CSV).
3. Then big features: T5 translations (6 lang) + graphics polish; Event Production Suite Part 2 (Podium/Run-of-Show), Part 3 (Performer Schedule).

DEPLOY WORKFLOW REMINDER: Claude shares ONE index_final.html via present_files → Rafa downloads → Copy-Item to project folder (PathNotFound error is HARMLESS, browser saves direct) → verify size number → git add/commit/push + firebase deploy --only hosting. Two-file deploys (when rules change) add firestore.rules + deploy --only hosting,firestore:rules. ALWAYS node --check all scripts before shipping. Rafa uses voice-to-text (interpret charitably), QAs by behavior, catches real bugs, tires easily — lead the plan, one file+command at a time, visual mockups before/with deploys.
