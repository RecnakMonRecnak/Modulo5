require(["esri/map",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/FeatureLayer",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/toolbars/draw",
        "esri/graphic",
        "esri/tasks/query",
        "dojo/parser", 
        "dojo/on",
        "dojo/dom",
        "dojo/_base/Color",
        "dojo/domReady!"], 

function (Map, ArcGISDynamicMapServiceLayer, FeatureLayer,  SimpleFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol, Draw, Graphic, Query, parser,  on, dom, Color, Selection) {
  
  
// Parse DOM nodes decorated with the data-dojo-type attribute
  parser.parse();

//1. Se crea el mapa de USA
  var map = new Map("divMap", {
    basemap: "satellite",
    center: [-119.65, 36.87],
    zoom: 4
});

//2. Se muestra el feature layer de USA
  var urlServicio = "http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer"
  
  var layerUSA = new ArcGISDynamicMapServiceLayer(urlServicio, {
    opacity: 0.5
  });
  layerUSA.setVisibleLayers([0, 1, 3]);


//3. Se muestra el feature layer de terremotos de USA con magnitud mayor de 2

var terremotos = new FeatureLayer ("http://services.arcgis.com/ue9rwulIoeLEI9bj/arcgis/rest/services/Earthquakes/FeatureServer/0");

terremotos.setDefinitionExpression("MAGNITUDE >= 2");

map.addLayers([layerUSA, terremotos]);
  

// 4. se inicia la función de dibujo

map.on("load", dibujoTool);

function dibujoTool() {


//5. Se muestra la toolbar de dibujo
    var toolbar = new Draw(map);
    toolbar.activate(Draw.POLYGON);
    toolbar.on('draw-complete', addToMap);
};

function addToMap(evt) {
  console.log('evt', evt);


//6. Se declara la variable de la geometria del objeto
  var geometriaEntrada = evt.geometry;


//7. Se define el simbolo que finaliza el poligono
   var simbolo = new SimpleFillSymbol(
    SimpleFillSymbol.STYLE_SOLID, 
    new SimpleLineSymbol(
        SimpleLineSymbol.STYLE_DASHDOT, 
        new Color([0, 255, 0]), 
        2), 
    new Color([0, 255, 0, 0.2])
); 

//8. Se limpia el grafico realizado
map.graphics.clear();

//9. se agrega el poligono al mapa
var poligono = new Graphic(geometriaEntrada, simbolo);
map.graphics.add(poligono);

//10. se llama a una función de selección de terremotos
selectTerremotos(geometriaEntrada);
}

function selectTerremotos(geometriaEntrada ) {
  console.log("geometriaEntrada", geometriaEntrada);

//13. Indicar simbolo para la selección
  var selectSimbol = new SimpleMarkerSymbol({
      "type": "esriSMS",
      "style": "esriSMSCircle",
      "color": [0, 255, 0, 128],
      "size": 6,
      "outline": {
          "color": [0, 255, 0, 214],
          "width": 1
      }
  });

//11. Iniciamos la consulta
   var consulta = new Query();
   consulta.geometry = geometriaEntrada;
   
//12. Indicamos al feature al cual se le va a hacer la consulta para hacer la selección

terremotos.selectFeatures(consulta);

//14. mostramos los terremotos seleccionados
   terremotos.setSelectionSymbol(selectSimbol);

}

  // URL variables
  // http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer
  // https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer

  // Construct the USA layer - Ocultar capa de estados

  // Construct the Quakes layer - Mostrar solo los de magnitud mayor de 2

  //  Wire the draw tool initialization function

  // Inicializar la herramienta de dibujo para pintar polígonos

  // Mostrar el polígono dibujado
});
