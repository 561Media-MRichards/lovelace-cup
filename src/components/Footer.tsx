'use client';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#registration', label: 'Registration' },
    { href: '#sponsorship', label: 'Sponsorship' },
    { href: '#contact', label: 'Contact' },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      href: '#',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.73-3.016-1.8-.568-1.07-.568-2.390 0-3.460.568-1.07 1.719-1.8 3.016-1.8 1.297 0 2.448.73 3.016 1.8.568 1.07.568 2.390 0 3.460-.568 1.07-1.719 1.8-3.016 1.8zm7.718-9.229h-3.158c-.441 0-.8-.359-.8-.8v-3.158c0-.441.359-.8.8-.8h3.158c.441 0 .8.359.8.8v3.158c0 .441-.359.8-.8.8z"/>
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: '#',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-forest-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center">
                <span className="text-forest-900 font-bold text-xl">L</span>
              </div>
              <div>
                <div className="font-display font-bold text-xl">
                  Lovelace Memorial Cup
                </div>
                <div className="text-gold-300 text-sm">
                  In a world full of hate... let&apos;s show some LOVE!
                </div>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Join us for our annual golf tournament supporting families battling cancer. 
              Every swing counts, every donation matters, and every moment together helps heal hearts.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-gold-300 transition-colors duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-gold-300">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-gold-300 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-gold-300">
              Contact Info
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start space-x-2">
                <span className="text-gold-300">📧</span>
                <a 
                  href="mailto:wolfersway@gmail.com"
                  className="hover:text-gold-300 transition-colors duration-200"
                >
                  wolfersway@gmail.com
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-gold-300">📅</span>
                <div>
                  <div>August 15th, 2025</div>
                  <div>8:00 AM Start</div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-gold-300">🏌️</span>
                <div>Sycamore Ridge Golf Course</div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Highlight */}
        <div className="border-t border-forest-700 mt-8 pt-8">
          <div className="bg-forest-800 rounded-xl p-6 text-center">
            <h3 className="font-display font-bold text-2xl text-gold-300 mb-2">
              Tournament Day: August 15th, 2025
            </h3>
            <p className="text-gray-300 mb-4">
              Registration opens at 7:00 AM • Shotgun start at 8:00 AM • Awards ceremony at 2:00 PM
            </p>
            <a
              href="https://www.eventbrite.com/e/lovelacememorialcup2-tickets-1403964378249"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gold-500 text-forest-900 px-6 py-3 rounded-full font-semibold hover:bg-gold-400 transition-colors duration-200"
            >
              Register Now
              <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-forest-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 sm:mb-0">
            © {currentYear} Lovelace Memorial Cup. All rights reserved.
          </div>
          <div className="text-gray-400 text-sm">
            Made with ❤️ for families battling cancer
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;