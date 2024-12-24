import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

import lp from '@/data/lp.json';

const Projects = () => {
  const projectsData = lp.projects;
  const { tagline, title, description, buttonText, items } = projectsData;

  return (
    <section>
      <div className="container flex flex-col items-center gap-16 lg:px-16">
        <div className="text-center">
          <p className="mb-6 text-xs font-medium uppercase tracking-wider">
            {tagline}
          </p>
          <h2 className="mb-3 text-pretty text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            {title}
          </h2>
          <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
            {description}
          </p>
          <Button variant="link" className="w-full sm:w-auto">
            {buttonText}
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {items.map((project) => (
            <a
              key={project.id}
              href={`/projetos/${project.id}`}
              className="flex flex-col overflow-clip rounded-xl border border-border"
            >
              <div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="aspect-[16/9] h-full w-full object-cover object-center"
                />
              </div>
              <div className="px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
                <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-xl lg:mb-6">
                  {project.title}
                </h3>
                <p className="mb-3 text-muted-foreground md:mb-4 lg:mb-6">
                  {project.summary}
                </p>
                <p className="flex items-center hover:underline">
                  Saiba mais
                  <ArrowRight className="ml-2 size-4" />
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
