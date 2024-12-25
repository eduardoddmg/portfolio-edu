import Blog from '@/components/landing-page/blog';
import CTA from '@/components/landing-page/call-to-action';
import Features from '@/components/landing-page/features';
import Hero from '@/components/landing-page/hero';

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
