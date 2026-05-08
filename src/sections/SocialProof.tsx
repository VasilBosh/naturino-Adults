import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const videoTestimonials = [
  { id: 1, url: "https://play.gumlet.io/embed/69f0f469a3dc19951f1fc4b2", title: "Отзив от момче" },
  { id: 2, url: "https://play.gumlet.io/embed/69f9b0e37f6233f570ffd579", title: "Ангелова" },
  { id: 3, url: "https://play.gumlet.io/embed/69f0f4b44d5bf5db18ddf024", title: "Отзив от мъж - сутрешен прием" },
  { id: 4, url: "https://play.gumlet.io/embed/69f0f4cf9c68b6349a93c5fe", title: "Отзив от спортист жена" }
]

const stats = [
  { value: '11,000+', label: 'Доволни клиенти' },
  { value: '97%', label: 'Биха препоръчали' },
  { value: '4.9/5', label: 'Средна оценка' },
  { value: '0', label: 'Странични ефекти' }
]

const testimonials = [
  { name: 'Димитър Колев', role: 'ИТ специалист', content: 'Работя по 10 часа пред монитор и следобед бях като парцал. Naturino Kids ми го препоръчаха в Аптеки Апостолов. Вече втора седмица го пия – фокусът ми е на друго ниво, а умората просто изчезна.', rating: 5 },
  { name: 'Катя Иванова', role: 'Активен спортист', content: 'Търсех нещо натурално, без химия. Тези 13 билки са страхотна комбинация. Възстановявам се много по-бързо след тренировка и се чувствам жизнена през целия ден.', rating: 5 },
  { name: 'Стефан Петров', role: 'Шофьор', content: 'Бях скептичен, но продуктът наистина работи. Пипетата е много удобна за дозиране сутрин. Вече не ми се спи зад волана следобед. Определено си струва!', rating: 5 },
  { name: 'Мария Стоянова', role: 'Учителка', content: 'Пролетната умора винаги ме удряше лошо. С Naturino Kids усетих разликата още на 5-ия ден. Имам енергия за децата в училище и после за моите вкъщи. Препоръчвам с две ръце!', rating: 5 },
  { name: 'д-р Георгиев', role: 'Клиент', content: 'Като човек, който държи на чистите съставки, бях впечатлен от формулата с Рейши и Шийтаке. Изключително качествен билков екстракт, който рядко се намира на такава цена.', rating: 5 },
  { name: 'Елена Николова', role: 'Пенсионер', content: 'Взех го за имунитет по съвет на фармацевта. Чувствам се много по-добре, няма я тежестта и апатията. Доставката беше много бърза – дойде на следващия ден.', rating: 5 }
];

export default function SocialProof() {
  const ref = useRef(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState(0)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const newIndex = Math.round(scrollLeft / clientWidth)
      setActiveIndex(newIndex)
    }
  }

  return (
    <section ref={ref} className="relative py-20 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-green-50/30 to-white z-10" />
      <div className="relative z-20 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-green-700 font-semibold tracking-wider uppercase text-sm">Реални резултати</span>
          <h2 className="text-4xl md:text-5xl font-bold text-green-900 mt-3 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Какво казват хората, <br />
            <span className="text-green-600">които вече го ползват?</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Вижте истинските истории на нашите клиенти и как Naturino Kids промени ежедневието им.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="spring-card text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-green-100 shadow-sm">
              <div className="text-3xl md:text-4xl font-bold text-green-700 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Променен контейнер за видеата */}
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto mb-16">
          {videoTestimonials.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 * (index + 1) }}
              className="group relative w-full md:w-[calc(33.333%-2rem)] min-w-[300px]"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-xl bg-black aspect-square border-4 border-white transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl">
                <iframe
                  loading="lazy"
                  title={video.title}
                  src={video.url}
                  style={{ border: 'none', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
                  referrerPolicy="origin"
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write;"
                ></iframe>
              </div>
              <div className="mt-4 text-center">
                <div className="flex justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-sm">★</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="spring-card rounded-2xl p-6 max-w-4xl mx-auto bg-white/80 backdrop-blur-sm border border-green-100 shadow-lg mb-16"
        >
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-[10px] text-center leading-tight p-1">БАБХ</div>
              <span className="text-green-900 text-sm font-semibold">Рег. № Т242506847</span>
            </div>
            <div className="w-px h-8 bg-green-200 hidden md:block" />
            <div className="flex items-center gap-2">
              <span className="text-xl">🔒</span>
              <span className="text-green-900 text-sm font-semibold">SSL Защита</span>
            </div>
            <div className="w-px h-8 bg-green-200 hidden md:block" />
            <div className="flex items-center gap-2">
              <span className="text-xl">🚚</span>
              <span className="text-green-900 text-sm font-semibold">1-2 дни доставка</span>
            </div>
            <div className="w-px h-8 bg-green-200 hidden md:block" />
            <div className="flex items-center gap-2">
              <span className="text-xl">↩️</span>
              <span className="text-green-900 text-sm font-semibold">14 дни връщане</span>
            </div>
          </div>
        </motion.div>

        <div className="relative max-w-6xl mx-auto group">
          <button onClick={() => scroll('left')} className="absolute -left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white rounded-full shadow-xl border border-green-100 items-center justify-center text-green-700 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex">
            <ChevronLeft size={24} />
          </button>
          <button onClick={() => scroll('right')} className="absolute -right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white rounded-full shadow-xl border border-green-100 items-center justify-center text-green-700 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex">
            <ChevronRight size={24} />
          </button>
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-[85vw] md:w-[400px] snap-center bg-white rounded-3xl p-8 shadow-md border border-green-50 flex-shrink-0">
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold uppercase">{testimonial.name.charAt(0)}</div>
                  <div>
                    <h4 className="font-bold text-green-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'w-8 bg-green-600' : 'w-2 bg-green-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}} />
    </section>
  )
}