import React, { useEffect, useRef, useState } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { gsap } from 'gsap';

import DraggableMarker from './DraggableMarker';

const Minimap = props => {

  const mapRef = useRef();

  // Default zoom and center
  const [zoom, setZoom] = useState(props.config.defaultZoom);
  const [center, setCenter] = useState(props.position);

  // Lat/lon log
  const [latlon, setLatlon] = useState(props.position);

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
      setLatlon(props.position);
      setZoom(props.config.defaultZoom);
      gsap.to(mapRef.current.container, { height: props.config.height, duration: 0.15, onUpdate });
    } else {
      const currentHeight = mapRef.current.container.offsetHeight;
      if (currentHeight > 0)
        gsap.to(mapRef.current.container, { height: 0, duration: 0.15, onUpdate, onComplete: props.onClosed });
    }
  }, [props.expanded]);

  useEffect(() => {
    setCenter(props.position);
    setLatlon(props.position);
  }, [props.position])

  const selectCoordinates = () =>
    document.querySelector('.r6o-geotagging-minimap input').select();

  const onClick = evt => {
    const {latlng} = evt;
    setLatlon([latlng.lat, latlng.lng]);
    props.onDragMarker(latlng);
  }

  const onMarkerDragged = latlon => {
    const {lat, lng} = latlon;
    setLatlon([lat, lng]);
  };

  const onViewportChange = () => {
    const { center, zoom } = mapRef.current.viewport;
    setCenter(center);
    setZoom(zoom);
  };

  return (
    <div 
      className="r6o-geotagging-minimap">
      <Map 
        ref={mapRef}
        zoom={zoom}
        preferCanvas={true}
        attributionControl={false}
        center={center}
        onclick={onClick}
        onViewportChange={onViewportChange}>

        <TileLayer
          url={props.config.tileUrl} />

        <DraggableMarker 
          position={props.position}
          onDrag={onMarkerDragged}
          onDragEnd={props.onDragMarker} />
      </Map>  

      <div className="r6o-geotagging-minimap-overlay">
        <input 
          onClick={selectCoordinates}
          value={latlon[1].toFixed(5) + ', ' + latlon[0].toFixed(5)} />
      </div>
    </div>
  )

}

export default Minimap;