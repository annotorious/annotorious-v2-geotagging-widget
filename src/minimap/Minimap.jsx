import React, { useRef, useState } from 'react';
import { Map, TileLayer } from 'react-leaflet';

import DraggableMarker from './DraggableMarker';

const Minimap = props => {

  const mapRef = useRef();

  // Marker position (from geotagging body or default)
  const position = 
    props.annotation.bodies
      .find(b => b.purpose === 'geotagging')?.geometry.coordinates.slice().reverse() || props.config.defaultOrigin;

  // Default zoom and center
  const [zoom, setZoom] = useState(props.config.defaultZoom);
  const [center, setCenter] = useState(position);

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
          position={position}
          onDragEnd={props.onDragMarker} />
      </Map>  
    </div>
  )

}

export default Minimap;