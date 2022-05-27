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

  const [quote, setQuote] = useState();
  
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
    if (!showMinimap)
      props.onRemoveBody(body);

    // Will be null for image annotations
    setQuote(props.annotation.quote);
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

  const onSearch = result => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);

    const updated = toBody(lng, lat);
    setBody(updated);
    setPosition([lat,lng]);
    props.onUpsertBody(updated);
  }

  return (
    <div className="r6o-geotagging r6o-widget">
      <Toolbar 
        isMapExpanded={showMinimap}
        quote={quote}
        onShowMinimap={() => setShowMinimap(true)}
        onDeleteGeoTag={onDelete} 
        onSearch={onSearch} />

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
