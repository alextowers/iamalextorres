import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { TravelMap } from "@/components/sections/TravelMap";
import { Lifestyle } from "@/components/sections/Lifestyle";
import { Wishlist } from "@/components/sections/Wishlist";
import { Contact } from "@/components/sections/Contact";
import { ConstellationCanvas } from "@/components/ui/ConstellationCanvas";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <div className="relative bg-charcoal">
        <ConstellationCanvas />
        <Hero />
        <Projects />
      </div>
      <TravelMap />
      <Lifestyle />
      <Wishlist />
      <Contact />
    </div>
  );
}
