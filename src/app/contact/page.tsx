"use client";

import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import { MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message. We will get back to you shortly.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="Contact Us"
        breadcrumbs={[{ label: "Contact Us" }]}
      />

      <section className="py-[40px] sm:py-[60px] md:py-[80px]">
        <div className="container mx-auto px-[15px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px] sm:gap-[28px] md:gap-[30px] lg:gap-[40px]">
            <div className="lg:col-span-1">
              <h2 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 mb-[20px] sm:mb-[24px] md:mb-[28px]">Get In Touch</h2>
              <p className="text-gray-600 mb-[24px] sm:mb-[28px] md:mb-[32px] text-[13px] sm:text-[14px] md:text-[15px]">
                We are here to help and answer any questions you might have. We look forward to hearing from you.
              </p>

              <div className="space-y-[20px] sm:space-y-[24px] md:space-y-[28px]">
                <div className="flex items-start gap-[14px] sm:gap-[16px] md:gap-[18px]">
                  <div className="w-[44px] sm:w-[48px] h-[44px] sm:h-[48px] bg-[#8B0000] rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-[20px] sm:w-[22px] h-[20px] sm:h-[22px] text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-[6px] sm:mb-[8px] text-[14px] sm:text-[15px] md:text-[16px]">Address</h3>
                    <p className="text-gray-600 text-[12px] sm:text-[13px] md:text-[14px] leading-[1.5] sm:leading-[1.6]">
                      P. O. Box WJ 305<br />
                      Ngleshie Amanfro<br />
                      Behind Galilea Market
                    </p>
                    <p className="text-[#8B0000] font-medium text-[12px] sm:text-[13px] md:text-[14px] mt-[6px] sm:mt-[8px]">
                      Digital Address: GS0623-8123
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-[14px] sm:gap-[16px] md:gap-[18px]">
                  <div className="w-[44px] sm:w-[48px] h-[44px] sm:h-[48px] bg-[#8B0000] rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-[20px] sm:w-[22px] h-[20px] sm:h-[22px] text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-[6px] sm:mb-[8px] text-[14px] sm:text-[15px] md:text-[16px]">Phone</h3>
                    <p className="text-gray-600 text-[12px] sm:text-[13px] md:text-[14px] leading-[1.5] sm:leading-[1.6]">
                      +233 (0)30 290 8466<br />
                      +233 (0)30 290 8467
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-[14px] sm:gap-[16px] md:gap-[18px]">
                  <div className="w-[44px] sm:w-[48px] h-[44px] sm:h-[48px] bg-[#8B0000] rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-[20px] sm:w-[22px] h-[20px] sm:h-[22px] text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-[6px] sm:mb-[8px] text-[14px] sm:text-[15px] md:text-[16px]">Email</h3>
                    <p className="text-gray-600 text-[12px] sm:text-[13px] md:text-[14px]">
                      info@gsma.gov.gh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-[14px] sm:gap-[16px] md:gap-[18px]">
                  <div className="w-[44px] sm:w-[48px] h-[44px] sm:h-[48px] bg-[#8B0000] rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="w-[20px] sm:w-[22px] h-[20px] sm:h-[22px] text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-[6px] sm:mb-[8px] text-[14px] sm:text-[15px] md:text-[16px]">Working Hours</h3>
                    <p className="text-gray-600 text-[12px] sm:text-[13px] md:text-[14px] leading-[1.5] sm:leading-[1.6]">
                      Monday - Friday: 8:00 AM - 5:00 PM<br />
                      Saturday & Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-[24px] sm:mt-[28px] md:mt-[32px] pt-[20px] sm:pt-[24px] md:pt-[28px] border-t border-gray-200">
                <h3 className="font-bold text-gray-900 mb-[14px] sm:mb-[16px] text-[14px] sm:text-[15px] md:text-[16px]">Follow Us</h3>
                <div className="flex gap-[10px] sm:gap-[12px]">
                  <a href="#" className="w-[40px] sm:w-[44px] h-[40px] sm:h-[44px] bg-[#8B0000] rounded-lg flex items-center justify-center hover:bg-[#6B0000] transition-colors">
                    <Facebook className="w-[18px] sm:w-[20px] h-[18px] sm:h-[20px] text-white" />
                  </a>
                  <a href="#" className="w-[40px] sm:w-[44px] h-[40px] sm:h-[44px] bg-[#8B0000] rounded-lg flex items-center justify-center hover:bg-[#6B0000] transition-colors">
                    <Twitter className="w-[18px] sm:w-[20px] h-[18px] sm:h-[20px] text-white" />
                  </a>
                  <a href="#" className="w-[40px] sm:w-[44px] h-[40px] sm:h-[44px] bg-[#8B0000] rounded-lg flex items-center justify-center hover:bg-[#6B0000] transition-colors">
                    <Instagram className="w-[18px] sm:w-[20px] h-[18px] sm:h-[20px] text-white" />
                  </a>
                  <a href="#" className="w-[40px] sm:w-[44px] h-[40px] sm:h-[44px] bg-[#8B0000] rounded-lg flex items-center justify-center hover:bg-[#6B0000] transition-colors">
                    <Linkedin className="w-[18px] sm:w-[20px] h-[18px] sm:h-[20px] text-white" />
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-lg p-[20px] sm:p-[24px] md:p-[28px] lg:p-[32px]">
                <h2 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 mb-[8px] sm:mb-[10px]">Send Us A Message</h2>
                <p className="text-gray-600 mb-[20px] sm:mb-[24px] md:mb-[28px] text-[13px] sm:text-[14px] md:text-[15px]">Fill out the form below and we will respond as soon as possible.</p>

                <form onSubmit={handleSubmit} className="space-y-[16px] sm:space-y-[18px] md:space-y-[20px]">
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
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-[12px] sm:px-[14px] md:px-[16px] py-[10px] sm:py-[12px] md:py-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent text-[13px] sm:text-[14px] md:text-[15px]"
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
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-[12px] sm:px-[14px] md:px-[16px] py-[10px] sm:py-[12px] md:py-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent text-[13px] sm:text-[14px] md:text-[15px]"
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
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-[12px] sm:px-[14px] md:px-[16px] py-[10px] sm:py-[12px] md:py-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent text-[13px] sm:text-[14px] md:text-[15px]"
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
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full px-[12px] sm:px-[14px] md:px-[16px] py-[10px] sm:py-[12px] md:py-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent text-[13px] sm:text-[14px] md:text-[15px]"
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
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-[12px] sm:px-[14px] md:px-[16px] py-[10px] sm:py-[12px] md:py-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent resize-none text-[13px] sm:text-[14px] md:text-[15px]"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full md:w-auto px-[20px] sm:px-[24px] md:px-[28px] lg:px-[32px] py-[12px] sm:py-[14px] md:py-[16px] bg-[#8B0000] text-white font-bold rounded-lg hover:bg-[#6B0000] transition-colors flex items-center justify-center gap-[8px] sm:gap-[10px] text-[13px] sm:text-[14px] md:text-[15px]"
                  >
                    <Send className="w-[18px] sm:w-[20px] h-[18px] sm:h-[20px]" />
                    Send Message
                  </button>
                </form>
              </div>

              <div className="mt-[24px] sm:mt-[28px] md:mt-[32px] rounded-lg overflow-hidden h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127065.46846890387!2d-0.3076706!3d5.5912456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9a7624b6c7d1%3A0x87b9e1a8fcc1f4c0!2sGa%20South%20Municipal%20Assembly!5e0!3m2!1sen!2sgh!4v1635000000000!5m2!1sen!2sgh"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
