import React, { useEffect, useState } from 'react';

import Minimap from './minimap/Minimap';
import Toolbar from './toolbar/Toolbar';

const toBody = (lng, lat) => ({
  purpose: 'geotagging',
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [ lng, lat ]
  }
});

const getBody = annotation =>
  annotation.bodies.find(b => b.purpose === 'geotagging');

const GeoTaggingWidget = props => {

  // Marker position (from geotagging body or default)
  const [body, setBody] = useState(getBody(props.annotation));
  
  const [position, setPosition] = useState(body?.geometry.coordinates.slice().reverse());
  
  // If there is already a position, show the mini-map
  const [showMinimap, setShowMinimap] = useState(!!position);

  useEffect(() => {
    // If there is no geotag body yet, opening the minimap creates one 
    // at the default position
    if (showMinimap && !body) {
      const [lat, lng] = props.config.defaultOrigin;
      const defaultBody = toBody(lng, lat);

      setBody(defaultBody);
      setPosition(props.config.defaultOrigin);

      props.onUpsertBody(defaultBody);
    }

    // Closing the minimap removes the body
    // if (!showMinimap)
    //  props.onRemoveBody(body);
  }, [showMinimap]);

  const onMinimapClosed = () => {
    setBody(null);
    setPosition(null);
  }

  const onDragMarker = ({ lat, lng }) => {
    const updated = toBody(lng, lat);
    setBody(updated);
    setPosition([lat,lng]);
    props.onUpsertBody(updated);
  }

  const onDelete = () => {
    const body = getBody(props.annotation);
    props.onRemoveBody(body);
    setShowMinimap(false);
  }

  return (
    <div className="r6o-geotagging r6o-widget">
      <Toolbar 
        isMapExpanded={showMinimap}
        onShowMinimap={() => setShowMinimap(true)}
        onDeleteGeoTag={onDelete} />

      <Minimap 
        config={props.config}
        expanded={showMinimap}
        position={position || props.config.defaultOrigin}
        onDragMarker={onDragMarker} 
        onClosed={onMinimapClosed} />
    </div>
  )

}

export default GeoTaggingWidget;
