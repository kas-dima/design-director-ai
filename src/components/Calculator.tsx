import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Calculator as CalcIcon, ArrowRight } from 'lucide-react';

const propertyTypes = [
  { id: 'residential', label: 'Жилая недвижимость', pricePerSqm: 85000 },
  { id: 'commercial', label: 'Коммерческая недвижимость', pricePerSqm: 75000 },
];

const qualityLevels = [
  { id: 'basic', label: 'Базовый', multiplier: 1, timeline: '8-10 месяцев' },
  { id: 'business', label: 'Бизнес', multiplier: 1.35, timeline: '10-14 месяцев' },
  { id: 'premium', label: 'Премиум', multiplier: 1.8, timeline: '12-18 месяцев' },
];

const additionalOptions = [
  { id: 'design', label: 'Дизайн-проект интерьера', price: 3500 },
  { id: 'landscape', label: 'Ландшафтный дизайн', price: 2500 },
  { id: 'smart', label: 'Умный дом', price: 5000 },
  { id: 'furniture', label: 'Комплектация мебелью', price: 8000 },
];

export const Calculator = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const [propertyType, setPropertyType] = useState(propertyTypes[0]);
  const [area, setArea] = useState(150);
  const [qualityLevel, setQualityLevel] = useState(qualityLevels[1]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const calculation = useMemo(() => {
    const basePrice = propertyType.pricePerSqm * area * qualityLevel.multiplier;
    const optionsPrice = selectedOptions.reduce((acc, optId) => {
      const option = additionalOptions.find(o => o.id === optId);
      return acc + (option ? option.price * area : 0);
    }, 0);
    return {
      total: basePrice + optionsPrice,
      pricePerSqm: Math.round((basePrice + optionsPrice) / area),
      timeline: qualityLevel.timeline,
    };
  }, [propertyType, area, qualityLevel, selectedOptions]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(Math.round(price));
  };

  return (
    <section id="calculator" className="section-padding">
      <div className="container-wide">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
            Калькулятор стоимости
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Рассчитайте стоимость проекта
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Получите предварительную оценку стоимости строительства за несколько минут
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid lg:grid-cols-5 gap-8 lg:gap-12"
        >
          {/* Calculator Form */}
          <div className="lg:col-span-3 space-y-8">
            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-4">
                Тип объекта
              </label>
              <div className="grid grid-cols-2 gap-4">
                {propertyTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setPropertyType(type)}
                    className={`p-4 text-left rounded-sm border-2 transition-all duration-300 ${
                      propertyType.id === type.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/30'
                    }`}
                  >
                    <span className="block font-medium text-foreground">{type.label}</span>
                    <span className="text-sm text-muted-foreground">
                      от {formatPrice(type.pricePerSqm)} ₽/м²
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Area Slider */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium text-foreground">
                  Площадь объекта
                </label>
                <span className="text-lg font-display text-foreground">{area} м²</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="10"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>50 м²</span>
                <span>1000 м²</span>
              </div>
            </div>

            {/* Quality Level */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-4">
                Уровень исполнения
              </label>
              <div className="grid grid-cols-3 gap-4">
                {qualityLevels.map(level => (
                  <button
                    key={level.id}
                    onClick={() => setQualityLevel(level)}
                    className={`p-4 text-center rounded-sm border-2 transition-all duration-300 ${
                      qualityLevel.id === level.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/30'
                    }`}
                  >
                    <span className="block font-medium text-foreground">{level.label}</span>
                    <span className="text-xs text-muted-foreground">×{level.multiplier}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Options */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-4">
                Дополнительные опции
              </label>
              <div className="grid grid-cols-2 gap-3">
                {additionalOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => toggleOption(option.id)}
                    className={`p-4 text-left rounded-sm border-2 transition-all duration-300 ${
                      selectedOptions.includes(option.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/30'
                    }`}
                  >
                    <span className="block font-medium text-foreground text-sm">{option.label}</span>
                    <span className="text-xs text-muted-foreground">
                      +{formatPrice(option.price)} ₽/м²
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="lg:col-span-2">
            <div className="sticky top-32 p-8 bg-primary text-primary-foreground rounded-sm">
              <div className="flex items-center gap-3 mb-8">
                <CalcIcon size={24} />
                <h3 className="font-display text-xl">Ваш расчёт</h3>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex justify-between items-center pb-4 border-b border-primary-foreground/20">
                  <span className="opacity-80">Площадь</span>
                  <span className="font-medium">{area} м²</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-primary-foreground/20">
                  <span className="opacity-80">Тип объекта</span>
                  <span className="font-medium">{propertyType.label}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-primary-foreground/20">
                  <span className="opacity-80">Уровень</span>
                  <span className="font-medium">{qualityLevel.label}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-primary-foreground/20">
                  <span className="opacity-80">Стоимость за м²</span>
                  <span className="font-medium">{formatPrice(calculation.pricePerSqm)} ₽</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-primary-foreground/20">
                  <span className="opacity-80">Сроки</span>
                  <span className="font-medium">{calculation.timeline}</span>
                </div>
              </div>

              <div className="mb-8">
                <span className="block text-sm opacity-80 mb-2">Ориентировочная стоимость</span>
                <span className="block font-display text-4xl">
                  {formatPrice(calculation.total)} ₽
                </span>
              </div>

              <Button 
                variant="secondary" 
                size="xl" 
                className="w-full"
                asChild
              >
                <a href="#contact">
                  Получить точный расчёт
                  <ArrowRight size={20} />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
