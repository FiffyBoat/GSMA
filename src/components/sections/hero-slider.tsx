"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: string;
  image_url: string;
  title: string;
  subtitle: string;
  description: string;
}

const defaultSlides: Slide[] = [
  {
    id: "1",
    image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
    title: "Ga South Municipal Assembly",
    subtitle: "Tuntia - Nyonmo - Shwalo",
    description: "Welcome to the official website of the Ga South Municipal Assembly (GSMA), where we serve with integrity and transparency.",
  },
  {
    id: "2",
    image_url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&q=80",
    title: "Empowering Our Local Communities",
    subtitle: "Development and Growth",
    description: "Working together to build a sustainable and prosperous municipality for all residents and businesses.",
  },
  {
    id: "3",
    image_url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80",
    title: "Strategic Infrastructure Projects",
    subtitle: "Building the Future",
    description: "Our commitment to infrastructure development drives improved access to essential services across the region.",
  },
];

export default function HeroSlider() {
  const [slides, setSlides] = useState<Slide[]>(defaultSlides);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetch("/api/content/slides")
      .then((res) => res.json())
      .then((data) => {
        if (data.data && data.data.length > 0) {
          setSlides(data.data);
        }
      })
      .catch(console.error);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] xl:h-[750px] overflow-hidden bg-black">
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative h-full w-full">
              <Image
                src={slide.image_url}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 md:px-[15px]">
                <div className="max-w-[800px] text-white animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <h2 className="text-[14px] sm:text-[16px] md:text-[22px] font-semibold text-ghana-gold uppercase tracking-widest mb-2 after:hidden">
                    {slide.subtitle}
                  </h2>
                  <h1 className="text-[24px] sm:text-[36px] md:text-[48px] lg:text-[60px] font-bold leading-tight mb-4 sm:mb-6">
                    {slide.title}
                  </h1>
                  <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] mb-4 sm:mb-8 max-w-[650px] leading-relaxed text-white/90">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                    <a
                      href="/services"
                      className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-[#8B0000] hover:bg-[#6B0000] text-white font-semibold text-[12px] sm:text-[14px] uppercase tracking-wider rounded-[4px] transition-standard text-center sm:text-left"
                    >
                      Our Services
                    </a>
                    <a
                      href="/about"
                      className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white hover:bg-white hover:text-[#8B0000] text-white font-semibold text-[12px] sm:text-[14px] uppercase tracking-wider rounded-[4px] transition-standard text-center sm:text-left"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-black/20 hover:bg-[#8B0000] text-white transition-standard group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-8 sm:h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-black/20 hover:bg-[#8B0000] text-white transition-standard group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-8 sm:h-8" />
      </button>

      <div className="absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-standard ${
              index === currentSlide ? "bg-ghana-gold scale-125" : "bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
