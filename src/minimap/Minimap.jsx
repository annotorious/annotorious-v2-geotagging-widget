import React, { useEffect, useRef, useState } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { gsap } from 'gsap';
import centroid from '@turf/centroid';
import bbox from '@turf/bbox';

import DraggableMarker from './DraggableMarker';

// Shorthand
const getCentroid = feature =>
  centroid(feature)?.geometry.coordinates.slice().reverse();

const toPointFeature = (lon, lat) => ({
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'Point',
    coordinates: [ lon, lat ]
  }
});

const isFeatureEqual = (a, b) => {
  if (a.geometry?.type !== b.geometry?.type)
    return false;

  if (a.geometry?.coordinates !== b.geometry?.coordinates)
    return false;

  return true;
}

const Minimap = props => {

  const mapRef = useRef();

  const [zoom, setZoom] = useState(props.config.defaultZoom);
  const [center, setCenter] = useState(getCentroid(props.feature));

  const [feature, setFeature] = useState(props.feature);
  const [centroid, setCentroid] = useState(getCentroid(props.feature));

  useEffect(() => {
    // Update the centroid whenever the feature changes
    setCentroid(getCentroid(feature));
  }, [feature]);

  useEffect(() => {
    // Set initial height
    if (mapRef.current && props.expanded) {
      mapRef.current.container.style.height = props.config.height + 'px';
    }
  }, [mapRef.current]);

  useEffect(() => {
    const onUpdate = () =>
      mapRef.current.leafletElement.invalidateSize();

    if (props.expanded) {
      setFeature(props.feature);
      gsap.to(mapRef.current.container, { height: props.config.height, duration: 0.15, onUpdate });
    } else {
      const currentHeight = mapRef.current.container.offsetHeight;
      if (currentHeight > 0)
        gsap.to(mapRef.current.container, { height: 0, duration: 0.15, onUpdate, onComplete: props.onClosed });
    }
  }, [props.expanded]);
  
  useEffect(() => {
    // Only update for external changes (search!)
    if (!isFeatureEqual(props.feature, feature)) {
      // Update feature and map state
      setFeature(props.feature);
      setCenter(getCentroid(props.feature));

      const bounds = bbox(props.feature);
      mapRef.current.leafletElement.fitBounds([
        [bounds[1], bounds[0]],
        [bounds[3], bounds[2]]
      ], { maxZoom: props.config.defaultZoom });
    }
  }, [props.feature]);

  const onClick = evt => {
    const {latlng} = evt;
    const pointFeature = toPointFeature(latlng.lng, latlng.lat);

    setFeature(pointFeature);
    props.onChangeFeature(pointFeature);
  }

  const onMarkerDragged = latlon => {
    const {lat, lng} = latlon;
    const pointFeature = toPointFeature(lng, lat);
    setFeature(pointFeature);
    props.onChangeFeature(pointFeature);
  };

  const onViewportChange = () => {
    const { center, zoom } = mapRef.current.viewport;
    setCenter(center);
    setZoom(zoom);
  };

  const selectCoordinates = () =>
    document.querySelector('.r6o-geotagging-minimap input').select();

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
          position={centroid}
          onDrag={onMarkerDragged}
          onDragEnd={onMarkerDragged} />
      </Map>  

      <div className="r6o-geotagging-minimap-overlay">
        <input 
          onClick={selectCoordinates}
          value={centroid[1].toFixed(5) + ', ' + centroid[0].toFixed(5)} />
      </div>
    </div>
  )

}

export default Minimap;