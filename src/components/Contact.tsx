'use client';

import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Lovelace Memorial Cup: ${formData.subject}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n\n` +
      `Message:\n${formData.message}`
    );
    
    window.location.href = `mailto:wolfersway@gmail.com?subject=${subject}&body=${body}`;
    
    // Reset form after a delay
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email Us',
      content: 'wolfersway@gmail.com',
      link: 'mailto:wolfersway@gmail.com'
    },
    {
      icon: '🏌️',
      title: 'Golf Course',
      content: 'Sycamore Ridge Golf Course',
      link: 'https://maps.google.com/?q=Sycamore+Ridge+Golf+Course'
    },
    {
      icon: '📅',
      title: 'Event Date',
      content: 'August 15th, 2025 at 8:00 AM',
      link: null
    },
    {
      icon: '🎯',
      title: 'Registration',
      content: 'Eventbrite Registration',
      link: 'https://www.eventbrite.com/e/lovelacememorialcup2-tickets-1403964378249'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-forest-900 mb-6">
            Get in Touch
          </h2>
          <div className="w-24 h-1 bg-golf-gradient mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-forest-700 max-w-3xl mx-auto leading-relaxed">
            Have questions about the tournament, registration, or sponsorship opportunities? 
            We&apos;d love to hear from you and help you get involved.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="font-display font-semibold text-2xl text-forest-900 mb-8">
              Contact Information
            </h3>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="text-2xl">{info.icon}</div>
                  <div>
                    <h4 className="font-semibold text-forest-900 mb-1">{info.title}</h4>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-forest-700 hover:text-gold-600 transition-colors duration-200"
                        target={info.link.startsWith('http') ? '_blank' : undefined}
                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-forest-700">{info.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="bg-cream-50 rounded-xl p-6">
              <h4 className="font-display font-semibold text-xl text-forest-900 mb-4">
                Quick Actions
              </h4>
              <div className="space-y-3">
                <a
                  href="https://www.eventbrite.com/e/lovelacememorialcup2-tickets-1403964378249"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-forest-900 text-white text-center py-3 rounded-full font-semibold hover:bg-forest-700 transition-colors duration-200"
                >
                  🏌️ Register Now
                </a>
                <a
                  href="mailto:wolfersway@gmail.com?subject=Sponsorship Inquiry"
                  className="block w-full bg-gold-500 text-forest-900 text-center py-3 rounded-full font-semibold hover:bg-gold-400 transition-colors duration-200"
                >
                  💛 Become a Sponsor
                </a>
                <a
                  href="mailto:wolfersway@gmail.com?subject=Volunteer Inquiry"
                  className="block w-full border-2 border-forest-900 text-forest-900 text-center py-3 rounded-full font-semibold hover:bg-forest-900 hover:text-white transition-all duration-200"
                >
                  🤝 Volunteer to Help
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="font-display font-semibold text-2xl text-forest-900 mb-8">
              Send Us a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-forest-900 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-forest-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-colors duration-200"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-forest-900 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-colors duration-200"
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-forest-900 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-colors duration-200"
                  >
                    <option value="">Select a topic</option>
                    <option value="Registration Question">Registration Question</option>
                    <option value="Sponsorship Inquiry">Sponsorship Inquiry</option>
                    <option value="Volunteer Interest">Volunteer Interest</option>
                    <option value="General Question">General Question</option>
                    <option value="Media Inquiry">Media Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-forest-900 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-colors duration-200 resize-vertical"
                  placeholder="Tell us how we can help you or how you'd like to get involved..."
                ></textarea>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-forest-100 border border-forest-300 text-forest-800 px-4 py-3 rounded-lg">
                  ✅ Thank you! Your message will open in your email client.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-full font-bold text-lg transition-all duration-200 ${
                  isSubmitting
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-forest-900 text-white hover:bg-forest-700 hover:transform hover:scale-105'
                }`}
              >
                {isSubmitting ? '📧 Opening Email Client...' : '📧 Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-cream-50 rounded-2xl p-8">
          <h3 className="font-display font-bold text-3xl text-forest-900 mb-4">
            Ready to Join Us?
          </h3>
          <p className="text-lg text-forest-700 mb-8 max-w-2xl mx-auto">
            Don&apos;t wait—registration spots are filling up quickly! Secure your place in 
            this meaningful tournament and help us support families in need.
          </p>
          <a
            href="https://www.eventbrite.com/e/lovelacememorialcup2-tickets-1403964378249"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gold-500 text-forest-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gold-400 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            🏌️ Register Today
            <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;