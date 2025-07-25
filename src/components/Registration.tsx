'use client';

const Registration = () => {
  const registrationOptions = [
    {
      type: 'Single Player',
      price: '$125',
      originalPrice: null,
      description: 'Individual registration for one golfer',
      features: [
        '18 holes of golf',
        'Cart included',
        'Welcome breakfast',
        'Awards lunch',
        'Tournament swag bag',
        'Closest to pin contest',
        'Longest drive contest'
      ],
      popular: false,
      buttonText: 'Register Individual',
      buttonColor: 'bg-forest-900 hover:bg-forest-700 text-white hover:text-gold-100'
    },
    {
      type: 'Team Registration',
      price: '$500',
      originalPrice: '$500',
      description: 'Four-person team registration (Save $0)',
      features: [
        'Team of 4 golfers',
        '18 holes of golf',
        'Carts for all players',
        'Welcome breakfast for team',
        'Awards lunch for team',
        'Tournament swag bags (4)',
        'Team photo opportunity',
        'All contest eligibility',
        'Team recognition'
      ],
      popular: true,
      buttonText: 'Register Team',
      buttonColor: 'bg-gold-500 hover:bg-gold-400 text-forest-900 hover:text-forest-700 transform hover:scale-105'
    },
    {
      type: 'Gold Sponsor',
      price: '$1,000',
      originalPrice: null,
      description: 'Premium sponsorship package with maximum impact',
      features: [
        'Team of 4 golfers included',
        'All team benefits above',
        'Logo on tournament materials',
        'Tee box sponsorship sign',
        'Recognition at awards ceremony',
        'Social media mentions',
        'Website listing',
        'Premium swag bags',
        'VIP parking',
        'Photo opportunities'
      ],
      popular: false,
      buttonText: 'Become Gold Sponsor',
      buttonColor: 'bg-gold-600 hover:bg-gold-500 text-white hover:text-gold-100 transform hover:scale-105'
    }
  ];

  return (
    <section id="registration" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-forest-900 mb-6">
            Registration Options
          </h2>
          <div className="w-24 h-1 bg-golf-gradient mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-forest-700 max-w-3xl mx-auto leading-relaxed">
            Choose the registration option that works best for you. Every registration 
            helps support families battling cancer in our community.
          </p>
        </div>

        {/* Registration Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {registrationOptions.map((option, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 ${
                option.popular 
                  ? 'border-4 border-gold-400 shadow-2xl' 
                  : 'border border-gray-200 hover:shadow-2xl'
              }`}
            >
              {/* Popular Badge */}
              {option.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gold-500 text-forest-900 text-center py-2 font-bold text-sm">
                  ⭐ MOST POPULAR ⭐
                </div>
              )}

              <div className={`p-8 ${option.popular ? 'pt-14' : ''}`}>
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="font-display font-bold text-2xl text-forest-900 mb-2">
                    {option.type}
                  </h3>
                  <div className="flex items-center justify-center mb-4">
                    {option.originalPrice && option.originalPrice !== option.price && (
                      <span className="text-gray-400 line-through text-xl mr-2">
                        {option.originalPrice}
                      </span>
                    )}
                    <span className="text-4xl font-bold text-forest-900">
                      {option.price}
                    </span>
                  </div>
                  <p className="text-forest-600">{option.description}</p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {option.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-forest-600 mt-0.5 mr-3 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-forest-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <a
                  href="https://www.eventbrite.com/e/lovelacememorialcup2-tickets-1403964378249"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center py-4 px-6 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl ${option.buttonColor}`}
                >
                  {option.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-cream-100 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-display font-semibold text-2xl text-forest-900 mb-4">
                What&apos;s Included
              </h3>
              <ul className="space-y-2 text-forest-700">
                <li className="flex items-center">
                  <span className="text-forest-600 mr-2">🍳</span>
                  Welcome breakfast (7:00 AM - 8:00 AM)
                </li>
                <li className="flex items-center">
                  <span className="text-forest-600 mr-2">🏌️</span>
                  18 holes with cart at Sycamore Ridge
                </li>
                <li className="flex items-center">
                  <span className="text-forest-600 mr-2">🍽️</span>
                  Awards lunch and ceremony
                </li>
                <li className="flex items-center">
                  <span className="text-forest-600 mr-2">🎁</span>
                  Tournament merchandise and prizes
                </li>
                <li className="flex items-center">
                  <span className="text-forest-600 mr-2">📸</span>
                  Professional event photography
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-display font-semibold text-2xl text-forest-900 mb-4">
                Tournament Format
              </h3>
              <ul className="space-y-2 text-forest-700">
                <li className="flex items-center">
                  <span className="text-forest-600 mr-2">⏰</span>
                  Registration: 7:00 AM
                </li>
                <li className="flex items-center">
                  <span className="text-forest-600 mr-2">🏃</span>
                  Shotgun start: 8:00 AM
                </li>
                <li className="flex items-center">
                  <span className="text-forest-600 mr-2">🏆</span>
                  Awards ceremony: 2:00 PM
                </li>
                <li className="flex items-center">
                  <span className="text-forest-600 mr-2">🎯</span>
                  Scramble format (team event)
                </li>
                <li className="flex items-center">
                  <span className="text-forest-600 mr-2">🥇</span>
                  Prizes for top teams and contests
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact for Questions */}
        <div className="text-center mt-12">
          <p className="text-forest-700 mb-4">
            Questions about registration or need a custom sponsorship package?
          </p>
          <a
            href="mailto:wolfersway@gmail.com"
            className="text-forest-900 hover:text-gold-600 font-semibold text-lg underline"
          >
            Contact us at wolfersway@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default Registration;