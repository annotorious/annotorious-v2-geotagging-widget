import React from 'react';
import WhenCollapsed from './WhenCollapsed';
import WhenExpanded from './WhenExpanded';

const Toolbar = props => props.isMapExpanded ?
  <WhenExpanded {...props} /> : <WhenCollapsed {...props} />

export default Toolbar;