import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Map, TileLayer } from 'react-leaflet';
import centroid from '@turf/centroid';

import SearchInput from '../search/SearchInput';

// Shorthand
const getCentroid = feature =>
  centroid(feature)?.geometry.coordinates.slice().reverse();

const AdvancedModal = props => {

  const mapRef = useRef();

  const [zoom, setZoom] = useState(props.config.defaultZoom);
  const [center, setCenter] = useState(getCentroid(props.feature));
  
  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.leafletElement;

      map.pm.addControls({ position: 'topleft' });

      map.on('pm:create', evt => {
        console.log(evt);
      });
    }
  }, [mapRef.current]);

  return ReactDOM.createPortal(
    <div className="r6o-geotagging-advanced-container">
      <div className="r6o-geotagging-advanced-modal" role="dialog">
        <header>
          <SearchInput 
            config={props.config}
            quote={props.quote}
            onSearch={props.onSearch} />
        </header>

        <main>
          <Map 
            ref={mapRef}
            zoom={zoom}
            preferCanvas={true}
            center={center}>

            <TileLayer
              url={props.config.tileUrl} />
          </Map>  
        </main>
      </div>
    </div>, document.body);

}

export default AdvancedModal;