import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Phone, Mail, ArrowLeft, Clock, User, Building2, Tag } from "lucide-react";
import { notFound } from "next/navigation";
import { createPublicServerSupabaseClient } from "@/lib/supabase/public-server";
import { getSlug } from "@/lib/content-utils";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = createPublicServerSupabaseClient();

  const { data: directMatch, error: directMatchError } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true);

  const event =
    directMatch?.[0] ||
    (
      await supabase
        .from("events")
        .select("*")
        .eq("is_published", true)
    ).data?.find(
      (item) => item.id === slug || getSlug(item.title, item.slug) === slug
    );

  if ((directMatchError && !directMatch) || !event) {
    notFound();
  }

  const formatDateTime = (value: string | null) =>
    value ? new Date(value).toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    }) : "";

  const formatTime = (value: string | null) =>
    value ? new Date(value).toLocaleTimeString("en-US", { 
      hour: "2-digit", 
      minute: "2-digit",
      timeZone: "UTC"
    }) : "";

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="Events"
        breadcrumbs={[
          { label: "Events", href: "/events" },
          { label: event.title },
        ]}
      />

      <section className="py-[40px] sm:py-[60px] md:py-[80px]">
        <div className="container mx-auto px-[15px] max-w-5xl">
          <Link
            href="/events"
            className="inline-flex items-center gap-[8px] sm:gap-[10px] text-[#8B0000] font-semibold mb-[24px] sm:mb-[28px] md:mb-[32px] hover:underline text-[13px] sm:text-[14px] md:text-[15px] transition-colors"
          >
            <ArrowLeft className="w-[16px] sm:w-[17px] md:w-[18px] h-[16px] sm:h-[17px] md:h-[18px]" />
            Back to Events
          </Link>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Show a notice if the event is in the past (use end_date if present) or a "Happening now" badge when ongoing */}
            {(() => {
              const refDate = event.end_date || event.start_date;
              if (refDate) {
                const end = new Date(refDate);
                const start = new Date(event.start_date);
                const now = new Date();
                if (end < now) {
                  return (
                    <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
                      <strong>Note:</strong> This event has passed on {formatDateTime(refDate)}.
                    </div>
                  );
                }
                if (start <= now && end >= now) {
                  return (
                    <div className="p-4 bg-green-50 border-l-4 border-green-400 text-green-700">
                      <strong>Happening now:</strong> This event is currently in progress.
                    </div>
                  );
                }
              }
              return null;
            })()}
            {event.image_url && (
              <div className="relative h-[250px] sm:h-[320px] md:h-[400px] lg:h-[500px] w-full overflow-hidden">
                <Image
                  src={event.image_url}
                  alt={event.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
            <div className="p-[20px] sm:p-[24px] md:p-[32px] lg:p-[40px]">
              <h1 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-bold text-gray-900 mb-[16px] sm:mb-[20px] md:mb-[24px] leading-[1.2] sm:leading-[1.3]">
                {event.title}
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] sm:gap-[20px] md:gap-[24px] mb-[24px] sm:mb-[28px] md:mb-[32px] pb-[24px] sm:pb-[28px] md:pb-[32px] border-b border-gray-200">
                <div className="flex items-start gap-[10px] sm:gap-[12px]">
                  <Calendar className="w-[18px] sm:w-[20px] md:w-[22px] h-[18px] sm:h-[20px] md:h-[22px] text-[#8B0000] shrink-0 mt-[2px]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-600 mb-[2px]">Start Date & Time</p>
                    <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-900 font-semibold">
                      {formatDateTime(event.start_date)}
                      {event.start_date && <span className="ml-[8px]">{formatTime(event.start_date)}</span>}
                    </p>
                  </div>
                </div>
                {event.end_date && (
                  <div className="flex items-start gap-[10px] sm:gap-[12px]">
                    <Clock className="w-[18px] sm:w-[20px] md:w-[22px] h-[18px] sm:h-[20px] md:h-[22px] text-[#8B0000] shrink-0 mt-[2px]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-600 mb-[2px]">End Date & Time</p>
                      <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-900 font-semibold">
                        {formatDateTime(event.end_date)}
                        {event.end_date && <span className="ml-[8px]">{formatTime(event.end_date)}</span>}
                      </p>
                    </div>
                  </div>
                )}
                {event.event_type && (
                  <div className="flex items-start gap-[10px] sm:gap-[12px]">
                    <Tag className="w-[18px] sm:w-[20px] md:w-[22px] h-[18px] sm:h-[20px] md:h-[22px] text-[#8B0000] shrink-0 mt-[2px]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-600 mb-[2px]">Event Type</p>
                      <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-900 font-semibold capitalize">{event.event_type.replace(/-/g, " ")}</p>
                    </div>
                  </div>
                )}
                {event.location && (
                  <div className="flex items-start gap-[10px] sm:gap-[12px]">
                    <MapPin className="w-[18px] sm:w-[20px] md:w-[22px] h-[18px] sm:h-[20px] md:h-[22px] text-[#8B0000] shrink-0 mt-[2px]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-600 mb-[2px]">Location</p>
                      <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-900 font-semibold line-clamp-2">{event.location}</p>
                    </div>
                  </div>
                )}
                {event.venue && (
                  <div className="flex items-start gap-[10px] sm:gap-[12px]">
                    <Building2 className="w-[18px] sm:w-[20px] md:w-[22px] h-[18px] sm:h-[20px] md:h-[22px] text-[#8B0000] shrink-0 mt-[2px]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-600 mb-[2px]">Venue</p>
                      <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-900 font-semibold line-clamp-2">{event.venue}</p>
                    </div>
                  </div>
                )}
                {event.organizer && (
                  <div className="flex items-start gap-[10px] sm:gap-[12px]">
                    <Building2 className="w-[18px] sm:w-[20px] md:w-[22px] h-[18px] sm:h-[20px] md:h-[22px] text-[#8B0000] shrink-0 mt-[2px]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-600 mb-[2px]">Organizer</p>
                      <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-900 font-semibold">{event.organizer}</p>
                    </div>
                  </div>
                )}
                {event.contact_person && (
                  <div className="flex items-start gap-[10px] sm:gap-[12px]">
                    <User className="w-[18px] sm:w-[20px] md:w-[22px] h-[18px] sm:h-[20px] md:h-[22px] text-[#8B0000] shrink-0 mt-[2px]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-600 mb-[2px]">Contact Person</p>
                      <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-900 font-semibold">{event.contact_person}</p>
                    </div>
                  </div>
                )}
                {event.contact_phone && (
                  <div className="flex items-start gap-[10px] sm:gap-[12px]">
                    <Phone className="w-[18px] sm:w-[20px] md:w-[22px] h-[18px] sm:h-[20px] md:h-[22px] text-[#8B0000] shrink-0 mt-[2px]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-600 mb-[2px]">Phone</p>
                      <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-900 font-semibold">{event.contact_phone}</p>
                    </div>
                  </div>
                )}
                {event.contact_email && (
                  <div className="flex items-start gap-[10px] sm:gap-[12px]">
                    <Mail className="w-[18px] sm:w-[20px] md:w-[22px] h-[18px] sm:h-[20px] md:h-[22px] text-[#8B0000] shrink-0 mt-[2px]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-600 mb-[2px]">Email</p>
                      <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-900 font-semibold break-all">{event.contact_email}</p>
                    </div>
                  </div>
                )}
              </div>

              {event.description && (
                <div className="mb-[24px] sm:mb-[28px] md:mb-[32px] p-[16px] sm:p-[20px] md:p-[24px] bg-gray-50 border-l-[4px] border-[#8B0000] rounded">
                  <p className="text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] font-semibold text-gray-900 leading-[1.6] sm:leading-[1.7]">
                    {event.description}
                  </p>
                </div>
              )}

              {event.content && (
                <div className="pt-[24px] sm:pt-[28px] md:pt-[32px] border-t-[2px] border-gray-200">
                  <h2 className="text-[18px] sm:text-[20px] md:text-[22px] font-bold text-gray-900 mb-[16px] sm:mb-[20px] md:mb-[24px]">Event Details</h2>
                  <div className="space-y-[16px] sm:space-y-[20px] md:space-y-[24px]">
                    {event.content
                      .split("\n\n")
                      .map((paragraph: string, index: number) => (
                        <p key={index} className="text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] text-gray-700 leading-[1.6] sm:leading-[1.7]">
                          {paragraph}
                        </p>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

