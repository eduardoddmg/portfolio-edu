'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';

// Importação dinâmica dos componentes do React-Leaflet
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
  { ssr: false }
);

const Mapa: React.FC = () => {
  const [geoJsonData, setGeoJsonData] = useState(null);

  useEffect(() => {
    // Configuração dinâmica do Leaflet (para corrigir o problema de ícones)
    import('leaflet').then((L) => {
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl:
          'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      });
    });

    // Carregamento do arquivo GeoJSON
    fetch('/risp/risp.geojson')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro ao carregar o GeoJSON: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setGeoJsonData(data);
      })
      .catch((error) => {
        console.error('Erro ao carregar o GeoJSON:', error);
      });
  }, []);

  // Coordenadas de Maceió
  const maceioCoordinates: [number, number] = [-9.6658, -35.735];

  // Função para estilizar as regiões do GeoJSON
  const getFeatureStyle = (feature: { properties: { RISP: number } }) => {
    const risp = feature.properties.RISP;

    const colors: { [key: number]: string } = {
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

        {geoJsonData && (
          <GeoJSON
            data={geoJsonData}
            style={getFeatureStyle as L.PathOptions}
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
    </div>
  );
};

export default Mapa;
