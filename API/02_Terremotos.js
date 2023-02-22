require (
    ["esri/map",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/layers/FeatureLayer",
    "esri/dijit/Legend",
    "esri/geometry/Extent",
    "esri/SpatialReference",
    "esri/dijit/OverviewMap",
    "esri/dijit/HomeButton",
    "esri/dijit/BasemapToggle",
    "dojo/domReady!"

],
    function(Map, 
       ArcGISDynamicMapServiceLayer,
       FeatureLayer,Legend,
       Extent, SpatialReference,OverviewMap,
       HomeButton, BasemapToggle){
        
        var myMap = new Map("viewDiv",{
            basemap: 'satellite',
            extent: new Extent (
                -122.68,45.53, -122.45,45.60, 
                new SpatialReference ({ wkid:4326}))
            
           
        });

        var USA = new ArcGISDynamicMapServiceLayer ("http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",{opacity:0.4});

        myMap.addLayer(USA);

        var terremotos = new FeatureLayer ("http://services.arcgis.com/ue9rwulIoeLEI9bj/arcgis/rest/services/Earthquakes/FeatureServer/0");
        terremotos.setDefinitionExpression("MAGNITUDE > 2");

        myMap.addLayer(terremotos);

        var casa = new HomeButton ({
            map: myMap
        }, "homeDiv");
        casa.startup();

        var toggle = new BasemapToggle ({
            map:myMap,
            basemap: "dark-gray"
        }, "toggleDiv");
        toggle.startup();

        var overDiv = new OverviewMap ({
            map:myMap,
            attachTo: "bottom-right",
            visible:true
        }); 
        overDiv.startup();

        myMap.on ("layers-add-result",displayLegend);

        function displayLegend (){
            console.log ("capas cargadas")
            var leyenda = new Legend ({
                map:myMap
            },"legendDiv");
            leyenda.startup();


    }

       }
);