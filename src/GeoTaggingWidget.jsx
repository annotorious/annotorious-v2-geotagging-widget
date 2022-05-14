import React, { useState } from 'react';

import Minimap from './minimap/Minimap';
import Toolbar from './toolbar/Toolbar';

const GeoTaggingWidget = props => {

  // Marker position (from geotagging body or default)
  const position = 
    props.annotation.bodies
      .find(b => b.purpose === 'geotagging')?.geometry.coordinates.slice().reverse();
  
  // If there is already a position, show the mini-map
  const [showMinimap, setShowMinimap] = useState(!!position);

  const onDragMarker = ({ lat, lng }) =>
    props.onUpsertBody({
      purpose: 'geotagging',
      geometry: {
        type: 'Point',
        coordinates: [ lng, lat ]
      }
    });

  return (
    <div className="r6o-geotagging r6o-widget">
      <Toolbar 
        onShowMinimap={() => setShowMinimap(true)} />

      <Minimap 
        config={props.config}
        expanded={showMinimap}
        position={position || props.config.defaultOrigin}
        onDragMarker={onDragMarker} />
    </div>
  )

}

export default GeoTaggingWidget;
