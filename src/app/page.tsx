import { Hero } from "@/components/home/Hero";
import { TrustedBy } from "@/components/home/TrustedBy";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { ServicesTeaser } from "@/components/home/ServicesTeaser";
import { FeaturedSermon } from "@/components/home/FeaturedSermon";
import { Testimonials } from "@/components/home/Testimonials";
import { DonateCTA } from "@/components/home/DonateCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <AboutTeaser />
      <ServicesTeaser />
      <FeaturedSermon />
      <Testimonials />
      <DonateCTA />
    </>
  );
}
