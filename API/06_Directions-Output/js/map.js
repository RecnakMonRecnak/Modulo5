require([
        "esri/map",
        "esri/dijit/Directions",
        "dojo/parser", "dojo/domReady!", "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane"],

    function (Map, Directions, parser, BorderContainer, ContentPane,
              ) {

            parser.parse();

            // se crea el mapa
            var map= new Map("cpCenter", {
                basemap: "satellite",
                center: [-0.555207, 38.1923],
                zoom: 14
            });

            //Agregar el widget de direcciones
            var dijitDirections = new Directions(
                {
                    map: map,
                    routeTaskUrl: "http://utility.arcgis.com/usrsvcs/appservices/OM1GNiiACNJceMRn/rest/services/World/Route/NAServer/Route_World"
                }, 
                "divDirections"
            );
            dijitDirections.startup();




        });
   
