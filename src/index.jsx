import React from 'react';
import L from 'leaflet';

import { createConfig } from './Config';

import './index.css';
import 'leaflet/dist/leaflet.css';
import GeoTaggingWidget from './GeoTaggingWidget';

L.Icon.Default.mergeOptions({
  iconUrl: 'leaflet/marker-icon.png',
  shadowUrl: 'leaflet/marker-shadow.png',
  iconRetinaUrl: 'leaflet/marker-icon-2x.png',
  shadowRetinaUrl: 'leaflet/marker-shadow-2x.png'
});

const GeoTaggingPlugin = config => props =>
  <GeoTaggingWidget {...props} config={createConfig(config)} />;

export default GeoTaggingPlugin;