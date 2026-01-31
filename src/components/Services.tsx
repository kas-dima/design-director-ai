import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Home, Building2, Compass, Paintbrush } from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'Жилая недвижимость',
    description: 'Проектирование и строительство частных домов и многоквартирных комплексов с индивидуальным подходом к каждому проекту.',
  },
  {
    icon: Building2,
    title: 'Коммерческая недвижимость',
    description: 'Создание современных бизнес-центров, торговых площадей и офисных пространств под ключ.',
  },
  {
    icon: Compass,
    title: 'Проектирование',
    description: 'Разработка архитектурных концепций, 3D-визуализация и полный пакет проектной документации.',
  },
  {
    icon: Paintbrush,
    title: 'Отделка и комплектация',
    description: 'Финишная отделка помещений любой сложности и подбор материалов премиум-класса.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="section-padding bg-secondary/30">
      <div className="container-wide">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
            Направления деятельности
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground">
            Полный цикл строительства
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group p-8 lg:p-10 bg-background rounded-sm border border-border hover:border-primary/20 transition-all duration-500 hover:shadow-card"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-accent rounded-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                  <service.icon size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-xl lg:text-2xl mb-3 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
