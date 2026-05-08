import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const benefits = [
  {
    title: 'Силен имунитет',
    desc: 'Активира 3 линии на защита: кожна, лигавична и клетъчна. Вирусите нямат шанс да проникнат.',
    stat: '+85%',
    statLabel: 'по-малко боледувания',
    icon: '🛡️'
  },
  {
    title: 'Енергия за целия ден',
    desc: 'Без кафе. Без енергийни напитки. Природна енергия, която не свършва в 15:00 часа.',
    stat: '10x',
    statLabel: 'повече енергия',
    icon: '⚡'
  },
  {
    title: 'Пролетна детоксикация',
    desc: 'Пречиства черния дроб и лимфната система от зимните токсини. Тялото ви "проговаря" отново.',
    stat: '7 дни',
    statLabel: 'до първи резултат',
    icon: '🌱'
  },
  {
    title: 'Ментална яснота',
    desc: 'Подобрява кръвообращението в мозъка. Забравете мъглата и пролетната апатия.',
    stat: '+40%',
    statLabel: 'по-добър фокус',
    icon: '🧠'
  },
  {
    title: 'Спортна форма',
    desc: 'Ускорява възстановяването след тренировка. Мускулите се регенерират за часове, не за дни.',
    stat: '2x',
    statLabel: 'по-бързо възстановяване',
    icon: '💪'
  },
  {
    title: 'Стрес резистентност',
    desc: 'Адаптогените балансират кортизола. Хаосът навън не ви докосва отвътре.',
    stat: '-60%',
    statLabel: 'по-малко стрес',
    icon: '🧘'
  }
]

export default function BenefitsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const scrollToCheckout = () => {
    document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-green-50/90 via-white/90 to-green-50/90 z-10" />

      <div className="relative z-20 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-green-700 font-semibold tracking-wider uppercase text-sm">Защо работи</span>
          <h2 className="text-4xl md:text-5xl font-bold text-green-900 mt-3 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Какво ще усетите
            <br />
            <span className="text-green-600">още през първата седмица?</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * index }}
              className="spring-card hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{benefit.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-green-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{benefit.desc}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-green-600">{benefit.stat}</span>
                    <span className="text-xs text-gray-500">{benefit.statLabel}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* How to use */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 spring-card max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-green-900 text-center mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Лесно като 1-2-3
          </h3>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-3 shadow-lg">1</div>
              <p className="text-green-900 font-semibold">Сутрин</p>
              <p className="text-gray-600 text-sm">1.2 мл с чаша вода</p>
            </div>
            <div className="text-green-500 text-2xl hidden md:block font-bold">→</div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-3 shadow-lg">2</div>
              <p className="text-green-900 font-semibold">Вечер</p>
              <p className="text-gray-600 text-sm">1.2 мл преди сън</p>
            </div>
            <div className="text-green-500 text-2xl hidden md:block font-bold">→</div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-3 shadow-lg">3</div>
              <p className="text-green-900 font-semibold">Повторете</p>
              <p className="text-gray-600 text-sm">Всеки ден за 30 дни</p>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">
            Разграфената пипета прави дозирането прецизно и лесно!
          </p>

          <div className="text-center mt-6">
            <button onClick={scrollToCheckout} className="btn-primary px-10 py-4">
              ЗАПОЧНИ СЕГА – 23.00 €
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
