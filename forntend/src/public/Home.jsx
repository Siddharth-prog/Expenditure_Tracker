import Features from "../components/home/Features";
import Pricing from "../components/home/Pricing";
import Testimonials from "../components/home/Testimonials";
import Footer from "../components/home/Footer";
import PublicNavbar from "../components/layout/PublicNavbar";
import Hero from "../components/home/Hero";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <PublicNavbar/>
      <Hero/>
      <Features />
      <Pricing />
      <Testimonials />
      <Footer />
    </div>
  );
}
