import { MapContainer, TileLayer } from 'react-leaflet';
import PropTypes from 'prop-types';

const Map = ({ 
  children, 
  center = [49.4521, 11.0767],
  zoom = 5.5, 
  className = '',
  onMapReady 
}) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={`w-full h-full rounded-lg ${className}`}
      whenCreated={(map) => {
        map.doubleClickZoom.disable(); // Désactive le zoom sur double-clic
        if (onMapReady) onMapReady(map);
      }}
      zoomSnap={0.5}
      zoomDelta={0.5}
      wheelDebounceTime={100}
      wheelPxPerZoomLevel={100}
      minZoom={4}
      maxZoom={12}
    >
      <TileLayer
        url="https://tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token=X1f1lmD1FpNirqg1iPQhRNSEMcSqsfoCOVLWuhepAh1TaxcbvdYysoTIWUdGKkvR"
        attribution='<a href="https://www.jawg.io" target="_blank">&copy; Jawg</a> - <a href="https://www.openstreetmap.org" target="_blank">&copy; OpenStreetMap</a>'
      />
      {children}
    </MapContainer>
  );
};

Map.propTypes = {
  children: PropTypes.node,
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number,
  className: PropTypes.string,
  onMapReady: PropTypes.func,
};

export default Map;