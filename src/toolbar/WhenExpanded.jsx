import React, { useEffect, useMemo, useRef } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { BsPencilFill } from 'react-icons/bs';

import SearchInput from '../search/SearchInput';

const WhenExpanded = props => {
  
  const elem = useRef();

  useEffect(() => {
    if (elem.current)
      elem.current.querySelector('input').focus({ preventScroll: true });
  }, [elem.current]);

  const isNonPointFeature = useMemo(() => 
    props.feature && props.feature.geometry?.type !== 'Point', [props.feature]);

  return (
    <div
      ref={elem} 
      className="r6o-geotagging-toolbar expanded">

      <div className="r6o-geotagging-toolbar-left">
        <SearchInput 
          config={props.config}
          quote={props.quote}
          onSearch={props.onSearch} />

        <button 
          title="Collapse shape to marker"
          className="r6o-geotagging-round"
          disabled={!isNonPointFeature}
          onClick={props.onCollapseToCentroid}>
          <FaMapMarkerAlt />
        </button>
      </div>

      <div className="r6o-geotagging-toolbar-right">
        <button
          title="Open advanced drawing dialog" 
          className="r6o-geotagging-round"
          onClick={props.onGoAdvanced}>
          <BsPencilFill />
        </button>

        <button 
          title="Delete geotag"
          className="r6o-geotagging-delete" 
          onClick={props.onDeleteGeoTag}>
          <HiOutlineTrash />
        </button>
      </div>
    </div>
  )

}

export default WhenExpanded;