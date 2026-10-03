import Link from "next/link";
import { ArrowRight, CircleDollarSign, LockKeyhole, ShieldCheck, Shuffle, Ticket } from "lucide-react";
import { EventCatalog } from "@/components/event-catalog";

const principles = [
  { icon: Shuffle, title: "A fair place in line", copy: "Eligible fans are randomized at sale time. Refreshing faster won't move anyone forward." },
  { icon: LockKeyhole, title: "Seats held securely", copy: "Transactional reservations and automatic expiry protect real-time seat availability." },
  { icon: CircleDollarSign, title: "A clear mock checkout", copy: "Try the payment flow safely. No real card details and no live payment provider." },
];

export default function HomePage() {
  return (
    <main>
      <section aria-label="Featured experience" className="mx-auto mt-3 grid max-w-[1320px] gap-3 px-4 sm:px-5 lg:grid-cols-[minmax(0,1fr)_230px]">
        <div role="img" aria-label="A crowd at a live concert" className="hero-banner relative flex min-h-[290px] items-center overflow-hidden rounded-lg bg-cover bg-center sm:min-h-[310px]" style={{ backgroundImage: 'url("/images/concert.jpg")' }}>
          <div className="hero-overlay absolute inset-0" />
          <div className="relative z-10 max-w-[570px] px-6 py-9 text-white sm:px-10">
            <span className="inline-flex rounded-md bg-[#ed174c] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">A fairer way to get in</span>
            <h1 className="mt-3 text-[34px] font-extrabold leading-[1.05] tracking-[-1.5px] sm:text-[42px]">Live music.<br />Without the scramble.</h1>
            <p className="mt-2 max-w-[390px] text-sm leading-5 text-white/85">Find the next big moment, join fairly, and book with confidence.</p>
            <Link href="/events" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#ed174c] px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#d51040]">Explore events <ArrowRight size={15} /></Link>
          </div>
          <span className="absolute bottom-4 left-1/2 hidden h-1.5 w-1.5 rounded-full bg-white sm:block" aria-hidden="true" />
        </div>

        <aside className="promo-panel relative flex min-h-[190px] flex-col justify-center overflow-hidden rounded-lg bg-cover bg-center p-5 text-white lg:min-h-[310px]" style={{ backgroundImage: 'url("/images/concert.jpg")' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-[#071321]/95 via-[#071321]/80 to-[#071321]/50" />
          <div className="relative">
            <p className="flex items-center gap-1.5 text-sm font-extrabold"><Ticket className="text-[#ff315e]" size={16} /> FairDrop</p>
            <h2 className="mt-4 text-xl font-extrabold leading-tight">Fair tickets.<br />For everyone.</h2>
            <ul className="mt-3 space-y-2 text-[11px] text-white/90">
              <li className="flex items-center gap-2"><Shuffle size={13} /> Randomized queues</li>
              <li className="flex items-center gap-2"><ShieldCheck size={13} /> Bot protection</li>
              <li className="flex items-center gap-2"><LockKeyhole size={13} /> Secure booking</li>
              <li className="flex items-center gap-2"><CircleDollarSign size={13} /> No overselling</li>
            </ul>
            <Link href="/#how-it-works" className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/60 px-3.5 py-1.5 text-[11px] font-semibold hover:bg-white/10">How it works <ArrowRight size={13} /></Link>
          </div>
        </aside>
      </section>

      <section id="discover" className="mx-auto max-w-[1320px] px-4 pt-5 sm:px-5">
        <EventCatalog homePage />
      </section>

      <section id="how-it-works" className="mx-auto max-w-[1320px] px-4 pb-3 pt-9 sm:px-5">
        <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div><p className="text-[11px] font-bold uppercase tracking-[.1em] text-forest">BUILT FOR THE MOMENTS THAT MATTER</p><h2 className="mt-2 text-2xl font-bold leading-tight tracking-[-1px]">Fair by design.<br />Clear at every step.</h2><p className="mt-3 max-w-[410px] text-sm text-[#6c7772]">FairDrop puts a thoughtful experience around high-demand booking—and gives the server the final say on access, seats and payment.</p></div>
          <div className="grid gap-3 sm:grid-cols-3">
            {principles.map(({ icon: Icon, title, copy }) => <article key={title} className="rounded-xl border border-[#e6eae6] bg-white p-4 shadow-card"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#fff0f3] text-forest"><Icon size={18} /></span><h3 className="mt-3 text-sm font-bold">{title}</h3><p className="mt-2 text-xs leading-5 text-[#6c7772]">{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="mx-auto mb-8 mt-8 max-w-[1320px] px-4 sm:px-5">
        <div className="flex flex-col gap-4 rounded-xl border border-[#f2dbe1] bg-[#fff6f8] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-3"><span className="mt-1 text-forest"><ShieldCheck size={21} /></span><div><h2 className="font-bold">Your place is yours.</h2><p className="mt-1 max-w-[670px] text-sm text-[#52665b]">Queue order, seat inventory, reservation limits and payment confirmation are all verified by the backend—not by the browser.</p></div></div>
          <Link href="/admin" className="shrink-0 text-sm font-semibold text-forest hover:underline">Operations overview <ArrowRight className="ml-1 inline" size={15} /></Link>
        </div>
      </section>
    </main>
  );
}
