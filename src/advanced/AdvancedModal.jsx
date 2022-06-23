import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { IoCheckmarkOutline, IoCloseOutline } from 'react-icons/io5';
import { Map, TileLayer } from 'react-leaflet';
import centroid from '@turf/centroid';
import bbox from '@turf/bbox';

import SearchInput from '../search/SearchInput';

// Shorthand
const getCentroid = feature =>
  centroid(feature)?.geometry.coordinates.slice().reverse();

const AdvancedModal = props => {

  const mapRef = useRef();

  const [okEnabled, setOkEnabled] = useState(true);

  const fitMap = feature => {
    const isPoint = feature?.geometry?.type === 'Point';

    const map = mapRef.current.leafletElement;
    const maxZoom = props.config.defaultZoom;

    if (isPoint) {
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

      fitMap(props.feature);
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
        properties: geojson[0].properties,
        geometry: geojson[0].geometry,
      });
    } else if (geojson.length > 1) {
      props.onOk({
        type: 'Feature',
        geometry: {
          type: 'GeometryCollection',
          properties: geojson[0].properties,
          geometries: geojson.map(g => g.geometry)
        }
      });
    }
  }

  const clearMap = () => {
    const map = mapRef.current.leafletElement;
    map.eachLayer(layer => {
      if (layer.feature)
        map.removeLayer(layer);
    });
  }

  const onSearch = ({ result }) => {
    clearMap();

    const { uri, geometry } = result;

    const feature = { 
      type: 'Feature', 
      properties: { uri },
      geometry 
    };

    const map = mapRef.current.leafletElement;
    const layer = L.geoJSON(feature).addTo(map);

    // Remove URI if user changes anything
    layer.on('pm:edit', evt =>
      delete evt.layer.feature.properties.uri);

    fitMap(feature);
  }

  return ReactDOM.createPortal(
    <div className="r6o-geotagging-advanced-container">
      <div className="r6o-geotagging-advanced-modal" role="dialog">
        <header>
          <SearchInput 
            config={props.config}
            value={props.search}
            onChange={props.onChangeSearch}
            onSearch={onSearch} />

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