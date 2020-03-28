import Cartes from './src/cartes.mjs';
console.log('Debug');

const a = new Cartes('blau');

a.set_color('vermell');
console.log("Nou color: ", a.get_color());


