import React, { useEffect, useRef, useState } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { gsap } from 'gsap';

import DraggableMarker from './DraggableMarker';

const Minimap = props => {

  const mapRef = useRef();

  // Default zoom and center
  const [zoom, setZoom] = useState(props.config.defaultZoom);
  const [center, setCenter] = useState(props.position);

  useEffect(() => {
    // Set initial height
    if (mapRef.current && props.expanded)
      mapRef.current.container.style.height = props.config.height + 'px'; 
  }, [mapRef.current]);

  useEffect(() => {
    const onUpdate = () =>
      mapRef.current.leafletElement.invalidateSize();

    if (props.expanded) {
      setCenter(props.position);
      setZoom(props.config.defaultZoom);
      gsap.to(mapRef.current.container, { height: props.config.height, duration: 0.15, onUpdate });
    } else {
      gsap.to(mapRef.current.container, { height: 0, duration: 0.15, onUpdate, onComplete: props.onClosed });
    }
  }, [props.expanded]);

  const onViewportChange = () => {
    const { center, zoom } = mapRef.current.viewport;
    setCenter(center);
    setZoom(zoom);
  }

  return (
    <div 
      className="r6o-geotagging-minimap">
      <Map 
        ref={mapRef}
        zoom={zoom}
        preferCanvas={true}
        attributionControl={false}
        center={center}
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