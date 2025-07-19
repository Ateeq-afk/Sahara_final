import { Home, Users, Calendar, Ruler } from 'lucide-react'

const stats = [
  {
    id: 1,
    value: '500+',
    label: 'Projects Delivered',
    description: 'Homes built with precision',
    icon: Home,
    color: 'from-blue-600 to-blue-700'
  },
  {
    id: 2,
    value: '1000+',
    label: 'Happy Families',
    description: 'Trust us with their dreams',
    icon: Users,
    color: 'from-emerald-600 to-emerald-700'
  },
  {
    id: 3,
    value: '20+',
    label: 'Years of Excellence',
    description: 'Industry experience',
    icon: Calendar,
    color: 'from-purple-600 to-purple-700'
  },
  {
    id: 4,
    value: '5M+',
    label: 'Sq Ft Constructed',
    description: 'Spaces transformed',
    icon: Ruler,
    color: 'from-orange-600 to-orange-700'
  }
]

export default function StatsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Gradient Orbs - Made more subtle */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Building Trust Through
            <span className="block text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Proven Excellence
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Two decades of transforming visions into architectural masterpieces across Bangalore
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 bg-white rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-sm border border-gray-100">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.id} className="text-center">
                {/* Icon Container */}
                <div className="inline-flex mb-6">
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${stat.color} p-5 sm:p-6 shadow-xl`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                </div>

                {/* Number */}
                <div className="mb-3">
                  <span className="text-5xl md:text-6xl font-bold text-gray-900">
                    {stat.value}
                  </span>
                </div>

                {/* Label */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-base text-gray-700 font-medium">
                  {stat.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 sm:mt-12 lg:mt-16">
          <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 font-medium px-4">
            Join hundreds of satisfied homeowners who trusted us with their dreams
          </p>
          <a
            href="/quote"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Your Journey
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}