import React from 'react';
import { Marker } from 'react-leaflet';

const DraggableMarker = props => {
  
  const onDragEnd = evt =>
    props.onDragEnd(evt.target._latlng)

  return (
    <Marker 
      draggable={true} 
      ondragend={onDragEnd}
      position={props.position} />
  )

}

export default DraggableMarker;