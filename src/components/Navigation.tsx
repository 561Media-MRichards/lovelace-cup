'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-forest-900/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand */}
          <Link href="#home" className="flex items-center space-x-3">
            <div className="w-10 h-12 flex items-center justify-center">
              <img 
                src="/lmc-logo.svg" 
                alt="Lovelace Memorial Cup - Cancer Awareness Ribbon" 
                className="w-8 h-10 filter drop-shadow-lg hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div>
              <div className="text-white font-display font-bold text-lg">
                Lovelace Memorial Cup
              </div>
              <div className="text-gold-300 text-xs">
                In a world full of hate... let&apos;s show some LOVE!
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-gold-300 transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://www.eventbrite.com/e/lovelacememorialcup2-tickets-1403964378249"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold-500 text-forest-900 px-6 py-2 rounded-full font-semibold hover:bg-gold-400 hover:text-forest-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Register Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
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

        {/* Mobile Navigation */}
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
                className="text-white hover:text-gold-300 transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://www.eventbrite.com/e/lovelacememorialcup2-tickets-1403964378249"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold-500 text-forest-900 px-6 py-3 rounded-full font-semibold hover:bg-gold-400 hover:text-forest-700 transition-all duration-200 text-center transform hover:scale-105 shadow-lg hover:shadow-xl"
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