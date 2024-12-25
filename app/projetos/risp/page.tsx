'use client';

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

// Corrige o problema dos ícones padrão do Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Importação dinâmica do MapContainer e outros componentes
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
});
const GeoJSON = dynamic(
  () => import('react-leaflet').then((mod) => mod.GeoJSON),
  {
    ssr: false,
  }
);

const Mapa: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [geoJsonData, setGeoJsonData] = useState(null);

  // Este efeito roda apenas no lado do cliente
  useEffect(() => {
    setIsClient(true);

    // Carrega o arquivo GeoJSON
    import('@/data/risp.geojson')
      .then((data) => {
        setGeoJsonData(data.default);
      })
      .catch((error) => {
        console.error('Erro ao carregar o GeoJSON:', error);
      });
  }, []);

  // Define as coordenadas de Maceió
  const maceioCoordinates: [number, number] = [-9.6658, -35.735];

  // Função para customizar estilos baseados nas propriedades do GeoJSON
  const getFeatureStyle = (feature: any) => {
    const risp = feature.properties.RISP;

    // Define cores diferentes com base no valor de RISP
    const colors = {
      1: '#FF0000', // Vermelho
      2: '#00FF00', // Verde
      3: '#0000FF', // Azul
      4: '#FFFF00', // Amarelo
    };

    return {
      color: colors[risp] || '#ff7800', // Cor das bordas
      weight: 2, // Espessura das bordas
      fillColor: colors[risp] || '#ffcccb', // Cor de preenchimento
      fillOpacity: 0.6, // Opacidade do preenchimento
    };
  };

  return (
    <div className="flex flex-col gap-5 h-[100vh]">
      <h2 className="text-3xl">Regiões Integradas de Segurança Pública</h2>
      <p className="text-gray-400">
        As informações foram retiradas do portal dados al. São dados abertos
        disponíveis para qualquer um.
      </p>
      {isClient && (
        <MapContainer
          center={maceioCoordinates}
          zoom={8}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <Marker position={maceioCoordinates}>
            <Popup>Maceió, AL - Brasil</Popup>
          </Marker>

          {/* Camada GeoJSON com estilos customizados */}
          {geoJsonData && (
            <GeoJSON
              data={geoJsonData}
              style={getFeatureStyle}
              onEachFeature={(feature, layer) => {
                if (feature.properties && feature.properties.RISP) {
                  layer.bindPopup(
                    `<strong>RISP: ${feature.properties.RISP}</strong>`
                  );
                }
              }}
            />
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default Mapa;
