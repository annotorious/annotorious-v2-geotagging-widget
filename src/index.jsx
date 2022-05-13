import React, { useRef, useState } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import L from 'leaflet';

import './index.css';
import 'leaflet/dist/leaflet.css';

L.Icon.Default.mergeOptions({
  iconUrl: 'leaflet/marker-icon.png',
  shadowUrl: 'leaflet/marker-shadow.png',
  iconRetinaUrl: 'leaflet/marker-icon-2x.png',
  shadowRetinaUrl: 'leaflet/marker-shadow-2x.png'
});

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

const GeoTaggingPlugin = config => props => {

  const mapRef = useRef();

  // Marker position (from geotagging body or default)
  const position = 
    props.annotation.bodies
      .find(b => b.purpose === 'geotagging')?.geometry.coordinates.slice().reverse() || [ 48, 16 ];

  // Default zoom and center
  const [zoom, setZoom] = useState(7);
  const [center, setCenter] = useState(position);

  const onViewportChange = () => {
    const { center, zoom } = mapRef.current.viewport;
    setCenter(center);
    setZoom(zoom);
  }

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
      <Map 
        ref={mapRef}
        zoom={zoom}
        preferCanvas={true}
        attributionControl={false}
        center={center}
        style={{ height:'100%' }}
        onViewportChange={onViewportChange}>
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}" />

        <DraggableMarker 
          position={position}
          onDragEnd={onDragMarker} />
      </Map>  
    </div>
  )

}

export default GeoTaggingPlugin;