import { Button } from '@/components/ui/button';
import lp from '@/data/lp.json';

const CTA = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="flex w-full flex-col gap-16 overflow-hidden rounded-lg bg-accent p-8 md:rounded-xl lg:flex-row lg:items-center lg:p-16">
          <div className="flex-1">
            <h3 className="mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              {lp['call-to-action'].title}
            </h3>
            <p className="text-muted-foreground lg:text-lg">
              {lp['call-to-action'].description}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outline">
              {lp['call-to-action'].primaryButton}
            </Button>
            <Button>{lp['call-to-action'].secondaryButton}</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
