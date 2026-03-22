"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Images,
  Play,
  Share2,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { formatLooseLabel } from "@/lib/text-match";

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  images?: string[] | null;
  video_url: string | null;
  category: string;
}

interface GalleryLightboxProps {
  items: GalleryItem[];
}

interface PreparedGalleryItem extends GalleryItem {
  categoryLabel: string;
  media: string[];
  coverImage: string | null;
  photoCount: number;
  hasVideo: boolean;
}

function prepareGalleryItems(items: GalleryItem[]): PreparedGalleryItem[] {
  return items
    .map((item) => {
      const media = Array.from(
        new Set(
          [...(item.images || []), item.image_url]
            .filter((image): image is string => Boolean(image))
            .map((image) => image.trim())
            .filter(Boolean)
        )
      );

      return {
        ...item,
        categoryLabel: formatLooseLabel(item.category),
        media,
        coverImage: media[0] || null,
        photoCount: media.length,
        hasVideo: Boolean(item.video_url),
      };
    })
    .filter((item) => item.photoCount > 0 || item.hasVideo);
}

function getAssetCount(item: PreparedGalleryItem): number {
  return item.photoCount + (item.hasVideo ? 1 : 0);
}

function getCardHeight(index: number): string {
  if (index % 6 === 0) {
    return "aspect-[4/5]";
  }

  if (index % 4 === 0) {
    return "aspect-[5/4]";
  }

  return "aspect-[4/3]";
}

export default function GalleryLightbox({ items }: GalleryLightboxProps) {
  const preparedItems = prepareGalleryItems(items);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const categories = preparedItems.reduce(
    (accumulator, item) => {
      accumulator[item.categoryLabel] = (accumulator[item.categoryLabel] || 0) + 1;
      return accumulator;
    },
    {} as Record<string, number>
  );

  const filters = [
    { label: "All", value: "all", count: preparedItems.length },
    ...Object.entries(categories)
      .sort(([, countA], [, countB]) => countB - countA)
      .map(([label, count]) => ({ label, value: label, count })),
  ];

  const visibleItems =
    selectedCategory === "all"
      ? preparedItems
      : preparedItems.filter((item) => item.categoryLabel === selectedCategory);

  const selectedItemIndex = visibleItems.findIndex((item) => item.id === selectedItemId);
  const currentItem = selectedItemIndex >= 0 ? visibleItems[selectedItemIndex] : null;
  const currentImages = currentItem?.media || [];
  const currentImage = currentImages[selectedImageIndex] || currentItem?.coverImage || null;
  const currentMediaUrl =
    currentItem?.hasVideo && currentItem.video_url ? currentItem.video_url : currentImage;

  const currentShareUrl =
    typeof window === "undefined" || !currentItem
      ? null
      : new URL(`#gallery-item-${currentItem.id}`, window.location.href).toString();

  useEffect(() => {
    if (!currentItem) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedItemId(null);
        return;
      }

      if (event.key === "ArrowRight") {
        if (currentImages.length > 1 && selectedImageIndex < currentImages.length - 1) {
          setSelectedImageIndex((currentIndex) => currentIndex + 1);
          return;
        }

        setSelectedItemId(
          visibleItems[(selectedItemIndex + 1) % visibleItems.length]?.id || null
        );
        setSelectedImageIndex(0);
      }

      if (event.key === "ArrowLeft") {
        if (currentImages.length > 1 && selectedImageIndex > 0) {
          setSelectedImageIndex((currentIndex) => currentIndex - 1);
          return;
        }

        setSelectedItemId(
          visibleItems[
            (selectedItemIndex - 1 + visibleItems.length) % visibleItems.length
          ]?.id || null
        );
        setSelectedImageIndex(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentItem, currentImages.length, selectedImageIndex, selectedItemIndex, visibleItems]);

  const openItem = (itemId: string) => {
    setSelectedItemId(itemId);
    setSelectedImageIndex(0);
    setIsMuted(true);
  };

  const closeLightbox = () => {
    setSelectedItemId(null);
    setSelectedImageIndex(0);
  };

  const handleShare = async () => {
    if (!currentItem || typeof window === "undefined") {
      toast.error("No gallery item available to share");
      return;
    }

    try {
      if (
        typeof navigator.share === "function" &&
        (!navigator.canShare || navigator.canShare({ url: currentShareUrl || window.location.href }))
      ) {
        await navigator.share({
          title: currentItem.title,
          text:
            currentItem.description ||
            `View "${currentItem.title}" in the Assembly gallery.`,
          url: currentShareUrl || window.location.href,
        });
        return;
      }

      const shareTarget = currentShareUrl || window.location.href;

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareTarget);
        toast.success("Gallery link copied");
        return;
      }

      window.prompt("Copy this gallery link", shareTarget);
    } catch (error) {
      if (
        error instanceof DOMException &&
        (error.name === "AbortError" || error.name === "NotAllowedError")
      ) {
        return;
      }

      console.error("Failed to share gallery item:", error);
      toast.error("Could not share this gallery item");
    }
  };

  const handleDownload = () => {
    if (!currentMediaUrl) {
      toast.error("No media available to download");
      return;
    }

    const link = document.createElement("a");
    link.href = currentMediaUrl;
    link.download = currentItem?.title
      ? currentItem.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      : "gallery-media";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const showNextItem = () => {
    if (!visibleItems.length || selectedItemIndex < 0) {
      return;
    }

    setSelectedItemId(visibleItems[(selectedItemIndex + 1) % visibleItems.length]?.id || null);
    setSelectedImageIndex(0);
  };

  const showPreviousItem = () => {
    if (!visibleItems.length || selectedItemIndex < 0) {
      return;
    }

    setSelectedItemId(
      visibleItems[
        (selectedItemIndex - 1 + visibleItems.length) % visibleItems.length
      ]?.id || null
    );
    setSelectedImageIndex(0);
  };

  const showNextImage = () => {
    if (selectedImageIndex >= currentImages.length - 1) {
      return;
    }

    setSelectedImageIndex((currentIndex) => currentIndex + 1);
  };

  const showPreviousImage = () => {
    if (selectedImageIndex <= 0) {
      return;
    }

    setSelectedImageIndex((currentIndex) => currentIndex - 1);
  };

  if (!preparedItems.length) {
    return (
      <div className="rounded-[28px] border border-dashed border-gray-300 bg-white px-6 py-16 text-center shadow-sm">
        <Images className="mx-auto mb-4 h-12 w-12 text-gray-300" />
        <p className="text-lg font-semibold text-gray-700">No gallery items yet</p>
        <p className="mt-2 text-sm text-gray-500">
          Photos and videos will appear here after they are published.
        </p>
      </div>
    );
  }

  const photoCount = preparedItems.reduce((count, item) => count + item.photoCount, 0);
  const videoCount = preparedItems.filter((item) => item.hasVideo).length;

  return (
    <>
      <div className="space-y-6 sm:space-y-8">
        <div className="overflow-hidden rounded-[32px] border border-white/70 bg-white/80 px-5 py-5 shadow-[0_20px_60px_rgba(72,40,10,0.08)] backdrop-blur sm:px-7 sm:py-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#8B0000]">
                Public Gallery
              </p>
              <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Published photos and videos from Assembly activities
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                Browse by category and open any item for a full-screen view.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-3xl bg-[linear-gradient(135deg,#8B0000,#b22222)] px-4 py-4 text-white shadow-lg shadow-[#8B0000]/20">
                <p className="text-2xl font-bold">{preparedItems.length}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-white/80">
                  Items
                </p>
              </div>
              <div className="rounded-3xl border border-gray-200 bg-[linear-gradient(180deg,#ffffff,#f3efe8)] px-4 py-4 text-gray-900">
                <p className="text-2xl font-bold">{photoCount}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
                  Photos
                </p>
              </div>
              <div className="rounded-3xl border border-gray-200 bg-[linear-gradient(180deg,#ffffff,#f3efe8)] px-4 py-4 text-gray-900">
                <p className="text-2xl font-bold">{videoCount}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
                  Videos
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive = selectedCategory === filter.value;

              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(filter.value);
                    setSelectedItemId(null);
                    setSelectedImageIndex(0);
                  }}
                  className={`rounded-full border px-4 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "border-[#8B0000] bg-[#8B0000] text-white shadow-sm shadow-[#8B0000]/20"
                      : "border-gray-200 bg-white/90 text-gray-700 hover:border-[#8B0000]/35 hover:bg-[#fff8f5] hover:text-[#8B0000]"
                  }`}
                >
                  {filter.label}
                  <span className={`ml-2 text-xs ${isActive ? "text-white/80" : "text-gray-400"}`}>
                    {filter.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {visibleItems.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-gray-300 bg-white px-6 py-16 text-center shadow-sm">
            <p className="text-lg font-semibold text-gray-700">
              No items in this category yet
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Try another filter to see more photos and videos.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-5">
            {visibleItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => openItem(item.id)}
                className="group overflow-hidden rounded-[30px] border border-white/70 bg-white/90 text-left shadow-[0_12px_35px_rgba(50,35,18,0.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_55px_rgba(50,35,18,0.14)]"
              >
                <div
                  className={`relative overflow-hidden bg-[#e9e2d7] ${getCardHeight(index)}`}
                >
                  {item.coverImage ? (
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000] via-[#7a1111] to-slate-900" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                  <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-2">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-900 shadow-sm">
                      {item.categoryLabel}
                    </span>
                    <div className="flex gap-2">
                      {item.hasVideo ? (
                        <span className="rounded-full bg-[#8B0000] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                          Video
                        </span>
                      ) : null}
                      <span className="rounded-full bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                        {getAssetCount(item)} asset{getAssetCount(item) === 1 ? "" : "s"}
                      </span>
                    </div>
                  </div>

                  {item.hasVideo ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/18 backdrop-blur">
                        <Play className="h-6 w-6 fill-white text-white" />
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="space-y-3 bg-[linear-gradient(180deg,#ffffff,#fcf8f1)] p-5">
                  <div>
                    <h4 className="text-lg font-semibold tracking-tight text-gray-900">
                      {item.title}
                    </h4>
                    {item.description ? (
                      <p className="mt-2 text-sm leading-6 text-gray-600 line-clamp-3">
                        {item.description}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Open item</span>
                    <span className="rounded-full bg-[#f2ebe2] px-3 py-1 font-medium text-gray-700">
                      View
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {currentItem ? (
        <div
          className="fixed inset-x-0 bottom-0 top-[74px] z-[900] overflow-y-auto bg-black/80 p-2 sm:top-[82px] sm:p-4 md:top-[114px] lg:top-[118px] lg:p-6"
          onClick={closeLightbox}
        >
          <div
            className="mx-auto flex min-h-[calc(100%-0.5rem)] max-w-7xl flex-col overflow-hidden rounded-[24px] border border-white/20 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.35)] sm:min-h-[calc(100%-1rem)] lg:min-h-[calc(100%-1.5rem)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8B0000]">
                  {currentItem.categoryLabel}
                </p>
                <h3 className="truncate text-lg font-semibold text-gray-900 sm:text-xl">
                  {currentItem.title}
                </h3>
              </div>

              <div className="ml-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="rounded-full border border-gray-200 p-2 text-gray-600 transition hover:border-[#8B0000]/30 hover:text-[#8B0000]"
                  aria-label="Close lightbox"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_auto] bg-[#f7f5f1] lg:grid-cols-[minmax(0,1fr)_360px] lg:grid-rows-1">
              <div className="relative flex min-h-[52vh] items-center justify-center bg-[radial-gradient(circle_at_top,#2b2b2b,#090909_65%)] p-2 sm:min-h-[58vh] sm:p-4 lg:min-h-0 lg:p-6">
                {currentItem.hasVideo && currentItem.video_url ? (
                  <video
                    src={currentItem.video_url}
                    controls
                    muted={isMuted}
                    playsInline
                    preload="metadata"
                    className="h-full max-h-full w-full max-w-full rounded-xl object-contain lg:rounded-2xl"
                  />
                ) : currentImage ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={currentImage}
                      alt={currentItem.title}
                      fill
                      priority
                      className="rounded-xl object-contain lg:rounded-2xl"
                      sizes="100vw"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-white/60">
                    <Images className="mb-3 h-10 w-10" />
                    <p>No media available</p>
                  </div>
                )}

                {visibleItems.length > 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={showPreviousItem}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/95 p-3 text-gray-900 shadow-lg transition hover:bg-white"
                      aria-label="Previous gallery item"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={showNextItem}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/95 p-3 text-gray-900 shadow-lg transition hover:bg-white"
                      aria-label="Next gallery item"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                ) : null}

                {currentImages.length > 1 ? (
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <button
                      type="button"
                      onClick={showPreviousImage}
                      disabled={selectedImageIndex === 0}
                      className="rounded-full bg-black/65 p-3 text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={showNextImage}
                      disabled={selectedImageIndex === currentImages.length - 1}
                      className="rounded-full bg-black/65 p-3 text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                ) : null}

                {currentItem.hasVideo ? (
                  <button
                    type="button"
                    onClick={() => setIsMuted((currentValue) => !currentValue)}
                    className="absolute bottom-4 right-4 rounded-full bg-black/65 p-3 text-white transition hover:bg-black/80"
                    aria-label="Toggle video sound"
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </button>
                ) : null}
              </div>

              <div className="max-h-[42vh] overflow-y-auto border-t border-gray-200 bg-[linear-gradient(180deg,#ffffff,#faf6ef)] px-4 py-4 sm:px-6 sm:py-5 lg:max-h-none lg:border-l lg:border-t-0 lg:px-5 lg:py-6">
                <div className="flex flex-col gap-5">
                  <div>
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#8B0000]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B0000]">
                        {currentItem.categoryLabel}
                      </span>
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gray-600">
                        {getAssetCount(currentItem)} asset
                        {getAssetCount(currentItem) === 1 ? "" : "s"}
                      </span>
                    </div>

                    <p className="text-sm leading-6 text-gray-600">
                      {currentItem.description || "No description was provided for this item."}
                    </p>
                  </div>

                  <div className="text-sm text-gray-500">
                    Item {selectedItemIndex + 1} of {visibleItems.length}
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:max-w-md">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-[#8B0000]/30 hover:text-[#8B0000]"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-[#8B0000]/25 bg-[#8B0000]/5 px-4 py-3 text-sm font-medium text-[#8B0000] transition hover:bg-[#8B0000]/10"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>

                {(visibleItems.length > 1 || currentImages.length > 1) && (
                  <p className="mt-3 text-xs text-gray-500">
                    Use the on-screen arrows to move between gallery items and images.
                  </p>
                )}

                {currentImages.length > 1 ? (
                  <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
                    {currentImages.map((imageUrl, index) => (
                      <button
                        key={`${currentItem.id}-${imageUrl}-${index}`}
                        type="button"
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl border transition ${
                          index === selectedImageIndex
                            ? "border-[#8B0000] ring-2 ring-[#8B0000]/25"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Image
                          src={imageUrl}
                          alt={`${currentItem.title} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
