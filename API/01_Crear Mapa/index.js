require(
    ["esri/map", 
    "dojo/dom", 
    "esri/geometry/Point",
    "dojo/on",
    "dojo/domReady!"],
    function(Map, dom, Point, on){
        var myMap = new Map('divMap', {
            basemap: 'satellite',
            center: [-3, 40],
            // zoom: 15
            scale: 25000
        });
        // Seleccionado el elemento de HTML con su id
        var boton = dom.byId('btn'); // = document.getElementById
        
        // Opt1 ---JS - Agregamos el evento al que debe reaccionar
        // boton.addEventListener('click', goTo);
        // Opt2---Dojo - Evento con dojo/on
        on(boton, 'click', goTo);
        // Definimos la función con la que tiene que reaccionar
        function goTo() {
            var point = new Point(-3.67, 40.42);
            console.log('goTo');
            myMap.centerAt(point);
        }

    myMap.on("extent-change", showExtent);
    function showExtent (){
        console.log("Extensión del mapa cambiada")
    }

}
);


