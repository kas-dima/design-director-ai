import { motion } from 'framer-motion';
import logo from '@/assets/logo.jpg';

const footerLinks = [
  { href: '#services', label: 'Услуги' },
  { href: '#calculator', label: 'Калькулятор' },
  { href: '#projects', label: 'Проекты' },
  { href: '#about', label: 'О компании' },
  { href: '#contact', label: 'Контакты' },
];

export const Footer = () => {
  return (
    <footer className="py-12 md:py-16 border-t border-border">
      <div className="container-wide px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <img src={logo} alt="JSPACE" className="h-10 w-auto" />
            <span className="font-display text-xl text-foreground">JSPACE</span>
          </motion.a>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {footerLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} JSPACE. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};
