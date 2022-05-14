import React, { useEffect, useState } from 'react';

import Minimap from './minimap/Minimap';
import Toolbar from './toolbar/Toolbar';

const toBody = (lng, lat) => ({
  purpose: 'geotagging',
  geometry: {
    type: 'Point',
    coordinates: [ lng, lat ]
  }
})

const GeoTaggingWidget = props => {

  // Marker position (from geotagging body or default)
  const body = props.annotation.bodies
    .find(b => b.purpose === 'geotagging');
  
  const position = body?.geometry.coordinates.slice().reverse();
  
  // If there is already a position, show the mini-map
  const [showMinimap, setShowMinimap] = useState(!!position);

  useEffect(() => {
    // If there is no geotag body yet, opening the minimap creates one 
    // at the default position
    if (showMinimap && !body) {
      const [ lat, lng ] = props.config.defaultOrigin;
      props.onAppendBody(toBody(lng, lat));
    }

    // Closing the minimap removes the body
    if (!showMinimap) {
      props.onRemoveBody(body);
    }
  }, [showMinimap]);

  const onDragMarker = ({ lat, lng }) =>
    props.onUpsertBody(toBody(lng, lat));

  const onDelete = () => {
    props.onRemoveBody(body)
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
        onDragMarker={onDragMarker} />
    </div>
  )

}

export default GeoTaggingWidget;
