import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const ingredients = [
  { name: 'Планински лимон', benefit: 'Витамин С бомба', icon: '🍋', desc: 'Най-богатият природен източник на витамин C – 30 пъти повече от портокала!' },
  { name: 'Бъзак', benefit: 'Антивирусен щит', icon: '🫐', desc: 'Природен антивирусен агент, който блокира вирусите още преди да са ви заразили' },
  { name: 'Шипка', benefit: 'Супер антиоксидант', icon: '🏮', desc: 'Повече антиоксиданти от ацеролата – защитава клетките от стареене' },
  { name: 'Джинджифил', benefit: 'Противовъзпалителен', icon: '🫚', desc: 'Активира кръвообращението и топли организма отвътре' },
  { name: 'Мащерка', benefit: 'Антибактериална', icon: '🌿', desc: 'Природен антибиотик, използван от древните гърци за имунна защита' },
  { name: 'Ехинацея', benefit: 'Имунен стимулант', icon: '🌸', desc: 'Увеличава белите кръвни телца с до 50% – вашата армия срещу вирусите' },
  { name: 'Мента', benefit: 'Успокояващ ефект', icon: '🍃', desc: 'Облекчава дихателните пътища и действа антисептично върху организма' },
  { name: 'Астрагал', benefit: 'Адаптоген', icon: '🌱', desc: 'Китайска тайна за дълголетие – подпомага сърцето и имунитета едновременно' },
  { name: 'Арония', benefit: 'Антиоксидант №1', icon: '🍇', desc: 'Най-високо съдържание на антоцианини от всички плодове' },
  { name: 'Сладък корен', benefit: 'Хармонизиращ', icon: '🟤', desc: 'Балансира хормоните и подпомага надбъбречните жлези при стрес' },
  { name: 'Лимонена трева', benefit: 'Детоксикираща', icon: '🌾', desc: 'Пречиства организма от токсини и подобрява храносмилането' },
  { name: 'Гъба Рейши', benefit: 'Имуномодулатор', icon: '🍄', desc: '"Гъбата на безсмъртието" – регулира имунната система' },
  { name: 'Гъба Шийтаке', benefit: 'Противоракова защита', icon: '🍄', desc: 'Съдържа лентинан – активира Т-клетките за целенасочен удар по вирусите' },
 
]

export default function IngredientsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedIngredient, setSelectedIngredient] = useState<number | null>(null)

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-green-50/90 to-white/90 z-10" />

      <div className="relative z-20 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-green-700 font-semibold tracking-wider uppercase text-sm">Природна аптека</span>
          <h2 className="text-4xl md:text-5xl font-bold text-green-900 mt-3 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            13 природни супергероя
            <br />
            <span className="text-green-600">в едно шишенце</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Всяка капка е концентрирана сила на природата. Без синтетика. Без химия. Само чиста природна мъдрост.
          </p>
        </motion.div>

        {/* Main product display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex justify-center mb-16"
        >
          <div className="store-frame bg-white p-6 rounded-3xl max-w-md shadow-xl">
            <img
              src="/product-herbs.png"
              alt="Naturino Kids - продукт с билки"
              className="w-full h-auto floating-product"
            />
            <div className="mt-4 text-center">
              <p className="text-green-900 font-bold text-lg">50мл концентрирана сила</p>
              <p className="text-green-600 text-sm">= 13 билкови екстракта в симфония</p>
            </div>
          </div>
        </motion.div>

        {/* Ingredients grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              onClick={() => setSelectedIngredient(selectedIngredient === index ? null : index)}
              className={`ingredient-card cursor-pointer spring-card ${
                selectedIngredient === index ? 'ring-2 ring-green-500' : ''
              }`}
            >
              <div className="text-3xl mb-2">{ingredient.icon}</div>
              <h3 className="font-bold text-green-900 text-sm mb-1">{ingredient.name}</h3>
              <span className="text-xs text-green-600 font-semibold">{ingredient.benefit}</span>
              {selectedIngredient === index && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-xs text-gray-600 mt-2"
                >
                  {ingredient.desc}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 text-lg">
            <span className="text-green-700 font-bold">Формула от 2025 г.</span> – създадена след 3 години изследвания
          </p>
        </motion.div>
      </div>
    </section>
  )
}
