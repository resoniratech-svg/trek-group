"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-black py-16 md:py-24 relative z-10 border-t border-gray-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <img
                src="/treklogo.png"
                alt="Trek Group Logo"
                className="w-20 h-20 object-contain"
              />
              <span className="text-3xl font-black tracking-tighter">
                TREK<span className="text-secondary">GROUP</span>
              </span>
            </Link>
            <p className="text-black/80 leading-relaxed mb-8 text-base font-medium pr-4">
              Your premier partner for company formation and PRO services in Qatar. We handle the bureaucracy while you focus on growth.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/trek-group/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a
                href="https://www.instagram.com/trekgroupsbs/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a
                href="https://wa.me/97430516559"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-lg font-black mb-6 text-black">Quick Links</h4>
            <ul className="space-y-4 text-base font-medium">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Services", href: "/services" },
                { name: "FAQ", href: "/faq" },
                { name: "Contact Us", href: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-black/80 hover:text-secondary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-3">
            <h4 className="text-lg font-black mb-6 text-black">Our Services</h4>
            <ul className="space-y-4 text-base font-medium">
              {[
                { name: "Company Formation", id: "company-formation" },
                { name: "PRO Service", id: "pro-service" },
                { name: "Translation and Attestation", id: "translation-and-attestation" },
                { name: "Branding Services", id: "branding-services" },
                { name: "International Business Events", id: "international-business-events" },
                { name: "Software Services", id: "software-services" }
              ].map((service) => (
                <li key={service.name}>
                  <Link href={`/services?service=${service.id}`} className="text-black/80 hover:text-secondary transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-4 flex flex-col gap-8">
            <div>
              <h4 className="text-lg font-black mb-6 text-black">Contact Us</h4>
              <ul className="space-y-5 text-base font-medium">
                <li className="flex gap-4 items-start">
                  <MapPin className="text-secondary shrink-0 mt-1" size={20} />
                  <span className="text-black/80 leading-relaxed">
                    TREK GROUP Corporate Head Office<br />
                    Office No. 8, 2nd Floor<br />
                    Building No. 210, Street No. 330, Zone No. 43<br />
                    Rawdat Al Khail Street, Nuaija<br />
                    Doha, Qatar
                  </span>
                </li>
                <li className="flex gap-4 items-center">
                  <Phone className="text-secondary shrink-0" size={20} />
                  <span className="text-black/80">+974 3005 6030<br />+974 3051 6558</span>
                </li>
                <li className="flex gap-4 items-center">
                  <Mail className="text-secondary shrink-0" size={20} />
                  <span className="text-black/80">info@trekgroups.com</span>
                </li>
              </ul>
            </div>

            <a
              href="https://maps.app.goo.gl/iQzYUsFQEKsy9aWv9?g_st=iwb"
              target="_blank"
              rel="noopener noreferrer"
              className="relative block rounded-2xl overflow-hidden border border-gray-100 shadow-lg w-full h-48 md:h-56 group cursor-pointer"
            >
              {/* pointer-events-none ensures the user clicks the link instead of interacting with the iframe directly */}
              <iframe
                src="https://maps.google.com/maps?q=25.250559,51.528416&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full pointer-events-none"
              ></iframe>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center backdrop-blur-[0px] group-hover:backdrop-blur-[1px]">
                <div className="bg-white text-secondary font-bold px-6 py-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 flex items-center gap-2">
                  <MapPin size={18} />
                  Open in Google Maps
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-black/60 text-base font-medium">
          <p>© 2026 Trek Group Qatar. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
