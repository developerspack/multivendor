import Hero from "@/components/Hero";
import { Item } from "@/components/Items/Item";

const HomePage = () => {
  return (
    <>
      <Hero />
      <section className="h-full p-8 max-w-screen-2xl mx-auto" id="items">
        <Item />
      </section>
    </>
  );
};

export default HomePage;
