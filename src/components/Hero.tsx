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
    const eventDate = new Date('2026-06-29T08:00:00');

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

        tl.from('[data-hero-label]', { y: 30, opacity: 0, duration: 0.8 })
          .from('[data-hero-title]', { y: 40, opacity: 0, duration: 1 }, '-=0.5')
          .from('[data-hero-tagline]', { y: 20, opacity: 0, duration: 0.8 }, '-=0.5')
          .from('[data-hero-photo]', { scale: 1.05, opacity: 0, duration: 1.2 }, '-=0.8')
          .from('[data-hero-countdown] > div', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.7')
          .from('[data-hero-ctas]', { y: 20, opacity: 0, duration: 0.7 }, '-=0.4')
          .from('[data-hero-details]', { y: 40, opacity: 0, duration: 0.9 }, '-=0.4');
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen flex items-center bg-hero-gradient overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-amber-glow opacity-40" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left: Typography */}
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-5">
              <span data-hero-label className="inline-block text-sage-300 text-sm font-semibold uppercase tracking-[0.25em] border border-sage-400/30 bg-sage-700/20 px-4 py-1.5 rounded-full">
                3rd Annual Charity Golf Tournament &bull; 4-Man Scramble
              </span>
              <h1 className="font-display">
                <span data-hero-title className="block text-6xl sm:text-7xl lg:text-8xl font-bold text-ivory-50 leading-[0.95] tracking-tight">
                  Lovelace
                  <br />
                  Memorial Cup
                </span>
              </h1>
              <p data-hero-tagline className="text-ivory-200 text-lg sm:text-xl max-w-lg leading-relaxed">
                Every swing. Every dollar. Every heart on this course makes a difference.
              </p>
            </div>

            {/* Countdown */}
            <div data-hero-countdown className="flex gap-5 sm:gap-8">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="font-display text-3xl sm:text-4xl font-bold text-ivory-50 tabular-nums">
                    {String(value).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] uppercase tracking-widest text-ivory-200/70 mt-1">
                    {unit}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div data-hero-ctas className="flex flex-col sm:flex-row gap-4">
              <a
                href="#registration"
                className="bg-sage-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-sage-400 transition-all duration-200 shadow-lg shadow-sage-500/25 text-center"
              >
                Grab Your Spot
              </a>
              <a
                href="#sponsorship"
                className="border-2 border-amber-400/40 text-amber-300 px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-500 hover:text-midnight-950 hover:border-amber-500 transition-all duration-200 text-center"
              >
                Become a Sponsor
              </a>
            </div>
          </div>

          {/* Right: Chase photo */}
          <div className="lg:col-span-2 flex justify-center lg:justify-end">
            <div data-hero-photo className="relative">
              <div className="w-72 sm:w-80 lg:w-[22rem] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                <img
                  src="/Chase black shirt 1.jpg"
                  alt="Chase Lovelace"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/60 via-transparent to-sage-500/10" />
              </div>
              <div className="absolute -inset-3 border border-sage-400/20 rounded-3xl -z-10" />
            </div>
          </div>
        </div>

        {/* Event details bar */}
        <div data-hero-details className="mt-14 glass rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <Calendar className="w-5 h-5 text-sage-400" />
              <div>
                <div className="text-ivory-200/70 text-xs uppercase tracking-wide">Date</div>
                <div className="text-ivory-50 font-semibold">June 29, 2026</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 md:border-x md:border-midnight-700">
              <Clock className="w-5 h-5 text-sage-400" />
              <div>
                <div className="text-ivory-200/70 text-xs uppercase tracking-wide">Shotgun Start</div>
                <div className="text-ivory-50 font-semibold">8:00 AM</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <MapPin className="w-5 h-5 text-sage-400" />
              <div>
                <div className="text-ivory-200/70 text-xs uppercase tracking-wide">Venue</div>
                <a href="https://www.sycamoreridgegolf.com/" target="_blank" rel="noopener noreferrer" className="text-ivory-50 font-semibold hover:text-sage-300 transition-colors">
                  Sycamore Ridge Golf Course
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-ivory-200/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-sage-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
