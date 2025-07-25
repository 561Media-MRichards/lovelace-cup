'use client';

const About = () => {
  const features = [
    {
      icon: '❤️',
      title: 'Supporting Families',
      description: 'Every dollar raised goes directly to families battling cancer, providing financial support and hope during their most challenging times.',
    },
    {
      icon: '🏌️',
      title: 'Golf with Purpose',
      description: 'Enjoy a beautiful day of golf at Sycamore Ridge while making a meaningful difference in the lives of those who need it most.',
    },
    {
      icon: '🤝',
      title: 'Community Unity',
      description: 'Bringing together golfers, families, and supporters to create a network of love and support that extends far beyond the course.',
    },
    {
      icon: '🏆',
      title: 'Memorial Legacy',
      description: 'Honoring the memory of loved ones while creating a lasting impact through charitable giving and community support.',
    },
  ];

  const stats = [
    { number: '20', label: 'Team Goal' },
    { number: '$50K+', label: 'Goal to Raise' },
    { number: '15+', label: 'Families Supported' },
    { number: '2nd', label: 'Annual Tournament' },
  ];

  return (
    <section id="about" className="py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-forest-900 mb-6">
            About the Tournament
          </h2>
          <div className="w-24 h-1 bg-golf-gradient mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-forest-700 max-w-3xl mx-auto leading-relaxed">
            The Lovelace Memorial Cup is more than just a golf tournament—it&apos;s a 
            celebration of life, love, and community support for families facing 
            cancer together.
          </p>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl sm:text-4xl font-bold text-forest-900">
                  {stat.number}
                </div>
                <div className="text-forest-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <h3 className="font-display font-semibold text-2xl text-forest-900 mb-4 flex items-center gap-3">
                <span className="text-3xl">{feature.icon}</span>
                {feature.title}
              </h3>
              <p className="text-forest-700 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Memorial Section */}
        <div className="mb-16">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
            <div className="text-center mb-12">
              <h3 className="font-display font-bold text-3xl text-forest-900 mb-4">
                In Loving Memory of Chase Lovelace
              </h3>
              <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Single Photo */}
              <div className="flex justify-center">
                <div className="w-80 aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="/Chase black shirt 1.jpg" 
                    alt="Chase Lovelace" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              
              {/* Memorial Text */}
              <div className="space-y-6">
                <p className="text-lg text-forest-700 leading-relaxed">
                  Chase Lovelace was a vibrant soul who brought joy and music to everyone around him. 
                  His passion for life, infectious smile, and caring heart touched countless lives in our community.
                </p>
                <p className="text-lg text-forest-700 leading-relaxed">
                  Though cancer took him from us too soon, Chase's spirit lives on through this memorial 
                  tournament. His love for bringing people together and supporting others in their time 
                  of need continues to inspire our mission.
                </p>
                <div className="bg-forest-50 rounded-xl p-6 border-l-4 border-gold-500">
                  <p className="text-forest-800 font-medium italic">
                    "Chase believed in the power of community and the importance of showing love to those 
                    who need it most. This tournament carries forward his legacy of compassion and hope."
                  </p>
                </div>
                <p className="text-lg text-forest-700 leading-relaxed">
                  Every swing, every donation, and every moment of fellowship honors Chase's memory 
                  while supporting families facing their own battles with cancer.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-forest-900 rounded-2xl p-8 sm:p-12 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-display font-bold text-3xl sm:text-4xl mb-8 text-gold-300">
              Our Story
            </h3>
            <div className="space-y-6 text-lg leading-relaxed">
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
              <blockquote className="text-2xl font-light italic text-gold-200 border-l-4 border-gold-300 pl-6 my-8">
                &quot;In a world full of hate... let&apos;s show some LOVE!&quot;
              </blockquote>
              <p>
                Join us as we continue this meaningful tradition, creating memories on the 
                course while making a real difference in the lives of families who need our support.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="font-display font-semibold text-2xl text-forest-900 mb-6">
            Ready to Make a Difference?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#registration"
              className="bg-forest-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-forest-700 transition-colors duration-200"
            >
              View Registration Options
            </a>
            <a
              href="#contact"
              className="border-2 border-forest-900 text-forest-900 px-8 py-4 rounded-full font-semibold hover:bg-forest-900 hover:text-white transition-all duration-200"
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