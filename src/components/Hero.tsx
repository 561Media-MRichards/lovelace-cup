'use client';

import { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const eventDate = new Date('2026-07-15T08:00:00');

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = eventDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // GSAP entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Stagger title elements upward with opacity
        tl.from('[data-hero-label]', { y: 30, opacity: 0, duration: 0.8 })
          .from('[data-hero-title]', { y: 40, opacity: 0, duration: 1 }, '-=0.5')
          .from('[data-hero-subtitle]', { y: 30, opacity: 0, duration: 0.9 }, '-=0.6')
          .from('[data-hero-tagline]', { y: 20, opacity: 0, duration: 0.8 }, '-=0.5')
          // Photo: fade in + slight scale
          .from('[data-hero-photo]', { scale: 1.05, opacity: 0, duration: 1.2 }, '-=0.8')
          // Countdown numbers
          .from('[data-hero-countdown] > div', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.7')
          // CTAs
          .from('[data-hero-ctas]', { y: 20, opacity: 0, duration: 0.7 }, '-=0.4')
          // Event details bar: slide up from below
          .from('[data-hero-details]', { y: 40, opacity: 0, duration: 0.9 }, '-=0.4');
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen flex items-center bg-hero-gradient overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-amber-glow opacity-40" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left: Typography — 60% */}
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-4">
              <span data-hero-label className="inline-block text-amber-500 text-sm font-semibold uppercase tracking-[0.3em] border border-amber-500/30 px-4 py-1.5 rounded-full">
                3rd Annual
              </span>
              <h1 className="font-display">
                <span data-hero-title className="block text-7xl sm:text-8xl lg:text-9xl font-bold text-ivory-50 leading-[0.9]">
                  LOVELACE
                </span>
                <span data-hero-subtitle className="block text-5xl sm:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300 leading-tight mt-2">
                  Memorial Cup
                </span>
              </h1>
              <p data-hero-tagline className="text-ivory-200 text-xl sm:text-2xl font-display italic mt-4">
                &ldquo;In a world full of hate... let&rsquo;s show some LOVE!&rdquo;
              </p>
            </div>

            {/* Countdown */}
            <div data-hero-countdown className="flex gap-4 sm:gap-6">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="font-display text-4xl sm:text-5xl font-bold text-ivory-50">
                    {String(value).padStart(2, '0')}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-ivory-200 mt-1">
                    {unit}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div data-hero-ctas className="flex flex-col sm:flex-row gap-4">
              <a
                href="#registration"
                className="bg-amber-500 text-midnight-950 px-8 py-4 rounded-full text-lg font-bold hover:bg-amber-400 transition-all duration-200 shadow-lg shadow-amber-500/25 text-center"
              >
                Register Now
              </a>
              <a
                href="#sponsorship"
                className="border-2 border-ivory-200/30 text-ivory-50 px-8 py-4 rounded-full text-lg font-semibold hover:border-amber-400 hover:text-amber-400 transition-all duration-200 text-center"
              >
                Become a Sponsor
              </a>
            </div>
          </div>

          {/* Right: Chase photo — 40% */}
          <div className="lg:col-span-2 flex justify-center lg:justify-end">
            <div data-hero-photo className="relative">
              <div className="w-72 sm:w-80 lg:w-96 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                <img
                  src="/Chase black shirt 1.jpg"
                  alt="Chase Lovelace"
                  className="w-full h-full object-cover"
                />
                {/* Warm overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/60 via-transparent to-amber-500/10" />
              </div>
              {/* Decorative border accent */}
              <div className="absolute -inset-3 border border-amber-500/20 rounded-3xl -z-10" />
            </div>
          </div>
        </div>

        {/* Event details bar */}
        <div data-hero-details className="mt-16 glass rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <Calendar className="w-5 h-5 text-amber-500" />
              <div>
                <div className="text-ivory-200 text-sm uppercase tracking-wide">Date</div>
                <div className="text-ivory-50 font-semibold text-lg">July 15, 2026</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 md:border-x md:border-midnight-700">
              <Clock className="w-5 h-5 text-amber-500" />
              <div>
                <div className="text-ivory-200 text-sm uppercase tracking-wide">Shotgun Start</div>
                <div className="text-ivory-50 font-semibold text-lg">8:00 AM</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <MapPin className="w-5 h-5 text-amber-500" />
              <div>
                <div className="text-ivory-200 text-sm uppercase tracking-wide">Venue</div>
                <div className="text-ivory-50 font-semibold text-lg">Sycamore Ridge Golf Course</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-ivory-200/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-amber-500 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
