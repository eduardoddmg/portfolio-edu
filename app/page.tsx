import Blog from './blog';
import CTA from './call-to-action';
import Features from './features';
import Footer from './footer';
import Hero from './hero';
import Navbar from './navbar';

const Page = () => {
  return (
    <div>
      <Hero />
      <Features />
      <CTA />
      <Blog />
    </div>
  );
};

export default Page;
