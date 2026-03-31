import { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import PricingTable from "@/components/PricingTable";
import Gallery from "@/components/Gallery";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProcessSection from "@/components/ProcessSection";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BookingWizard from "@/components/BookingWizard";
import LoadingScreen from "@/components/LoadingScreen";
import { Toaster } from "@/components/ui/sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = ({ onBookClick }) => {
  return (
    <>
      <HeroSection onBookClick={onBookClick} />
      <TrustBar />
      <Services />
      <PricingTable onBookClick={onBookClick} />
      <Gallery />
      <WhyChooseUs />
      <ProcessSection />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
};

function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [loadingDone, setLoadingDone] = useState(false);

  return (
    <div className="App min-h-screen bg-[#050505]">
      <LoadingScreen onComplete={() => setLoadingDone(true)} />
      <BrowserRouter>
        {loadingDone && <Navbar onBookClick={() => setBookingOpen(true)} />}
        <BookingWizard open={bookingOpen} onOpenChange={setBookingOpen} />
        <Routes>
          <Route path="/" element={<Home onBookClick={() => setBookingOpen(true)} />} />
        </Routes>
        {loadingDone && <Footer />}
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
