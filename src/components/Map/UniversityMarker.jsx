import { Marker, Popup } from 'react-leaflet';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { useState, useCallback, useEffect } from 'react';
import UniversityPreviewCard from '../UniversityPreviewCard';

const UniversityMarker = ({ university, onClick, isSelected }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [marker, setMarker] = useState(null);

  const customIcon = L.divIcon({
    html: `
      <div class="marker-container ${isSelected ? 'selected' : ''}" data-university="${university.id}">
        <div class="university-marker-wrapper">
          <img 
            src="${university.logo}" 
            alt="${university.name}"
            class="university-marker-logo"
            onError="this.onerror=null; this.src='/assets/logos/default-marker.png';"
          />
        </div>
      </div>
    `,
    className: 'custom-div-icon',
    iconSize: [80, 80],
    iconAnchor: [40, 40],
  });

  // Gestion de l'affichage/masquage de la popup
  useEffect(() => {
    if (marker) {
      if (showPreview && !isSelected) {
        marker.openPopup();
      } else {
        marker.closePopup();
      }
    }
  }, [showPreview, isSelected, marker]);

  // Gestionnaire de clic sur le marqueur
  const handleMarkerClick = useCallback((e) => {
    e.originalEvent.stopPropagation();
    onClick(university);
    setShowPreview(false);
  }, [university, onClick]);

  // Gestionnaire de clic sur la preview
  const handlePreviewClick = useCallback((e) => {
    e.stopPropagation();
    onClick(university);
    setShowPreview(false);
  }, [university, onClick]);

  // Gestionnaire de hover
  const handleMouseOver = useCallback(() => {
    if (!isSelected) {
      setShowPreview(true);
    }
  }, [isSelected]);

  const handleMouseOut = useCallback((e) => {
    const popup = marker?.getPopup();
    if (popup) {
      const popupEl = popup.getElement();
      // Ne cache pas la preview si la souris est dessus
      if (!popupEl?.contains(e.originalEvent.relatedTarget)) {
        setShowPreview(false);
      }
    } else {
      setShowPreview(false);
    }
  }, [marker]);

  return (
    <Marker
      position={university.coordinates}
      icon={customIcon}
      ref={setMarker}
      eventHandlers={{
        click: handleMarkerClick,
        mouseover: handleMouseOver,
        mouseout: handleMouseOut,
      }}
    >
      <Popup
        className="university-preview-popup"
        closeButton={false}
        offset={[0, -40]}
      >
        <div 
          onMouseLeave={() => setShowPreview(false)}
        >
          <UniversityPreviewCard 
            university={university} 
            onClick={handlePreviewClick}
          />
        </div>
      </Popup>
    </Marker>
  );
};

UniversityMarker.propTypes = {
  university: PropTypes.shape({
    id: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    programs: PropTypes.arrayOf(PropTypes.string).isRequired,
    languages: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

export default UniversityMarker;