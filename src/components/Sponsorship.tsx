'use client';

import { useEffect, useRef } from 'react';
import { Check, Target, Briefcase, Heart, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Sponsorship = () => {
  const containerRef = useRef<HTMLElement>(null);
  const sponsorshipTiers = [
    {
      name: 'Hole Sponsor',
      price: '$300',
      borderColor: 'border-t-ivory-200/30',
      benefits: [
        'Tee box signage with company logo',
        'Recognition in tournament materials',
        'Social media mention',
        'Website listing',
      ],
    },
    {
      name: 'Cart Sponsor',
      price: '$600',
      borderColor: 'border-t-ivory-100',
      benefits: [
        'Logo on golf cart signage',
        'All Hole Sponsor benefits',
        'Premium website placement',
        'Newsletter recognition',
      ],
    },
    {
      name: 'Gold Sponsor',
      price: '$1,250',
      borderColor: 'border-t-sage-400',
      popular: true,
      benefits: [
        'Team of 4 golfers included',
        'Premium logo placement',
        'Tee box sponsorship',
        'Awards ceremony recognition',
        'VIP treatment and parking',
        'Professional photos provided',
      ],
    },
    {
      name: 'Title Sponsor',
      price: '$3,000',
      borderColor: 'border-t-amber-500',
      benefits: [
        'Event naming rights',
        'Two teams of 4 included',
        'Maximum logo visibility',
        'Speaking opportunity at ceremony',
        'Custom recognition package',
        'Year-round partnership benefits',
      ],
    },
  ];

  const benefits = [
    { icon: <Target className="w-6 h-6" />, title: 'Targeted Marketing', description: 'Connect with local golf enthusiasts and community leaders.' },
    { icon: <Briefcase className="w-6 h-6" />, title: 'Business Networking', description: 'Build relationships with sponsors and community-minded participants.' },
    { icon: <Heart className="w-6 h-6" />, title: 'Community Impact', description: 'Demonstrate your commitment to supporting families facing cancer.' },
    { icon: <TrendingUp className="w-6 h-6" />, title: 'Brand Visibility', description: 'Exposure through signage, social media, and event marketing.' },
  ];

  // GSAP scroll-triggered animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Benefit cards: stagger fade up
        gsap.from('[data-benefit-card]', {
          y: 40, opacity: 0, duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: '[data-benefit-grid]', start: 'top 80%' },
        });

        // Tier cards: stagger fade up with slight delay after benefits
        gsap.from('[data-tier-card]', {
          y: 50, opacity: 0, duration: 0.9,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: '[data-tier-grid]', start: 'top 80%' },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="sponsorship" className="py-20 bg-midnight-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ivory-50 mb-4 tracking-tight">
            Sponsorship Opportunities
          </h2>
          <div className="w-16 h-0.5 bg-sage-400 mx-auto mb-5" />
          <p className="text-ivory-200 text-lg max-w-2xl mx-auto">
            Put your brand in front of 80+ golfers and the entire community behind them.
            Every sponsorship tier includes real visibility and the chance to be part of something people remember.
          </p>
        </div>

        {/* Why Sponsor */}
        <div data-benefit-grid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {benefits.map((benefit, index) => (
            <div key={index} data-benefit-card className="glass rounded-xl p-6 text-center">
              <div className="text-sage-400 mb-4 flex justify-center">{benefit.icon}</div>
              <h4 className="font-display font-semibold text-lg text-ivory-50 mb-2">
                {benefit.title}
              </h4>
              <p className="text-ivory-200 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tier Cards */}
        <div data-tier-grid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {sponsorshipTiers.map((tier, index) => (
            <div
              key={index}
              data-tier-card
              className={`relative glass rounded-xl border-t-4 ${tier.borderColor} p-6 hover:border-amber-500/30 transition-all duration-300 ${
                tier.popular ? 'amber-glow-ring' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-midnight-950 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide">
                  Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h4 className="font-display font-bold text-lg text-ivory-50 mb-2">
                  {tier.name}
                </h4>
                <div className="font-display text-3xl font-bold text-sage-300">
                  {tier.price}
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {tier.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-sage-400 mt-0.5 flex-shrink-0" />
                    <span className="text-ivory-200">{benefit}</span>
                  </li>
                ))}
              </ul>

              <a
                href="mailto:wolfersway@gmail.com?subject=Sponsorship Inquiry - Lovelace Memorial Cup"
                className="block w-full bg-sage-700 text-white text-center py-3 rounded-full font-semibold hover:bg-sage-600 transition-all duration-200"
              >
                Become a Sponsor
              </a>
            </div>
          ))}
        </div>

        {/* Custom Sponsorship */}
        <div className="glass rounded-2xl p-8 text-center mb-16">
          <h3 className="font-display font-bold text-2xl text-ivory-50 mb-4">
            Custom Sponsorship Packages
          </h3>
          <p className="text-ivory-200 text-lg mb-8 max-w-2xl mx-auto">
            Have a specific sponsorship idea? We&apos;d love to create a custom package
            that meets your goals while supporting our cause.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:wolfersway@gmail.com?subject=Custom Sponsorship Package Inquiry"
              className="bg-amber-500 text-midnight-950 px-8 py-4 rounded-full font-bold hover:bg-amber-400 transition-colors duration-200"
            >
              Discuss Custom Package
            </a>
          </div>
        </div>

        {/* Sponsor Recognition */}
        <div className="glass rounded-2xl p-8 text-center">
          <h3 className="font-display font-bold text-2xl text-ivory-50 mb-4">
            Thank You to Our Sponsors
          </h3>
          <p className="text-ivory-200 mb-8 max-w-2xl mx-auto">
            Our sponsors make this tournament possible. Their generous support allows
            us to focus on what matters most.
          </p>

          <div className="mb-8">
            <div className="text-sage-400 text-sm uppercase tracking-widest mb-4">
              Presenting Sponsor
            </div>
            <a
              href="https://www.561media.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-80 transition-opacity duration-200"
            >
              <img
                src="/561Media.svg"
                alt="561Media - Presenting Sponsor"
                className="h-12 w-auto object-contain mx-auto brightness-0 invert"
              />
            </a>
          </div>

          <a
            href="mailto:wolfersway@gmail.com?subject=Sponsorship Information Request"
            className="inline-block bg-amber-500 text-midnight-950 px-8 py-4 rounded-full font-bold hover:bg-amber-400 transition-colors duration-200"
          >
            Join Our Sponsor Family
          </a>
        </div>
      </div>
    </section>
  );
};

export default Sponsorship;
