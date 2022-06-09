import React, { useEffect, useState } from 'react';
import centroid from '@turf/centroid';

import AdvancedModal from './advanced/AdvancedModal';
import Minimap from './minimap/Minimap';
import Toolbar from './toolbar/Toolbar';

const toBody = feature => ({
  purpose: 'geotagging',
  type: 'Feature',
  geometry: feature.geometry
});

const getBody = annotation =>
  annotation.bodies.find(b => b.purpose === 'geotagging');

const GeoTaggingWidget = props => {

  const [body, setBody] = useState(getBody(props.annotation));

  const [quote, setQuote] = useState();

  const [advancedEditing, setAdvancedEditing] = useState(false);
  
  const [showMinimap, setShowMinimap] = useState(!!body?.geometry);

  useEffect(() => {
    // If there is no geotag body yet, opening the minimap 
    // will create one at the configured default origin
    if (showMinimap && !body) {
      const [lat, lng] = props.config.defaultOrigin;

      const defaultBody = toBody({
        geometry: {
          type: 'Point',
          coordinates: [ lng, lat ]
        }
      });

      setBody(defaultBody);
      props.onUpsertBody(defaultBody);
    }

    // Closing the minimap removes the body
    if (!showMinimap)
      props.onRemoveBody(body);

    // Selected text snippet for RecogitoJS (will be null in Annotorious)
    setQuote(props.annotation.quote);
  }, [showMinimap]);

  const onMinimapClosed = () => setBody(null);

  const onChangeFeature = feature => {
    const updated = toBody(feature);
    setBody(updated);
    props.onUpsertBody(updated);
  }

  const onDelete = () => {
    const body = getBody(props.annotation);
    props.onRemoveBody(body);
    setShowMinimap(false);
  }

  const onAdvacedEditingDone = feature => {
    onChangeFeature(feature);
    setAdvancedEditing(false);
  }

  const onAdvacedEditingCanceled = () =>
    setAdvancedEditing(false);

  const onSearch = result => {
    if (result) {
      const updated = {
        ...toBody(result),
        source: result.uri 
      };

      setBody(updated);
      props.onUpsertBody(updated);
    } else {
      // TODO
      console.log('No result found');
    }
  }

  const onCollapseToCentroid = () => {
    const collapsed = toBody(centroid(body));
    setBody(collapsed);
    props.onUpsertBody(collapsed);
  }

  return (
    <div className="r6o-geotagging r6o-widget">
      <Toolbar 
        isMapExpanded={showMinimap}
        config={props.config}
        quote={quote}
        feature={body}
        onShowMinimap={() => setShowMinimap(true)}
        onDeleteGeoTag={onDelete} 
        onSearch={onSearch} 
        onCollapseToCentroid={onCollapseToCentroid}
        onGoAdvanced={() => setAdvancedEditing(true)} />

      {body && <Minimap 
        config={props.config}
        expanded={showMinimap}
        feature={body}
        onChangeFeature={onChangeFeature} 
        onClosed={onMinimapClosed} />
      }

      {advancedEditing &&
        <AdvancedModal 
          config={props.config}
          quote={quote}
          feature={body}
          onOk={onAdvacedEditingDone}
          onCancel={onAdvacedEditingCanceled} />
      }
    </div>
  )

}

export default GeoTaggingWidget;
