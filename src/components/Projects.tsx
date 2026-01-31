import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import projectResidential from '@/assets/project-residential.jpg';
import projectCommercial from '@/assets/project-commercial.jpg';
import projectDesign from '@/assets/project-design.jpg';

const projects = [
  {
    image: projectResidential,
    title: 'Жилой комплекс «Панорама»',
    type: 'Жилая недвижимость',
    area: '2 400 м²',
    status: 'Завершён',
  },
  {
    image: projectCommercial,
    title: 'Бизнес-центр «Квартал»',
    type: 'Коммерческая недвижимость',
    area: '5 800 м²',
    status: 'В процессе',
  },
  {
    image: projectDesign,
    title: 'Частная резиденция',
    type: 'Проектирование',
    area: '650 м²',
    status: 'Проектирование',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="section-padding bg-secondary/30">
      <div className="container-wide">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <span className="inline-block text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
              Наши проекты
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground">
              Реализованные объекты
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Каждый проект — это уникальное решение, созданное с учётом 
            потребностей клиента и особенностей участка.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.article
              key={index}
              variants={itemVariants}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-sm mb-6">
                <div className="aspect-[4/5]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <ArrowUpRight size={20} className="text-foreground" />
                </div>
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-background/90 backdrop-blur-sm text-xs font-medium rounded-sm">
                    {project.status}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">{project.type}</span>
                <h3 className="font-display text-xl mt-1 mb-2 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <span className="text-sm text-muted-foreground">{project.area}</span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
