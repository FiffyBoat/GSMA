"use client";

import { useEffect, useState } from "react";
import { X, Calendar, MapPin, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import { getSlug } from "@/lib/content-utils";

interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string | null;
  start_date: string;
  end_date?: string | null;
  venue: string | null;
  location: string | null;
}

interface EventPopupProps {
  onOpen?: (isOpen: boolean) => void;
}

type EventStatus = "upcoming" | "ongoing" | "past";

function getEventStatus(event: Event, now: Date): EventStatus {
  const start = new Date(event.start_date);
  const end = event.end_date ? new Date(event.end_date) : start;

  if (start > now) {
    return "upcoming";
  }

  if (end >= now) {
    return "ongoing";
  }

  return "past";
}

function getDaysLeft(startDate: string, now: Date): number {
  const eventDate = new Date(startDate);
  const eventDay = new Date(eventDate);
  const today = new Date(now);

  eventDay.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const timeDiff = eventDay.getTime() - today.getTime();
  return Math.max(0, Math.ceil(timeDiff / (1000 * 3600 * 24)));
}

function pickFeaturedEvent(events: Event[], now: Date) {
  const relevantEvents = events
    .map((event) => ({
      event,
      status: getEventStatus(event, now),
    }))
    .filter(({ status }) => status !== "past")
    .sort((left, right) => {
      const leftStart = new Date(left.event.start_date).getTime();
      const rightStart = new Date(right.event.start_date).getTime();
      return leftStart - rightStart;
    });

  return relevantEvents[0] ?? null;
}

export default function EventPopup({ onOpen }: EventPopupProps) {
  const [event, setEvent] = useState<Event | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [eventStatus, setEventStatus] = useState<EventStatus | null>(null);
  const [daysLeft, setDaysLeft] = useState<number>(0);

  useEffect(() => {
    const fetchUpcomingEvent = async () => {
      try {
        const response = await fetch("/api/content/events");
        const data = await response.json();

        if (!Array.isArray(data.data) || data.data.length === 0) {
          return;
        }

        const now = new Date();
        const featuredEvent = pickFeaturedEvent(data.data, now);

        if (!featuredEvent) {
          return;
        }

        setEvent(featuredEvent.event);
        setEventStatus(featuredEvent.status);

        if (featuredEvent.status === "upcoming") {
          setDaysLeft(getDaysLeft(featuredEvent.event.start_date, now));
        } else {
          setDaysLeft(0);
        }

        setIsOpen(true);
        onOpen?.(true);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    void fetchUpcomingEvent();
  }, [onOpen]);

  const handleClose = () => {
    setIsOpen(false);
    onOpen?.(false);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!event || !isOpen) {
    return null;
  }

  const badgeLabel =
    eventStatus === "ongoing" ? "Ongoing Event" : "Upcoming Event";
  const badgeClasses =
    eventStatus === "ongoing"
      ? "bg-gradient-to-r from-emerald-600 to-emerald-700"
      : "bg-gradient-to-r from-blue-600 to-blue-700";

  return (
    <>
      {isOpen ? (
        <div
          className="fixed inset-x-0 bottom-0 top-[74px] z-[850] bg-black/20 backdrop-blur-xs transition-opacity duration-300 sm:top-[82px] md:top-[114px] lg:top-[118px]"
          onClick={handleClose}
        />
      ) : null}

      {isOpen ? (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 top-[74px] z-[900] overflow-y-auto p-2 sm:top-[82px] sm:p-4 md:top-[114px] md:p-6 lg:top-[118px]">
          <div className="flex min-h-full items-start justify-center">
            <div className="pointer-events-auto max-h-[calc(100vh-90px)] w-full max-w-2xl overflow-y-auto rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-2xl transition-transform duration-300 animate-in fade-in zoom-in sm:max-h-[calc(100vh-110px)] md:max-h-[calc(100vh-140px)]">
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 z-10 rounded-lg p-2 transition-all hover:scale-110 hover:bg-red-50"
                aria-label="Close popup"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>

              {event.image_url ? (
                <div className="relative flex h-[200px] items-center justify-center overflow-hidden bg-gray-100 sm:h-[250px] md:h-[320px]">
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="h-full w-full object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 animate-spin text-yellow-300" />
                    <span
                      className={`inline-block rounded-full px-4 py-2 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 ${badgeClasses}`}
                    >
                      {badgeLabel}
                    </span>
                  </div>

                  {eventStatus === "upcoming" && daysLeft > 0 ? (
                    <div className="absolute bottom-4 right-4 rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-lg animate-pulse">
                      {daysLeft} day{daysLeft !== 1 ? "s" : ""} left!
                    </div>
                  ) : null}
                </div>
              ) : null}

              <div className="p-6 sm:p-8">
                <h2 className="mb-2 bg-gradient-to-r from-[#8B0000] to-red-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                  {event.title}
                </h2>

                <div className="mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-[#8B0000] to-yellow-400" />

                {event.description ? (
                  <p className="mb-6 text-sm font-medium leading-relaxed text-gray-700 sm:text-base">
                    {event.description}
                  </p>
                ) : null}

                <div className="mb-8 space-y-4 rounded-xl border border-gray-200 bg-gray-100/50 p-5">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-[#8B0000] p-2">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-600 sm:text-sm">
                        Date & Time
                      </p>
                      <p className="text-sm font-bold text-gray-900 sm:text-base">
                        {formatDateTime(event.start_date)}
                      </p>
                      <p className="text-sm font-semibold text-[#8B0000]">
                        Time: {formatTime(event.start_date)}
                      </p>
                    </div>
                  </div>

                  {event.venue ? (
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-[#8B0000] p-2">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-600 sm:text-sm">
                          Venue
                        </p>
                        <p className="text-sm font-bold text-gray-900 sm:text-base">
                          {event.venue}
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {event.location ? (
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-[#8B0000] p-2">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-600 sm:text-sm">
                          Location
                        </p>
                        <p className="text-sm font-bold text-gray-900 sm:text-base">
                          {event.location}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <Link
                    href={`/events/${getSlug(event.title, event.slug) || event.id}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#8B0000] to-red-700 px-6 py-3 text-center text-sm font-bold text-white transition-all hover:scale-105 hover:from-[#6B0000] hover:to-red-800 hover:shadow-lg sm:py-4 sm:text-base"
                  >
                    <Sparkles className="h-5 w-5" />
                    View Event Details
                  </Link>
                  <button
                    onClick={handleClose}
                    className="flex-1 rounded-lg border-2 border-gray-300 px-6 py-3 text-center text-sm font-bold text-gray-700 transition-all hover:border-[#8B0000] hover:bg-red-50 hover:text-[#8B0000] sm:flex-none sm:py-4 sm:text-base"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
