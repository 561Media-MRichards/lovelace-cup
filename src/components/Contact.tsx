'use client';

import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Calendar, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = encodeURIComponent(`Lovelace Memorial Cup: ${formData.subject}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:wolfersway@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setIsSubmitting(false);
      setSubmitStatus('success');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1000);
  };

  const contactInfo = [
    { icon: <Mail className="w-5 h-5" />, title: 'Email Us', content: 'wolfersway@gmail.com', link: 'mailto:wolfersway@gmail.com' },
    { icon: <MapPin className="w-5 h-5" />, title: 'Golf Course', content: 'Sycamore Ridge Golf Course', link: 'https://maps.google.com/?q=Sycamore+Ridge+Golf+Course' },
    { icon: <Calendar className="w-5 h-5" />, title: 'Event Date', content: 'July 15, 2026 at 8:00 AM', link: null },
  ];

  // GSAP scroll-triggered animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Contact info cards: slide in from left with stagger
        gsap.from('[data-contact-card]', {
          x: -40, opacity: 0, duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: '[data-contact-left]', start: 'top 80%' },
        });

        // Form: slide in from right
        gsap.from('[data-contact-form]', {
          x: 40, opacity: 0, duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-contact-form]', start: 'top 80%' },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="contact" className="py-24 bg-midnight-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-ivory-50 mb-4">
            Get in Touch
          </h2>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mb-6" />
          <p className="text-ivory-200 text-lg max-w-2xl mx-auto">
            Questions about the tournament, registration, or sponsorship? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Cards — left */}
          <div data-contact-left className="lg:col-span-2 space-y-6">
            {contactInfo.map((info, index) => (
              <div key={index} data-contact-card className="glass rounded-xl p-6 flex items-start gap-4">
                <div className="text-amber-500 mt-0.5">{info.icon}</div>
                <div>
                  <h4 className="font-semibold text-ivory-50 mb-1">{info.title}</h4>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-ivory-200 hover:text-amber-400 transition-colors"
                      target={info.link.startsWith('http') ? '_blank' : undefined}
                      rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-ivory-200">{info.content}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Quick Actions */}
            <div data-contact-card className="glass rounded-xl p-6">
              <h4 className="font-display font-semibold text-lg text-ivory-50 mb-4">
                Quick Actions
              </h4>
              <div className="space-y-3">
                <a
                  href="#registration"
                  className="block w-full bg-amber-500 text-midnight-950 text-center py-3 rounded-full font-semibold hover:bg-amber-400 transition-colors"
                >
                  Register Now
                </a>
                <a
                  href="mailto:wolfersway@gmail.com?subject=Sponsorship Inquiry"
                  className="block w-full border border-amber-500/30 text-amber-400 text-center py-3 rounded-full font-semibold hover:bg-amber-500 hover:text-midnight-950 transition-all"
                >
                  Become a Sponsor
                </a>
                <a
                  href="mailto:wolfersway@gmail.com?subject=Volunteer Inquiry"
                  className="block w-full border border-midnight-700 text-ivory-200 text-center py-3 rounded-full font-semibold hover:border-ivory-200/50 hover:text-ivory-50 transition-all"
                >
                  Volunteer to Help
                </a>
              </div>
            </div>
          </div>

          {/* Form — right */}
          <div data-contact-form className="lg:col-span-3">
            <div className="glass rounded-2xl p-8">
              <h3 className="font-display font-semibold text-xl text-ivory-50 mb-6">
                Send Us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-ivory-200 mb-1.5">Name *</label>
                    <input
                      type="text" id="contact-name" name="name" required
                      value={formData.name} onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-midnight-950 border border-midnight-700 rounded-lg text-ivory-50 placeholder-ivory-200/40 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-ivory-200 mb-1.5">Email *</label>
                    <input
                      type="email" id="contact-email" name="email" required
                      value={formData.email} onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-midnight-950 border border-midnight-700 rounded-lg text-ivory-50 placeholder-ivory-200/40 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium text-ivory-200 mb-1.5">Phone</label>
                    <input
                      type="tel" id="contact-phone" name="phone"
                      value={formData.phone} onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-midnight-950 border border-midnight-700 rounded-lg text-ivory-50 placeholder-ivory-200/40 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-medium text-ivory-200 mb-1.5">Subject *</label>
                    <select
                      id="contact-subject" name="subject" required
                      value={formData.subject} onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-midnight-950 border border-midnight-700 rounded-lg text-ivory-50 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Select a topic</option>
                      <option value="Registration Question">Registration Question</option>
                      <option value="Sponsorship Inquiry">Sponsorship Inquiry</option>
                      <option value="Volunteer Interest">Volunteer Interest</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-ivory-200 mb-1.5">Message *</label>
                  <textarea
                    id="contact-message" name="message" required rows={5}
                    value={formData.message} onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-midnight-950 border border-midnight-700 rounded-lg text-ivory-50 placeholder-ivory-200/40 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-3 rounded-lg text-sm">
                    Your message will open in your email client. Thank you!
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-500 text-midnight-950 py-4 rounded-full font-bold text-lg hover:bg-amber-400 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
