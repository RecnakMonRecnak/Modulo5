const enlaces = document.getElementsByTagName('a');
console.log(`Hay ${enlaces.length} enlaces`);

const penultimo = enlaces[enlaces.length -2];
console.log(penultimo.href);

const tercer = document.getElementById('thirdparagraph');
console.log(tercer);

const enlacesTercer = tercer.getElementsByTagName('a');

console.log(enlacesTercer.length);

const resultado = document.getElementById('resultado');
resultado.innerHTML = enlacesTercer.length;

const parrafo = document.createElement ('p');
parrafo.innerHTML="Nuevo contenido";
document.body.appendChild (parrafo);

const title = document.getElementsByTagName ('h1')[0];
title.style.color = 'red';
title.fontsize ='20px'

//Quitar una clase//
const title2 = document.getElementsByTagName('h2')[0];
console.log('t2', title2)

title2.classList.remove('clasenueva');

//añadir una clase//
const title3 = document.getElementsByTagName('h2')[1];
title3.classList.add ('clasenueva');


