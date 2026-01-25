import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Clock, FileText } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const supabase = await createServerSupabaseClient();

  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_published", true)
    .order("start_date", { ascending: true });

  const list = events || [];

  const formatDateTime = (value: string | null) =>
    value ? new Date(value).toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    }) : "";

  const formatTime = (value: string | null) =>
    value ? new Date(value).toLocaleTimeString("en-US", { 
      hour: "2-digit", 
      minute: "2-digit" 
    }) : "";

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader title="Events" breadcrumbs={[{ label: "Events" }]} />

      <section className="py-[40px] sm:py-[60px] md:py-[80px]">
        <div className="container mx-auto px-[15px] max-w-6xl">
          <div className="mb-[24px] sm:mb-[28px] md:mb-[32px]">
            <h2 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 mb-[8px]">Assembly Events</h2>
            <p className="text-gray-600 text-[13px] sm:text-[14px] md:text-[15px]">
              Meetings, community durbars, public hearings, and outreach programmes.
            </p>
          </div>

          {error && (
            <div className="mb-[20px] sm:mb-[24px] md:mb-[30px] p-[14px] sm:p-[16px] md:p-[18px] rounded-lg bg-red-50 border border-red-200 text-red-700 text-[12px] sm:text-[13px] md:text-[14px]">
              Failed to load events: {error.message}
            </div>
          )}

          {list.length === 0 ? (
            <div className="text-center text-gray-600 py-[40px] sm:py-[50px] md:py-[60px] lg:py-[80px] text-[14px] sm:text-[15px] md:text-[16px]">
              No upcoming events have been published yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] sm:gap-[24px] md:gap-[28px] lg:gap-[32px]">
              {list.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative h-[150px] sm:h-[180px] md:h-[200px] lg:h-[240px] overflow-hidden">
                    {event.image_url ? (
                      <Image
                        src={event.image_url}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#8B0000] to-[#6B0000] flex items-center justify-center">
                        <Calendar className="w-[40px] sm:w-[48px] md:w-[56px] h-[40px] sm:h-[48px] md:h-[56px] text-white/50" />
                      </div>
                    )}
                  </div>
                  <div className="p-[16px] sm:p-[18px] md:p-[20px] lg:p-[24px]">
                    <h3 className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-bold text-gray-900 mb-[12px] sm:mb-[14px] line-clamp-2 group-hover:text-[#8B0000] transition-colors leading-[1.3] sm:leading-[1.4]">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-[13px] sm:text-[14px] md:text-[15px] mb-[14px] sm:mb-[16px] line-clamp-2 leading-[1.5] sm:leading-[1.6]">
                      {event.description}
                    </p>
                    <div className="space-y-[10px] sm:space-y-[12px] text-[12px] sm:text-[13px] md:text-[14px] text-gray-600">
                      <div className="flex items-center gap-[8px] sm:gap-[10px]">
                        <Calendar className="w-[16px] sm:w-[17px] md:w-[18px] h-[16px] sm:h-[17px] md:h-[18px] text-[#8B0000] shrink-0" />
                        <span>{formatDateTime(event.start_date)}</span>
                      </div>
                      {event.venue && (
                        <div className="flex items-center gap-[8px] sm:gap-[10px]">
                          <Clock className="w-[16px] sm:w-[17px] md:w-[18px] h-[16px] sm:h-[17px] md:h-[18px] text-[#8B0000] shrink-0" />
                          <span className="line-clamp-1">{event.venue}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-[8px] sm:gap-[10px]">
                          <MapPin className="w-[16px] sm:w-[17px] md:w-[18px] h-[16px] sm:h-[17px] md:h-[18px] text-[#8B0000] shrink-0" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

