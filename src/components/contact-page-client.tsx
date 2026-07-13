"use client";

import Footer from "@/components/sections/footer";
import Navbar from "@/components/sections/navbar";
import PageHeader from "@/components/shared/PageHeader";
import {
  Facebook,
  Instagram,
  Mail,
  ExternalLink,
  MapPin,
  Phone,
  Clock,
  Send,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import TikTokIcon from "@/components/shared/tiktok-icon";

interface ContactPageClientProps {
  settings: Record<string, string>;
}

function getMapsEmbedUrl(rawValue: string, fallbackQuery: string): string {
  const trimmed = rawValue.trim();

  if (!trimmed) {
    return `https://www.google.com/maps?q=${encodeURIComponent(
      fallbackQuery
    )}&output=embed`;
  }

  if (
    trimmed.includes("/maps/embed") ||
    trimmed.includes("output=embed") ||
    trimmed.includes("/maps?pb=")
  ) {
    return trimmed;
  }

  if (
    trimmed.includes("google.com/maps") ||
    trimmed.includes("maps.app.goo.gl") ||
    trimmed.includes("goo.gl/maps")
  ) {
    return `https://www.google.com/maps?q=${encodeURIComponent(
      fallbackQuery
    )}&output=embed`;
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(
    trimmed
  )}&output=embed`;
}

export default function ContactPageClient({
  settings,
}: ContactPageClientProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const addressLines = settings.contact_address_lines
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
  const phoneLines = settings.contact_phone_lines
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
  const hoursLines = settings.contact_hours_lines
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
  const mapFallbackQuery = [
    "Ga South Municipal Assembly",
    ...addressLines,
    settings.contact_digital_address,
  ]
    .filter(Boolean)
    .join(", ");
  const mapEmbedUrl = getMapsEmbedUrl(
    settings.contact_map_embed_url,
    mapFallbackQuery
  );
  const mapOpenUrl =
    settings.contact_map_share_url?.trim() || settings.contact_map_embed_url;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to submit");
      }
      alert("Thank you for your message. We will get back to you shortly.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact submit error", error);
      alert("There was an error sending your message. Please try again later.");
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader title="Contact Us" breadcrumbs={[{ label: "Contact Us" }]} />

      <section className="bg-[#f7f8fa] py-[40px] sm:py-[60px] md:py-[80px]">
        <div className="container mx-auto max-w-7xl px-[15px]">
          <div className="mb-8 rounded-[8px] border border-gray-200 bg-white p-5 shadow-sm sm:p-7 md:p-8">
            <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.24em] text-[#8B0000]">
              Contact The Assembly
            </p>
            <h2 className="mb-3 text-[26px] font-bold text-gray-950 sm:text-[32px] md:text-[38px]">
              Get In Touch
            </h2>
            <p className="max-w-3xl text-[14px] leading-7 text-gray-600 sm:text-[15px]">
              {settings.contact_intro}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px] sm:gap-[28px] md:gap-[30px] lg:gap-[40px]">
            <div className="lg:col-span-1">
              <div className="space-y-4">
                <div className="flex items-start gap-[14px] rounded-[8px] border border-gray-200 bg-white p-4 shadow-sm sm:gap-[16px] md:gap-[18px]">
                  <div className="w-[44px] sm:w-[48px] h-[44px] sm:h-[48px] bg-[#8B0000] rounded-[6px] flex items-center justify-center shrink-0">
                    <MapPin className="w-[20px] sm:w-[22px] h-[20px] sm:h-[22px] text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-[6px] sm:mb-[8px] text-[14px] sm:text-[15px] md:text-[16px]">
                      Address
                    </h3>
                    <p className="text-gray-600 text-[12px] sm:text-[13px] md:text-[14px] leading-[1.5] sm:leading-[1.6]">
                      {addressLines.map((line) => (
                        <span key={line}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                    {settings.contact_digital_address && (
                      <p className="text-[#8B0000] font-medium text-[12px] sm:text-[13px] md:text-[14px] mt-[6px] sm:mt-[8px]">
                        Digital Address: {settings.contact_digital_address}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-[14px] rounded-[8px] border border-gray-200 bg-white p-4 shadow-sm sm:gap-[16px] md:gap-[18px]">
                  <div className="w-[44px] sm:w-[48px] h-[44px] sm:h-[48px] bg-[#8B0000] rounded-[6px] flex items-center justify-center shrink-0">
                    <Phone className="w-[20px] sm:w-[22px] h-[20px] sm:h-[22px] text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-[6px] sm:mb-[8px] text-[14px] sm:text-[15px] md:text-[16px]">
                      Phone
                    </h3>
                    <p className="text-gray-600 text-[12px] sm:text-[13px] md:text-[14px] leading-[1.5] sm:leading-[1.6]">
                      {phoneLines.map((line) => (
                        <span key={line}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-[14px] rounded-[8px] border border-gray-200 bg-white p-4 shadow-sm sm:gap-[16px] md:gap-[18px]">
                  <div className="w-[44px] sm:w-[48px] h-[44px] sm:h-[48px] bg-[#8B0000] rounded-[6px] flex items-center justify-center shrink-0">
                    <Mail className="w-[20px] sm:w-[22px] h-[20px] sm:h-[22px] text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-[6px] sm:mb-[8px] text-[14px] sm:text-[15px] md:text-[16px]">
                      Email
                    </h3>
                    <p className="text-gray-600 text-[12px] sm:text-[13px] md:text-[14px]">
                      {settings.contact_email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-[14px] rounded-[8px] border border-gray-200 bg-white p-4 shadow-sm sm:gap-[16px] md:gap-[18px]">
                  <div className="w-[44px] sm:w-[48px] h-[44px] sm:h-[48px] bg-[#8B0000] rounded-[6px] flex items-center justify-center shrink-0">
                    <Clock className="w-[20px] sm:w-[22px] h-[20px] sm:h-[22px] text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-[6px] sm:mb-[8px] text-[14px] sm:text-[15px] md:text-[16px]">
                      Working Hours
                    </h3>
                    <p className="text-gray-600 text-[12px] sm:text-[13px] md:text-[14px] leading-[1.5] sm:leading-[1.6]">
                      {hoursLines.map((line) => (
                        <span key={line}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-[20px] rounded-[8px] border border-gray-200 bg-white p-4 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-[14px] sm:mb-[16px] text-[14px] sm:text-[15px] md:text-[16px]">
                  Follow Us
                </h3>
                <div className="flex gap-[10px] sm:gap-[12px]">
                  <a
                    href={settings.contact_facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[40px] sm:w-[44px] h-[40px] sm:h-[44px] bg-[#8B0000] rounded-lg flex items-center justify-center hover:bg-[#6B0000] transition-colors"
                    title="Visit Facebook"
                  >
                    <Facebook className="w-[18px] sm:w-[20px] h-[18px] sm:h-[20px] text-white" />
                  </a>
                  <a
                    href={settings.contact_twitter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[40px] sm:w-[44px] h-[40px] sm:h-[44px] bg-[#8B0000] rounded-lg flex items-center justify-center hover:bg-[#6B0000] transition-colors"
                    title="Visit TikTok"
                  >
                    <TikTokIcon className="w-[18px] sm:w-[20px] h-[18px] sm:h-[20px] text-white" />
                  </a>
                  <a
                    href={settings.contact_instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[40px] sm:w-[44px] h-[40px] sm:h-[44px] bg-[#8B0000] rounded-lg flex items-center justify-center hover:bg-[#6B0000] transition-colors"
                    title="Visit Instagram"
                  >
                    <Instagram className="w-[18px] sm:w-[20px] h-[18px] sm:h-[20px] text-white" />
                  </a>
                  <a
                    href={settings.contact_youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[40px] sm:w-[44px] h-[40px] sm:h-[44px] bg-[#8B0000] rounded-lg flex items-center justify-center hover:bg-[#6B0000] transition-colors"
                    title="Visit YouTube"
                  >
                    <Youtube className="w-[18px] sm:w-[20px] h-[18px] sm:h-[20px] text-white" />
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-[8px] border border-gray-200 bg-white p-[20px] shadow-sm sm:p-[24px] md:p-[28px] lg:p-[32px]">
                <h2 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 mb-[8px] sm:mb-[10px]">
                  Send Us A Message
                </h2>
                <p className="text-gray-600 mb-[20px] sm:mb-[24px] md:mb-[28px] text-[13px] sm:text-[14px] md:text-[15px]">
                  {settings.contact_form_intro}
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-[16px] sm:space-y-[18px] md:space-y-[20px]"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] sm:gap-[18px] md:gap-[20px]">
                    <div>
                      <label htmlFor="name" className="block text-[12px] sm:text-[13px] md:text-[14px] font-medium text-gray-700 mb-[6px] sm:mb-[8px]">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(event) =>
                          setFormData({ ...formData, name: event.target.value })
                        }
                        className="w-full rounded-[6px] border border-gray-300 px-[12px] py-[10px] text-[13px] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#8B0000] sm:px-[14px] sm:py-[12px] sm:text-[14px] md:px-[16px] md:py-[14px] md:text-[15px]"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[12px] sm:text-[13px] md:text-[14px] font-medium text-gray-700 mb-[6px] sm:mb-[8px]">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(event) =>
                          setFormData({ ...formData, email: event.target.value })
                        }
                        className="w-full rounded-[6px] border border-gray-300 px-[12px] py-[10px] text-[13px] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#8B0000] sm:px-[14px] sm:py-[12px] sm:text-[14px] md:px-[16px] md:py-[14px] md:text-[15px]"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] sm:gap-[18px] md:gap-[20px]">
                    <div>
                      <label htmlFor="phone" className="block text-[12px] sm:text-[13px] md:text-[14px] font-medium text-gray-700 mb-[6px] sm:mb-[8px]">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(event) =>
                          setFormData({ ...formData, phone: event.target.value })
                        }
                        className="w-full rounded-[6px] border border-gray-300 px-[12px] py-[10px] text-[13px] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#8B0000] sm:px-[14px] sm:py-[12px] sm:text-[14px] md:px-[16px] md:py-[14px] md:text-[15px]"
                        placeholder="+233 xxx xxx xxxx"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-[12px] sm:text-[13px] md:text-[14px] font-medium text-gray-700 mb-[6px] sm:mb-[8px]">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(event) =>
                          setFormData({ ...formData, subject: event.target.value })
                        }
                        className="w-full rounded-[6px] border border-gray-300 px-[12px] py-[10px] text-[13px] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#8B0000] sm:px-[14px] sm:py-[12px] sm:text-[14px] md:px-[16px] md:py-[14px] md:text-[15px]"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="permit">Building Permit</option>
                        <option value="business">Business Registration</option>
                        <option value="complaint">Complaint</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[12px] sm:text-[13px] md:text-[14px] font-medium text-gray-700 mb-[6px] sm:mb-[8px]">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(event) =>
                        setFormData({ ...formData, message: event.target.value })
                      }
                      className="w-full resize-none rounded-[6px] border border-gray-300 px-[12px] py-[10px] text-[13px] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#8B0000] sm:px-[14px] sm:py-[12px] sm:text-[14px] md:px-[16px] md:py-[14px] md:text-[15px]"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-[8px] rounded-[4px] bg-[#8B0000] px-[20px] py-[12px] text-[13px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#6B0000] sm:gap-[10px] sm:px-[24px] sm:py-[14px] sm:text-[14px] md:w-auto md:px-[28px] md:py-[16px] md:text-[15px] lg:px-[32px]"
                  >
                    <Send className="w-[18px] sm:w-[20px] h-[18px] sm:h-[20px]" />
                    Send Message
                  </button>
                </form>
              </div>

              <div className="mt-[24px] sm:mt-[28px] md:mt-[32px] rounded-[8px] overflow-hidden relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] border border-gray-200 bg-white shadow-sm">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              {mapOpenUrl && (
                <div className="mt-4 flex justify-end">
                  <a
                    href={mapOpenUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#8B0000] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#6B0000]"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open in Google Maps
                  </a>
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
