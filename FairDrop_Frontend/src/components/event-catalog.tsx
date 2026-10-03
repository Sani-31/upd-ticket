"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BusFront, CalendarDays, Clapperboard, Drama, Music2, Search, Trophy } from "lucide-react";
import { EventCard } from "@/components/event-card";
import { api, getApiError } from "@/lib/api";
import { events, FairDropEvent, normalizeApiEvent } from "@/lib/events";

const categories = [
  { label: "Movies", query: "Movies", icon: Clapperboard, color: "text-[#f43f68] bg-[#fff0f3]" },
  { label: "Events", query: "Live music", icon: CalendarDays, color: "text-[#8039dc] bg-[#f4eefe]" },
  { label: "Plays", query: "Theatre", icon: Drama, color: "text-[#e98216] bg-[#fff4e5]" },
  { label: "Sports", query: "Sports", icon: Trophy, color: "text-[#1fa876] bg-[#eaf8f1]" },
  { label: "Concerts", query: "Live music", icon: Music2, color: "text-[#1688da] bg-[#eaf5ff]" },
  { label: "Activities", query: "Travel", icon: BusFront, color: "text-[#8039dc] bg-[#f4eefe]" },
];

export function EventCatalog({ fullPage = false, homePage = false }: { fullPage?: boolean; homePage?: boolean }) {
  const [query, setQuery] = useState("");
  const [catalog, setCatalog] = useState<FairDropEvent[]>(events);
  const [catalogMessage, setCatalogMessage] = useState("Preview listings · live availability is confirmed by the FairDrop API.");

  useEffect(() => {
    setQuery(new URLSearchParams(window.location.search).get("q") ?? "");
    let active = true;
    api.get<unknown>("/events")
      .then(({ data }) => {
        if (!active) return;
        if (!Array.isArray(data)) throw new Error("The events API returned an unexpected catalogue.");
        const liveEvents = data.map(normalizeApiEvent).filter((event): event is FairDropEvent => event !== undefined);
        setCatalog(liveEvents);
        setCatalogMessage(liveEvents.length ? "Live events · current listings from the FairDrop API." : "No events are currently available.");
      })
      .catch((error: unknown) => {
        if (active) setCatalogMessage(`${getApiError(error)} Showing preview listings.`);
      });
    return () => { active = false; };
  }, []);

  const filteredEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return catalog;
    return catalog.filter((event) =>
      [event.title, event.category, event.venue, event.date].some((value) => value.toLowerCase().includes(normalizedQuery)),
    );
  }, [catalog, query]);

  if (homePage) {
    const topEvents = filteredEvents.slice(0, 5);
    const recommendations = filteredEvents.length > 1 ? filteredEvents.slice(1, 6) : filteredEvents;
    return (
      <>
        <section aria-labelledby="top-events-heading">
          <div className="flex items-center justify-between gap-3">
            <h2 id="top-events-heading" className="text-[18px] font-bold tracking-tight text-[#1c2637]">Top Events</h2>
            <Link href="/events" className="text-[11px] font-semibold text-[#ed174c] hover:underline">See All <span aria-hidden="true">→</span></Link>
          </div>
          <p className="mt-0.5 text-[10px] text-[#77808c]">{catalogMessage}</p>
          {topEvents.length ? (
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
              {topEvents.map((event) => <EventCard compact event={event} key={event.id} />)}
            </div>
          ) : (
            <p className="mt-3 rounded-xl border border-[#e6eae6] bg-white p-8 text-center text-sm text-[#6c7772]">No experiences match “{query}”. Try a different search.</p>
          )}
        </section>

        <section aria-labelledby="categories-heading" className="mt-5">
          <div className="flex items-center justify-between gap-3">
            <h2 id="categories-heading" className="text-[16px] font-bold tracking-tight text-[#1c2637]">Explore by Category</h2>
            <Link href="/events" className="text-[11px] font-semibold text-[#ed174c] hover:underline">See All <span aria-hidden="true">→</span></Link>
          </div>
          <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map(({ label, query: categoryQuery, icon: Icon, color }) => (
              <Link href={`/events?q=${encodeURIComponent(categoryQuery)}`} key={label} className="flex min-h-[52px] items-center gap-2.5 rounded-lg border border-[#e9ebef] bg-white px-3 text-[11px] font-semibold text-[#303949] transition-colors hover:border-[#f2a2b4] hover:bg-[#fffafb]">
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${color}`}><Icon size={17} /></span>{label}
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="recommended-heading" className="mt-5">
          <div className="flex items-center justify-between gap-3">
            <h2 id="recommended-heading" className="text-[16px] font-bold tracking-tight text-[#1c2637]">Recommended for You</h2>
            <Link href="/events" className="text-[11px] font-semibold text-[#ed174c] hover:underline">See All <span aria-hidden="true">→</span></Link>
          </div>
          {recommendations.length ? (
            <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
              {recommendations.map((event) => <EventCard compact event={event} key={`recommended-${event.id}`} />)}
            </div>
          ) : <p className="mt-3 text-sm text-[#6c7772]">No recommendations are available right now.</p>}
        </section>
      </>
    );
  }

  return (
    <>
      {fullPage ? (
        <div className="mt-6 flex max-w-md items-center gap-2 rounded-xl border border-[#e6eae6] bg-white px-3 py-2 text-[#6c7772]">
          <Search size={16} aria-hidden="true" />
          <input className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-[#858e89]" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search events, places or categories" aria-label="Search events, places or categories" />
        </div>
      ) : null}
      <p className="mt-2 text-sm text-[#6c7772]">{catalogMessage}</p>
      {filteredEvents.length ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEvents.map((event) => <EventCard event={event} key={event.id} />)}
        </div>
      ) : (
        <p className="mt-5 rounded-xl border border-[#e6eae6] bg-white p-8 text-center text-sm text-[#6c7772]">No experiences match “{query}”. Try a different search.</p>
      )}
    </>
  );
}
