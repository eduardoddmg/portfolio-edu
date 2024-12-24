import { Menu } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';

const Navbar1 = () => {
  return (
    <section className="py-4">
      <div className="container">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link href="/">
              <div className="flex items-center gap-2">
                <img
                  src="https://shadcnblocks.com/images/block/block-1.svg"
                  className="w-8"
                  alt="logo"
                />
                <span className="text-xl font-bold">Eduardo Melo</span>
              </div>
            </Link>
            <div className="flex items-center">
              <Link
                className={cn(
                  'text-muted-foreground',
                  buttonVariants({
                    variant: 'ghost',
                  })
                )}
                href="/blog"
              >
                Blog
              </Link>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/projetos">
              <Button variant="outline">Veja meus projetos</Button>
            </Link>
            <Button>Entre em contato</Button>
          </div>
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src="https://shadcnblocks.com/images/block/block-1.svg"
                className="w-8"
                alt="logo"
              />
              <span className="text-xl font-bold">Eduardo Melo</span>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/">
                      <div className="flex items-center gap-2">
                        <img
                          src="https://shadcnblocks.com/images/block/block-1.svg"
                          className="w-8"
                          alt="logo"
                        />
                        <span className="text-xl font-bold">Eduardo Melo</span>
                      </div>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="mb-8 mt-8 flex flex-col gap-4">
                  <Link href="/blog" className="font-semibold">
                    Blog
                  </Link>
                </div>
                <div className="mt-2 flex flex-col gap-3">
                  <Link href="/projetos">
                    <Button variant="outline">Veja meus projetos</Button>
                  </Link>
                  <Button>Entre em contato</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar1;
