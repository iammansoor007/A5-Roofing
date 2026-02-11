import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LeadCapture from "@/components/LeadCapture";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Mission from "@/components/Mission";
import TeamValues from "@/components/TeamValues";
import SecondaryCTA from "@/components/SecondaryCTA";
import QAForm from "@/components/QAForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import AggressiveRoofingSection from "@/components/RoofingExperts";

const Index = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="overflow-x-hidden">
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <Hero />
          <section id="roofingexperts">
            <AggressiveRoofingSection />
          </section>
          <section id="services">
            <Services />
          </section>
          <section id="portfolio">
            <Portfolio />
          </section>
          <Testimonials />
          <section id="about">
            <Mission />
          </section>
          <TeamValues />
          <SecondaryCTA />
          <QAForm />
          <section id="faq">
            <FAQ />
          </section>
          <LeadCapture />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
