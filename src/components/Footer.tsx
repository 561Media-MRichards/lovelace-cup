'use client';

import { Mail, MapPin, Calendar } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#registration', label: 'Registration' },
    { href: '#sponsorship', label: 'Sponsorship' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-midnight-950 border-t border-midnight-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/LMC-Main.svg"
                alt="Lovelace Memorial Cup"
                className="h-10 w-auto object-contain"
              />
              <div>
                <div className="font-display font-bold text-ivory-50">Lovelace Memorial Cup</div>
                <div className="text-sage-400 text-xs italic">3rd Annual - July 2026</div>
              </div>
            </div>
            <p className="text-ivory-200/70 text-sm leading-relaxed max-w-sm">
              Supporting families battling cancer through the power of community, golf, and love.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-widest text-sage-400 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-ivory-200/70 hover:text-sage-300 transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-widest text-sage-400 mb-4">
              Contact
            </h3>
            <div className="space-y-3 text-sm text-ivory-200/70">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sage-400/60" />
                <a href="mailto:wolfersway@gmail.com" className="hover:text-sage-300 transition-colors">
                  wolfersway@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sage-400/60" />
                <span>July 15, 2026 - 8:00 AM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sage-400/60" />
                <span>Sycamore Ridge Golf Course</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-midnight-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-ivory-200/40 text-xs">
            &copy; {currentYear} Lovelace Memorial Cup. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-ivory-200/40 text-xs">
            <span>Website by</span>
            <a
              href="https://www.561media.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img src="/561Media.svg" alt="561Media" className="h-5 w-auto object-contain brightness-0 invert opacity-40 hover:opacity-70 transition-opacity" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
