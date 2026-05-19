import { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function UrgencySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  // ═══════════════════════════════════════════════════
  // ⏱️ ТАЙМЕР - 9 минути, рестартира при влизане
  // ═══════════════════════════════════════════════════
  const [stats, setStats] = useState({
    todayOrders: 0,
    totalSold: 0,
    remainingStock: 0,
    timer: { minutes: 9, seconds: 0 }
  })

  useEffect(() => {
    const now = new Date()
    const hour = now.getHours()

    // Реалистични поръчки според часа
    let baseOrders
    if (hour >= 0 && hour < 9) {
      baseOrders = Math.floor(Math.random() * 6) + 3
    } else if (hour >= 9 && hour < 13) {
      baseOrders = Math.floor(Math.random() * 14) + 12
    } else if (hour >= 13 && hour < 18) {
      baseOrders = Math.floor(Math.random() * 18) + 28
    } else {
      baseOrders = Math.floor(Math.random() * 28) + 35
    }

    const daysOnMarket = 90
    const avgDaily = Math.floor(Math.random() * 11) + 15
    const totalSold = daysOnMarket * avgDaily + baseOrders
    const warehouseStock = Math.floor(Math.random() * 80) + 40

    setStats({
      todayOrders: baseOrders,
      totalSold: totalSold,
      remainingStock: warehouseStock,
      timer: { minutes: 9, seconds: 0 }
    })

    // Таймер 9 минути - рестартира при влизане
    let totalSeconds = 9 * 60
    const timerInterval = setInterval(() => {
      totalSeconds -= 1
      if (totalSeconds <= 0) {
        totalSeconds = 0
        clearInterval(timerInterval)
      }
      const minutes = Math.floor(totalSeconds / 60)
      const seconds = totalSeconds % 60
      setStats(prev => ({
        ...prev,
        timer: { minutes, seconds }
      }))
    }, 1000)

    return () => clearInterval(timerInterval)
  }, [])

  const scrollToCheckout = () => {
    document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' })
  }

  const today = new Date()
  const todayFormatted = today.toLocaleDateString('bg-BG', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  return (
    <section ref={ref} className="relative py-12 md:py-16 bg-gradient-to-b from-white to-[#f7faf7] overflow-hidden">
      
      {/* Декоративен фон */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-orange-100/40 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        
        {/* ═══════════════════════════════════════════════════
            🚨 ЗАГЛАВИЕ + ТАЙМЕР
           ═══════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8 md:mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-2 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-red-600 font-black text-xs md:text-sm uppercase tracking-wider">
              Специална оферта за теб — {todayFormatted}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-3 leading-tight">
            Избери своята <span className="text-[#ff6b00]">ексклузивна отстъпка</span>
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-6">
            Тази оферта изтича след:
          </p>

          {/* Таймер - формат MM:SS */}
          <div className="flex justify-center gap-2 md:gap-3 mb-8">
            {[
              { value: 0, label: 'часа' },
              { value: stats.timer.minutes, label: 'мин' },
              { value: stats.timer.seconds, label: 'сек' }
            ].map((item, i) => (
              <div key={i} className="bg-gray-900 text-white rounded-xl px-3 md:px-5 py-3 md:py-4 min-w-[60px] md:min-w-[80px]">
                <div className="text-xl md:text-3xl font-black font-mono">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-[10px] md:text-xs text-gray-400 uppercase mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════
            🎁 ДВЕ ОФЕРТИ - Адаптивни карти
           ═══════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10"
        >
          
          {/* Опция 1 - 2 продукта */}
          <div className="group relative bg-white rounded-2xl md:rounded-3xl border-2 border-gray-100 hover:border-[#ff6b00]/30 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            {/* Популярно - лента */}
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 text-sm md:text-sm font-bold py-1.5 text-center uppercase tracking-wider">
              Популярен избор<br />⭐⭐⭐
            </div>
            
            <div className="p-5 md:p-8 pt-10">
              {/* Изображение placeholder */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 mb-5 text-center border border-green-100">
                <img src="/urgent/2.webp" alt="2 продукта" className="w-full h-32 object-contain" />
                <div className="text-sm text-green-700 font-bold">2 продукта Naturino Kids</div>
              </div>

              <div className="text-center mb-5">
                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2">
                  🎁 Вземи 2 продукта
                </h3>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full px-4 py-2 font-bold text-sm md:text-base shadow-md">
                  <span>-9% отстъпка за следваща поръчка</span>
                </div>
              </div>

              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Стандартна доставка със Speedy</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Купон -9% за следваща покупка</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Наложен платеж при получаване</span>
                </li>
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToCheckout}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-black text-base md:text-lg py-3.5 md:py-4 rounded-xl shadow-lg transition-colors"
              >
                ИЗБЕРИ 2 ПРОДУКТА →
              </motion.button>
            </div>
          </div>

          {/* Опция 2 - 3+ продукта */}
          <div className="group relative bg-white rounded-2xl md:rounded-3xl border-2 border-[#ff6b00]/40 shadow-lg hover:shadow-xl hover:shadow-orange-100 transition-all duration-300 overflow-hidden">
            {/* BEST VALUE - лента */}
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#ff6b00] to-[#ff8533] text-white text-sm md:text-sm font-black py-2 text-center uppercase tracking-wider shadow-md leading-tight">
               <div className="md:hidden">
               👉 Най-добра стойност 👈<br />Спести най-много!<br /> ⭐⭐⭐⭐⭐
            </div>
                <div className="hidden md:block">
               👉 Най-добра стойност - Спести най-много! 👈<br /> ⭐⭐⭐⭐⭐
            </div>
            
            
            </div>

            <div className="p-5 md:p-8 pt-12">
              {/* Изображение placeholder */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 mb-5 text-center border border-orange-100">
                <img src="/urgent/3.webp" alt="3+ продукта" className="w-full h-32 object-contain" />
                <div className="text-sm text-orange-700 font-bold">3+ продукта Naturino Kids</div>
              </div>

              <div className="text-center mb-5">
                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2">
                  🚀 Вземи 3+ продукта
                </h3>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff6b00] to-[#ff8533] text-white rounded-full px-4 py-2 font-bold text-sm md:text-base shadow-md">
                  <span>-9% + БЕЗПЛАТНА ДОСТАВКА СЕГА</span>
                </div>
              </div>

              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#ff6b00] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-bold text-gray-900">БЕЗПЛАТНА доставка със Speedy</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#ff6b00] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-bold text-gray-900">-9% отстъпка за следваща поръчка</span>
                </li>               
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#ff6b00] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Приоритетна обработка на поръчката</span>
                </li>
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToCheckout}
                className="w-full bg-gradient-to-r from-[#ff6b00] to-[#ff8533] hover:from-[#e66000] hover:to-[#ff6b00] text-white font-black text-base md:text-lg py-3.5 md:py-4 rounded-xl shadow-lg shadow-orange-200 transition-all"
              >
                ИЗБЕРИ 3+ ПРОДУКТА →
              </motion.button>
            </div>
          </div>

        </motion.div>

        {/* ═══════════════════════════════════════════════════
            📊 СТАТИСТИКА - 3 колони
           ═══════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-2 md:gap-4 mb-8"
        >
          <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-6 border border-gray-100 shadow-sm text-center">
            <div className="text-xl md:text-3xl font-black text-green-700 mb-1">
              {stats.todayOrders}
            </div>
            <div className="text-xs md:text-sm text-gray-500 font-medium">
              поръчки днес
            </div>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-6 border border-gray-100 shadow-sm text-center">
            <div className="text-xl md:text-3xl font-black text-green-700 mb-1">
              {stats.totalSold.toLocaleString('bg-BG')}
            </div>
            <div className="text-xs md:text-sm text-gray-500 font-medium">
              доволни клиенти
            </div>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-6 border border-gray-100 shadow-sm text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded-bl-lg">
              Live
            </div>
            <div className="text-xl md:text-3xl font-black text-orange-600 mb-1">
              {stats.remainingStock}
            </div>
            <div className="text-xs md:text-sm text-gray-500 font-medium">
              бройки налични
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════
            💬 СОЦИАЛНО ДОКАЗАТЕЛСТВО
           ═══════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-green-50 to-lime-50 rounded-2xl p-4 md:p-6 border border-green-100 mb-6"
        >
          <div className="flex items-start gap-3 md:gap-4">
            <div className="bg-green-100 rounded-full p-2 md:p-3 flex-shrink-0">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-green-900 mb-1 text-lg md:text-base">Защо да ни се доверите?</h3>
              <p className="text-green-800 text-xs md:text-xs leading-relaxed">
                Всяка поръчка е реална и се обработва в рамките на 24 часа. 
                Продуктът е <span className="font-bold">регистриран в БАБХ</span> и произведен в България. 
                Не сте доволни? <span className="font-bold">Връщаме парите без въпроси</span> в рамките на 14 дни.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════
            🎁 БОНУС ИНФО - Доставка (4 колони)
           ═══════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3"
        >
          {[
            { icon: '🚚', text: 'Доставка със Speedy или ЕКОНТ' },
            { icon: '📦', text: 'До офис или адрес' },
            { icon: '💰', text: 'Наложен платеж' },
            { icon: '🔄', text: '14 дни право на връщане' }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-2 md:p-3 border border-gray-100 text-center text-xs md:text-sm">
              <div className="text-xl md:text-2xl mb-1">{item.icon}</div>
              <div className="text-gray-700 font-medium">{item.text}</div>
            </div>
          ))}
        </motion.div>

        {/* ═══════════════════════════════════════════════════
                    🏅 БАДЖОВЕ — най-отдолу
            ═══════════════════════════════════════════════════ */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <div className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1.5 rounded-full border border-green-200">
            ✓ Регистриран в БАБХ
          </div>
          <div className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1.5 rounded-full border border-blue-200">
            ✓ 100% Натурални съставки
          </div>
          <div className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1.5 rounded-full border border-orange-200">
            ✓ Произведено в България
          </div>
          <div className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1.5 rounded-full border border-purple-200">
            ✓ 14 дни връщане
          </div>
        </div>

      </div>
    </section>
  )
}