require (
    ["esri/map","esri/layers/FeatureLayer","dojo/domReady!"],
    function(Map, FeatureLayer){
        var myMap = new Map("viewDiv", {
            basemap: 'satellite',
            center: [-3, 40],
            zoom: 8
           
        });

        var urlHospitales = "https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0"
        var hospitales = new FeatureLayer(urlHospitales);

        myMap.addLayer(hospitales);
    }
);