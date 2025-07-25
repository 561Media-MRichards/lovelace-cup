'use client';

import { useEffect, useState } from 'react';

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const eventDate = new Date('2025-08-15T08:00:00');
    
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

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-golf-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 fairway-texture opacity-20"></div>
      
      {/* Decorative Golf Ball */}
      <div className="absolute top-20 right-20 w-20 h-20 bg-white rounded-full golf-ball-pattern opacity-10 animate-bounce-slow hidden lg:block"></div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-20">
        {/* Main Heading */}
        <div className="animate-fade-in">
          {/* Cancer Awareness Ribbon Logo */}
          <div className="flex justify-center mb-6">
            <img 
              src="/lmc-logo.svg" 
              alt="Lovelace Memorial Cup - Cancer Awareness Ribbon" 
              className="w-20 h-24 filter drop-shadow-2xl animate-pulse-slow hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl mb-6 leading-tight">
            Lovelace
            <span className="block text-gold-300 animate-pulse-slow">Memorial Cup</span>
          </h1>
          
          {/* Tagline */}
          <div className="text-gold-200 text-xl sm:text-2xl lg:text-3xl mb-8 font-light italic">
            &quot;In a world full of hate... let&apos;s show some LOVE!&quot;
          </div>
        </div>

        {/* Event Details */}
        <div className="animate-slide-up bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-12 border border-gold-300/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-gold-300 text-lg font-semibold">📅 Date</div>
              <div className="text-2xl font-bold">August 15th, 2025</div>
            </div>
            <div className="space-y-2">
              <div className="text-gold-300 text-lg font-semibold">⏰ Time</div>
              <div className="text-2xl font-bold">8:00 AM</div>
            </div>
            <div className="space-y-2">
              <div className="text-gold-300 text-lg font-semibold">🏌️ Venue</div>
              <div className="text-2xl font-bold">Sycamore Ridge</div>
              <div className="text-lg">Golf Course</div>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="mb-12 animate-slide-up">
          <h2 className="text-2xl font-semibold mb-6 text-gold-200">Tournament Begins In</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="bg-forest-900/50 backdrop-blur-md rounded-lg p-4 border border-gold-300/30">
                <div className="text-3xl font-bold text-gold-300">{value}</div>
                <div className="text-sm uppercase tracking-wide text-gold-200">
                  {unit}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <a
            href="https://www.eventbrite.com/e/lovelacememorialcup2-tickets-1403964378249"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold-500 text-forest-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-gold-400 hover:text-forest-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-2xl"
          >
            🏌️ Register to Play
          </a>
          <a
            href="#sponsorship"
            className="border-2 border-gold-300 text-gold-300 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gold-300 hover:text-forest-900 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-2xl"
          >
            💛 Sponsor the Event
          </a>
        </div>

        {/* Mission Statement */}
        <div className="mt-16 animate-fade-in">
          <div className="bg-forest-900/30 backdrop-blur-md rounded-xl p-6 border border-gold-300/20 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-gold-300">Our Mission</h3>
            <p className="text-lg leading-relaxed text-gold-100">
              Supporting families battling cancer through the power of community, 
              golf, and love. Every swing counts, every donation matters, 
              and every moment together helps heal hearts.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gold-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gold-300 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;