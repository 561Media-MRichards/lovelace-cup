'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Registration from '@/components/Registration';
import Sponsorship from '@/components/Sponsorship';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Registration />
        <Sponsorship />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
