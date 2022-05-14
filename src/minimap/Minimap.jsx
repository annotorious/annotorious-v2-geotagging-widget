import React, { useRef, useState } from 'react';
import { Map, TileLayer } from 'react-leaflet';

import DraggableMarker from './DraggableMarker';

const Minimap = props => {

  const mapRef = useRef();

  // Default zoom and center
  const [zoom, setZoom] = useState(props.config.defaultZoom);
  const [center, setCenter] = useState(props.position);

  const onViewportChange = () => {
    const { center, zoom } = mapRef.current.viewport;
    setCenter(center);
    setZoom(zoom);
  }

  return (
    <div className="r6o-geotagging-minimap">
      <Map 
        ref={mapRef}
        zoom={zoom}
        preferCanvas={true}
        attributionControl={false}
        center={center}
        style={{ height:'100%' }}
        onViewportChange={onViewportChange}>

        <TileLayer
          url={props.config.tileUrl} />

        <DraggableMarker 
          position={props.position}
          onDragEnd={props.onDragMarker} />
      </Map>  
    </div>
  )

}

export default Minimap;