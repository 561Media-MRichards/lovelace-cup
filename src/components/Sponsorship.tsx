'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Target, Briefcase, Heart, TrendingUp, X, Loader2, Send } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SPONSORSHIP_TIERS } from '../lib/packages';

gsap.registerPlugin(ScrollTrigger);

const tierList: Array<{
  id: string;
  name: string;
  priceInCents: number;
  displayPrice: string;
  borderColor: string;
  popular?: boolean;
  benefits: string[];
}> = [
  {
    ...SPONSORSHIP_TIERS.hole,
    borderColor: 'border-t-ivory-200/30',
    benefits: [
      'Tee box signage with company logo',
      'Recognition in tournament materials',
      'Social media mention',
      'Website listing',
    ],
  },
  {
    ...SPONSORSHIP_TIERS.cart,
    borderColor: 'border-t-ivory-100',
    benefits: [
      'Logo on golf cart signage',
      'All Hole Sponsor benefits',
      'Premium website placement',
      'Newsletter recognition',
    ],
  },
  {
    ...SPONSORSHIP_TIERS['team-sponsor'],
    borderColor: 'border-t-sage-400',
    popular: true,
    benefits: [
      '4-man scramble team included',
      'Premium logo placement',
      'Tee box sponsorship sign',
      'Awards ceremony recognition',
      'Social media mentions',
      'Website listing',
      'Premium swag bags for team',
      'VIP parking',
    ],
  },
  {
    ...SPONSORSHIP_TIERS.title,
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

const Sponsorship = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [customForm, setCustomForm] = useState({ name: '', email: '', phone: '', companyName: '', message: '' });
  const [customSubmitting, setCustomSubmitting] = useState(false);
  const [customStatus, setCustomStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const benefits = [
    { icon: <Target className="w-6 h-6" />, title: 'Targeted Marketing', description: 'Connect with local golf enthusiasts and community leaders.' },
    { icon: <Briefcase className="w-6 h-6" />, title: 'Business Networking', description: 'Build relationships with sponsors and community-minded participants.' },
    { icon: <Heart className="w-6 h-6" />, title: 'Community Impact', description: 'Demonstrate your commitment to supporting families facing cancer.' },
    { icon: <TrendingUp className="w-6 h-6" />, title: 'Brand Visibility', description: 'Exposure through signage, social media, and event marketing.' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTier) return;
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/sponsor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, tierId: selectedTier }),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        setSubmitError(data.error || 'Something went wrong. Please try again.');
        setIsSubmitting(false);
      }
    } catch {
      setSubmitError('Something went wrong. Please try again or email wolfersway@gmail.com directly.');
      setIsSubmitting(false);
    }
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCustomSubmitting(true);
    setCustomStatus('idle');

    try {
      const res = await fetch('/api/custom-sponsor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customForm),
      });

      if (res.ok) {
        setCustomStatus('success');
        setCustomForm({ name: '', email: '', phone: '', companyName: '', message: '' });
      } else {
        setCustomStatus('error');
      }
    } catch {
      setCustomStatus('error');
    } finally {
      setCustomSubmitting(false);
    }
  };

  const selectedTierData = tierList.find(t => t.id === selectedTier);

  // GSAP scroll-triggered animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('[data-benefit-card]',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15,
            scrollTrigger: { trigger: '[data-benefit-grid]', start: 'top 85%' } }
        );

        gsap.fromTo('[data-tier-card]',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.15,
            scrollTrigger: { trigger: '[data-tier-grid]', start: 'top 85%' } }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="sponsorship" className="relative py-20 bg-midnight-900 overflow-hidden">
      {/* Background golf image */}
      <div className="absolute inset-0 pointer-events-none">
        <img src="/golf-club-green.png" alt="" className="w-full h-full object-cover opacity-[0.06]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          {tierList.map((tier) => (
            <div
              key={tier.id}
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
                  {tier.displayPrice}
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

              <button
                onClick={() => setSelectedTier(tier.id)}
                className="block w-full bg-sage-700 text-white text-center py-3 rounded-full font-semibold hover:bg-sage-600 transition-all duration-200"
              >
                Become a Sponsor
              </button>
            </div>
          ))}
        </div>

        {/* Custom Sponsorship */}
        <div className="glass rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="font-display font-bold text-2xl text-ivory-50 mb-4">
              Custom Sponsorship Packages
            </h3>
            <p className="text-ivory-200 text-lg max-w-2xl mx-auto">
              Have a specific sponsorship idea? We&apos;d love to create a custom package
              that meets your goals while supporting our cause.
            </p>
          </div>

          {customStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-sage-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-sage-400" />
              </div>
              <h4 className="font-display font-bold text-xl text-ivory-50 mb-2">Message Sent!</h4>
              <p className="text-ivory-200">We&apos;ll be in touch shortly to discuss your custom sponsorship.</p>
            </div>
          ) : (
            <form onSubmit={handleCustomSubmit} className="max-w-2xl mx-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="custom-name" className="block text-sm font-medium text-ivory-200 mb-1.5">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="custom-name"
                    name="name"
                    required
                    value={customForm.name}
                    onChange={handleCustomInputChange}
                    className="w-full px-4 py-3 bg-midnight-800/50 border border-ivory-200/20 rounded-lg text-ivory-50 placeholder-ivory-200/40 focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-colors"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label htmlFor="custom-company" className="block text-sm font-medium text-ivory-200 mb-1.5">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="custom-company"
                    name="companyName"
                    required
                    value={customForm.companyName}
                    onChange={handleCustomInputChange}
                    className="w-full px-4 py-3 bg-midnight-800/50 border border-ivory-200/20 rounded-lg text-ivory-50 placeholder-ivory-200/40 focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-colors"
                    placeholder="Acme Corp"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="custom-email" className="block text-sm font-medium text-ivory-200 mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="custom-email"
                    name="email"
                    required
                    value={customForm.email}
                    onChange={handleCustomInputChange}
                    className="w-full px-4 py-3 bg-midnight-800/50 border border-ivory-200/20 rounded-lg text-ivory-50 placeholder-ivory-200/40 focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-colors"
                    placeholder="john@acmecorp.com"
                  />
                </div>
                <div>
                  <label htmlFor="custom-phone" className="block text-sm font-medium text-ivory-200 mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="custom-phone"
                    name="phone"
                    value={customForm.phone}
                    onChange={handleCustomInputChange}
                    className="w-full px-4 py-3 bg-midnight-800/50 border border-ivory-200/20 rounded-lg text-ivory-50 placeholder-ivory-200/40 focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="custom-message" className="block text-sm font-medium text-ivory-200 mb-1.5">
                  Tell us about your sponsorship idea *
                </label>
                <textarea
                  id="custom-message"
                  name="message"
                  required
                  rows={4}
                  value={customForm.message}
                  onChange={handleCustomInputChange}
                  className="w-full px-4 py-3 bg-midnight-800/50 border border-ivory-200/20 rounded-lg text-ivory-50 placeholder-ivory-200/40 focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Describe your custom sponsorship idea, budget, or any specific goals you have in mind..."
                />
              </div>

              {customStatus === 'error' && (
                <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 px-4 py-3 rounded-lg text-sm text-center">
                  Something went wrong. Please try again or email wolfersway@gmail.com directly.
                </div>
              )}

              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={customSubmitting}
                  className="bg-amber-500 text-midnight-950 px-8 py-4 rounded-full font-bold hover:bg-amber-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                >
                  {customSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Inquiry
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
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

      {/* Sponsor Modal */}
      {selectedTier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-950/80 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => { setSelectedTier(null); setSubmitError(''); }}
              className="absolute top-4 right-4 text-midnight-700 hover:text-midnight-900"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display font-bold text-2xl text-midnight-900 mb-1 text-center">
              {selectedTierData?.name}
            </h3>
            <p className="text-sage-700 font-display font-bold text-3xl text-center mb-6">
              {selectedTierData?.displayPrice}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="sponsor-company" className="block text-sm font-medium text-midnight-800 mb-1.5">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="sponsor-company"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-ivory-50 border border-ivory-200 rounded-lg text-midnight-900 placeholder-midnight-700/40 focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-colors"
                  placeholder="Acme Corp"
                />
              </div>
              <div>
                <label htmlFor="sponsor-name" className="block text-sm font-medium text-midnight-800 mb-1.5">
                  Contact Name *
                </label>
                <input
                  type="text"
                  id="sponsor-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-ivory-50 border border-ivory-200 rounded-lg text-midnight-900 placeholder-midnight-700/40 focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-colors"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label htmlFor="sponsor-email" className="block text-sm font-medium text-midnight-800 mb-1.5">
                  Email *
                </label>
                <input
                  type="email"
                  id="sponsor-email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-ivory-50 border border-ivory-200 rounded-lg text-midnight-900 placeholder-midnight-700/40 focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-colors"
                  placeholder="john@acmecorp.com"
                />
              </div>
              <div>
                <label htmlFor="sponsor-phone" className="block text-sm font-medium text-midnight-800 mb-1.5">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="sponsor-phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-ivory-50 border border-ivory-200 rounded-lg text-midnight-900 placeholder-midnight-700/40 focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>

              {submitError && (
                <div className="bg-rose-500/10 border border-rose-500/30 text-rose-500 px-4 py-3 rounded-lg text-sm text-center">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-sage-600 text-white py-4 rounded-full font-bold text-lg hover:bg-sage-700 transition-all duration-200 shadow-lg shadow-sage-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Redirecting to Payment...
                  </>
                ) : (
                  'Proceed to Payment'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Sponsorship;
