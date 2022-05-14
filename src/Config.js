export const createConfig = config => ({
  // Tile URL
  tileUrl: config.tileUrl || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

  // Default map marker origin
  defaultOrigin: config.defaultOrigin || [0, 0],

  // Default map zoom
  defaultZoom: config.defaultZoom || 7
})