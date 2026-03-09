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
      description: '100% of funds raised go directly to local families battling cancer. Your round of golf puts real money in the hands of people who need it most.',
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: 'Golf with Purpose',
      description: '18 holes at Sycamore Ridge, breakfast, lunch, contests, prizes, and the best company you\'ll find on a course. All for a cause that matters.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community Unity',
      description: 'This isn\'t just a tournament. It\'s 80+ golfers, local businesses, and families coming together for a day no one forgets.',
    },
    {
      icon: <Ribbon className="w-6 h-6" />,
      title: 'Memorial Legacy',
      description: 'Chase Lovelace brought people together everywhere he went. This tournament keeps that tradition alive, one year at a time.',
    },
  ];

  const timeline = [
    { year: '2024', label: 'Year 1', detail: 'Inaugural tournament launched' },
    { year: '2025', label: 'Year 2', detail: 'Expanded to 20 teams' },
    { year: '2026', label: 'Year 3', detail: '$10K fundraising goal' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-about-mission]', {
          y: 40, opacity: 0, duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-about-mission]', start: 'top 85%' },
        });

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
            val: target, duration: 1.5, ease: 'power2.out',
            snap: { val: 1 },
            scrollTrigger: { trigger: el, start: 'top 85%' },
            onUpdate: () => { el.textContent = `${prefix}${obj.val.toLocaleString()}${suffix}`; },
          });
        });

        gsap.from('[data-feature-card]', {
          y: 40, opacity: 0, duration: 0.8,
          ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: '[data-feature-grid]', start: 'top 80%' },
        });

        gsap.from('[data-memorial-photo]', {
          clipPath: 'circle(0% at 50% 50%)', duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: '[data-memorial-photo]', start: 'top 75%' },
        });

        gsap.from('[data-memorial-text] > *', {
          y: 30, opacity: 0, duration: 0.8,
          ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: '[data-memorial-text]', start: 'top 80%' },
        });

        gsap.from('[data-timeline-item]', {
          x: -30, opacity: 0, duration: 0.7,
          ease: 'power3.out', stagger: 0.2,
          scrollTrigger: { trigger: '[data-timeline]', start: 'top 85%' },
        });

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
    <section ref={containerRef} id="about" className="py-20 bg-ivory-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Quote */}
        <div data-about-mission className="text-center mb-14 max-w-3xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-midnight-900 leading-tight tracking-tight">
            A Day on the Course.
            <br />
            <span className="text-sage-600">A Lifetime of Impact.</span>
          </h2>
          <p className="text-midnight-700 text-lg mt-6 max-w-2xl mx-auto">
            What started as one round in Chase&apos;s honor has grown into our community&apos;s biggest day of giving.
            Grab your clubs, rally your team, and help us raise $10K for families fighting cancer.
          </p>
        </div>

        {/* Stats Row */}
        <div className="bg-sage-700 rounded-2xl p-8 mb-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div data-stat-number={stat.number} className="font-display text-4xl sm:text-5xl font-bold text-white">
                  {stat.number}
                </div>
                <div className="text-sage-200 text-sm uppercase tracking-wide mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div data-feature-grid className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {features.map((feature, index) => (
            <div
              key={index}
              data-feature-card
              className="card-light rounded-xl p-7 transition-all duration-300"
            >
              <div className="text-sage-600 mb-3">{feature.icon}</div>
              <h3 className="font-display font-semibold text-lg text-midnight-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-midnight-700 leading-relaxed text-[15px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Memorial Section */}
        <div className="card-light rounded-2xl p-8 md:p-10 mb-14">
          <div className="text-center mb-8">
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-midnight-900 mb-2">
              In Loving Memory of Chase Lovelace
            </h3>
            <div className="w-16 h-0.5 bg-sage-500 mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="flex justify-center">
              <div data-memorial-photo className="relative">
                <div className="w-64 sm:w-72 aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/Chase drum smiling front.jpg"
                    alt="Chase Lovelace"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
                <div className="absolute -inset-2 border border-sage-400/20 rounded-3xl -z-10" />
              </div>
            </div>

            <div data-memorial-text className="space-y-5">
              <p className="text-midnight-800 text-[15px] leading-relaxed">
                Chase Lovelace lit up every room, every stage, and every conversation.
                His infectious smile and generous heart made him the kind of person you never forget.
                He lived to bring people together, and he never met a stranger.
              </p>
              <p className="text-midnight-800 text-[15px] leading-relaxed">
                When cancer took Chase from us too soon, our community made a promise: his spirit
                of love and connection would carry on. The Lovelace Memorial Cup is that promise in action.
                Every year, every team, and every dollar keeps his legacy alive.
              </p>
              <div className="border-l-2 border-sage-500 pl-5 py-1">
                <p className="text-midnight-700 italic text-[15px]">
                  &ldquo;Chase believed the best thing you could do was show up for people.
                  That&apos;s exactly what this tournament is about.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Tournament Timeline */}
          <div data-timeline className="mt-12 pt-8 border-t border-ivory-200">
            <h4 className="font-display font-semibold text-lg text-midnight-900 text-center mb-6">
              Our Journey
            </h4>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {timeline.map((item, index) => (
                <div key={index} data-timeline-item className="flex items-center gap-4">
                  <div className={`text-center ${index === timeline.length - 1 ? 'opacity-100' : 'opacity-70'}`}>
                    <div className={`font-display text-2xl font-bold ${index === timeline.length - 1 ? 'text-sage-600' : 'text-midnight-800'}`}>
                      {item.year}
                    </div>
                    <div className="text-sage-600 text-xs uppercase tracking-widest">{item.label}</div>
                    <div className="text-midnight-700 text-sm mt-1">{item.detail}</div>
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="hidden md:block w-12 h-px bg-sage-300" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div data-our-story className="bg-sage-600 rounded-2xl p-8 sm:p-10 mb-14">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-6">
              Our Story
            </h3>
            <div className="space-y-5 text-[15px] leading-relaxed text-sage-100">
              <p>
                Three years ago, a group of friends picked up their clubs and made a bet:
                that one day of golf could change lives. That first tournament raised enough
                to support two families in crisis. By year two, we had 20 teams and a growing
                list of sponsors who believed in the mission.
              </p>
              <p>
                Now in its third year, the Lovelace Memorial Cup has become one of our community&apos;s
                most anticipated events. This July, we&apos;re setting our sights on $10K and proving
                once again that a great day on the course can do a whole lot of good.
              </p>
              <blockquote className="font-display text-xl font-bold italic text-white/90 border-l-4 border-amber-400 pl-5 my-6 text-left">
                &ldquo;Where the love of golf meets the power of giving.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="font-display font-semibold text-xl text-midnight-900 mb-5">
            Ready to Make a Difference?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#registration"
              className="bg-sage-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-sage-700 transition-colors duration-200 shadow-lg shadow-sage-600/20"
            >
              View Registration Options
            </a>
            <a
              href="#contact"
              className="border-2 border-sage-600 text-sage-700 px-8 py-4 rounded-full font-semibold hover:bg-sage-600 hover:text-white transition-all duration-200"
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
