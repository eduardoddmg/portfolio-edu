import React from 'react';
import {
  Layout,
  Code,
  Server,
  BrainCircuit,
  Paintbrush,
  Database,
} from 'lucide-react';

import features from '@/data/lp.json';

// Definindo o tipo para os itens de feature
type FeatureItem = {
  title: string;
  description: string;
  icon: string;
};

const Features: React.FC = () => {
  const featuresData = features.features;

  // Função para mapear strings de ícones para componentes do Lucide-React
  const getIconComponent = (iconName: string) => {
    const icons: Record<string, JSX.Element> = {
      Layout: <Layout className="size-6" />,
      Code: <Code className="size-6" />,
      Server: <Server className="size-6" />,
      BrainCircuit: <BrainCircuit className="size-6" />,
      Paintbrush: <Paintbrush className="size-6" />,
      Database: <Database className="size-6" />,
    };

    return icons[iconName] || null; // Retorna o ícone correspondente ou null
  };

  return (
    <section>
      <div className="container">
        <div className="mb-10 md:mb-20">
          <h2 className="mb-2 text-center text-3xl font-semibold lg:text-5xl">
            {featuresData.title}
          </h2>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {featuresData.items.map((item: FeatureItem, i: number) => (
            <div key={i} className="flex flex-col">
              <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-accent">
                {getIconComponent(item.icon)}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
