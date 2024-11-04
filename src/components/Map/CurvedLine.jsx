import { useMemo } from 'react';
import { Polyline } from 'react-leaflet';
import PropTypes from 'prop-types';

const CurvedLine = ({ start, end }) => {
  const curvePoints = useMemo(() => {
    // Calculer le point de contrôle pour la courbe
    const midLat = (start[0] + end[0]) / 2;
    const midLng = (start[1] + end[1]) / 2;
    
    // Distance entre les points pour déterminer la hauteur de la courbe
    const distance = Math.sqrt(
      Math.pow(end[0] - start[0], 2) + Math.pow(end[1] - start[1], 2)
    );
    
    // Calculer un point de contrôle au-dessus de la ligne directe
    const curveHeight = distance * 0.3; // Ajustez ce facteur pour plus ou moins de courbure
    
    // Vecteur perpendiculaire à la ligne directe
    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    const normX = -dy / distance;
    const normY = dx / distance;
    
    const controlPoint = [
      midLat + normX * curveHeight,
      midLng + normY * curveHeight
    ];

    // Générer des points intermédiaires pour la courbe
    const points = [];
    const steps = 20;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const lat = Math.pow(1-t, 2) * start[0] + 
                 2 * (1-t) * t * controlPoint[0] + 
                 Math.pow(t, 2) * end[0];
      const lng = Math.pow(1-t, 2) * start[1] + 
                 2 * (1-t) * t * controlPoint[1] + 
                 Math.pow(t, 2) * end[1];
      points.push([lat, lng]);
    }
    
    return points;
  }, [start, end]);

  return (
    <Polyline
      positions={curvePoints}
      weight={3}
      color="#3B82F6"
      opacity={0.7}
      dashArray="10,10"
      className="animated-line"
    />
  );
};

CurvedLine.propTypes = {
  start: PropTypes.arrayOf(PropTypes.number).isRequired,
  end: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default CurvedLine;