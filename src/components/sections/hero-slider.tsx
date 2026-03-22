"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: string;
  image_url: string;
  title: string;
  subtitle: string;
  description: string;
}

export default function HeroSlider() {
  const [slides, setSlides] = useState<Slide[]>([]);
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

  const activeSlide = slides[currentSlide];

  return (
    <section className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] xl:h-[750px] overflow-hidden bg-black">
      <div className="relative h-full w-full">
        {activeSlide ? (
          <div
            key={activeSlide.id}
            className="absolute inset-0 z-[2] opacity-100 transition-opacity duration-1000 ease-in-out"
          >
            <div className="relative h-full w-full bg-gray-900 flex items-center justify-center">
              <Image
                src={activeSlide.image_url}
                alt={activeSlide.title}
                fill
                priority
                className="object-contain"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 md:px-[15px]">
                <div className="max-w-[800px] text-white animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <h2 className="text-[14px] sm:text-[16px] md:text-[22px] font-semibold text-ghana-gold uppercase tracking-widest mb-2 after:hidden">
                    {activeSlide.subtitle}
                  </h2>
                  <h1 className="text-[24px] sm:text-[36px] md:text-[48px] lg:text-[60px] font-bold leading-tight mb-4 sm:mb-6">
                    {activeSlide.title}
                  </h1>
                  <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] mb-4 sm:mb-8 max-w-[650px] leading-relaxed text-white/90">
                    {activeSlide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                    <Link
                      href="/services"
                      className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-[#8B0000] hover:bg-[#6B0000] text-white font-semibold text-[12px] sm:text-[14px] uppercase tracking-wider rounded-[4px] transition-standard text-center sm:text-left"
                    >
                      Our Services
                    </Link>
                    <Link
                      href="/about/overview"
                      className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white hover:bg-white hover:text-[#8B0000] text-white font-semibold text-[12px] sm:text-[14px] uppercase tracking-wider rounded-[4px] transition-standard text-center sm:text-left"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
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
