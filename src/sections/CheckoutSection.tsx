import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════
// 📊 FACEBOOK PIXEL HELPER
// ═══════════════════════════════════════════════════════════════
function fbq(event: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', event, params)
  }
}

export default function CheckoutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Сложи твоя URL адрес от Google Apps Script тук след Deploy!
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzVUEmNygdu0AZFVEV0rxUqheFZzxkIK6MrFZnIEYTaAJcGv9XHgSSArPS03kLRFQc6/exec";

  useEffect(() => {
    if (isInView) {
      fbq('InitiateCheckout', {
        content_ids: ['naturino-kids'],
        content_type: 'product',
        value: 23.00,
        currency: 'EUR'
      })
    }
  }, [isInView])

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    courier: 'Спиди',
    city: '',
    address: '',
    promoCode: ''
  })

  const [successData, setSuccessData] = useState<{ firstName: string; phone: string }>({ firstName: '', phone: '' })
  const [quantity, setQuantity] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isPromoValid, setIsPromoValid] = useState(false)

  const basePrice = 23
  const discount = isPromoValid ? 0.09 : 0
  const price = basePrice * (1 - discount)
  const total = price * quantity

  const checkPromoCode = (code: string) => {
    if (code.toUpperCase() === 'PROMO99') {
      setIsPromoValid(true)
    } else {
      setIsPromoValid(false)
    }
  }

  const requiredFields = ['firstName', 'lastName', 'phone', 'email', 'city', 'address']
  const filledFields = requiredFields.filter(f => formData[f as keyof typeof formData]?.trim()).length
  const progress = Math.round((filledFields / requiredFields.length) * 100)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'Моля, въведете име'
    if (!formData.lastName.trim()) newErrors.lastName = 'Моля, въведете фамилия'
    if (!formData.phone.trim()) newErrors.phone = 'Моля, въведете телефон'
    if (!formData.email.trim()) newErrors.email = 'Моля, въведете имейл'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Невалиден имейл'
    if (!formData.city.trim()) newErrors.city = 'Моля, въведете град/село'
    if (!formData.address.trim()) newErrors.address = 'Моля, въведете адрес'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      courier: 'Спиди',
      city: '',
      address: '',
      promoCode: ''
    })
    setQuantity(1)
    setIsPromoValid(false)
    setErrors({})
    setTouched({})
  }

  // ═══════════════════════════════════════════════════════════════
  // 📤 ИЗПРАЩАНЕ НА ПОРЪЧКАТА (МОДИФИЦИРАНО)
  // ═══════════════════════════════════════════════════════════════
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      fbq('Contact', { status: 'validation_failed' })
      return
    }

    setIsSubmitting(true)

    // Подготовка на данните точно както ги очаква твоят Google Script
    const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`
    
    const orderData = {
      SK: 'id:9307307573', // Твоят ключ за достъп
      fullName: fullName,
      phone: formData.phone,
      email: formData.email,
      courier: formData.courier,
      city: formData.city,
      officeAddress: formData.address, // В скрипта е "officeAddress"
      notes: isPromoValid ? `Промо код: PROMO99` : '',
      quantity: quantity,
      total: total.toFixed(2),
      eventId: 'event_' + Date.now() // Уникално ID за Facebook CAPI
    }

    try {
      // ИЗПРАЩАНЕ КЪМ GOOGLE SHEETS
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Използваме no-cors, защото Google Apps Script често блокира CORS
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      // Facebook Pixel (Client-side)
      fbq('Purchase', {
        content_ids: ['naturino-kids'],
        content_type: 'product',
        value: total,
        currency: 'EUR',
        num_items: quantity
      })

      // Запазваме данните за модала
      setSuccessData({
        firstName: formData.firstName,
        phone: formData.phone
      })
      
      setIsSuccess(true)
      // ИЗПРАЩАНЕ КЪМ Фейсбук 
      if (typeof window !== 'undefined' && (window as any).fbq) {
        // 1. Подаваме данните за клиента (Advanced Matching), за да вдигнем оценката от 5.4
        (window as any).fbq('init', '1807775813528150', {
          em: formData.email ? formData.email.toLowerCase().trim() : "", 
          ph: formData.phone ? formData.phone.replace(/\D/g, '') : "",
          fn: formData.firstName ? formData.firstName.toLowerCase().trim() : "",
          ln: formData.lastName ? formData.lastName.toLowerCase().trim() : "",
          ct: formData.city ? formData.city.toLowerCase().trim() : "",
          country: 'bg'
        });

        // 2. Изпращаме самата покупка с всички детайли
        (window as any).fbq('track', 'Purchase', {
          value: total,
          currency: 'EUR',
          content_ids: ['naturino-kids'],
          content_type: 'product',
          num_items: quantity
        });
      }
      resetForm()

    } catch (error) {
      console.error('Грешка при изпращане:', error)
      alert('Възникна грешка при изпращането на поръчката. Моля, опитайте отново.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setTouched(prev => ({ ...prev, [field]: true }))
    
    if (field === 'promoCode') {
      checkPromoCode(value)
    }
    
    if (errors[field]) {
      setErrors(prev => { const newErrors = { ...prev }; delete newErrors[field]; return newErrors })
    }
  }

  return (
    <section id="checkout" ref={ref} className="relative py-12 md:py-24 bg-gradient-to-b from-[#f7faf7] via-white to-[#f7faf7] overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-green-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-orange-200/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-3 sm:px-4 md:px-8 max-w-6xl">
        
        {/* Заглавие */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8 md:mb-10"
        >
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : {}}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-bold mb-4 border border-orange-200"
          >
            <span className="text-lg">🎁</span>
            Почти сте готови! Остава само да попълните данните за доставка
          </motion.div>
          
          <h2 className="text-2xl md:text-5xl font-bold text-green-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            Завършете вашата поръчка
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto px-2">
            Попълнете данните по-долу и получете продукта още утре
          </p>

          {/* Прогрес бар */}
          <div className="max-w-md mx-auto mt-6 px-2">
            <div className="flex justify-between text-xs text-gray-500 mb-2 font-medium">
              <span>Попълнено {filledFields} от {requiredFields.length} полета</span>
              <span className="text-green-700 font-bold">{progress}%</span>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-green-500 to-lime-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8">
          
          {/* ═══════════════════════════════════════════════════════════════
              🛒 ЛЯВА КОЛОНА - Поръчка
             ═══════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="lg:sticky lg:top-24 space-y-4">
              
              <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100">
                <h3 className="text-base md:text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">🛒</span> Вашата поръчка
                </h3>

                <div className="flex gap-3 md:gap-4 mb-6 p-3 md:p-4 bg-gradient-to-br from-green-50 to-lime-50 rounded-2xl border border-green-100">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-xl p-2 flex items-center justify-center flex-shrink-0">
                    <img
                      src="/product-clean.png"
                      alt="Naturino Kids"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-green-900 font-bold text-base md:text-lg truncate">Naturino Kids</h4>
                    <p className="text-gray-500 text-xs md:text-sm">Натурална защита • 50мл</p>
                    <div className="flex items-center gap-2 md:gap-3 mt-3">
                      <div className="flex items-center bg-white rounded-full border border-green-200 shadow-sm">
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-green-700 hover:bg-green-50 transition-colors font-bold text-lg"
                        >
                          −
                        </button>
                        <span className="w-8 md:w-10 text-center font-bold text-green-900 text-sm">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.min(5, quantity + 1))}
                          className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-green-700 hover:bg-green-50 transition-colors font-bold text-lg"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-green-800 font-bold text-base md:text-lg">{(price * quantity).toFixed(2)} €</span>
                    </div>
                  </div>
                </div>

                {/* Разбивка */}
                <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                  <div className="flex justify-between text-gray-500 text-sm">
                    <span>Единична цена</span>
                    <div className="text-right">
                      {isPromoValid && (
                        <span className="text-gray-400 line-through text-xs mr-1">{basePrice.toFixed(2)} €</span>
                      )}
                      <span className="font-medium">{price.toFixed(2)} €</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-gray-500 text-sm">
                    <span>Количество</span>
                    <span className="font-medium">x{quantity}</span>
                  </div>
                  {isPromoValid && (
                    <div className="flex justify-between text-green-600 text-sm">
                      <span>Отстъпка (PROMO99)</span>
                      <span className="font-bold">-9%</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-500 text-sm">
                    <span>Доставка</span>
                    <span className="text-green-600 font-semibold">Изчислено от куриера</span>
                  </div>
                  <div className="border-t-2 border-dashed border-green-200 pt-2 md:pt-3 flex justify-between items-center">
                    <span className="text-gray-700 font-bold text-sm md:text-base">Общо</span>
                    <span className="text-green-700 font-black text-2xl md:text-3xl">
                      {total.toFixed(2)} €
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-3 md:p-4 border border-amber-200 mb-4">
                  <div className="flex items-center gap-2 text-amber-800">
                    <span className="text-lg md:text-xl">💰</span>
                    <span className="font-bold text-xs md:text-sm">
                      {isPromoValid 
                        ? `Спестявате ${((46 - price) * quantity).toFixed(2)} € общо!`
                        : `Спестявате ${((46 - 23) * quantity).toFixed(2)} € от промоцията!`
                      }
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: '🔒', text: 'SSL защита' },
                    { icon: '✓', text: 'БАБХ регистриран' },
                    { icon: '↩️', text: '14 дни връщане' },
                    { icon: '🏥', text: 'Аптеки Апостолов' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-green-700 text-[10px] md:text-xs bg-green-50 px-2 md:px-3 py-2 rounded-lg">
                      <span>{item.icon}</span>
                      <span className="font-medium truncate">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-base md:text-lg">
                    👩
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-600 text-xs md:text-sm italic leading-relaxed">
                      "Поръчах вчера, днес вече го получих в офиса на Спиди. Пробвах го преди малко и съм удивена още от първия прием. Страхотен продукт! Благодаря !"
                    </p>
                    <p className="text-green-700 text-xs font-bold mt-2">— Мария П., София ⭐⭐⭐⭐⭐</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ═══════════════════════════════════════════════════════════════
              📝 ДЯСНА КОЛОНА - Форма
             ═══════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100">
              
              <div className="flex items-center gap-2 mb-4 md:mb-6 pb-3 md:pb-4 border-b border-gray-100">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-green-500 to-lime-500 rounded-xl flex items-center justify-center text-white text-base md:text-lg flex-shrink-0">
                  📦
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg md:text-xl font-bold text-green-900 truncate">Данни за доставка</h3>
                  <p className="text-gray-400 text-xs truncate">Попълнете всички полета маркирани с *</p>
                </div>
              </div>

              <div className="space-y-4 md:space-y-5">
                {/* Име и Фамилия */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div className="relative">
                    <label className="block text-green-800 text-xs md:text-sm font-semibold mb-1">
                      Име <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      autoComplete="given-name"
                      value={formData.firstName}
                      onChange={e => updateField('firstName', e.target.value)}
                      className={`w-full bg-gray-50 border-2 ${errors.firstName && touched.firstName ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-green-500'} rounded-xl px-3 md:px-4 py-3 text-green-900 placeholder-gray-400 focus:outline-none focus:bg-white transition-all text-sm md:text-base`}
                      placeholder="First Name"
                    />
                    {errors.firstName && touched.firstName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <span>⚠️</span> {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <label className="block text-green-800 text-xs md:text-sm font-semibold mb-1">
                      Фамилия <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      autoComplete="family-name"
                      value={formData.lastName}
                      onChange={e => updateField('lastName', e.target.value)}
                      className={`w-full bg-gray-50 border-2 ${errors.lastName && touched.lastName ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-green-500'} rounded-xl px-3 md:px-4 py-3 text-green-900 placeholder-gray-400 focus:outline-none focus:bg-white transition-all text-sm md:text-base`}
                      placeholder="Last Name"
                    />
                    {errors.lastName && touched.lastName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <span>⚠️</span> {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Телефон — БЕЗ ВАЛИДАЦИЯ НА ФОРМАТА */}
                <div className="relative">
                  <label className="block text-green-800 text-xs md:text-sm font-semibold mb-1">
                    Телефон <span className="text-red-400">*</span>
                    <span className="text-gray-400 font-normal text-[10px] md:text-xs ml-1">(за потвърждение)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-xs md:text-sm">🇧🇬+359</span>
                    <input
                      type="tel"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={e => updateField('phone', e.target.value)}
                      className={`w-full bg-gray-50 border-2 ${errors.phone && touched.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-green-500'} rounded-xl pl-16 md:pl-20 pr-3 md:pr-4 py-3 text-green-900 placeholder-gray-400 focus:outline-none focus:bg-white transition-all text-sm md:text-base`}
                      placeholder="08x xxx xxx"
                    />
                  </div>
                  {errors.phone && touched.phone && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <span>⚠️</span> {errors.phone}
                    </p>
                  )}
                </div>

                {/* Имейл */}
                <div className="relative">
                  <label className="block text-green-800 text-xs md:text-sm font-semibold mb-1">
                    Имейл <span className="text-red-400">*</span>
                    <span className="text-gray-400 font-normal text-[10px] md:text-xs ml-1">(за потвърждение)</span>
                  </label>
                  <input
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={e => updateField('email', e.target.value)}
                    className={`w-full bg-gray-50 border-2 ${errors.email && touched.email ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-green-500'} rounded-xl px-3 md:px-4 py-3 text-green-900 placeholder-gray-400 focus:outline-none focus:bg-white transition-all text-sm md:text-base`}
                    placeholder="example@email.com"
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <span>⚠️</span> {errors.email}
                    </p>
                  )}
                </div>

                {/* Куриер */}
                <div>
                  <label className="block text-green-800 text-xs md:text-sm font-semibold mb-2">
                    Изберете куриер <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    {[
                      { name: 'Спиди', color: 'green', time: '1-2 дни' },
                      { name: 'Еконт', color: 'purple', time: '1-2 дни' }
                    ].map((courier) => (
                      <button
                        key={courier.name}
                        type="button"
                        onClick={() => updateField('courier', courier.name)}
                        className={`relative p-3 md:p-4 rounded-xl border-2 transition-all text-left ${
                          formData.courier === courier.name
                            ? `border-${courier.color}-500 bg-${courier.color}-50 shadow-md`
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        {formData.courier === courier.name && (
                          <div className="absolute top-2 right-2 w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                        <div className={`font-bold text-sm md:text-base ${formData.courier === courier.name ? `text-${courier.color}-700` : 'text-gray-700'}`}>
                          {courier.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{courier.time}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Град */}
                <div className="relative">
                  <label className="block text-green-800 text-xs md:text-sm font-semibold mb-1">
                    Населено място <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    autoComplete="address-level2"
                    value={formData.city}
                    onChange={e => updateField('city', e.target.value)}
                    className={`w-full bg-gray-50 border-2 ${errors.city && touched.city ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-green-500'} rounded-xl px-3 md:px-4 py-3 text-green-900 placeholder-gray-400 focus:outline-none focus:bg-white transition-all text-sm md:text-base`}
                    placeholder="София, Пловдив, Варна..."
                  />
                  {errors.city && touched.city && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <span>⚠️</span> {errors.city}
                    </p>
                  )}
                </div>

                {/* Адрес */}
                <div className="relative">
                  <label className="block text-green-800 text-xs md:text-sm font-semibold mb-1">
                    Адрес на офис или личен адрес <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    autoComplete="street-address"
                    value={formData.address}
                    onChange={e => updateField('address', e.target.value)}
                    className={`w-full bg-gray-50 border-2 ${errors.address && touched.address ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-green-500'} rounded-xl px-3 md:px-4 py-3 text-green-900 placeholder-gray-400 focus:outline-none focus:bg-white transition-all text-sm md:text-base`}
                    placeholder="Офис Спиди Младост 1 или ул. Витоша 15"
                  />
                  {errors.address && touched.address && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <span>⚠️</span> {errors.address}
                    </p>
                  )}
                </div>

                {/* Промо код */}
                <div className="relative">
                  <label className="block text-green-800 text-xs md:text-sm font-semibold mb-1">
                    Промо код <span className="text-gray-400 font-normal">(по желание)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.promoCode}
                      onChange={e => updateField('promoCode', e.target.value)}
                      className={`w-full border-2 rounded-xl px-3 md:px-4 py-3 text-green-900 placeholder-gray-400 placeholder:text-xs focus:outline-none focus:bg-white transition-all text-sm md:text-base uppercase ${
                        isPromoValid 
                          ? 'border-green-500 bg-green-50 text-green-700' 
                          : 'border-gray-200 bg-gray-50 focus:border-green-500'
                      }`}
                      placeholder="Имате ли промо код? Въведете го тук!"
                    />
                    {isPromoValid && (
                      <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  {isPromoValid && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-600 text-xs mt-1.5 font-bold flex items-center gap-1"
                    >
                      <span>✓</span> Промо кодът е приложен! Получавате 9% отстъпка!
                    </motion.p>
                  )}
                  {formData.promoCode && !isPromoValid && (
                    <p className="text-gray-400 text-xs mt-1.5">
                      Не сте въведели валиден промо код или той не е активен в момента!
                    </p>
                  )}
                </div>

                {/* Начин на плащане */}
                <div className="bg-gradient-to-r from-green-50 to-lime-50 rounded-xl p-4 md:p-5 border border-green-200">
                  <label className="block text-green-800 text-xs md:text-sm font-semibold mb-2 md:mb-3">
                    💳 Начин на плащане
                  </label>
                  <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-xl border-2 border-green-300 shadow-sm">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xl md:text-2xl">💶</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-green-900 text-sm md:text-base">Наложен платеж</p>
                      <p className="text-green-700 text-xs md:text-sm">
                        Плащате при получаване на продукта
                      </p>
                    </div>
                    <div className="bg-green-500 text-white text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 rounded-full flex-shrink-0">
                      ПРЕПОРЪЧАНО
                    </div>
                  </div>
                </div>

                {/* Бутон */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#ff6b00] to-[#ff8533] hover:from-[#e66000] hover:to-[#ff6b00] text-white font-black text-lg md:text-xl py-4 md:py-5 rounded-2xl shadow-[0_15px_40px_-10px_rgba(255,107,0,0.4)] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 md:gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span className="text-sm md:text-base">Обработваме поръчката...</span>
                    </>
                  ) : (
                    <>
                      <span>ПОРЪЧАЙ СЕГА</span>
                      <span className="bg-white/20 px-2 md:px-3 py-1 rounded-lg text-base md:text-lg">
                        {total.toFixed(2)} €
                      </span>
                    </>
                  )}
                </motion.button>

                <p className="text-center text-gray-400 text-xs flex items-center justify-center gap-1.5">
                  <span>🔒</span>
                  <span>SSL криптирана връзка • Данните са защитени</span>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Success Modal — ИЗПОЛЗВА successData ВМЕСТО formData */}
      <AnimatePresence>
        {isSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSuccess(false)}
              className="absolute inset-0 bg-green-900/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              className="relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 text-center max-w-sm md:max-w-md w-full shadow-2xl border-2 border-green-300 mx-3"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-400 to-lime-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 text-3xl md:text-4xl shadow-lg">
                🎉
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-2 md:mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Честито!
              </h2>
              <p className="text-gray-600 text-md md:text-base mb-2">
                 <span className="font-bold text-green-800">{successData.firstName}</span>, поръчката ви е приета успешно!
              </p>
              
              <div className="bg-green-50 rounded-xl p-3 md:p-4 my-4 md:my-6 border border-green-200">
                <p className="text-sm text-gray-600 mb-1">Ще се свържем с вас на</p>
                <p className="text-green-800 font-bold text-base md:text-lg">{successData.phone}</p>
                <p className="text-sm text-gray-500 mt-1 md:mt-2">за потвърждение на поръчката</p>
              </div>

              <div className="flex items-center justify-center gap-3 md:gap-4 text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
                <span className="flex items-center gap-1">
                  <span className="text-green-500">✓</span> Рег.№ БАБХ: Т242506847/2025
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-green-500">✓</span> 100% Натурален продукт
                </span>
              </div>
              
              <button
                onClick={() => setIsSuccess(false)}
                className="w-full py-3 md:py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-xl hover:from-green-700 hover:to-green-600 transition-all shadow-lg text-sm md:text-base"
              >
                РАЗБРАХ, БЛАГОДАРЯ!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}