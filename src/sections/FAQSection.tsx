import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    question: "Колко време отнема, за да усетя ефекта?",
    answer: "Повечето клиенти споделят, че усещат повече енергия още през първите 3-5 дни. За пълна имунна подкрепа препоръчваме минимум 2-3 седмици непрекъснат прием. Всеки организъм е различен, но билковите екстракти започват да работят от първия прием."
  },
  {
    question: "Безопасен ли е продуктът за деца и бременни?",
    answer: (
  <>
    Naturino Kids е 100% натурален и регистриран в БАБХ, като хранителна добавка. За деца под 12 години се препоръчва да се приема детския Naturino Kids, който е от 18 месеца до 12 години. Може да намерите повече информация за детския продукт на{' '}
    <a 
      href="https://kids.naturinokids.bg/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-green-600 font-bold underline hover:text-green-800 transition-colors"
    >
      kids.naturinokids.bg
    </a>
    . Бременни и кърмачки винаги се консултирайте с лекар преди употреба. Съставките са чисти билкови екстракти, но всяка ситуация е индивидуална.
  </>
)
  },
  {
    question: "Как се приема — преди, по време или след храна?",
    answer: "Препоръчваме да се приема по 25 капки (около 1.2 мл), разтворени в малко вода или сок, 2 пъти дневно — сутрин и вечер. Може да се приема както на гладно, така и след храна. За максимален ефект приемайте редовно, без да пропускате дни."
  },
  {
    question: "Има ли странични ефекти?",
    answer: "Продуктът е изцяло натурален и не съдържа консерванти, оцветители или синтетични добавки. При свръхчувствителност към някоя от 13-те билки, е възможно леко дразнене. Ако усетите нещо необичайно, спрете приема и се консултирайте с лекар. В противен случай, при правилна употреба, не са известни странични ефекти."
  },
  {
    question: "За колко дни стига една опаковка?",
    answer: "Едно шишенце от 50 мл стига за приблизително 20 дни при препоръчителния прием от 2 пъти дневно по 25 капки. Много клиенти поръчват 2 броя наведнъж, за да не прекъсват курса и да спестят още повече от промоцията."
  },
  {
    question: "Каква е доставката и колко струва?",
    answer: "Доставяме със Спиди или Еконт до избран от вас офис или личен адрес. Цената на доставката се изчислява от куриера според населеното място и се заплаща при получаване (наложен платеж). Обикновено е между 3-4€. За поръчки над 30€ доставката е безплатна."
  },
  {
    
  question: "С какво сте по-добри от другите билкови продукти?",
  answer: "Повечето продукти на пазара са смес от 3-5 съставки, без ясен механизъм. Ние сме единствените с Тройна Имунна Архитектура™ — 13 съставки, подредени да работят последователно на 3 нива. Плюс студено пресоване на съставките, които запазват 98% от активните си вещества. Това е разликата между 'пробвах' и 'работи'."
}
  
]

export default function FAQSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section ref={ref} className="relative py-16 md:py-24 bg-gradient-to-b from-white to-[#f7faf7] overflow-hidden">
      
      {/* Декоративен фон */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-green-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-[300px] h-[300px] bg-lime-100/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-3xl">
        
        {/* Заглавие */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10 md:mb-14"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : {}}
            className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs md:text-sm font-bold border border-green-200 mb-4"
          >
            <span className="text-lg">💬</span>
            Често задавани въпроси
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-green-900 mb-3" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Имате въпроси?
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-lime-500 to-green-500">
              Имаме отговори.
            </span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">
            Всичко, което трябва да знаете преди да поръчате. Ако не намерите отговора си — пишете ни!
          </p>
        </motion.div>

        {/* Акордеон */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.05 }}
              className={`bg-white rounded-2xl border-2 transition-all duration-300 ${
                openIndex === index ? 'border-green-400 shadow-lg shadow-green-100' : 'border-gray-100 shadow-sm hover:border-green-200'
              }`}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-4 md:p-5 text-left"
              >
                <span className={`font-bold text-sm md:text-base pr-4 transition-colors ${
                  openIndex === index ? 'text-green-800' : 'text-green-900'
                }`}>
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openIndex === index 
                    ? 'bg-green-500 text-white rotate-180' 
                    : 'bg-green-100 text-green-600'
                }`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 md:px-5 pb-4 md:pb-5 pt-0">
                      <div className="border-t border-green-100 pt-3">
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA под ЧЗВ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center"
        >
          <p className="text-gray-500 text-sm mb-4">
            Все още имате въпроси? Пишете ни на{' '}
            <a href="mailto: naturinokids@gmail.com" className="text-green-700 font-bold hover:underline">
              naturinokids@gmail.com
            </a>
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-[#ff6b00] to-[#ff8533] hover:from-[#e66000] hover:to-[#ff6b00] text-white font-black text-lg px-10 py-4 rounded-2xl shadow-[0_15px_40px_-10px_rgba(255,107,0,0.3)] transition-all"
          >
            ПОРЪЧАЙ СЕГА — 23.00 €
          </motion.button>
        </motion.div>

      </div>
    </section>
  )
}