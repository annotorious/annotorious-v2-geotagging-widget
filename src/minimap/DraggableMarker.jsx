import React, { useEffect, useRef } from 'react';
import { Marker } from 'react-leaflet';

const DraggableMarker = props => {

  const markerRef = useRef();
  
  const onDragEnd = evt =>
    props.onDragEnd(evt.target._latlng)

  return (
    <Marker 
      ref={markerRef}
      draggable={true} 
      ondragend={onDragEnd}
      position={props.position} />
  )

}

export default DraggableMarker;