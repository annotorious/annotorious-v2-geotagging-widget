# Recogito Geotagging Widget

A geo-tagging editor widget for [Annotorious](https://annotorious.com) and 
[RecogitoJS](https://github.com/recogito/recogito-js).

## Installing

If you use npm, `npm install @recogito/geotagging-widget` and

```js
import GeotaggingWidget from '@recogito/geotagging-widget';

// Widget configuration (optional!)
const config = {
  // XYZ tileserver URL pattern, defaults to 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  tileUrl: 'https://www.exampe-tileserver.com/tile/{z}/{y}/{x}',

  // Map origin for empty annotations, defaults to [0, 0]
  defaultOrigin: [ 48, 16 ],

  // Map zoom for empty annotations, defaults to 7
  defaultZoom: 10

  // Search endpoint, either String ('osm' | 'whg') or custom function
  search: 'osm'
};

const anno = new Annotorious({
  image: imageEl,
  widgets: [
    { widget: GeotaggingWidget(config) },
  ]
});
```

Otherwise, download the [latest release](https://github.com/recogito/geotagging-widget/releases) and include the JS script
file in your webpage. You can also get the script files directly from the CDN:

```html
<html>
  <head>
    <!-- Annotorious -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@recogito/annotorious@latest/dist/annotorious.min.css">
    <script src="https://cdn.jsdelivr.net/npm/@recogito/annotorious@latest/dist/annotorious.min.js"></script>

    <!-- Geotagging Widget -->
    <script src="https://cdn.jsdelivr.net/npm/@recogito/geotagging-widget@latest/dist/geotagging-widget.js"></script>
  </head>
  
  <body>
    <div id="content">
      <img id="hallstatt" src="640px-Hallstatt.jpg">
    </div>
    <script>
      (function() {
        var anno = Annotorious.init({
          image: 'hallstatt'
        });

        anno.loadAnnotations('annotations.w3c.json');
      })()
    </script>
    <script type="text/javascript" src="annotorious.min.js"></script>
  </body>
</html>
```
## License

[BSD-3 Clause](https://github.com/recogito/geotagging-widget/blob/main/LICENSE)

## Acknowledgements

Sample image: Epitome theatri Ortelianii, Abraham Ortelius, 1601.
[Source: Wikimedia Commons, CC-BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Epitome_theatri_Ortelianii,_Abraham_Ortelio.jpg)
