// app/page.tsx
"use client";

import { useState } from "react";

/* ================= EDIT THESE DETAILS ================= */

const COMPANY = "Aliyar Travel & Tours";
const TAGLINE = "Your Journey, Our Care.";
const WHATSAPP_NUMBER = "923151962909"; // country code + number, no + or spaces (e.g. 923001234567)
const PHONE_DISPLAY = "+923364800273";
const EMAIL = "Aliyartravel@gmail.com";
const ADDRESS = "Office LG-11 & 22 Lower Ground,Pakland Business Center,I-8 Markaz,islamabad, Pakistan";

const SERVICES = [
  { icon: "🕋", title: "Umrah & Hajj", copy: "Guided packages with visa, flights, hotels and transport arranged for you." },
  { icon: "🏔️", title: "Tour Packages", copy: "Northern Pakistan and international tours planned around your budget." },
  { icon: "✈️", title: "Flight Tickets", copy: "Domestic and international flight bookings at competitive fares." },
  { icon: "🛂", title: "Visa Assistance", copy: "Guidance and document support for your visa application." },
  { icon: "🏨", title: "Hotel Booking", copy: "Comfortable stays matched to your travel plan and budget." },
  { icon: "🚐", title: "Transport", copy: "Airport transfers and private transport for groups and families." },
];

// Sample packages: replace titles, durations and prices with the real ones.
const PACKAGES = [
  { name: "Umrah Package", place: "Makkah & Madinah", duration: "Duration on request", price: "Price on request", from: "from-emerald-700 to-teal-500", icon: "🕋" },
  { name: "Hunza & Skardu Tour", place: "Gilgit-Baltistan", duration: "Duration on request", price: "Price on request", from: "from-sky-700 to-cyan-400", icon: "🏔️" },
  { name: "Swat & Kalam Tour", place: "Khyber Pakhtunkhwa", duration: "Duration on request", price: "Price on request", from: "from-green-700 to-lime-500", icon: "🌲" },
  { name: "Dubai Tour", place: "United Arab Emirates", duration: "Duration on request", price: "Price on request", from: "from-amber-600 to-orange-400", icon: "🌆" },
  { name: "Turkey Tour", place: "Istanbul & Cappadocia", duration: "Duration on request", price: "Price on request", from: "from-rose-700 to-orange-500", icon: "🎈" },
  { name: "Malaysia Tour", place: "Kuala Lumpur & Langkawi", duration: "Duration on request", price: "Price on request", from: "from-indigo-700 to-sky-500", icon: "🏝️" },
];

const WHY = [
  { title: "Personal Guidance", copy: "Talk directly to our team and get a plan that fits your needs." },
  { title: "Clear Pricing", copy: "We share package details and costs up front, so there are no surprises." },
  { title: "End-to-End Support", copy: "From booking to return, we help with the details in between." },
  { title: "Easy to Reach", copy: "Message us on WhatsApp and get a reply without the runaround." },
];

const STEPS = [
  { n: "01", title: "Tell us your plan", copy: "Share where you want to go, when and how many travellers." },
  { n: "02", title: "Get your package", copy: "We send you options and pricing that match your budget." },
  { n: "03", title: "Confirm & travel", copy: "We finalise bookings and documents, and you enjoy the trip." },
];

// Placeholder reviews: replace with real, permitted customer feedback.
const REVIEWS = [
  { name: "Sample Customer A", text: "Smooth booking and helpful staff throughout our trip." },
  { name: "Sample Customer B", text: "Clear communication and a well organised itinerary." },
  { name: "Sample Customer C", text: "Quick replies on WhatsApp made planning easy." },
];

const FAQS = [
  { q: "How do I book a package?", a: "Send us an enquiry through the form or WhatsApp. We'll confirm availability and share the details." },
  { q: "Do you help with visas?", a: "Yes, we guide you on the documents required and assist with the application process. Approval is up to the issuing authority." },
  { q: "Can you create a custom trip?", a: "Yes. Tell us your destination, dates, budget and group size and we'll plan around them." },
  { q: "What payment methods do you accept?", a: "Payment options are confirmed when we discuss your booking. [Update with real payment methods.]" },
  { q: "How early should I book?", a: "The earlier the better, especially for Umrah, peak season and group travel." },
];

const DESTINATIONS = ["Umrah / Hajj", "Hunza & Skardu", "Swat & Kalam", "Dubai", "Turkey", "Malaysia", "Flight Tickets", "Visa Assistance", "Other"];

/* ====================================================== */

const NAV = ["Home", "Services", "Packages", "Why Us", "Reviews", "Contact"];
const slug = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, "-");

function waLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function Heading({ tag, title, sub }: { tag: string; title: string; sub?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <span className="text-xs font-semibold tracking-[0.22em] uppercase text-[#1B7F9E]">{tag}</span>
      <h2 className="font-serif text-3xl md:text-5xl font-semibold text-[#0B2A4A] mt-2">{title}</h2>
      {sub && <p className="mt-3 text-[#14202B]/75">{sub}</p>}
    </div>
  );
}

export default function Page() {
  const [menu, setMenu] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", service: DESTINATIONS[0], date: "", travellers: "1", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (form.name.trim().length < 3) er.name = "Enter your full name.";
    if (!/^[+\d][\d\s-]{8,14}$/.test(form.phone.trim())) er.phone = "Enter a valid phone number.";
    if (+form.travellers < 1 || +form.travellers > 100) er.travellers = "Enter 1 or more travellers.";
    setErrors(er);
    if (Object.keys(er).length) return;

    const msg =
      `Hello ${COMPANY}! I'd like to enquire:\n\n` +
      `Name: ${form.name.trim()}\nPhone: ${form.phone.trim()}\nInterested in: ${form.service}\n` +
      `Travel date: ${form.date || "Not decided"}\nTravellers: ${form.travellers}\n` +
      (form.notes.trim() ? `Notes: ${form.notes.trim()}\n` : "");
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  const input =
    "w-full min-h-[48px] px-4 py-3 rounded-xl border border-[#0B2A4A]/15 bg-white text-[#14202B] focus:outline-none focus:ring-2 focus:ring-[#1B7F9E]";
  const btnPrimary =
    "inline-flex items-center justify-center min-h-[48px] px-7 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#0B2A4A] text-white hover:bg-[#1B7F9E] transition";
  const btnGold =
    "inline-flex items-center justify-center min-h-[48px] px-7 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#D9A441] text-[#0B2A4A] hover:brightness-95 transition";

  return (
    <div className="min-h-screen bg-[#FBF7EF] text-[#14202B] overflow-x-hidden scroll-smooth">
      {/* header */}
      <header className="sticky top-0 z-50 bg-[#FBF7EF]/90 backdrop-blur border-b border-[#0B2A4A]/10">
        <div className="max-w-6xl mx-auto h-[72px] px-6 flex items-center gap-6">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-full bg-[#0B2A4A] text-[#D9A441] grid place-items-center text-lg">✈</span>
            <span className="font-serif font-semibold text-xl text-[#0B2A4A] leading-tight">
              Aliyar<span className="block text-[10px] tracking-[0.3em] uppercase font-sans text-[#1B7F9E]">Travel &amp; Tours</span>
            </span>
          </a>
          <nav
            className={`${menu ? "flex" : "hidden"} md:flex flex-col md:flex-row absolute md:static top-[72px] left-0 right-0 bg-[#FBF7EF] md:bg-transparent px-6 pb-4 md:p-0 border-b md:border-0 border-[#0B2A4A]/10 md:mx-auto gap-0 md:gap-7 text-sm font-medium`}
          >
            {NAV.map((n) => (
              <a key={n} href={`#${slug(n)}`} onClick={() => setMenu(false)} className="py-3 md:py-0 hover:text-[#1B7F9E]">
                {n}
              </a>
            ))}
          </nav>
          <div className="ml-auto md:ml-0 flex items-center gap-2">
            <a href={waLink(`Hello ${COMPANY}! I'd like some travel information.`)} target="_blank" rel="noopener noreferrer" className={`hidden sm:inline-flex ${btnGold}`}>
              WhatsApp us
            </a>
            <button aria-label="Menu" aria-expanded={menu} onClick={() => setMenu((v) => !v)} className="md:hidden w-11 h-11 grid place-items-center text-[#0B2A4A] text-2xl">
              {menu ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* hero */}
        <section id="home" className="relative overflow-hidden bg-gradient-to-br from-[#0B2A4A] via-[#124A6F] to-[#1B7F9E] text-white">
          <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-white/5" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#D9A441]/10 -translate-x-1/3 translate-y-1/3" />
          <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs tracking-[0.25em] uppercase text-[#D9A441] font-semibold">Travel agency</span>
              <h1 className="font-serif text-4xl md:text-6xl font-semibold leading-[1.1] mt-3 mb-5">
                Explore the world with {COMPANY}
              </h1>
              <p className="text-lg text-white/85 max-w-md">
                Umrah, tours, flights, visas and hotels, all arranged by a team that cares about your journey.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <a href="#packages" className={btnGold}>View packages</a>
                <a href="#contact" className="inline-flex items-center justify-center min-h-[48px] px-7 rounded-full text-xs font-semibold tracking-widest uppercase border border-white/60 hover:bg-white/10 transition">
                  Plan my trip
                </a>
              </div>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-4">
              {[["🕋", "Umrah"], ["🏔️", "Northern Tours"], ["🌆", "Dubai"], ["✈️", "Flights"]].map(([i, t], k) => (
                <div key={t} className={`rounded-3xl bg-white/10 backdrop-blur border border-white/15 p-6 ${k % 2 ? "translate-y-6" : ""}`}>
                  <div className="text-4xl mb-3">{i}</div>
                  <div className="font-serif text-xl">{t}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* services */}
        <section id="services" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <Heading tag="What we do" title="Our Services" sub="Everything you need for a smooth trip, in one place." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((s) => (
                <div key={s.title} className="bg-white rounded-3xl p-8 border border-[#0B2A4A]/10 shadow-sm hover:-translate-y-1.5 hover:shadow-xl transition">
                  <div className="w-14 h-14 rounded-2xl bg-[#0B2A4A]/5 grid place-items-center text-3xl mb-5">{s.icon}</div>
                  <h3 className="font-serif text-xl font-semibold text-[#0B2A4A] mb-2">{s.title}</h3>
                  <p className="text-sm text-[#14202B]/75">{s.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* packages */}
        <section id="packages" className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <Heading tag="Popular" title="Featured Packages" sub="Sample packages. Message us for current dates, itineraries and pricing." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PACKAGES.map((p) => (
                <article key={p.name} className="rounded-3xl overflow-hidden border border-[#0B2A4A]/10 shadow-sm hover:-translate-y-1.5 hover:shadow-xl transition bg-[#FBF7EF]">
                  <div className={`h-44 bg-gradient-to-br ${p.from} grid place-items-center text-6xl`}>{p.icon}</div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold text-[#0B2A4A]">{p.name}</h3>
                    <p className="text-sm text-[#1B7F9E] font-medium mb-1">{p.place}</p>
                    <p className="text-sm text-[#14202B]/70">{p.duration}</p>
                    <div className="flex items-center justify-between mt-5">
                      <span className="font-semibold text-[#0B2A4A]">{p.price}</span>
                      <a
                        href={waLink(`Hello ${COMPANY}! I'm interested in the ${p.name}. Please share details and pricing.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold tracking-widest uppercase px-5 py-3 rounded-full bg-[#0B2A4A] text-white hover:bg-[#1B7F9E] transition"
                      >
                        Enquire
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* why us */}
        <section id="why-us" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <Heading tag="Why choose us" title={`Why ${COMPANY}?`} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY.map((w, i) => (
                <div key={w.title} className="rounded-3xl p-7 bg-[#0B2A4A] text-white">
                  <div className="text-[#D9A441] font-serif text-3xl mb-3">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="font-serif text-xl mb-2">{w.title}</h3>
                  <p className="text-sm text-white/75">{w.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* steps */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <Heading tag="Simple process" title="How It Works" />
            <div className="grid md:grid-cols-3 gap-10 text-center">
              {STEPS.map((s) => (
                <div key={s.n}>
                  <div className="w-20 h-20 mx-auto mb-5 rounded-full border-2 border-dashed border-[#1B7F9E] grid place-items-center font-serif text-2xl text-[#1B7F9E]">{s.n}</div>
                  <h3 className="font-serif text-xl font-semibold text-[#0B2A4A] mb-1">{s.title}</h3>
                  <p className="text-sm text-[#14202B]/75 max-w-xs mx-auto">{s.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* reviews */}
        <section id="reviews" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <Heading tag="Reviews" title="What Travellers Say" />
            <p className="text-center text-xs text-[#8A6A4A] -mt-8 mb-10">Sample placeholder reviews. Replace with real customer feedback.</p>
            <div className="grid md:grid-cols-3 gap-6">
              {REVIEWS.map((r) => (
                <figure key={r.name} className="bg-white rounded-3xl p-8 border border-[#0B2A4A]/10 shadow-sm m-0">
                  <div className="text-[#D9A441] tracking-widest">★★★★★</div>
                  <p className="font-serif italic text-lg my-3">&ldquo;{r.text}&rdquo;</p>
                  <figcaption className="text-sm font-semibold text-[#0B2A4A]">{r.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 bg-gradient-to-r from-[#0B2A4A] to-[#1B7F9E] text-center text-white">
          <h2 className="font-serif text-3xl md:text-5xl font-semibold mb-4">Ready for your next journey?</h2>
          <p className="max-w-lg mx-auto mb-8 text-white/85">Tell us where you want to go and we'll take care of the rest.</p>
          <a href={waLink(`Hello ${COMPANY}! I'd like to plan a trip.`)} target="_blank" rel="noopener noreferrer" className={btnGold}>
            Chat on WhatsApp
          </a>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <Heading tag="FAQ" title="Frequently Asked Questions" />
            {FAQS.map((f) => (
              <details key={f.q} className="group border-b border-[#0B2A4A]/10 py-2">
                <summary className="cursor-pointer list-none py-4 flex justify-between gap-4 font-serif text-lg font-semibold text-[#0B2A4A]">
                  {f.q}
                  <span className="text-2xl leading-none transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="pb-4 text-[#14202B]/80">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* contact + enquiry */}
        <section id="contact" className="py-24 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <span className="text-xs font-semibold tracking-[0.22em] uppercase text-[#1B7F9E]">Contact</span>
              <h2 className="font-serif text-3xl md:text-5xl font-semibold text-[#0B2A4A] mt-2 mb-5">Plan Your Trip With Us</h2>
              <p className="mb-6 text-[#14202B]/80">Send an enquiry and our team will reply on WhatsApp with options and pricing.</p>
              <ul className="space-y-3">
                <li className="flex gap-3"><span>📞</span>{PHONE_DISPLAY}</li>
                <li className="flex gap-3"><span>📧</span>{EMAIL}</li>
                <li className="flex gap-3"><span>📍</span>{ADDRESS}</li>
                <li className="flex gap-3"><span>🕘</span>Office hours: update here</li>
              </ul>
              <p className="text-xs text-[#8A6A4A] mt-4">Contact details are placeholders. Replace them at the top of the file.</p>
            </div>

            <form onSubmit={submit} noValidate className="bg-white rounded-3xl p-7 md:p-9 border border-[#0B2A4A]/10 shadow-xl">
              {sent ? (
                <div className="text-center py-8">
                  <h3 className="font-serif text-3xl font-semibold text-[#0B2A4A] mb-3">Thank you! ✈️</h3>
                  <p className="mb-5">WhatsApp should have opened with your enquiry. Press send there and we'll reply shortly.</p>
                  <button type="button" onClick={() => setSent(false)} className={btnPrimary}>New enquiry</button>
                </div>
              ) : (
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" htmlFor="n">Full name</label>
                    <input id="n" className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" />
                    <span className="block text-xs text-red-700 min-h-[1em] mt-1">{errors.name}</span>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" htmlFor="p">Phone number</label>
                    <input id="p" type="tel" className={input} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} autoComplete="tel" placeholder="03XX XXXXXXX" />
                    <span className="block text-xs text-red-700 min-h-[1em] mt-1">{errors.phone}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-semibold mb-1.5" htmlFor="s">Interested in</label>
                      <select id="s" className={input} value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                        {DESTINATIONS.map((d) => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-semibold mb-1.5" htmlFor="d">Travel date</label>
                      <input id="d" type="date" className={input} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" htmlFor="t">Travellers</label>
                    <input id="t" type="number" min={1} className={input} value={form.travellers} onChange={(e) => setForm({ ...form, travellers: e.target.value })} />
                    <span className="block text-xs text-red-700 min-h-[1em] mt-1">{errors.travellers}</span>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" htmlFor="m">Notes (optional)</label>
                    <textarea id="m" rows={3} className={input} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                  </div>
                  <button type="submit" className={`${btnPrimary} w-full`}>Send enquiry on WhatsApp</button>
                  <p className="text-xs text-center text-[#14202B]/60">Opens WhatsApp with your details pre-filled. Nothing is stored on this site.</p>
                </div>
              )}
            </form>
          </div>
        </section>
      </main>

      {/* footer */}
      <footer className="bg-[#0B2A4A] text-white/85 px-6 pt-16 pb-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <p className="font-serif text-2xl text-white mb-2">{COMPANY}</p>
            <p className="max-w-sm text-sm">{TAGLINE}</p>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-[#D9A441] mb-3">Quick links</h4>
            {NAV.map((n) => <a key={n} href={`#${slug(n)}`} className="block py-1 text-sm hover:text-white">{n}</a>)}
          </div>
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-[#D9A441] mb-3">Follow</h4>
            {["Facebook", "Instagram", "TikTok"].map((s) => <a key={s} href="#contact" className="block py-1 text-sm hover:text-white">{s}</a>)}
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/10 text-xs text-white/60">
          © 2026 {COMPANY}. All Rights Reserved.
        </div>
      </footer>

      {/* floating whatsapp */}
      <a
        href={waLink(`Hello ${COMPANY}! I'd like some travel information.`)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-lg hover:scale-105 transition text-2xl"
      >
        💬
      </a>
    </div>
  );
}