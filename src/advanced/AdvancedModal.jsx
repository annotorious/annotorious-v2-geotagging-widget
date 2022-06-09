import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { IoCheckmarkOutline, IoCloseOutline } from 'react-icons/io5';
import { Map, TileLayer } from 'react-leaflet';
import centroid from '@turf/centroid';

import SearchInput from '../search/SearchInput';

// Shorthand
const getCentroid = feature =>
  centroid(feature)?.geometry.coordinates.slice().reverse();

const AdvancedModal = props => {

  const mapRef = useRef();

  const [okEnabled, setOkEnabled] = useState(true);
  
  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.leafletElement;

      if (props.feature)
        L.geoJSON(props.feature).addTo(map);

      map.pm.addControls({ 
        position: 'topleft',
        drawCircle: false,
        drawCircleMarker: false 
      });

      // Dis- or enable the OK button depending on whether there's a feature
      map.on('pm:create', () => {
        setOkEnabled(true);
      });

      map.on('pm:remove', () => {
        const remainingFeatures = map.pm.getGeomanLayers();
        if (remainingFeatures.length === 0)
          setOkEnabled(false);
      });
    }
  }, []);

  const onOk = () => {
    const geojson = 
      mapRef.current.leafletElement.pm
        .getGeomanLayers()
        .map(l =>  l.toGeoJSON());

    if (geojson.length === 1) {
      props.onOk({
        type: 'Feature',
        geometry: geojson[0].geometry,
      });
    } else if (geojson.length > 1) {
      props.onOk({
        type: 'Feature',
        geometry: {
          type: 'GeometryCollection',
          geometries: geojson.map(g => g.geometry)
        }
      });
    } else {
      // TODO
    }
  }

  return ReactDOM.createPortal(
    <div className="r6o-geotagging-advanced-container">
      <div className="r6o-geotagging-advanced-modal" role="dialog">
        <header>
          <SearchInput 
            config={props.config}
            quote={props.quote}
            onSearch={props.onSearch} />

          <div className="r6o-geotagging-advanced-modal-header-buttons">
            <button
              className="r6o-geotagging-advanced-modal-cancel"
              onClick={props.onCancel}>
              <IoCloseOutline /> 
              <span>Cancel</span>
            </button>

            <button 
              className="r6o-geotagging-advanced-modal-ok"
              disabled={!okEnabled}
              onClick={onOk}>
              <IoCheckmarkOutline />
              <span>Ok</span>
            </button>
          </div>
        </header>

        <main>
          <Map 
            ref={mapRef}
            zoom={props.config.defaultZoom}
            preferCanvas={true}
            center={getCentroid(props.feature)}>

            <TileLayer
              url={props.config.tileUrl} />
          </Map>  
        </main>
      </div>
    </div>, document.body);

}

export default AdvancedModal;