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
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com/company/trek-group-bs/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#0077B5] hover:text-white transition-colors"
                title="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a
                href="https://www.instagram.com/trekgroupsbs?igsh=d2RmazB2b2c1dHpl&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white transition-colors"
                title="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a
                href="https://www.facebook.com/share/1QvfRvx5vm/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-colors"
                title="Facebook"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8H7v3h2v9h3v-9h3.625L16 8h-3V6.125C13 5.484 13.375 5 14.375 5H16V2h-2.625C10.625 2 9 3.625 9 6.125V8z"/></svg>
              </a>
              <a
                href="https://www.tiktok.com/@trek.group.busine?_r=1&_t=ZS-96bxH8cdsob"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                title="TikTok"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.48A6.3 6.3 0 0 0 19.3 14V8.06a8.21 8.21 0 0 0 4.7 1.47V6.08a4.8 4.8 0 0 1-4.41-4.39v4.5a4.83 4.83 0 0 1-.002.502h.002z"/></svg>
              </a>
              <a
                href="https://snapchat.com/t/3NFNQBYL"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#FFFC00] hover:text-black transition-colors"
                title="Snapchat"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c-3.9 0-7 2.6-7 5.9 0 1.4.6 2.7 1.6 3.7-.3.3-.7.7-1.1 1.2-.5.6-.8 1.3-.8 2.1 0 .9.5 1.7 1.3 2.1 1.1.6 2.4.9 3.8.9 1 0 1.9-.2 2.8-.5.8.5 1.7.8 2.8.8 1.4 0 2.7-.3 3.8-.9.8-.4 1.3-1.2 1.3-2.1 0-.8-.3-1.5-.8-2.1-.4-.5-.8-.9-1.1-1.2 1-1 1.6-2.3 1.6-3.7 0-3.3-3.1-5.9-7-5.9z"/></svg>
              </a>
              <a
                href="https://youtube.com/@trekgroupbusinessservices?si=D3zQjOUmxvyCULWN"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-colors"
                title="YouTube"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
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
            <ul className="space-y-3.5 text-base font-medium">
              {[
                { name: "Company Formation / Setup", id: "company-formation-business-setup" },
                { name: "100% Foreign Ownership", id: "one-hundred-percent-foreign-ownership" },
                { name: "Qatari Sponsor Services", id: "qatari-sponsor-services" },
                { name: "Share Transfer & Amendments", id: "share-transfer-cr-amendments" },
                { name: "PRO Services", id: "pro-services" },
                { name: "Legal Translation", id: "legal-translation" },
                { name: "Certificate Attestation", id: "certificate-attestation" },
                { name: "Visa Services", id: "visa-services" },
                { name: "Corporate Banking Support", id: "corporate-bank-account-assistance" },
                { name: "Tax & Audit Support", id: "tax-documentation-support" },
                { name: "Software Services", id: "software-services" },
                { name: "Other Support Services", id: "additional-business-services" }
              ].map((service) => (
                <li key={service.name}>
                  <Link href={`/services/${service.id}`} className="text-black/80 hover:text-secondary transition-colors text-sm">
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
                  <span className="text-black/80 leading-relaxed text-sm">
                    TREK GROUP Corporate Head Office<br />
                    Office no -8, 2nd floor<br />
                    Building no -210, Street - 330, Zone -43<br />
                    Entrance - Near Baladna Hypermarket<br />
                    Doha, Qatar
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <Phone className="text-secondary shrink-0 mt-1" size={20} />
                  <span className="text-black/80 text-sm">
                    Mobile: +974 3051 6559 / 3005 6030<br />
                    Tel: +974 4007 0727
                  </span>
                </li>
                <li className="flex gap-4 items-center">
                  <Mail className="text-secondary shrink-0" size={20} />
                  <span className="text-black/80 text-sm">info@trekgroups.com</span>
                </li>
              </ul>
            </div>

            <a
              href="https://maps.app.goo.gl/BSpt8qfKHwQ7WTet9?g_st=ic"
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
      </div>

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-black/60 text-base font-medium">
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
