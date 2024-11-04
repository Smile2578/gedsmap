import { useState, useEffect, useCallback } from 'react';
import { Globe2 } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { Map, UniversityMarker } from './Map';
import CurvedLine from './Map/CurvedLine';
import UniversityInfoCard from './UniversityInfoCard';
import { universities } from '../data/universities';

// Point de départ des lignes au centre de la France
const FRANCE_CENTER = [48.9, 2.38];
// Centre de la carte sur Nuremberg
const MAP_CENTER = [47.0, 11.0767];

const InteractiveMap = ({ customCenter, customZoom }) => {
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [map, setMap] = useState(null);

  const center = customCenter || MAP_CENTER;
  const defaultZoom = customZoom || 5.5;
  const markerZoom = 7;

  useEffect(() => {
    if (map) {
      setTimeout(() => {
        map.invalidateSize();
      }, 0);
    }
  }, [map]);

  const handleMarkerClick = useCallback((university) => {
    setSelectedUniversity(university);
    if (map) {
      map.flyTo(university.coordinates, markerZoom, {
        duration: 1.5,
        easeLinearity: 0.25,
      });
    }
  }, [map]);

  const handleClose = useCallback(() => {
    setSelectedUniversity(null);
    if (map) {
      map.flyTo(center, defaultZoom, {
        duration: 1.5,
        easeLinearity: 0.25,
      });
    }
  }, [map, center, defaultZoom]);

  return (
    <div className="w-full h-screen flex flex-col relative">
      <div className="bg-white rounded-lg shadow-lg m-4 mb-0 p-4">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Globe2 className="w-6 h-6" />
          Carte Interactive des Universités Partenaires
        </h1>
      </div>
      
      <div className="relative flex-1 m-4">
        <Map
          center={center}
          zoom={defaultZoom}
          onMapReady={setMap}
        >
          {/* Logo GEDS en overlay sur la carte */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] bg-white rounded-lg shadow-lg p-2">
            <img 
              src="/assets/logos/geds.png" 
              alt="GEDS Logo" 
              className="h-24 w-auto"
            />
          </div>

          {universities.map((university) => (
            <CurvedLine
              key={`line-${university.id}`}
              start={FRANCE_CENTER}
              end={university.coordinates}
            />
          ))}

          {universities.map((university) => (
            <UniversityMarker
              key={university.id}
              university={university}
              onClick={handleMarkerClick}
              isSelected={selectedUniversity?.id === university.id}
            />
          ))}
        </Map>

        <AnimatePresence>
          {selectedUniversity && (
            <div className="info-card absolute top-4 right-4 w-96 md:w-96 sm:w-full">
              <UniversityInfoCard
                university={selectedUniversity}
                onClose={handleClose}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

InteractiveMap.propTypes = {
  customCenter: PropTypes.arrayOf(PropTypes.number),
  customZoom: PropTypes.number,
};

export default InteractiveMap;