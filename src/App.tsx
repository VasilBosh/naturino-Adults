import { useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Sections
import HeroSection from './sections/HeroSection'
import PharmacistSection from './sections/PharmacistSection'
import IngredientsSection from './sections/IngredientsSection'
import BenefitsSection from './sections/BenefitsSection'
import SocialProof from './sections/SocialProof'
import UrgencySection from './sections/UrgencySection'
import FAQSection from './sections/FAQSection'
import CheckoutSection from './sections/CheckoutSection'

// --- МОДАЛ: ОБЩИ УСЛОВИЯ ---
function TermsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-[110] terms-modal-overlay flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-green-900" style={{ fontFamily: 'var(--font-heading)' }}>Общи условия</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
        </div>
        <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
          <p><strong>1. Информация за продавача:</strong><br/>"Niki-2025" ЕООД, ЕИК 208228805, със седалище гр. Казанлък, Изток 48, България. Email: naturinokids@gmail.com, Телефон: 0896 783 751.</p>
          <p><strong>2. Продукт:</strong><br/>Naturino Kids – Натурална защита за възрастни е хранителна добавка, регистрирана в БАБХ с рег. № Т242506847/2025. Продуктът не е лекарствено средство и не замества разнообразното хранене.</p>
          <p><strong>3. Цена и плащане:</strong><br/>Цената на продукта е 23.00 € за 50мл. Плащането се извършва чрез наложен платеж при доставка. Доставката се изпълнява чрез куриерски услуги Спиди или Еконт.</p>
          <p><strong>4. Доставка:</strong><br/>Доставката се извършва до посочен от клиента офис на избрания куриер или до личния му адрес в рамките на 1-3 работни дни. Цената на доставката се изчислява от куриера.</p>
          <p><strong>5. Право на отказ:</strong><br/>Клиентът има право да се откаже от поръчката в срок от 14 дни от получаването на продукта, съгласно ЗЗП. Продуктът трябва да бъде в оригинална опаковка и неразпечатан.</p>
          <p><strong>6. Гаранция:</strong><br/>Предоставя се 30-дневна гаранция за връщане на сумата при липса на удовлетворителни резултати, при условие че продуктът е бил приеман съгласно инструкциите.</p>
          <p><strong>7. Лични данни:</strong><br/>Личните данни на клиентите се обработват съгласно Закона за защита на личните данни и Общия регламент за защита на данните (GDPR).</p>
          <p><strong>8. Контакти:</strong><br/>Email: naturinokids@gmail.com<br/>Телефон: 0896 783 751<br/>Адрес: гр. Казанлък, България</p>
        </div>
        <button onClick={onClose} className="btn-green w-full mt-6 py-3 text-sm">Разбрах</button>
      </motion.div>
    </div>
  )
}

// --- МОДАЛ: ПОЛИТИКА ЗА ПОВЕРИТЕЛНОСТ (ОБНОВЕН С FACEBOOK) ---
function PrivacyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-[110] terms-modal-overlay flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-green-900" style={{ fontFamily: 'var(--font-heading)' }}>Политика за поверителност</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
        </div>
        <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
          <p><strong>1. Администратор на данни:</strong><br/>"Niki-2025" ЕООД събира и обработва Вашите данни с цел изпълнение на Вашата поръчка и доставка на продукта.</p>
          
          <p><strong>2. Facebook Pixel и Маркетинг:</strong><br/>Този сайт използва Facebook Pixel – инструмент за анализ, който ни позволява да измерваме ефективността на нашите реклами и да Ви показваме релевантно съдържание в социалните мрежи. Данните, събрани чрез пиксела (като посещения на страници и действия в сайта), се обработват от Meta Platforms Inc.</p>
          
          <p><strong>3. „Бисквитки“ (Cookies):</strong><br/>Използваме бисквитки за правилното функциониране на количката за поръчки и за маркетингови цели. Можете да управлявате настройките на бисквитките чрез Вашия браузър.</p>

          <p><strong>4. Какви данни събираме:</strong><br/>При поръчка събираме: Име и фамилия, телефон, имейл и адрес. Тези данни са необходими единствено за куриерската услуга.</p>
          
          <p><strong>5. Споделяне с трети страни:</strong><br/>Вашите данни се споделят само с куриерски фирми (Спиди/Еконт) и се обработват статистически от рекламните инструменти на Facebook (без да се продават на други лица).</p>
          
          <p><strong>6. Вашите права:</strong><br/>Имате право на достъп, корекция или изтриване на Вашите данни. За целта се свържете с нас на: naturinokids@gmail.com.</p>
        </div>
        <button onClick={onClose} className="btn-green w-full mt-6 py-3 text-sm">Разбрах</button>
      </motion.div>
    </div>
  )
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      setMenuOpen(false)
      setTimeout(() => {
        const offset = 90;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 50)
    }
  }

  const isDark = scrolled

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled ? 'glass-dark py-3 shadow-lg' : 'bg-white/80 backdrop-blur-md py-4 shadow-sm'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-yellow-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              N
            </div>
            <span className={`font-bold text-lg hidden sm:block transition-colors ${isDark ? 'text-white' : 'text-green-900'}`}>
              Naturino Kids
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-5">
            <button onClick={() => scrollTo('pharmacist-section')} className={`transition-colors text-sm font-semibold hover:opacity-80 ${isDark ? 'text-white/90 hover:text-white' : 'text-green-800 hover:text-green-600'}`}>
              Фармацевт
            </button>
            <button onClick={() => scrollTo('ingredients-section')} className={`transition-colors text-sm font-semibold hover:opacity-80 ${isDark ? 'text-white/90 hover:text-white' : 'text-green-800 hover:text-green-600'}`}>
              Билки
            </button>
            <button onClick={() => scrollTo('benefits-section')} className={`transition-colors text-sm font-semibold hover:opacity-80 ${isDark ? 'text-white/90 hover:text-white' : 'text-green-800 hover:text-green-600'}`}>
              Ползи
            </button>
            <button onClick={() => scrollTo('reviews-section')} className={`transition-colors text-sm font-semibold hover:opacity-80 ${isDark ? 'text-white/90 hover:text-white' : 'text-green-800 hover:text-green-600'}`}>
              Отзиви
            </button>
            <button onClick={() => scrollTo('faq-section')} className={`transition-colors text-sm font-semibold hover:opacity-80 ${isDark ? 'text-white/90 hover:text-white' : 'text-green-800 hover:text-green-600'}`}>
              ЧЗВ
            </button>
            <button onClick={() => setPrivacyOpen(true)} className={`transition-colors text-sm font-semibold hover:opacity-80 ${isDark ? 'text-white/90 hover:text-white' : 'text-green-800 hover:text-green-600'}`}>
              Политика за поверителност
            </button>
            <button onClick={() => setTermsOpen(true)} className={`transition-colors text-sm font-semibold hover:opacity-80 ${isDark ? 'text-white/90 hover:text-white' : 'text-green-800 hover:text-green-600'}`}>
              Общи условия
            </button>
            <button onClick={() => scrollTo('checkout-section')} className="btn-green py-2 px-5 text-xs">
              ПОРЪЧАЙ
            </button>
          </div>

          <button
            className={`lg:hidden text-2xl transition-colors p-2 ${isDark ? 'text-white' : 'text-green-900'}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden glass-dark mx-4 rounded-xl mt-2 overflow-hidden shadow-2xl border border-white/10"
            >
              <div className="p-4 flex flex-col gap-1">
                <button onClick={() => scrollTo('pharmacist-section')} className="text-white/90 hover:text-white transition-colors text-left py-4 text-base font-medium border-b border-white/5">Фармацевт</button>
                <button onClick={() => scrollTo('ingredients-section')} className="text-white/90 hover:text-white transition-colors text-left py-4 text-base font-medium border-b border-white/5">Билки</button>
                <button onClick={() => scrollTo('benefits-section')} className="text-white/90 hover:text-white transition-colors text-left py-4 text-base font-medium border-b border-white/5">Ползи</button>
                <button onClick={() => scrollTo('reviews-section')} className="text-white/90 hover:text-white transition-colors text-left py-4 text-base font-medium border-b border-white/5">Отзиви</button>
                <button onClick={() => scrollTo('faq-section')} className="text-white/90 hover:text-white transition-colors text-left py-4 text-base font-medium border-b border-white/5">ЧЗВ</button>
                <button onClick={() => { setTermsOpen(true); setMenuOpen(false); }} className="text-white/90 hover:text-white transition-colors text-left py-4 text-base font-medium border-b border-white/5">Общи условия</button>
                <button onClick={() => { setPrivacyOpen(true); setMenuOpen(false); }} className="text-white/90 hover:text-white transition-colors text-left py-4 text-base font-medium border-b border-white/5">Политика за поверителност</button>
                <button onClick={() => scrollTo('checkout-section')} className="btn-green py-4 text-center text-sm mt-4 font-bold">
                  ПОРЪЧАЙ СЕГА
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <TermsModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />
      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </>
  )
}

function FloatingBar() {
  const [barVisible, setBarVisible] = useState(false)
  const [afterCheckout, setAfterCheckout] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const checkoutSection = document.getElementById('checkout-section')
      if (!checkoutSection) return

      const checkoutRect = checkoutSection.getBoundingClientRect()
      const checkoutTop = checkoutRect.top
      const viewportHeight = window.innerHeight

      const pastHero = window.scrollY > 400
      const checkoutVisible = checkoutTop < viewportHeight && checkoutRect.bottom > 0

      if (checkoutRect.bottom < 0) {
        setBarVisible(true)
        setAfterCheckout(true)
      } else if (checkoutVisible) {
        setBarVisible(false)
      } else if (pastHero) {
        setBarVisible(true)
        setAfterCheckout(false)
      } else {
        setBarVisible(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!barVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-0 left-0 right-0 z-50 floating-bar py-3 px-4"
    >
      <div className="container mx-auto flex items-center justify-between gap-4">
        <a href="tel:0896783751" className="phone-pill hidden sm:flex">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <span>0896 783 751</span>
        </a>

        <div className="flex-1 text-center hidden md:block">
          <p className="text-green-900 text-sm font-semibold">
            {afterCheckout ? 'Благодарим за поръчката! Имате въпроси?' : 'Промоцията изтича скоро! Не изпускайте!'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a href="tel:0896783751" className="phone-pill sm:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </a>
          <button
            onClick={() => {
              const el = document.getElementById('checkout-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary py-3 px-6 text-sm whitespace-nowrap"
          >
            {afterCheckout ? 'ПОРЪЧАЙ ПАК' : 'ПОРЪЧАЙ СЕГА'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function SceneBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url(/pharmacist.png)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-green-50/85 to-white/90" />
    </div>
  )
}

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Suspense fallback={<div className="fixed inset-0 z-0 bg-gradient-to-b from-green-50 to-white" />}>
        <SceneBackground />
      </Suspense>

      <Navigation />

      <div className="relative z-10 pb-20">
        <HeroSection />
        
        <section id="pharmacist-section">
          <PharmacistSection />
        </section>

        <section id="ingredients-section">
          <IngredientsSection />
        </section>

        <section id="benefits-section">
          <BenefitsSection />
        </section>

        <section id="reviews-section">
          <SocialProof />
        </section>
        
        <section id="faq-section">
          <FAQSection />
        </section>

        <UrgencySection />

        <section id="checkout-section">
          <CheckoutSection />
        </section>

        <footer className="bg-gradient-to-r from-green-800 to-green-900 py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-yellow-400 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                N
              </div>
              <span className="text-white font-bold text-xl">Naturino Kids</span>
            </div>

            <p className="text-green-200 text-sm mb-1">Натурална защита за възрастни – 100% билков екстракт</p>
            <p className="text-green-300 text-xs">Регистриран в БАБХ с рег. № Т242506847/2025 | Хранителна добавка</p>

            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-8">
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-green-700/50 flex items-center justify-center mx-auto mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <p className="text-green-200 text-sm font-semibold">Имейл</p>
                <a href="mailto:naturinokids@gmail.com" className="text-green-300 text-sm hover:text-white transition-colors">naturinokids@gmail.com</a>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-green-700/50 flex items-center justify-center mx-auto mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <p className="text-green-200 text-sm font-semibold">Телефон</p>
                <a href="tel:0896783751" className="text-green-300 text-sm hover:text-white transition-colors">0896 783 751</a>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-green-700/50 flex items-center justify-center mx-auto mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-green-200 text-sm font-semibold">Адрес</p>
                <p className="text-green-300 text-sm">гр. Казанлък, България</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-green-700/50 text-center">
              <p className="text-green-400/60 text-xs">Продуктът не е лекарствено средство. Не замества разнообразното хранене.</p>
              <p className="text-green-400/60 text-xs mt-1">Предлага се във веригата <span className="text-green-300 font-semibold">Аптеки Апостолов</span></p>
              <p className="text-green-500/40 text-xs mt-4">&copy; 2025 Naturino Kids. Всички права запазени.</p>
            </div>
          </div>
        </footer>
      </div>
      <FloatingBar />
    </div>
  )
}