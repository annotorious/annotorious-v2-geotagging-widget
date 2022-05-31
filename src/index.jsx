import React from 'react';
import L from 'leaflet';

import { createConfig } from './Config';

import './index.css';
import 'leaflet/dist/leaflet.css';

import MarkerIcon from '../public/leaflet/marker-icon.png';
import MarkerShadow from '../public/leaflet/marker-shadow.png';
import MarkerIcon2x from '../public/leaflet/marker-icon-2x.png';
import MarkerShadow2x from '../public/leaflet/marker-shadow-2x.png';

import GeoTaggingWidget from './GeoTaggingWidget';

L.Icon.Default.mergeOptions({
  iconUrl: MarkerIcon,
  shadowUrl: MarkerShadow,
  iconRetinaUrl: MarkerIcon2x,
  shadowRetinaUrl: MarkerShadow2x
});

const GeoTaggingPlugin = config => props =>
  <GeoTaggingWidget {...props} config={createConfig(config)} />;

export default GeoTaggingPlugin;