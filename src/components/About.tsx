import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Clock, FileCheck, Users } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Гарантия качества',
    description: 'Контроль на каждом этапе строительства и гарантия на все виды работ.',
  },
  {
    icon: Clock,
    title: 'Соблюдение сроков',
    description: 'Точное планирование и соблюдение сроков реализации проекта.',
  },
  {
    icon: FileCheck,
    title: 'Работа по договору',
    description: 'Прозрачные условия сотрудничества и фиксированная стоимость.',
  },
  {
    icon: Users,
    title: 'Полный цикл',
    description: 'От проектирования до сдачи объекта под ключ — все в одних руках.',
  },
];

const stats = [
  { value: '12+', label: 'лет опыта' },
  { value: '150+', label: 'реализованных проектов' },
  { value: '98%', label: 'довольных клиентов' },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
              О компании
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              Строим с заботой о каждой детали
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              JSPACE — это команда профессионалов с многолетним опытом в строительстве 
              жилой и коммерческой недвижимости. Мы создаём пространства, которые 
              превосходят ожидания клиентов, сочетая современные технологии с 
              безупречным качеством исполнения.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-12">
              Наш подход — это внимание к деталям на каждом этапе: от первой встречи 
              до торжественной передачи ключей. Мы верим, что каждый объект должен 
              быть уникальным и отражать индивидуальность владельца.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <span className="block font-display text-3xl md:text-4xl text-foreground mb-1">
                    {stat.value}
                  </span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Features */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="p-6 bg-secondary/50 rounded-sm"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-accent rounded-sm mb-4">
                  <feature.icon size={24} strokeWidth={1.5} className="text-accent-foreground" />
                </div>
                <h3 className="font-display text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
