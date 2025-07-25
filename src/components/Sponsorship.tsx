'use client';

const Sponsorship = () => {
  const sponsorshipTiers = [
    {
      name: 'Hole Sponsor',
      price: '$250',
      color: 'border-forest-600',
      bgColor: 'bg-forest-50',
      benefits: [
        'Tee box signage with company logo',
        'Recognition in tournament materials',
        'Social media mention',
        'Website listing'
      ]
    },
    {
      name: 'Cart Sponsor',
      price: '$500',
      color: 'border-forest-700',
      bgColor: 'bg-forest-100',
      benefits: [
        'Logo on golf cart signage',
        'All Hole Sponsor benefits',
        'Premium website placement',
        'Newsletter recognition'
      ]
    },
    {
      name: 'Gold Sponsor',
      price: '$1,000',
      color: 'border-gold-500',
      bgColor: 'bg-gold-50',
      popular: true,
      benefits: [
        'Team of 4 golfers included',
        'Premium logo placement',
        'Tee box sponsorship',
        'Awards ceremony recognition',
        'VIP treatment and parking',
        'Professional photos provided'
      ]
    },
    {
      name: 'Title Sponsor',
      price: '$2,500',
      color: 'border-gold-600',
      bgColor: 'bg-gold-100',
      benefits: [
        'Event naming rights',
        'Two teams of 4 included',
        'Maximum logo visibility',
        'Speaking opportunity at ceremony',
        'Custom recognition package',
        'Year-round partnership benefits'
      ]
    }
  ];

  const sponsorshipBenefits = [
    {
      icon: '🎯',
      title: 'Targeted Marketing',
      description: 'Connect with local golf enthusiasts and community leaders in a relaxed, positive environment.'
    },
    {
      icon: '💼',
      title: 'Business Networking',
      description: 'Build relationships with other sponsors and participants who value community involvement.'
    },
    {
      icon: '❤️',
      title: 'Community Impact',
      description: 'Demonstrate your commitment to supporting families facing cancer in our community.'
    },
    {
      icon: '📈',
      title: 'Brand Visibility',
      description: 'Gain exposure through signage, social media, and marketing materials before, during, and after the event.'
    }
  ];

  return (
    <section id="sponsorship" className="py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-forest-900 mb-6">
            Sponsorship Opportunities
          </h2>
          <div className="w-24 h-1 bg-golf-gradient mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-forest-700 max-w-3xl mx-auto leading-relaxed">
            Partner with us to make a meaningful impact while gaining valuable exposure 
            for your business. Together, we can support families in need and strengthen 
            our community.
          </p>
        </div>

        {/* Why Sponsor Section */}
        <div className="mb-16">
          <h3 className="font-display font-semibold text-3xl text-forest-900 text-center mb-12">
            Why Sponsor the Lovelace Memorial Cup?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sponsorshipBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h4 className="font-display font-semibold text-xl text-forest-900 mb-3">
                  {benefit.title}
                </h4>
                <p className="text-forest-700 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsorship Tiers */}
        <div className="mb-16">
          <h3 className="font-display font-semibold text-3xl text-forest-900 text-center mb-12">
            Sponsorship Packages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorshipTiers.map((tier, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-xl border-2 ${tier.color} ${tier.bgColor} p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gold-500 text-forest-900 px-4 py-1 rounded-full text-sm font-bold">
                    POPULAR
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h4 className="font-display font-bold text-xl text-forest-900 mb-2">
                    {tier.name}
                  </h4>
                  <div className="text-3xl font-bold text-forest-900 mb-4">
                    {tier.price}
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {tier.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start text-sm">
                      <svg
                        className="w-4 h-4 text-forest-600 mt-0.5 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-forest-700">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="mailto:wolfersway@gmail.com?subject=Sponsorship Inquiry - Lovelace Memorial Cup"
                  className="block w-full bg-forest-900 text-white text-center py-3 rounded-full font-semibold hover:bg-forest-700 transition-colors duration-200"
                >
                  Become a Sponsor
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Sponsorship */}
        <div className="bg-white rounded-2xl p-8 shadow-xl mb-16">
          <div className="text-center">
            <h3 className="font-display font-bold text-3xl text-forest-900 mb-6">
              Custom Sponsorship Packages
            </h3>
            <p className="text-lg text-forest-700 mb-8 max-w-3xl mx-auto">
              Have a specific sponsorship idea or budget in mind? We&apos;d love to work 
              with you to create a custom package that meets your marketing goals 
              while supporting our cause.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:wolfersway@gmail.com?subject=Custom Sponsorship Package Inquiry"
                className="bg-gold-500 text-forest-900 px-8 py-4 rounded-full font-bold hover:bg-gold-400 transition-colors duration-200"
              >
                📧 Discuss Custom Package
              </a>
              <a
                href="tel:+1234567890"
                className="border-2 border-forest-900 text-forest-900 px-8 py-4 rounded-full font-semibold hover:bg-forest-900 hover:text-white transition-all duration-200"
              >
                📞 Call to Discuss
              </a>
            </div>
          </div>
        </div>

        {/* Sponsor Recognition */}
        <div className="bg-forest-900 rounded-2xl p-8 text-white text-center">
          <h3 className="font-display font-bold text-3xl mb-6 text-gold-300">
            Thank You to Our Sponsors
          </h3>
          <p className="text-lg mb-8 text-gold-100 max-w-3xl mx-auto">
            Our sponsors make this tournament possible. Their generous support allows 
            us to focus on what matters most—supporting families battling cancer and 
            bringing our community together.
          </p>
          <div className="space-y-4">
            <div className="text-gold-200">
              <strong>2024 Sponsors Include:</strong>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gold-100">
              <div>Local Business Partners</div>
              <div>Community Organizations</div>
              <div>Individual Supporters</div>
            </div>
          </div>
          <div className="mt-8">
            <a
              href="mailto:wolfersway@gmail.com?subject=Sponsorship Information Request"
              className="bg-gold-500 text-forest-900 px-8 py-4 rounded-full font-bold hover:bg-gold-400 transition-colors duration-200"
            >
              Join Our Sponsor Family
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsorship;