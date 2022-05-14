import React, { useState } from 'react';
import L from 'leaflet';

import { createConfig } from './Config';
import Minimap from './minimap/Minimap';
import Toolbar from './toolbar/Toolbar';

import './index.css';
import 'leaflet/dist/leaflet.css';

L.Icon.Default.mergeOptions({
  iconUrl: 'leaflet/marker-icon.png',
  shadowUrl: 'leaflet/marker-shadow.png',
  iconRetinaUrl: 'leaflet/marker-icon-2x.png',
  shadowRetinaUrl: 'leaflet/marker-shadow-2x.png'
});

const GeoTaggingPlugin = config => props => {

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
          config={createConfig(config)}
          annotation={props.annotation}
          onDragMarker={onDragMarker} />
      }
    </div>
  )

}

export default GeoTaggingPlugin;