import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function PharmacistSection() {
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
          <span className="badge-trust">ПРЕПОРЪЧАН ОТ ПРОФЕСИОНАЛИСТИ</span>
          <h2 className="text-4xl md:text-5xl font-bold text-green-900 mt-4 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Доверието на фармацевтите
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Продуктът е наличен и <span className="text-green-700 font-bold">препоръчан от фармацевтите</span> на веригата <span className="text-green-700 font-bold">Аптеки Апостолов</span>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Pharmacist Video Container */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-[500px] mx-auto lg:mx-0"
          >
            {/* Квадратна рамка 1:1 */}
            <div className="store-frame rounded-3xl overflow-hidden shadow-2xl relative aspect-square bg-white flex items-center justify-center">
              <iframe
                loading="lazy"
                title="Gumlet video player"
                src="https://play.gumlet.io/embed/69efc6529c68b6349a775b0f"
                style={{ 
                  border: 'none', 
                  width: '100%', 
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  objectFit: 'contain'
                }}
                referrerPolicy="origin"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write;"
              ></iframe>
            </div>

            {/* ПРОМЕНЕНА ЗНАЧКА: Сега е позиционирана върху видеото в долния десен ъгъл */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -bottom-12 right-1 z-30 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-xl w-fit"
            >
              <p className="text-sm font-bold leading-tight">Мария Димитрова</p>
              <p className="text-[11px] text-green-100 opacity-90">Фармацевт, Аптеки Апостолов</p>
            </motion.div>
          </motion.div>

          {/* Content Section - Непроменен */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="space-y-6">
              <div className="spring-card">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl flex-shrink-0">
                    💊
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-green-900 mb-1">Препоръчан в Аптеки Апостолов</h3>
                    <p className="text-gray-600 text-sm">
                      Продуктът е наличен в цялата верига аптеки. Фармацевтите го препоръчват като естествено решение за имунна подкрепа.
                    </p>
                  </div>
                </div>
              </div>

              <div className="spring-card">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl flex-shrink-0">
                    🌿
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-green-900 mb-1">Натурална формула без химия</h3>
                    <p className="text-gray-600 text-sm">
                      "Като фармацевт виждам хиляди продукти. Naturino Kids се откроява със своята чиста, 13-компонентна формула без изкуствени добавки."
                    </p>
                  </div>
                </div>
              </div>

              <div className="spring-card">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl flex-shrink-0">
                    👨‍👩‍👧‍👦
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-green-900 mb-1">Подходящ за цялото семейство (12+)</h3>
                    <p className="text-gray-600 text-sm">
                      Един продукт за всички – юноши над 12 години и възрастни. Лесно дозиране с разграфената пипета.
                    </p>
                  </div>
                </div>
              </div>

              <div className="spring-card">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl flex-shrink-0">
                    📋
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-green-900 mb-1">Регистриран в БАБХ</h3>
                    <p className="text-gray-600 text-sm">
                      Рег. № Т242506847/2025 – пълна проследяемост и гаранция за качество от Българската агенция по безопасност на храните.
                    </p>
                  </div>
                </div>
              </div>

              <button onClick={scrollToCheckout} className="btn-primary w-full py-4 mt-4">
                ПОРЪЧАЙ С ОТСТЪПКА 23.00 €
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}