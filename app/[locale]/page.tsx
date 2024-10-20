import Hero from "../components/page_components/main/hero";
import About from "../components/page_components/main/about";
import LatestNews from "../components/page_components/main/latestnews";
import Team from "../components/page_components/main/team";

export default function Home() {
  
  return (
    <main className="">
      <Hero />
      <About />
      <Team />
      <LatestNews />
    </main>
  );
}
