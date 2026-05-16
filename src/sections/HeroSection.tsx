import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function HeroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const scrollToCheckout = () => {
    document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' })
  }

  const levels = [
    {
      num: "01",
      title: "ИМУНИТЕТ И ЕНЕРГИЯ",
      desc: "Тези съставки са богати на Витамин С и антиоксиданти. Те изграждат антивирусен щит, като същевременно предпазват клетките от оксидативен стрес, което гарантира, че имунната система работи без да черпи от жизнената ти енергия.",
      color: "from-emerald-500 to-green-400",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      items: ["🍋 Планински лимон", "🫐 Бъзак", "🏮 Шипка", "🌿 Мащерка"]
    },
    {
      num: "02",
      title: "ФОКУС И КОНЦЕНТРАЦИЯ",
      desc: "Ментата и джинджифилът подобряват кръвообращението (включително към мозъка). Ехинацеята и аронията пречистват системата, което премахва стреса и позволява на хората да повишат концентрацията си значително.",
      color: "from-lime-500 to-green-500",
      bgColor: "bg-lime-50",
      borderColor: "border-lime-200",
      items: ["🫚 Джинджифил", "🌸 Ехинацея", "🍃 Мента", "🍇 Арония"]
    },
    {
      num: "03",
      title: "БЪРЗО ВЪЗСТАНОВЯВАНЕ И БАЛАНС",
      desc: "Балансира и възстановява цялата система, като адаптогените (Астрагал, Рейши) регулират кортизола. Гъбите и сладкият корен помагат на тялото да се възстанови от физическо и психическо натоварване до 2 пъти по-бързо, връщайки баланса в нервната система за кратко време.",
      color: "from-green-600 to-emerald-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      items: ["🌱 Астрагал", "🟤 Сладък корен", "🌾 Лимонена трева", "🍄 Рейши", "🍄 Шийтаке"]
    }
  ]

  const benefits = [
    { icon: "🛡️", title: "Силен имунитет", desc: "3 линии на защита" },
    { icon: "⚡", title: "Енергия целия ден", desc: "Без нужда от кафе" },
    { icon: "🧠", title: "Яснота и фокус", desc: "Ментална острота" },
    { icon: "💪", title: "Бързо възстановяване", desc: "След тренировка и стрес" },
    { icon: "🧘", title: "Малко стрес", desc: "Адаптогени балансират" }
  ]

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-12 bg-[#f7faf7]">
      
      {/* Декоративен фон */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-green-200/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-lime-200/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #22c55e 1.5px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="relative z-20 container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-8"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-lime-100 text-green-700 px-4 py-2 rounded-full text-xs md:text-sm font-bold border border-green-200 mb-4 md:mb-6"
          >
            <span className="text-lg">🔥</span>
            Единствената формула в България, работеща на 5 нива!
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-green-900 mb-3 md:mb-4 leading-[1.1] tracking-tight max-w-4xl mx-auto" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Събуждаш ли се изморен 
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-lime-500 to-green-500 mt-0 inline-block leading-[1.3]">
              още преди денят да е започнал?
            </span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            13 натурални екстракта за <span className="text-green-700 font-bold">енергия, фокус и имунна подкрепа</span> — без кафе, без сривове, без тежки режими.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-6 md:mb-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3 max-w-4xl mx-auto">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
                whileHover={{ y: -2 }}
                className="bg-white rounded-xl p-3 md:p-4 border border-green-100 shadow-sm text-center"
              >
                <div className="text-2xl md:text-3xl mb-1">{b.icon}</div>
                <div className="text-green-900 font-bold text-xs md:text-sm leading-tight">{b.title}</div>
                <div className="text-green-600 text-[10px] md:text-xs mt-0.5">{b.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mb-6 md:mb-10"
        >
          <div className="text-center mb-4 md:mb-6">
            <h2 className="text-2xl md:text-4xl font-bold text-green-800" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Как работи? <span className="text-green-600">Тройна Имунна Архитектура™</span>
            </h2>
            <p className="text-gray-500 text-lg md:text-xxl mt-1">13 билки, подредени да работят като един организъм — не просто смесени</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto">
            {levels.map((level, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.12 }}
                whileHover={{ y: -3 }}
                className={`${level.bgColor} rounded-2xl p-5 border-2 ${level.borderColor} flex flex-col gap-4`}
              >
                {/* ФИКСИРАНА ЦИФРА И ЗАГЛАВИЕ */}
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${level.color} flex items-center justify-center text-white font-black text-sm shadow-md`}>
                    {level.num}
                  </div>
                  <h3 className="font-bold text-green-900 text-xl leading-tight uppercase tracking-tight">
                    {level.title}
                  </h3>
                </div>

                <p className="text-green-700 text-[14px] leading-relaxed">
                  {level.desc}
                </p>

                <div className="space-y-1 mt-auto">
                  {level.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-2 bg-white/60 rounded-lg px-2 py-1 border border-white/50">
                      <span className="text-base">{item.split(' ')[0]}</span>
                      <span className="text-green-800 text-sm font-medium">{item.split(' ').slice(1).join(' ')}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="w-full max-w-[420px] md:max-w-[480px] mb-6"
          >
            <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.12)] border border-gray-50 relative">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-400 via-lime-400 to-green-500 rounded-t-[32px]" />
              
              <div className="bg-gradient-to-br from-[#f2f7f2] to-[#e8f5e8] rounded-[28px] p-6 md:p-8 mb-5 flex justify-center">
                <img 
                  src="/product.webp" 
                  alt="Naturino Kids" 
                  className="w-full h-auto max-h-[320px] md:max-h-[380px] object-contain drop-shadow-2xl"
                />
              </div>

              <div className="flex justify-between items-end px-2">
                <div>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Промо цена</p>
                  <span className="text-green-900 text-3xl font-black">23.00 €</span>
                </div>
                <div className="bg-amber-400 text-green-900 text-xs font-black px-4 py-2 rounded-xl">
                  50% OFF
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="text-center"
          >
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {['Регистриран в БАБХ', 'Без консерванти', '100% натурален'].map((t, i) => (
                <span key={i} className="bg-white border border-green-100 px-3 py-1.5 rounded-lg text-xs font-bold text-green-700 shadow-sm flex items-center gap-1.5">
                  <span className="text-green-500">✓</span> {t}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToCheckout}
                className="bg-gradient-to-r from-[#ff6b00] to-[#ff8533] hover:from-[#e66000] hover:to-[#ff6b00] text-white text-lg md:text-xl font-black px-12 py-5 rounded-2xl shadow-[0_20px_50px_-10px_rgba(255,107,0,0.35)] transition-all flex items-center gap-2"
              >
                ПОРЪЧАЙ СЕГА
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.button>
              
              <div className="flex flex-col items-center">
                <span className="text-gray-400 line-through text-base font-bold">46.00 €</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-green-900 text-4xl md:text-5xl font-black tracking-tighter">23.00 €</span>
                  <span className="bg-amber-400 text-green-900 text-xs font-black px-2 py-1 rounded-lg">-50%</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="flex justify-center mt-6 md:mt-10"
        >
          <div className="flex flex-col items-center gap-1 text-gray-400 animate-bounce">
            <span className="text-xs font-medium">Виж научната формула</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>

      </div>
    </section>
  )
}