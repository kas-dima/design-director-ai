import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Calculator } from '@/components/Calculator';
import { Projects } from '@/components/Projects';
import { About } from '@/components/About';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <Calculator />
        <Projects />
        <About />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
