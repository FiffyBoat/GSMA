import Footer from "@/components/sections/footer";
import HeroSlider from "@/components/sections/hero-slider";
import Navbar from "@/components/sections/navbar";
import HomeClient from "@/components/home-client";
import { createPublicServerSupabaseClient } from "@/lib/supabase/public-server";
import { getSlug } from "@/lib/content-utils";
import { loadPublicSiteSettings } from "@/lib/public-site-settings";
import {
  splitSettingParagraphs,
  splitSettingRows,
} from "@/lib/site-settings";
import { normalizeSupabaseImageUrl } from "@/lib/storage-utils";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  ChevronRight,
  FileText,
  Images,
  Landmark,
  MapPin,
  Phone,
  Target,
  Users,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface NewsPost {
  id: string;
  slug: string | null;
  title: string;
  excerpt: string | null;
  image_url: string | null;
  published_date: string | null;
}

interface EventRecord {
  id: string;
  slug: string | null;
  title: string;
  description: string | null;
  image_url: string | null;
  start_date: string;
  end_date: string | null;
  venue: string | null;
  location: string | null;
}

interface ProjectRecord {
  id: string;
  slug: string | null;
  title: string;
  description: string | null;
  image_url: string | null;
  status: string | null;
  progress_percentage: number | null;
}

interface GalleryRecord {
  id: string;
  title: string;
  image_url: string | null;
  category: string | null;
}

const quickLinks = [
  {
    title: "Services",
    href: "/services",
    icon: FileText,
    cardClass: "border-[#8B0000]/25 bg-[#fff4f2] hover:border-[#8B0000]/50",
    accentClass: "text-[#8B0000]",
  },
  {
    title: "Departments",
    href: "/departments",
    icon: Landmark,
    cardClass: "border-emerald-700/20 bg-emerald-50 hover:border-emerald-700/45",
    accentClass: "text-emerald-700",
  },
  {
    title: "Assembly",
    href: "/about/assembly",
    icon: Users,
    cardClass: "border-amber-600/25 bg-amber-50 hover:border-amber-600/50",
    accentClass: "text-amber-700",
  },
  {
    title: "Documents",
    href: "/documents",
    icon: FileText,
    cardClass: "border-sky-700/20 bg-sky-50 hover:border-sky-700/45",
    accentClass: "text-sky-700",
  },
  {
    title: "Events",
    href: "/events",
    icon: CalendarDays,
    cardClass: "border-rose-700/20 bg-rose-50 hover:border-rose-700/45",
    accentClass: "text-rose-700",
  },
  {
    title: "Contact",
    href: "/contact",
    icon: Phone,
    cardClass: "border-indigo-700/20 bg-indigo-50 hover:border-indigo-700/45",
    accentClass: "text-indigo-700",
  },
];

function formatDate(value?: string | null) {
  return value
    ? new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
}

function parseEventDate(value?: string | null, endOfDay = false) {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  if (endOfDay && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    date.setHours(23, 59, 59, 999);
  }

  return date;
}

function getEventStatus(event: EventRecord) {
  const now = new Date();
  const start = parseEventDate(event.start_date);
  const end = parseEventDate(event.end_date || event.start_date, true);

  if (!start || !end) return "upcoming";
  if (end < now) return "past";
  if (start <= now && end >= now) return "ongoing";
  return "upcoming";
}

function imageUrl(value?: string | null) {
  return value ? normalizeSupabaseImageUrl(value) : "";
}

function PlaceholderMedia({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#8B0000] px-4 text-center text-[13px] font-bold uppercase tracking-[0.18em] text-white/85">
      {label}
    </div>
  );
}

export default async function HomePreviewPage() {
  const [settings, supabase] = await Promise.all([
    loadPublicSiteSettings(),
    Promise.resolve(createPublicServerSupabaseClient()),
  ]);

  const [newsResult, eventsResult, projectsResult, galleryResult] =
    await Promise.all([
      supabase
        .from("news_posts")
        .select("id, slug, title, excerpt, image_url, published_date")
        .eq("is_published", true)
        .order("published_date", { ascending: false })
        .limit(3),
      supabase
        .from("events")
        .select("id, slug, title, description, image_url, start_date, end_date, venue, location")
        .eq("is_published", true)
        .order("start_date", { ascending: true }),
      supabase
        .from("projects")
        .select("id, slug, title, description, image_url, status, progress_percentage")
        .order("created_at", { ascending: false })
        .limit(3),
      supabase
        .from("gallery_items")
        .select("id, title, image_url, category")
        .order("display_order", { ascending: true })
        .limit(4),
    ]);

  const overviewIntro = splitSettingParagraphs(settings.about_overview_intro).slice(
    0,
    2
  );
  const coreValues = splitSettingRows(settings.about_overview_core_values)
    .map(([title, description]) => ({ title, description }))
    .slice(0, 4);
  const news = ((newsResult.data as NewsPost[] | null) || []).slice(0, 3);
  const events = ((eventsResult.data as EventRecord[] | null) || [])
    .filter((event) => getEventStatus(event) !== "past")
    .slice(0, 3);
  const projects = ((projectsResult.data as ProjectRecord[] | null) || []).slice(
    0,
    3
  );
  const gallery = ((galleryResult.data as GalleryRecord[] | null) || []).slice(
    0,
    4
  );

  return (
    <main className="min-h-screen bg-white">
      <HomeClient>
        <Navbar />
        <HeroSlider />

        <section className="relative z-20 -mt-8 bg-transparent pb-8 sm:-mt-12 md:-mt-14">
          <div className="container mx-auto max-w-6xl px-[15px]">
            <div className="rounded-[8px] border border-white/70 bg-white/95 p-3 shadow-[0_24px_60px_rgba(15,23,42,0.16)] backdrop-blur-md">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                {quickLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group flex min-h-[92px] flex-col justify-between rounded-[6px] border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(16,24,40,0.12)] ${item.cardClass}`}
                    >
                      <Icon className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${item.accentClass}`} />
                      <span className="flex items-center justify-between text-[13px] font-bold text-gray-900">
                        {item.title}
                        <ChevronRight className={`h-4 w-4 transition group-hover:translate-x-0.5 ${item.accentClass}`} />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16 md:py-20">
          <div className="container mx-auto grid max-w-6xl gap-8 px-[15px] lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="mb-3 max-w-2xl text-[13px] font-bold uppercase tracking-[0.18em] text-[#8B0000] sm:text-[14px]">
                Access services, public information, and development updates in one place.
              </p>
              <h1 className="mb-5 max-w-3xl text-[28px] font-bold leading-tight text-gray-950 sm:text-[34px] md:text-[42px]">
                Welcome to Ga South Municipal Assembly
              </h1>
              <div className="space-y-4 text-[15px] leading-7 text-gray-650">
                {overviewIntro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#8B0000] px-5 py-3 text-[13px] font-bold uppercase tracking-wide text-white transition hover:bg-[#6f0000]"
                >
                  Explore Services
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/about/overview"
                  className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-gray-300 px-5 py-3 text-[13px] font-bold uppercase tracking-wide text-gray-900 transition hover:border-[#8B0000] hover:text-[#8B0000]"
                >
                  About The Assembly
                </Link>
              </div>
            </div>

            <div className="rounded-[8px] border border-gray-200 bg-gray-50 p-5">
              <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-4">
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#8B0000]">
                    Management
                  </p>
                  <h2 className="mt-1 text-[20px] font-bold text-gray-950">
                    Assembly Leadership
                  </h2>
                </div>
                <Building2 className="h-8 w-8 text-[#8B0000]" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <Link
                  href="/about/mce-profile"
                  className="group grid grid-cols-[88px_1fr] gap-4 rounded-[6px] bg-white p-3 shadow-sm transition hover:shadow-md"
                >
                  <div className="relative h-[104px] overflow-hidden rounded-[6px] bg-gray-100">
                    {settings.mce_image_url ? (
                      <Image
                        src={imageUrl(settings.mce_image_url)}
                        alt={settings.mce_name}
                        fill
                        className="object-contain"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 py-1">
                    <p className="text-[12px] font-bold uppercase tracking-wide text-[#8B0000]">
                      {settings.mce_title}
                    </p>
                    <h3 className="mt-2 text-[17px] font-bold leading-snug text-gray-950">
                      {settings.mce_name}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-bold text-gray-600 group-hover:text-[#8B0000]">
                      View profile <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>

                <Link
                  href="/about/mcd-profile"
                  className="group grid grid-cols-[88px_1fr] gap-4 rounded-[6px] bg-white p-3 shadow-sm transition hover:shadow-md"
                >
                  <div className="relative h-[104px] overflow-hidden rounded-[6px] bg-gray-100">
                    {settings.mcd_image_url ? (
                      <Image
                        src={imageUrl(settings.mcd_image_url)}
                        alt={settings.mcd_name}
                        fill
                        className="object-contain"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 py-1">
                    <p className="text-[12px] font-bold uppercase tracking-wide text-[#8B0000]">
                      {settings.mcd_title}
                    </p>
                    <h3 className="mt-2 text-[17px] font-bold leading-snug text-gray-950">
                      {settings.mcd_name}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-bold text-gray-600 group-hover:text-[#8B0000]">
                      View profile <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f7f8fa] py-12 sm:py-16 md:py-20">
          <div className="container mx-auto grid max-w-6xl gap-5 px-[15px] lg:grid-cols-3">
            <div className="rounded-[8px] border border-gray-200 bg-white p-6">
              <Target className="mb-4 h-7 w-7 text-[#8B0000]" />
              <h2 className="mb-3 text-[20px] font-bold text-gray-950">
                Vision
              </h2>
              <p className="text-[14px] leading-7 text-gray-650">
                {settings.about_overview_vision}
              </p>
            </div>
            <div className="rounded-[8px] border border-gray-200 bg-white p-6">
              <Landmark className="mb-4 h-7 w-7 text-[#8B0000]" />
              <h2 className="mb-3 text-[20px] font-bold text-gray-950">
                Mission
              </h2>
              <p className="text-[14px] leading-7 text-gray-650">
                {settings.about_overview_mission}
              </p>
            </div>
            <div className="rounded-[8px] border border-gray-200 bg-white p-6">
              <Users className="mb-4 h-7 w-7 text-[#8B0000]" />
              <h2 className="mb-4 text-[20px] font-bold text-gray-950">
                Core Values
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {coreValues.map((value) => (
                  <div
                    key={value.title}
                    className="rounded-[4px] border border-gray-200 bg-gray-50 px-3 py-2 text-[12px] font-bold text-gray-800"
                  >
                    {value.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-[15px]">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.24em] text-[#8B0000]">
                  Latest News
                </p>
                <h2 className="text-[26px] font-bold text-gray-950 sm:text-[32px]">
                  Latest News
                </h2>
              </div>
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-[#8B0000]"
              >
                View all news <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {news.length === 0 ? (
              <div className="rounded-[8px] border border-gray-200 bg-gray-50 py-10 text-center text-[14px] text-gray-600">
                No published news articles are available yet.
              </div>
            ) : (
              <div className="grid gap-5 lg:grid-cols-3">
                {news.map((post) => (
                <article
                  key={post.id}
                  className="overflow-hidden rounded-[8px] border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(16,24,40,0.12)]"
                >
                  <Link href={`/news/${getSlug(post.title, post.slug || undefined) || post.id}`}>
                    <div className="relative aspect-[16/10] bg-gray-100">
                      {post.image_url ? (
                        <Image
                          src={imageUrl(post.image_url)}
                          alt={post.title}
                          fill
                          className="object-contain p-2"
                        />
                      ) : (
                        <PlaceholderMedia label="News" />
                      )}
                    </div>
                    <div className="p-5">
                      <p className="mb-2 text-[12px] font-semibold text-gray-500">
                        {formatDate(post.published_date)}
                      </p>
                      <h3 className="line-clamp-2 text-[18px] font-bold leading-snug text-gray-950">
                        {post.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-[14px] leading-6 text-gray-650">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="bg-[#f7f8fa] py-12 sm:py-16 md:py-20">
          <div className="container mx-auto grid max-w-6xl gap-6 px-[15px] lg:grid-cols-[0.95fr_1.05fr]">
            <div className="flex h-full flex-col rounded-[8px] border border-gray-200 bg-white p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.24em] text-[#8B0000]">
                    Events
                  </p>
                  <h2 className="text-[24px] font-bold text-gray-950">
                    Upcoming Events
                  </h2>
                </div>
                <CalendarDays className="h-8 w-8 text-[#8B0000]" />
              </div>
              {events.length === 0 ? (
                <div className="rounded-[6px] border border-gray-200 bg-gray-50 p-5 text-[14px] text-gray-600">
                  No upcoming events are available yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {events.map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${getSlug(event.title, event.slug || undefined) || event.id}`}
                    className="block rounded-[6px] border border-gray-200 p-4 transition hover:border-[#8B0000]/40 hover:bg-gray-50"
                  >
                    <p className="mb-1 text-[12px] font-bold uppercase tracking-wide text-[#8B0000]">
                      {getEventStatus(event)}
                    </p>
                    <h3 className="text-[16px] font-bold text-gray-950">
                      {event.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-gray-600">
                      <span>{formatDate(event.start_date)}</span>
                      {event.location ? (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {event.location}
                        </span>
                      ) : null}
                    </div>
                  </Link>
                  ))}
                </div>
              )}
              <div className="mt-auto pt-5">
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-[#8B0000]"
                >
                  View all events <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="flex h-full flex-col rounded-[8px] border border-gray-200 bg-white p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.24em] text-[#8B0000]">
                    Development
                  </p>
                  <h2 className="text-[24px] font-bold text-gray-950">
                    Projects and Progress
                  </h2>
                </div>
                <Building2 className="h-8 w-8 text-[#8B0000]" />
              </div>
              {projects.length === 0 ? (
                <div className="rounded-[6px] border border-gray-200 bg-gray-50 p-5 text-[14px] text-gray-600">
                  No projects have been added yet.
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-3">
                  {projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${getSlug(project.title, project.slug || undefined) || project.id}`}
                    className="rounded-[6px] border border-gray-200 bg-gray-50 p-4 transition hover:bg-white hover:shadow-sm"
                  >
                    <p className="mb-2 text-[12px] font-bold uppercase tracking-wide text-[#8B0000]">
                      {project.status || "Project"}
                    </p>
                    <h3 className="line-clamp-2 text-[15px] font-bold leading-snug text-gray-950">
                      {project.title}
                    </h3>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-[#8B0000]"
                        style={{
                          width: `${Math.min(
                            Math.max(project.progress_percentage || 0, 0),
                            100
                          )}%`,
                        }}
                      />
                    </div>
                    <p className="mt-2 text-[12px] font-semibold text-gray-600">
                      {project.progress_percentage || 0}% complete
                    </p>
                  </Link>
                  ))}
                </div>
              )}
              <div className="mt-auto pt-5">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-[#8B0000]"
                >
                  View all projects <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-[15px]">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.24em] text-[#8B0000]">
                  Gallery
                </p>
                <h2 className="text-[26px] font-bold text-gray-950 sm:text-[32px]">
                  Media Gallery
                </h2>
              </div>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-[#8B0000]"
              >
                Open gallery <Images className="h-4 w-4" />
              </Link>
            </div>
            {gallery.length === 0 ? (
              <div className="rounded-[8px] border border-gray-200 bg-gray-50 py-10 text-center text-[14px] text-gray-600">
                No gallery albums have been added yet.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {gallery.map((item) => (
                <Link
                  key={item.id}
                  href="/gallery"
                  className="group relative aspect-[4/3] overflow-hidden rounded-[8px] bg-gray-100"
                >
                  {item.image_url ? (
                    <Image
                      src={imageUrl(item.image_url)}
                      alt={item.title}
                      fill
                      className="object-contain p-2 transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <PlaceholderMedia label="Gallery" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="mb-1 text-[11px] font-bold uppercase tracking-wide text-white/75">
                      {item.category || "Album"}
                    </p>
                    <h3 className="line-clamp-2 text-[14px] font-bold leading-tight text-white">
                      {item.title}
                    </h3>
                  </div>
                </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="bg-[#f7f8fa] py-10 sm:py-12 md:py-14">
          <div className="container mx-auto max-w-6xl px-[15px]">
            <div className="flex flex-col gap-5 rounded-[8px] border border-gray-200 bg-white p-6 shadow-sm sm:p-7 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.24em] text-[#8B0000]">
                  Citizen Support
                </p>
                <h2 className="text-[22px] font-bold text-gray-950 sm:text-[26px]">
                  Need municipal support or public information?
                </h2>
                <p className="mt-2 max-w-2xl text-[14px] leading-6 text-gray-650">
                  Access Assembly services or contact the office for assistance.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#8B0000] px-5 py-3 text-[13px] font-bold uppercase tracking-wide text-white transition hover:bg-[#6f0000]"
                >
                  Services
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-gray-300 px-5 py-3 text-[13px] font-bold uppercase tracking-wide text-gray-900 transition hover:border-[#8B0000] hover:text-[#8B0000]"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </HomeClient>
    </main>
  );
}
