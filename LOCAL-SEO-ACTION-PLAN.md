# Royal Beauty Salon — Warsaw Local SEO / GEO Action Plan

Practical checklist to rank in Warsaw and turn traffic into bookings.
Items marked **[BLOCKED]** need real data from the client before I can wire
them into the site.

---

## 0. Before anything: real content (highest impact)

Fake content destroys trust (and can get structured data penalised). These
are currently **stock/placeholder** and must be replaced with real assets:

| What | Where | Status |
| --- | --- | --- |
| Team photos | `AboutExtras.tsx` (Kinjal / Kiran / Darpan) | **[BLOCKED]** need real photos + real names/roles/bios |
| Testimonials | `frontend/src/data/content.ts` (5 people, stock avatars) | **[BLOCKED]** real Google reviews or remove |
| Gallery | `content.ts` (12 Unsplash images) | **[BLOCKED]** real salon photos (Cloudinary) |
| Service images | MongoDB seed (`backend/scripts/seed-data.ts`) | verify each image is the real service |
| "Hair Consultation" price | seed: `price: 1` | **[BLOCKED]** real price |
| Stats | `content.ts` (2K+ clients, 3 experts) | confirm counts |

**Never invent** reviews, awards, or numbers. Real > impressive.

---

## 1. NAP consistency (critical for local pack)

Same Name / Address / Phone everywhere, byte-for-byte.

- **[BLOCKED] Postal code conflict:** `frontend/src/lib/site.ts` says
  `04-028 Warszawa`, `backend/src/lib/site.ts` says `03-770 Warszawa`.
  Confirm the correct one and I'll sync both.
- **[BLOCKED] Confirm domain:** code uses `royalbeautysaloon.com` ("saloon").
- **[BLOCKED] Confirm GPS:** currently `52.2545, 21.0538`.
- **[BLOCKED] Confirm hours:** Mon, Wed–Sun 11:00–18:00 (Tue closed).
- **[BLOCKED] Confirm socials:** IG / FB / TikTok / YouTube `@royalbeautywarsaw`.

---

## 2. Google Business Profile (GBP) — your #1 local lever

- [ ] Claim & verify the profile.
- [ ] Primary category: **Beauty Salon**. Secondary: Hair Salon, Makeup Artist,
      Nail Salon, Skin Care Clinic, Waxing Service (only ones you truly offer).
- [ ] Business description: mention city + main services naturally.
- [ ] Add every service with a description (use your real price list).
- [ ] Correct hours, phone, website (use the canonical www domain), booking link.
- [ ] Upload 20+ real photos (interior, team, before/after). Re-upload weekly.
- [ ] Post weekly (offers, new services, before/afters).
- [ ] Fill the Q&A section yourself with common questions (use your `faqs`).
- [ ] Turn on messaging (or route to WhatsApp).
- [ ] Link the booking flow as the primary CTA.

### Reviews engine (drives both ranking + conversion)
- [ ] Ask **every** client at checkout (QR code at the desk).
- [ ] Follow-up SMS/WhatsApp ~1 day after the visit with the review link.
- [ ] Reply to **every** review within 48h (mention service + city naturally).
- [ ] Never buy fake reviews.

---

## 3. Citations & directories (NAP consistency)

Submit the identical NAP to each. Track the URL + login.

**Global / maps**
- [ ] Google Business Profile
- [ ] Apple Business Connect (Apple Maps)
- [ ] Bing Places

**Poland-specific**
- [ ] Panorama Firm (panoramafirm.pl)
- [ ] Oferteo
- [ ] Nawigo (nawigo.pl)
- [ ] iLocal / Firmy.net
- [ ] PKD / CEIDG listing (if applicable)
- [ ] Booksy (big demand + reviews source)
- [ ] Znany Lekarz / skincare booking platforms

**Social profiles (set city + website link)**
- [ ] Instagram, Facebook Page, TikTok, YouTube

---

## 4. On-page / technical (mostly done)

- [x] AI-crawler allowlist (`robots.ts`)
- [x] `/llms.txt` + `/llms-full.txt`
- [x] LocalBusiness / WebSite / Service / FAQ / Breadcrumb JSON-LD
- [x] 46+ Polish + district landing pages
- [x] Sitemap, canonicals, hreflang
- [x] Conversion tracking (GA4 + Meta pixel events)
- [x] Mobile call / WhatsApp / book CTAs
- [ ] **[BLOCKED]** real photos on every service + landing page
- [ ] Polish copy review for real search terms (optional)

---

## 5. Paid (fastest path to sales)

- [ ] Google Ads: high-intent terms — `manicure Warszawa cena`,
      `hydrafacial Warszawa`, `przedłużanie rzęs Warszawa`.
- [ ] Meta/Instagram Ads: real before/after + first-visit offer.
- [ ] Set up conversions to track `book_success` calls in Ads.

---

## 6. Measurement

- [x] GA4 page_view on every route (App Router aware)
- [x] Events: `book_open`, `book_success`, `whatsapp_click`, `call_click`, `contact_click`
- [ ] Set `NEXT_PUBLIC_GA_ID` in Vercel + mark key events as Conversions in GA4
- [ ] Set `NEXT_PUBLIC_FB_PIXEL_ID` in Vercel
- [ ] Review GBP insights + GA4 weekly

### Where events fire (for Google Ads / GA4 conversions)
| Event | Triggers |
| --- | --- |
| `book_open` | any "Book" button (nav, CTA bands, sticky bar, service pages) |
| `book_success` | booking submitted successfully (value + currency PLN) |
| `whatsapp_click` | every WhatsApp CTA |
| `call_click` | every `tel:` link |
| `contact_click` | contact form submit + contact cards |
