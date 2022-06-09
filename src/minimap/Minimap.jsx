import React, { useEffect, useMemo, useRef, useState } from 'react';
import { GeoJSON, Map, TileLayer } from 'react-leaflet';
import { gsap } from 'gsap';
import centroid from '@turf/centroid';
import bbox from '@turf/bbox';

import DraggableMarker from './DraggableMarker';

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

const isPoint = feature =>
  feature?.geometry?.type === 'Point';

const Minimap = props => {

  const mapRef = useRef();

  const [feature, setFeature] = useState(props.feature);
  const centroid = useMemo(() => isPoint(feature) ? getCentroid(feature) : null);

  const fitMap = feature => {
    const map = mapRef.current.leafletElement;
    const maxZoom = props.config.defaultZoom;

    if (isPoint(feature)) {
      map.setView(getCentroid(feature), maxZoom);
    } else {
      const bounds = bbox(feature);
      map.fitBounds([
        [bounds[1], bounds[0]],
        [bounds[3], bounds[2]]
      ]);  
    }
  }

  useEffect(() => {
    if (mapRef.current && props.expanded) {
      mapRef.current.container.style.height = props.config.height + 'px';
      fitMap(props.feature);
    }
  }, []);

  useEffect(() => {
    const onUpdate = () =>
      mapRef.current.leafletElement.invalidateSize();

    const onComplete = () => 
      fitMap(props.feature);

    if (props.expanded) {
      setFeature(props.feature);
      gsap.to(mapRef.current.container, { height: props.config.height, duration: 0.15, onUpdate, onComplete });
    } else {
      const currentHeight = mapRef.current.container.offsetHeight;
      if (currentHeight > 0)
        gsap.to(mapRef.current.container, { height: 0, duration: 0.15, onUpdate, onComplete: props.onClosed });
    }
  }, [props.expanded]);
  
  useEffect(() => {
    // Only update for external changes (search!)
    if (!isFeatureEqual(props.feature, feature)) {
      setFeature(props.feature);
      fitMap(props.feature);
    }
  }, [props.feature]);

  const onClick = evt => {
    if (isPoint(feature)) {
      const {latlng} = evt;
      const pointFeature = toPointFeature(latlng.lng, latlng.lat);

      setFeature(pointFeature);
      props.onChangeFeature(pointFeature);
    }
  }

  const onMarkerDragged = latlon => {
    const {lat, lng} = latlon;
    const pointFeature = toPointFeature(lng, lat);
    setFeature(pointFeature);
    props.onChangeFeature(pointFeature);
  };

  const selectCoordinates = () =>
    document.querySelector('.r6o-geotagging-minimap input').select();

  return (
    <div 
      className="r6o-geotagging-minimap">
      <Map 
        ref={mapRef}
        preferCanvas={true}
        attributionControl={false}
        onclick={onClick}>

        <TileLayer
          id="r6o-baselayer"
          url={props.config.tileUrl} />

        {isPoint(feature) ?
          <DraggableMarker 
            position={centroid}
            onDrag={onMarkerDragged}
            onDragEnd={onMarkerDragged} />

          :
          
          <GeoJSON 
            key={Math.random().toString(36).slice(2)}
            data={feature} />
        }
      </Map>  

      <div className="r6o-geotagging-minimap-overlay">
        {centroid &&
          <input 
            onClick={selectCoordinates}
            value={centroid[1].toFixed(5) + ', ' + centroid[0].toFixed(5)} />
        }
      </div>
    </div>
  )

}

export default Minimap;