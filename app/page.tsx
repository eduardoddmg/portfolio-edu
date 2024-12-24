import Blog from './blog';
import CTA from './call-to-action';
import Features from './features';
import Hero from './hero';

const Page = () => {
  return (
    <div className="flex flex-col gap-20">
      <Hero />
      <Features />
      <CTA />
      <Blog />
    </div>
  );
};

export default Page;
