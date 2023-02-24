require(["esri/map", "esri/dijit/Search","dojo/parser", "dojo/domReady!"], 
    function (Map, Search, parser) {
        // Parse DOM nodes decorated with the data-dojo-type attribute
        parser.parse();

        var map = new Map ("cpCenter", {
            basemap: "oceans",
            center:[-3,40],
            zoom: 8
        });

        var busqueda = new Search({
            map: map,
            maxSuggestions: 4,
            minCharacters:3
        }, "divSearch");
        busqueda.startup();
    }
);
