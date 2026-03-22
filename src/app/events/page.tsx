import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import EventPopup from "@/components/EventPopup";
import PaginationNav from "@/components/shared/PaginationNav";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Clock } from "lucide-react";
import { createPublicServerSupabaseClient } from "@/lib/supabase/public-server";
import EventsPageClient from "@/components/events-page-client";
import { getSlug } from "@/lib/content-utils";

export const dynamic = "force-dynamic";

const EVENTS_PER_PAGE = 9;

interface EventRecord {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string | null;
  start_date: string;
  end_date?: string | null;
  venue: string | null;
  location: string | null;
  status?: string | null;
}

interface EventsPageProps {
  searchParams: Promise<{ page?: string }>;
}

function formatDateTime(value: string | null) {
  return value
    ? new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
}

function getEventStatus(event: EventRecord) {
  if (event.status) {
    return event.status;
  }

  const now = new Date();
  const start = new Date(event.start_date);
  const end = event.end_date ? new Date(event.end_date) : start;

  if (end < now) return "past";
  if (start <= now && end >= now) return "ongoing";
  return "upcoming";
}

function getEventSortValue(event: EventRecord) {
  const status = getEventStatus(event);
  const start = new Date(event.start_date).getTime();

  if (status === "ongoing") return { rank: 0, time: start };
  if (status === "upcoming") return { rank: 1, time: start };
  return { rank: 2, time: -start };
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const supabase = createPublicServerSupabaseClient();

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_published", true)
    .order("start_date", { ascending: true });

  const sortedEvents = ((data as EventRecord[] | null) || []).sort((left, right) => {
    const leftValue = getEventSortValue(left);
    const rightValue = getEventSortValue(right);

    if (leftValue.rank !== rightValue.rank) {
      return leftValue.rank - rightValue.rank;
    }

    return leftValue.time - rightValue.time;
  });

  const totalPages = Math.max(1, Math.ceil(sortedEvents.length / EVENTS_PER_PAGE));
  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
  const pagedEvents = sortedEvents.slice(startIndex, startIndex + EVENTS_PER_PAGE);

  return (
    <main className="min-h-screen bg-white">
      <EventsPageClient navbar={<Navbar />}>
        <PageHeader title="Events" breadcrumbs={[{ label: "Events" }]} />
        <EventPopup />

        <section className="py-[44px] sm:py-[64px] md:py-[88px]">
          <div className="container mx-auto max-w-6xl px-[15px]">
            <div className="mb-[24px] rounded-[28px] border border-gray-100 bg-[linear-gradient(180deg,#ffffff,#faf7f1)] px-5 py-6 shadow-[0_14px_30px_rgba(15,23,42,0.06)] sm:mb-[28px] sm:px-7 md:mb-[32px]">
              <h2 className="mb-[8px] text-[22px] font-bold text-gray-900 sm:text-[26px] md:text-[28px] lg:text-[32px]">
                Events Archive
              </h2>
              <p className="text-readable max-w-3xl text-[13px] text-gray-600 sm:text-[14px] md:text-[15px]">
                Browse ongoing, upcoming, and past Assembly events page by page so
                you can find meetings, programmes, and community activities faster.
              </p>
            </div>

            {error ? (
              <div className="mb-[20px] rounded-lg border border-red-200 bg-red-50 p-[14px] text-[12px] text-red-700 sm:mb-[24px] sm:p-[16px] sm:text-[13px] md:mb-[30px] md:p-[18px] md:text-[14px]">
                Failed to load events: {error.message}
              </div>
            ) : null}

            {pagedEvents.length === 0 ? (
              <div className="rounded-lg border border-gray-200 bg-gray-50 py-[40px] text-center text-[14px] text-gray-600 sm:py-[50px] sm:text-[15px] md:py-[60px] md:text-[16px]">
                No events available at the moment.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 sm:gap-[24px] md:gap-[28px] lg:grid-cols-3 lg:gap-[32px]">
                  {pagedEvents.map((event) => {
                    const status = getEventStatus(event);

                    return (
                      <Link
                        key={event.id}
                        href={`/events/${getSlug(event.title, event.slug) || event.id}`}
                        className="surface-card group relative overflow-hidden rounded-2xl transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(16,24,40,0.14)]"
                      >
                        <div className="absolute right-3 top-3 z-10">
                          {status === "ongoing" ? (
                            <span className="inline-block rounded-full bg-green-600 px-3 py-1 text-xs text-white">
                              Ongoing
                            </span>
                          ) : status === "upcoming" ? (
                            <span className="inline-block rounded-full bg-blue-600 px-3 py-1 text-xs text-white">
                              Upcoming
                            </span>
                          ) : (
                            <span className="inline-block rounded-full bg-gray-500 px-3 py-1 text-xs text-white">
                              Past
                            </span>
                          )}
                        </div>

                        <div className="relative h-[150px] overflow-hidden sm:h-[180px] md:h-[200px] lg:h-[240px]">
                          {event.image_url ? (
                            <Image
                              src={event.image_url}
                              alt={event.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#8B0000] to-[#6B0000]">
                              <Calendar className="h-[40px] w-[40px] text-white/50 sm:h-[48px] sm:w-[48px] md:h-[56px] md:w-[56px]" />
                            </div>
                          )}
                        </div>

                        <div className="p-[16px] sm:p-[18px] md:p-[20px] lg:p-[24px]">
                          <h3 className="mb-[12px] line-clamp-2 text-[16px] font-bold leading-[1.3] text-gray-900 transition-colors group-hover:text-[#8B0000] sm:mb-[14px] sm:text-[17px] sm:leading-[1.4] md:text-[18px] lg:text-[20px]">
                            {event.title}
                          </h3>
                          <p className="text-readable mb-[14px] line-clamp-3 text-[13px] leading-[1.65] text-gray-600 sm:mb-[16px] sm:text-[14px] md:text-[15px]">
                            {event.description}
                          </p>
                          <div className="space-y-[10px] text-[12px] text-gray-600 sm:space-y-[12px] sm:text-[13px] md:text-[14px]">
                            <div className="flex items-center gap-[8px] sm:gap-[10px]">
                              <Calendar className="h-[16px] w-[16px] shrink-0 text-[#8B0000] sm:h-[17px] sm:w-[17px] md:h-[18px] md:w-[18px]" />
                              <span>{formatDateTime(event.start_date)}</span>
                            </div>
                            {event.venue ? (
                              <div className="flex items-center gap-[8px] sm:gap-[10px]">
                                <Clock className="h-[16px] w-[16px] shrink-0 text-[#8B0000] sm:h-[17px] sm:w-[17px] md:h-[18px] md:w-[18px]" />
                                <span className="line-clamp-1">{event.venue}</span>
                              </div>
                            ) : null}
                            {event.location ? (
                              <div className="flex items-center gap-[8px] sm:gap-[10px]">
                                <MapPin className="h-[16px] w-[16px] shrink-0 text-[#8B0000] sm:h-[17px] sm:w-[17px] md:h-[18px] md:w-[18px]" />
                                <span className="line-clamp-1">{event.location}</span>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <PaginationNav
                  basePath="/events"
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </>
            )}
          </div>
        </section>

        <Footer />
      </EventsPageClient>
    </main>
  );
}
