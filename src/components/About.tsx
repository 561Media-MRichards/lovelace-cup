'use client';

import { useEffect, useRef } from 'react';
import { Heart, Users, Trophy, Ribbon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const stats = [
    { number: '20+', label: 'Teams Goal' },
    { number: '$10K', label: 'Fundraising Target' },
    { number: '15+', label: 'Families Supported' },
    { number: '3rd', label: 'Annual Tournament' },
  ];

  const features = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Supporting Families',
      description: 'Every dollar raised goes directly to families battling cancer, providing financial support and hope during their most challenging times.',
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: 'Golf with Purpose',
      description: 'Enjoy a beautiful day of golf at Sycamore Ridge while making a meaningful difference in the lives of those who need it most.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community Unity',
      description: 'Bringing together golfers, families, and supporters to create a network of love and support that extends far beyond the course.',
    },
    {
      icon: <Ribbon className="w-6 h-6" />,
      title: 'Memorial Legacy',
      description: 'Honoring the memory of loved ones while creating a lasting impact through charitable giving and community support.',
    },
  ];

  const timeline = [
    { year: '2024', label: 'Year 1', detail: 'Inaugural tournament launched' },
    { year: '2025', label: 'Year 2', detail: 'Expanded to 20 teams' },
    { year: '2026', label: 'Year 3', detail: '$10K fundraising goal' },
  ];

  // GSAP scroll-triggered animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Mission quote section: fade up
        gsap.from('[data-about-mission]', {
          y: 40, opacity: 0, duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-about-mission]', start: 'top 85%' },
        });

        // Stats countUp animation
        const statEls = gsap.utils.toArray<HTMLElement>('[data-stat-number]');
        statEls.forEach((el) => {
          const raw = el.getAttribute('data-stat-number') || '';
          const prefix = raw.replace(/[\d,]+/, '').charAt(0) === '$' ? '$' : '';
          const suffix = raw.replace(/[\d,$]+/, '') || '';
          const numericStr = raw.replace(/[^0-9]/g, '');
          const target = parseInt(numericStr, 10);

          if (isNaN(target)) return;

          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.5,
            ease: 'power2.out',
            snap: { val: 1 },
            scrollTrigger: { trigger: el, start: 'top 85%' },
            onUpdate: () => {
              el.textContent = `${prefix}${obj.val.toLocaleString()}${suffix}`;
            },
          });
        });

        // Feature cards: stagger fade-up
        gsap.from('[data-feature-card]', {
          y: 40, opacity: 0, duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: '[data-feature-grid]', start: 'top 80%' },
        });

        // Memorial photo: clipPath circle reveal
        gsap.from('[data-memorial-photo]', {
          clipPath: 'circle(0% at 50% 50%)',
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: '[data-memorial-photo]', start: 'top 75%' },
        });

        // Memorial text: fade up
        gsap.from('[data-memorial-text] > *', {
          y: 30, opacity: 0, duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: '[data-memorial-text]', start: 'top 80%' },
        });

        // Timeline items: sequential fade-in from left to right
        gsap.from('[data-timeline-item]', {
          x: -30, opacity: 0, duration: 0.7,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: { trigger: '[data-timeline]', start: 'top 85%' },
        });

        // Our Story section: fade up
        gsap.from('[data-our-story]', {
          y: 40, opacity: 0, duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-our-story]', start: 'top 80%' },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="about" className="py-24 bg-midnight-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Quote */}
        <div data-about-mission className="text-center mb-20 max-w-4xl mx-auto">
          <div className="relative">
            <span className="absolute -top-8 -left-4 text-8xl text-amber-500/20 font-display">&ldquo;</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ivory-50 leading-tight">
              More than a tournament — a celebration of{' '}
              <span className="text-amber-400">life, love,</span> and community
            </h2>
            <span className="absolute -bottom-8 -right-4 text-8xl text-amber-500/20 font-display">&rdquo;</span>
          </div>
          <p className="text-ivory-200 text-lg mt-8 max-w-2xl mx-auto">
            The Lovelace Memorial Cup brings together golfers, families, and supporters
            to make a real difference for those facing cancer.
          </p>
        </div>

        {/* Stats Row */}
        <div className="glass rounded-2xl p-8 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div data-stat-number={stat.number} className="font-display text-4xl sm:text-5xl font-bold text-amber-400">
                  {stat.number}
                </div>
                <div className="text-ivory-200 text-sm uppercase tracking-wide mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div data-feature-grid className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              data-feature-card
              className="glass rounded-xl p-8 hover:border-amber-500/30 transition-all duration-300"
            >
              <div className="text-amber-500 mb-4">{feature.icon}</div>
              <h3 className="font-display font-semibold text-xl text-ivory-50 mb-3">
                {feature.title}
              </h3>
              <p className="text-ivory-200 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Memorial Section */}
        <div className="glass rounded-3xl p-8 md:p-12 mb-20">
          <div className="text-center mb-10">
            <h3 className="font-display font-bold text-3xl sm:text-4xl text-ivory-50 mb-2">
              In Loving Memory of Chase Lovelace
            </h3>
            <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div data-memorial-photo className="relative">
                <div className="w-72 sm:w-80 aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/Chase drum smiling front.jpg"
                    alt="Chase Lovelace"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/40 via-transparent to-transparent" />
                </div>
                <div className="absolute -inset-2 border border-amber-500/15 rounded-3xl -z-10" />
              </div>
            </div>

            <div data-memorial-text className="space-y-6">
              <p className="text-ivory-100 text-lg leading-relaxed">
                Chase Lovelace was a vibrant soul who brought joy and music to everyone around him.
                His passion for life, infectious smile, and caring heart touched countless lives in our community.
              </p>
              <p className="text-ivory-100 text-lg leading-relaxed">
                Though cancer took him from us too soon, Chase&apos;s spirit lives on through this memorial
                tournament. His love for bringing people together and supporting others in their time
                of need continues to inspire our mission.
              </p>
              <div className="border-l-2 border-amber-500 pl-6 py-2">
                <p className="text-ivory-200 italic font-display text-lg">
                  &ldquo;Chase believed in the power of community and the importance of showing love to those
                  who need it most. This tournament carries forward his legacy of compassion and hope.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Tournament Timeline */}
          <div data-timeline className="mt-16 pt-12 border-t border-midnight-700">
            <h4 className="font-display font-semibold text-xl text-ivory-50 text-center mb-8">
              Our Journey
            </h4>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {timeline.map((item, index) => (
                <div key={index} data-timeline-item className="flex items-center gap-4">
                  <div className={`text-center ${index === timeline.length - 1 ? 'opacity-100' : 'opacity-70'}`}>
                    <div className={`font-display text-3xl font-bold ${index === timeline.length - 1 ? 'text-amber-400' : 'text-ivory-100'}`}>
                      {item.year}
                    </div>
                    <div className="text-amber-500 text-xs uppercase tracking-widest">{item.label}</div>
                    <div className="text-ivory-200 text-sm mt-1">{item.detail}</div>
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="hidden md:block w-16 h-px bg-midnight-700" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Story — amber accent section */}
        <div data-our-story className="bg-amber-500 rounded-2xl p-8 sm:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-display font-bold text-3xl sm:text-4xl text-midnight-950 mb-8">
              Our Story
            </h3>
            <div className="space-y-6 text-lg leading-relaxed text-midnight-900">
              <p>
                Founded in memory of a beloved community member, the Lovelace Memorial Cup
                represents the power of coming together in times of need. When families face
                the overwhelming challenge of cancer, they shouldn&apos;t have to face it alone.
              </p>
              <p>
                Through this annual tournament, we&apos;ve created a tradition that combines our
                love of golf with our commitment to supporting one another. Every participant,
                sponsor, and volunteer contributes to a legacy of love that grows stronger each year.
              </p>
              <blockquote className="font-display text-2xl font-bold italic text-midnight-950/80 border-l-4 border-midnight-950/30 pl-6 my-8 text-left">
                &ldquo;In a world full of hate... let&apos;s show some LOVE!&rdquo;
              </blockquote>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="font-display font-semibold text-2xl text-ivory-50 mb-6">
            Ready to Make a Difference?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#registration"
              className="bg-amber-500 text-midnight-950 px-8 py-4 rounded-full font-semibold hover:bg-amber-400 transition-colors duration-200 shadow-lg shadow-amber-500/20"
            >
              View Registration Options
            </a>
            <a
              href="#contact"
              className="border-2 border-ivory-200/30 text-ivory-50 px-8 py-4 rounded-full font-semibold hover:border-amber-400 hover:text-amber-400 transition-all duration-200"
            >
              Get Involved
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
