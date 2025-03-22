import { ArrowDownRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import lp from '@/data/lp.json';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="px-5 py-20">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Badge variant="outline">
              {lp.hero.badge}
              <ArrowDownRight className="ml-2 size-4" />
            </Badge>
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              {lp.hero.title}
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              {lp.hero.description}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Link href={lp.hero.primaryButton.href}>
                <Button className="w-full sm:w-auto">
                  {lp.hero.primaryButton.text}
                </Button>
              </Link>
              <Link href={lp.hero.secondaryButton.href}>
                <Button variant="outline" className="w-full sm:w-auto">
                  {lp.hero.secondaryButton.text}
                  <ArrowDownRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
          </div>
          <Carousel className="mx-10" opts={{ loop: true }}>
            <CarouselContent>
              <CarouselItem className="flex justify-center items-center">
                <Image
                  src="/trinta-linhas.png"
                  alt="Trinta Linhas - Redação"
                  width={400}
                  height={300}
                  className="rounded-md object-cover w-full h-[400px]"
                />
              </CarouselItem>
              <CarouselItem className="flex justify-center items-center">
                <Image
                  src="/elisama.png"
                  alt="Elisama - Professora"
                  width={400}
                  height={300}
                  className="rounded-md object-cover w-full h-[400px]"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Hero;
