require([
  "esri/map",
  "dojo/dom",
  "dojo/on",
  "esri/tasks/locator",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/Color",
  "esri/graphic",
  "esri/symbols/TextSymbol",
  "esri/symbols/Font",
  "dojo/parser",
  "dojo/domReady!",
], 

function (Map, dom, on, Locator, SimpleMarkerSymbol, Color, 
         Graphic, TextSymbol, Font, parser ) {


// Parse DOM nodes decorated with the data-dojo-type attribute
  parser.parse();

// 1. Crear mapa y centrarlo en un sitio en específico
  var map = new Map("cpCenter", {
    basemap: "streets-navigation-vector",
    center: [-0.555207, 38.1923],
    zoom: 12,
  });

// 2. Controlar cuándo el usuario da click sobre el botón de buscar (btnLocate)
  var btn = dom.byId("btnLocate");
  btn.addEventListener("click", buscaDireccion); // Evento - opt1
  
  // on(btn, 'click', buscaDireccion); // Evento opt2


// 4. Instanciar y cargar el servicio (Locator)
  var locator = new Locator(
    "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
  );

  function buscaDireccion() {

// 3. Guardar en una variable lo que ha introducido el usuario
    var direccion = dom.byId("taAddress").value;
    console.log("buscaDireccion", direccion);
  
// 5. Montar parámetros para enviar al servicio
    var params = {
      address: { SingleLine: direccion },
      outFields: ["Loc_name"], // ["*"]
    };

// 6. Ejecutar llamada al servicio de geocodificacion
    locator.addressToLocations(params);
  }
  
// 7. Cuando se ha completado la petición se ejecuta mostrarResultados
  locator.on("address-to-locations-complete", mostrarResultados);

  function mostrarResultados(results) {

// 8. mostrarResultados devuelve los resultados
    console.log("Geocodificación completada", results);

// 9. Coordenadas del punto devuelto (nos quedamos con el primer candidato)
    var punto = results.addresses[0].location;
    console.log("punto", punto);

// 10. Definimos la simbología para el punto localizado - codigo disponible en arcgis playground js 3
    var marker = new SimpleMarkerSymbol();
    marker.setColor(new Color([230, 0, 169, 1]));
    marker.setStyle(SimpleMarkerSymbol.STYLE_SQUARE);

// 11. Como el simbolo se debe mostrar en un gráfico temporal, entonces montamos el gráfico: simbología y localización
    var grafico = new Graphic(punto, marker);

// 12. añadimos el gráfico que trae el simbolo a la capa gráfica que trae el propio mapa
    map.graphics.add(grafico);

// 13. Ponemos un texto al simbolo
    var font = new Font();
    font.setWeight(Font.WEIGHT_BOLD);
    font.setSize(14);
    var textSym = new TextSymbol();
    textSym.setOffset(0, 11);
    textSym.setFont(font);
    textSym.setColor(new Color([230, 0, 169, 1]));
    textSym.setText(results.addresses[0].address);
    var grafico2 = new Graphic (punto,textSym);
    map.graphics.add(grafico2);

// 14. Centramos el mapa sobre ese punto

    map.centerAndZoom(punto, 15);
  }
});
