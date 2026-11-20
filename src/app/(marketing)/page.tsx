import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import LogoStrip from "@/components/sections/LogoStrip";
import SecurityStrip from "@/components/sections/SecurityStrip";
import Stats from "@/components/sections/Stats";
import Features from "@/components/sections/Features";
import Roles from "@/components/sections/Roles";
import Steps from "@/components/sections/Steps";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import CtaForm from "@/components/sections/CtaForm";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LogoStrip />
        <Stats />
        <Features />
        <Roles />
        <Steps />
        <Pricing />
        <Testimonials />
        <Faq />
        <SecurityStrip />
        <CtaForm />
      </main>
      <Footer />
    </>
  );
}
