import React from 'react';

const Toolbar = props => {

  return (
    <div className="r6o-geotagging-toolbar">
      <button onClick={props.onShowMinimap}>Pick a coordinate</button>
    </div>
  )

}

export default Toolbar;