import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import Roles from "@/components/Roles";
import Steps from "@/components/Steps";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import CtaForm from "@/components/CtaForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Roles />
        <Steps />
        <Pricing />
        <Testimonials />
        <Faq />
        <CtaForm />
      </main>
      <Footer />
    </>
  );
}
