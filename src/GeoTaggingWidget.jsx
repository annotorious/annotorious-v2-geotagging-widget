import React, { useState } from 'react';

import Minimap from './minimap/Minimap';
import Toolbar from './toolbar/Toolbar';

const GeoTaggingWidget = props => {

  const [showMinimap, setShowMinimap] = useState(false);

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

      {showMinimap && 
        <Minimap 
          config={props.config}
          annotation={props.annotation}
          onDragMarker={onDragMarker} />
      }
    </div>
  )

}

export default GeoTaggingWidget;
