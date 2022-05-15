import React, { useEffect, useRef } from 'react';
import { Marker } from 'react-leaflet';

const DraggableMarker = props => {

  const markerRef = useRef();
  
  const onDrag = evt => 
    props.onDrag(evt.target._latlng);

  const onDragEnd = evt =>
    props.onDragEnd(evt.target._latlng)

  return (
    <Marker 
      ref={markerRef}
      draggable={true}
      ondrag={onDrag} 
      ondragend={onDragEnd}
      position={props.position} />
  )

}

export default DraggableMarker;