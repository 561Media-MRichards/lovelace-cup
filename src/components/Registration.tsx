'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Star, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Registration = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedPackage, setSelectedPackage] = useState('team');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    teamName: '',
    specialRequests: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const packages = [
    {
      id: 'single',
      type: 'Single Player',
      price: '$150',
      description: 'Individual registration for one golfer',
      features: [
        '18 holes of golf',
        'Cart included',
        'Welcome breakfast',
        'Awards lunch',
        'Tournament swag bag',
        'Closest to pin contest',
        'Longest drive contest',
      ],
      popular: false,
    },
    {
      id: 'team',
      type: 'Team of 4',
      price: '$500',
      description: 'Four-person team — best value',
      features: [
        'Team of 4 golfers',
        '18 holes of golf',
        'Carts for all players',
        'Welcome breakfast for team',
        'Awards lunch for team',
        'Tournament swag bags (4)',
        'Team photo opportunity',
        'All contest eligibility',
      ],
      popular: true,
    },
    {
      id: 'premium',
      type: 'Premium Sponsor',
      price: '$1,250',
      description: 'Team + sponsor perks package',
      features: [
        'Team of 4 golfers included',
        'All team benefits',
        'Logo on tournament materials',
        'Tee box sponsorship sign',
        'Awards ceremony recognition',
        'Social media mentions',
        'Website listing',
        'Premium swag bags',
        'VIP parking',
      ],
      popular: false,
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          package: packages.find(p => p.id === selectedPackage)?.type || selectedPackage,
          price: packages.find(p => p.id === selectedPackage)?.price || '',
        }),
      });

      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', teamName: '', specialRequests: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // GSAP scroll-triggered animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Package cards: stagger up from below
        gsap.from('[data-package-card]', {
          y: 50, opacity: 0, duration: 0.9,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: '[data-package-grid]', start: 'top 80%' },
        });

        // Popular card: subtle floating oscillation
        gsap.to('[data-package-popular]', {
          y: -6, duration: 2.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });

        // Registration form: fade in
        gsap.from('[data-reg-form]', {
          y: 30, opacity: 0, duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-reg-form]', start: 'top 85%' },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="registration" className="py-24 bg-midnight-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-ivory-50 mb-4">
            Registration
          </h2>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mb-6" />
          <p className="text-ivory-200 text-lg max-w-2xl mx-auto">
            Choose the package that works best for you. Every registration
            helps us reach our $10,000 fundraising goal.
          </p>
        </div>

        {/* Package Cards */}
        <div data-package-grid className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {packages.map((pkg) => (
            <button
              key={pkg.id}
              type="button"
              onClick={() => setSelectedPackage(pkg.id)}
              data-package-card
              {...(pkg.popular ? { 'data-package-popular': true } : {})}
              className={`relative text-left rounded-2xl p-8 transition-all duration-300 ${
                pkg.popular ? 'lg:scale-105' : ''
              } ${
                selectedPackage === pkg.id
                  ? 'glass border-amber-500/50 amber-glow-ring'
                  : 'glass hover:border-midnight-700/80'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-midnight-950 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                  <Star className="w-3 h-3" /> Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display font-bold text-xl text-ivory-50 mb-1">
                  {pkg.type}
                </h3>
                <div className="font-display text-4xl font-bold text-amber-400 mb-2">
                  {pkg.price}
                </div>
                <p className="text-ivory-200 text-sm">{pkg.description}</p>
              </div>

              <div className="space-y-3">
                {pkg.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-ivory-100 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Selection indicator */}
              <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                selectedPackage === pkg.id
                  ? 'border-amber-500 bg-amber-500'
                  : 'border-midnight-700'
              }`}>
                {selectedPackage === pkg.id && (
                  <Check className="w-3 h-3 text-midnight-950 mx-auto mt-0.5" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Registration Form */}
        <div data-reg-form className="max-w-2xl mx-auto">
          <div className="glass rounded-2xl p-8">
            <h3 className="font-display font-bold text-2xl text-ivory-50 mb-6 text-center">
              Complete Your Registration
            </h3>

            {submitStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-amber-400" />
                </div>
                <h4 className="font-display text-xl font-bold text-ivory-50 mb-2">Registration Received!</h4>
                <p className="text-ivory-200">Check your email for a confirmation. We&apos;ll be in touch with tournament details.</p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="mt-6 text-amber-400 hover:text-amber-300 font-medium underline underline-offset-4"
                >
                  Register another player
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="reg-name" className="block text-sm font-medium text-ivory-200 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="reg-name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-midnight-950 border border-midnight-700 rounded-lg text-ivory-50 placeholder-ivory-200/40 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="reg-email" className="block text-sm font-medium text-ivory-200 mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="reg-email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-midnight-950 border border-midnight-700 rounded-lg text-ivory-50 placeholder-ivory-200/40 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="reg-phone" className="block text-sm font-medium text-ivory-200 mb-1.5">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="reg-phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-midnight-950 border border-midnight-700 rounded-lg text-ivory-50 placeholder-ivory-200/40 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="reg-team" className="block text-sm font-medium text-ivory-200 mb-1.5">
                      Team Name
                    </label>
                    <input
                      type="text"
                      id="reg-team"
                      name="teamName"
                      value={formData.teamName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-midnight-950 border border-midnight-700 rounded-lg text-ivory-50 placeholder-ivory-200/40 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      placeholder="Team name (optional)"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="reg-requests" className="block text-sm font-medium text-ivory-200 mb-1.5">
                    Special Requests
                  </label>
                  <textarea
                    id="reg-requests"
                    name="specialRequests"
                    rows={3}
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-midnight-950 border border-midnight-700 rounded-lg text-ivory-50 placeholder-ivory-200/40 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Dietary restrictions, accessibility needs, etc."
                  />
                </div>

                <div className="glass rounded-lg p-4 text-center">
                  <span className="text-ivory-200 text-sm">Selected: </span>
                  <span className="text-amber-400 font-semibold">
                    {packages.find(p => p.id === selectedPackage)?.type} — {packages.find(p => p.id === selectedPackage)?.price}
                  </span>
                </div>

                {submitStatus === 'error' && (
                  <div className="bg-rose-500/10 border border-rose-500/30 text-rose-500 px-4 py-3 rounded-lg text-sm text-center">
                    Something went wrong. Please try again or email wolfersway@gmail.com directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-500 text-midnight-950 py-4 rounded-full font-bold text-lg hover:bg-amber-400 transition-all duration-200 shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Register Now'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* What's Included */}
        <div className="mt-16 glass rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-display font-semibold text-xl text-ivory-50 mb-4">
                What&apos;s Included
              </h3>
              <ul className="space-y-3 text-ivory-200">
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-amber-500" /> Welcome breakfast (7:00 AM)</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-amber-500" /> 18 holes with cart at Sycamore Ridge</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-amber-500" /> Awards lunch and ceremony</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-amber-500" /> Tournament merchandise and prizes</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-amber-500" /> Professional event photography</li>
              </ul>
            </div>
            <div>
              <h3 className="font-display font-semibold text-xl text-ivory-50 mb-4">
                Tournament Format
              </h3>
              <ul className="space-y-3 text-ivory-200">
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-amber-500" /> Registration: 7:00 AM</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-amber-500" /> Shotgun start: 8:00 AM</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-amber-500" /> Awards ceremony: 2:00 PM</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-amber-500" /> Scramble format (team event)</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-amber-500" /> Prizes for top teams and contests</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
