import React, { useRef } from 'react';
import { Map, TileLayer } from 'react-leaflet';

import './index.css';
import 'leaflet/dist/leaflet.css';

const GeoTaggingPlugin = config => props => {

  const mapRef = useRef();

  return (
    <div className="r6o-geotagging r6o-widget">
      <Map 
        ref={mapRef}
        zoom={7}
        preferCanvas={true}
        attributionControl={false}
        center={[48, 16]}
        style={{ height:'100%' }}>
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}" />
      </Map>  
    </div>
  )

}

export default GeoTaggingPlugin;