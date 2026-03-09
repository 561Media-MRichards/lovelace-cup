'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 50);
      setIsHidden(currentY > 300 && currentY > lastScrollY.current);
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#registration', label: 'Register' },
    { href: '#sponsorship', label: 'Sponsor' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      } ${
        isScrolled
          ? 'glass-strong shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-1">
          <Link href="#home" className="flex items-center">
            <img
              src="/LMC-Main.svg"
              alt="Lovelace Memorial Cup"
              className="h-14 sm:h-16 w-auto object-contain hover:scale-105 transition-transform duration-200"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-ivory-100 hover:text-sage-300 transition-colors duration-200 text-sm font-medium uppercase tracking-widest"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="#registration"
              className="bg-sage-500 text-white px-6 py-2.5 rounded-full font-semibold text-sm uppercase tracking-wide hover:bg-sage-400 transition-all duration-200 shadow-lg shadow-sage-500/20"
            >
              Register Now
            </a>
          </div>

          <button
            className="md:hidden text-ivory-50 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-around">
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>

        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-ivory-100 hover:text-sage-300 transition-colors duration-200 font-medium py-2 uppercase tracking-widest text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="#registration"
              className="bg-sage-500 text-white px-6 py-3 rounded-full font-semibold text-center uppercase tracking-wide hover:bg-sage-400 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Register Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
