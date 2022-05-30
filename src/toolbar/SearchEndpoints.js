import bbox from '@turf/bbox';

const osm = query =>
  fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&polygon_geojson=1`)
    .then(res => res.json())
    .then(data => {
      const first = data[0];

      const lat = parseFloat(first.lat);
      const lng = parseFloat(first.lon);
      const uri = `https://www.openstreetmap.org/${first.osm_type}/${first.osm_id}`;

      const bounds = first.boundingbox;

      return { lat, lng, uri, bounds };
    });

const whg = query =>
  fetch(`https://whgazetteer.org/api/index/?name=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      const first = data.features[0];

      const bounds = bbox(first);

      const lng = (bounds[0] + bounds[2]) / 2;
      const lat = (bounds[1] + bounds[3]) / 2;

      const uri = `https://whgazetteer.org/api/db/?id=${first.properties.place_id}`;
      
      return { lat, lng, uri, bounds };
    });

export default { osm, whg };


