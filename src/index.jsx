import React from 'react';
import L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';  

import { createConfig } from './Config';

import './advanced/AdvancedModal.css';
import './minimap/Minimap.css';
import './search/SearchInput.css';
import './toolbar/Toolbar.css';

import 'leaflet/dist/leaflet.css';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';  

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