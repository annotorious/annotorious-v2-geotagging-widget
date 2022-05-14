import React from 'react';
import L from 'leaflet';

import './index.css';
import 'leaflet/dist/leaflet.css';

import Minimap from './minimap/Minimap';
import { createConfig } from './Config';

L.Icon.Default.mergeOptions({
  iconUrl: 'leaflet/marker-icon.png',
  shadowUrl: 'leaflet/marker-shadow.png',
  iconRetinaUrl: 'leaflet/marker-icon-2x.png',
  shadowRetinaUrl: 'leaflet/marker-shadow-2x.png'
});

const GeoTaggingPlugin = config => props => {

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
      <Minimap 
        config={createConfig(config)}
        annotation={props.annotation}
        onDragMarker={onDragMarker} />
    </div>
  )

}

export default GeoTaggingPlugin;