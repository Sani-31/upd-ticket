"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, ChevronDown, Clapperboard, MapPin, Music2, Search, Ticket, Trophy, Drama } from "lucide-react";
import { useEffect, useState } from "react";

const navigation = [
  { label: "Movies", href: "/events?q=Movies", icon: Clapperboard },
  { label: "Events", href: "/events?q=Live%20music", icon: CalendarDays },
  { label: "Plays", href: "/events?q=Theatre", icon: Drama },
  { label: "Sports", href: "/events?q=Sports", icon: Trophy },
  { label: "Activities", href: "/events?q=Travel", icon: Ticket },
  { label: "Concerts", href: "/events?q=Live%20music", icon: Music2 },
];

export function SiteHeader() {
  const [search, setSearch] = useState("");
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const syncSession = () => setSignedIn(Boolean(window.localStorage.getItem("fairdrop:access-token")));
    syncSession();
    window.addEventListener("storage", syncSession);
    window.addEventListener("fairdrop:auth-change", syncSession);
    return () => {
      window.removeEventListener("storage", syncSession);
      window.removeEventListener("fairdrop:auth-change", syncSession);
    };
  }, []);

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = search.trim();
    window.location.href = query ? `/?q=${encodeURIComponent(query)}#discover` : "/#discover";
  }

  function signOut() {
    window.localStorage.removeItem("fairdrop:access-token");
    window.dispatchEvent(new Event("fairdrop:auth-change"));
    window.location.assign("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#e9ebef] bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-[54px] max-w-[1320px] items-center gap-5 px-4 sm:px-5">
        <Link className="flex shrink-0 items-center gap-2 text-[20px] font-extrabold tracking-[-.7px]" href="/" aria-label="FairDrop home">
          <Ticket className="text-[#ed174c]" size={26} strokeWidth={2.8} />
          FairDrop
        </Link>
        <form onSubmit={submitSearch} className="ml-2 hidden max-w-[520px] flex-1 items-center gap-2 rounded-full border border-[#e7e9ed] bg-[#f8f9fb] px-3 py-1.5 text-[#6c7772] sm:flex">
          <Search size={16} aria-hidden="true" />
          <input className="w-full bg-transparent text-[12px] text-ink outline-none placeholder:text-[#858e89]" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search for Movies, Events, Plays, Sports and Activities" aria-label="Search experiences" />
        </form>
        <div className="ml-auto hidden shrink-0 items-center gap-5 text-[12px] text-[#252c38] md:flex">
          <span className="flex items-center gap-1.5 font-semibold"><MapPin size={14} /> Pune <ChevronDown size={12} /></span>
          <Link href="/#how-it-works" className="hover:text-[#ed174c]">Offers</Link>
          <Link href="/#discover" className="hover:text-[#ed174c]">Gift Cards</Link>
        </div>
        {signedIn ? <button className="shrink-0 text-[12px] font-semibold text-[#ed174c]" onClick={signOut}>Sign out</button> : <Link className="shrink-0 rounded-md bg-[#ed174c] px-3 py-1.5 text-[11px] font-bold text-white hover:bg-[#d51040]" href="/login">Sign in / Register <ArrowRight className="ml-1 inline" size={12} aria-hidden="true" /></Link>}
      </div>
      <nav aria-label="Browse categories" className="flex gap-6 overflow-x-auto border-t border-[#f0f1f3] px-4 text-[11px] text-[#343b47] sm:px-5">
        {navigation.map(({ icon: Icon, ...item }) => <Link className="nav-link" href={item.href} key={item.label}><Icon className="mr-1.5 sm:hidden" size={14} />{item.label}</Link>)}
      </nav>
    </header>
  );
}
