"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
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

interface GalleryAsset {
  type: "image" | "video";
  url: string;
  thumbnailUrl: string | null;
  label: string;
}

interface PreparedGalleryItem extends GalleryItem {
  categoryLabel: string;
  photos: string[];
  assets: GalleryAsset[];
  coverImage: string | null;
  photoCount: number;
  hasVideo: boolean;
}

function prepareGalleryItems(items: GalleryItem[]): PreparedGalleryItem[] {
  return items
    .map((item) => {
      const photos = Array.from(
        new Set(
          [...(item.images || []), item.image_url]
            .filter((image): image is string => Boolean(image))
            .map((image) => image.trim())
            .filter(Boolean)
        )
      );
      const assets: GalleryAsset[] = [
        ...photos.map((photoUrl, index) => ({
          type: "image" as const,
          url: photoUrl,
          thumbnailUrl: photoUrl,
          label: `Photo ${index + 1}`,
        })),
      ];

      if (item.video_url) {
        assets.push({
          type: "video",
          url: item.video_url,
          thumbnailUrl: photos[0] || null,
          label: "Video",
        });
      }

      return {
        ...item,
        categoryLabel: formatLooseLabel(item.category),
        photos,
        assets,
        coverImage: photos[0] || null,
        photoCount: photos.length,
        hasVideo: Boolean(item.video_url),
      };
    })
    .filter((item) => item.photoCount > 0 || item.hasVideo);
}

function getAssetCount(item: PreparedGalleryItem): number {
  return item.photoCount + (item.hasVideo ? 1 : 0);
}

export default function GalleryLightbox({ items }: GalleryLightboxProps) {
  const preparedItems = prepareGalleryItems(items);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedAssetIndex, setSelectedAssetIndex] = useState(0);
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
  const currentAssets = currentItem?.assets || [];
  const currentAsset = currentAssets[selectedAssetIndex] || null;
  const currentMediaUrl = currentAsset?.url || null;
  const isCurrentAssetVideo = currentAsset?.type === "video";

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
        if (currentAssets.length > 1 && selectedAssetIndex < currentAssets.length - 1) {
          setSelectedAssetIndex((currentIndex) => currentIndex + 1);
          return;
        }

        setSelectedItemId(
          visibleItems[(selectedItemIndex + 1) % visibleItems.length]?.id || null
        );
        setSelectedAssetIndex(0);
      }

      if (event.key === "ArrowLeft") {
        if (currentAssets.length > 1 && selectedAssetIndex > 0) {
          setSelectedAssetIndex((currentIndex) => currentIndex - 1);
          return;
        }

        setSelectedItemId(
          visibleItems[
            (selectedItemIndex - 1 + visibleItems.length) % visibleItems.length
          ]?.id || null
        );
        setSelectedAssetIndex(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentAssets.length, currentItem, selectedAssetIndex, selectedItemIndex, visibleItems]);

  const openItem = (itemId: string) => {
    setSelectedItemId(itemId);
    setSelectedAssetIndex(0);
    setIsMuted(true);
  };

  const closeLightbox = () => {
    setSelectedItemId(null);
    setSelectedAssetIndex(0);
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

  const showNextItem = () => {
    if (!visibleItems.length || selectedItemIndex < 0) {
      return;
    }

    setSelectedItemId(visibleItems[(selectedItemIndex + 1) % visibleItems.length]?.id || null);
    setSelectedAssetIndex(0);
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
    setSelectedAssetIndex(0);
  };

  const showNextAsset = () => {
    if (selectedAssetIndex >= currentAssets.length - 1) {
      return;
    }

    setSelectedAssetIndex((currentIndex) => currentIndex + 1);
  };

  const showPreviousAsset = () => {
    if (selectedAssetIndex <= 0) {
      return;
    }

    setSelectedAssetIndex((currentIndex) => currentIndex - 1);
  };

  if (!preparedItems.length) {
    return (
      <div className="rounded-[8px] border border-dashed border-gray-300 bg-white px-6 py-16 text-center shadow-sm">
        <Images className="mx-auto mb-4 h-12 w-12 text-gray-300" />
        <p className="text-lg font-semibold text-gray-700">No albums yet</p>
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
        <div className="overflow-hidden rounded-[8px] border border-gray-200 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#8B0000]">
                Public Albums
              </p>
              <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Published photo and video albums from Assembly activities
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                Browse by category and open any album for a full-screen view.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="rounded-[8px] bg-[#8B0000] px-3 py-4 text-white shadow-sm sm:px-4">
                <p className="text-2xl font-bold">{preparedItems.length}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-white/80">
                  Albums
                </p>
              </div>
              <div className="rounded-[8px] border border-gray-200 bg-[#f7f8fa] px-3 py-4 text-gray-900 sm:px-4">
                <p className="text-2xl font-bold">{photoCount}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
                  Photos
                </p>
              </div>
              <div className="rounded-[8px] border border-gray-200 bg-[#f7f8fa] px-3 py-4 text-gray-900 sm:px-4">
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
                    setSelectedAssetIndex(0);
                  }}
                  className={`rounded-[8px] border px-3 py-2 text-sm font-medium transition sm:px-4 sm:py-2.5 ${
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
          <div className="rounded-[8px] border border-dashed border-gray-300 bg-white px-6 py-16 text-center shadow-sm">
            <p className="text-lg font-semibold text-gray-700">
              No albums in this category yet
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Try another filter to see more photos and videos.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => openItem(item.id)}
                className="group overflow-hidden rounded-[8px] border border-gray-200 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(50,35,18,0.12)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#e9e2d7]">
                  {item.coverImage ? (
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      className="object-contain p-2 transition duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#8B0000]" />
                  )}

                  <div className="absolute inset-0 bg-black/35" />

                  <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-2">
                    <span className="rounded-[6px] bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-900 shadow-sm">
                      {item.categoryLabel}
                    </span>
                    <div className="flex flex-wrap justify-end gap-2">
                      {item.hasVideo ? (
                        <span className="rounded-[6px] bg-[#8B0000] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                          Video
                        </span>
                      ) : null}
                      <span className="rounded-[6px] bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                        {getAssetCount(item)} asset{getAssetCount(item) === 1 ? "" : "s"}
                      </span>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                      Album
                    </p>
                    <h4 className="mt-1 line-clamp-2 text-[18px] font-bold leading-tight text-white sm:text-[20px]">
                      {item.title}
                    </h4>
                  </div>
                </div>

                <div className="space-y-4 bg-white p-5">
                  <div>
                    {item.description ? (
                      <p className="mt-2 text-sm leading-6 text-gray-600 line-clamp-3">
                        {item.description}
                      </p>
                    ) : (
                      <p className="mt-2 text-sm leading-6 text-gray-500">
                        Open this album to view the published photos and videos.
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      {item.photoCount} photo{item.photoCount === 1 ? "" : "s"}
                      {item.hasVideo ? " + video" : ""}
                    </span>
                    <span className="rounded-[6px] bg-[#8B0000] px-3 py-1 font-medium text-white transition group-hover:bg-[#6B0000]">
                      Open Album
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
          className="fixed inset-x-0 bottom-0 top-[64px] z-[900] overflow-y-auto bg-black/85 p-2 sm:top-[82px] sm:p-4 md:top-[114px] lg:top-[118px] lg:p-6"
          onClick={closeLightbox}
        >
          <div
            className="mx-auto flex min-h-[calc(100%-0.5rem)] max-w-7xl flex-col overflow-hidden rounded-[8px] border border-white/15 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.45)] sm:min-h-[calc(100%-1rem)] lg:min-h-[calc(100%-1.5rem)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-col gap-4 border-b border-gray-200 bg-white px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0 max-w-4xl">
                <div className="mb-2 flex flex-wrap gap-2">
                  <span className="rounded-[6px] bg-[#8B0000]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B0000]">
                    Album
                  </span>
                  <span className="rounded-[6px] bg-gray-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-600">
                    {currentItem.categoryLabel}
                  </span>
                  <span className="rounded-[6px] bg-gray-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-600">
                    {getAssetCount(currentItem)} media
                  </span>
                </div>
                <h3 className="text-xl font-bold leading-tight text-gray-900 sm:text-2xl">
                  {currentItem.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 rounded-[8px] border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-[#8B0000]/30 hover:text-[#8B0000] sm:px-4"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="rounded-[8px] border border-gray-200 bg-white p-2.5 text-gray-600 transition hover:border-[#8B0000]/30 hover:text-[#8B0000]"
                  aria-label="Close lightbox"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_auto] bg-[#f7f5f1] lg:grid-cols-[minmax(0,1fr)_360px] lg:grid-rows-1">
              <div className="flex min-h-[58vh] flex-col bg-[#0d0d0d] lg:min-h-0">
                <div className="relative flex min-h-[46vh] flex-1 items-center justify-center bg-[#080808] p-2 sm:min-h-[54vh] sm:p-4 lg:min-h-0 lg:p-6">
                  {isCurrentAssetVideo && currentMediaUrl ? (
                    <video
                      src={currentMediaUrl}
                      controls
                      muted={isMuted}
                      playsInline
                      preload="metadata"
                      className="h-full max-h-full w-full max-w-full rounded-[8px] object-contain"
                    />
                  ) : currentMediaUrl ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={currentMediaUrl}
                        alt={currentItem.title}
                        fill
                        priority
                        className="rounded-[8px] object-contain"
                        sizes="100vw"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-white/60">
                      <Images className="mb-3 h-10 w-10" />
                      <p>No media available</p>
                    </div>
                  )}

                  {currentAssets.length > 1 ? (
                    <>
                      <button
                        type="button"
                        onClick={showPreviousAsset}
                        disabled={selectedAssetIndex === 0}
                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-[8px] bg-white/95 p-2.5 text-gray-900 shadow-lg transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 sm:left-3 sm:p-3"
                        aria-label="Previous media"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={showNextAsset}
                        disabled={selectedAssetIndex === currentAssets.length - 1}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-[8px] bg-white/95 p-2.5 text-gray-900 shadow-lg transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 sm:right-3 sm:p-3"
                        aria-label="Next media"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  ) : null}

                  {isCurrentAssetVideo ? (
                    <button
                      type="button"
                      onClick={() => setIsMuted((currentValue) => !currentValue)}
                      className="absolute bottom-4 right-4 rounded-[8px] bg-black/65 p-3 text-white transition hover:bg-black/80"
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

                {currentAssets.length > 1 ? (
                  <div className="border-t border-white/10 bg-black/70 px-3 py-3 sm:px-4">
                    <div className="flex gap-3 overflow-x-auto pb-1">
                      {currentAssets.map((asset, index) => (
                        <button
                          key={`${currentItem.id}-${asset.type}-${asset.url}-${index}`}
                          type="button"
                          onClick={() => setSelectedAssetIndex(index)}
                          className={`relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-[8px] border transition ${
                            index === selectedAssetIndex
                              ? "border-white ring-2 ring-white/35"
                              : "border-white/20 hover:border-white/60"
                          }`}
                        >
                          {asset.thumbnailUrl ? (
                            <Image
                              src={asset.thumbnailUrl}
                              alt={`${currentItem.title} ${asset.label}`}
                              fill
                              className="object-contain p-1"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-[#8B0000]" />
                          )}
                          <div className="absolute inset-x-0 bottom-0 bg-black/60 px-2 py-1 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                            {asset.label}
                          </div>
                          {asset.type === "video" ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                              <Play className="h-5 w-5 fill-white text-white" />
                            </div>
                          ) : null}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

                  <div className="max-h-[44vh] overflow-y-auto border-t border-gray-200 bg-white px-4 py-4 sm:px-6 sm:py-5 lg:max-h-none lg:border-l lg:border-t-0 lg:px-5 lg:py-6">
                <div className="flex flex-col gap-5">
                  <div>
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-[6px] bg-[#8B0000]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B0000]">
                        {currentItem.categoryLabel}
                      </span>
                      <span className="rounded-[6px] bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gray-600">
                        {getAssetCount(currentItem)} asset
                        {getAssetCount(currentItem) === 1 ? "" : "s"}
                      </span>
                      <span className="rounded-[6px] bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gray-600">
                        {currentAsset?.label || "Media"}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-gray-900">
                      Album Details
                    </h4>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      {currentItem.description || "No description was provided for this album."}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-[8px] border border-gray-200 bg-white px-4 py-3">
                      <p className="text-xl font-bold text-gray-900">{currentItem.photoCount}</p>
                      <p className="text-xs uppercase tracking-[0.14em] text-gray-500">Photos</p>
                    </div>
                    <div className="rounded-[8px] border border-gray-200 bg-white px-4 py-3">
                      <p className="text-xl font-bold text-gray-900">{currentItem.hasVideo ? 1 : 0}</p>
                      <p className="text-xs uppercase tracking-[0.14em] text-gray-500">Videos</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:max-w-md">
                  <button
                    type="button"
                    onClick={showPreviousItem}
                    disabled={visibleItems.length <= 1}
                    className="flex items-center justify-center gap-2 rounded-[8px] border border-gray-200 bg-white px-3 py-3 text-sm font-medium text-gray-700 transition hover:border-[#8B0000]/30 hover:text-[#8B0000] disabled:cursor-not-allowed disabled:opacity-45 sm:px-4"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Prev Album
                  </button>
                  <button
                    type="button"
                    onClick={showNextItem}
                    disabled={visibleItems.length <= 1}
                    className="flex items-center justify-center gap-2 rounded-[8px] border border-gray-200 bg-white px-3 py-3 text-sm font-medium text-gray-700 transition hover:border-[#8B0000]/30 hover:text-[#8B0000] disabled:cursor-not-allowed disabled:opacity-45 sm:px-4"
                  >
                    Next Album
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {(visibleItems.length > 1 || currentAssets.length > 1) && (
                  <p className="mt-3 text-xs text-gray-500">
                    Use the media arrows or thumbnail strip to move inside this album.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
