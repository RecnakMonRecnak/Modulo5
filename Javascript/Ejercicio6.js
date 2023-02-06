const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']

const longmeses = meses
    .filter(meses => meses.length > 7)
    .map(meses => meses.toUpperCase()); 

console.log(longmeses);

const numlongmeses = longmeses.length; 

console.log(`Hay ${numlongmeses} meses largos`);