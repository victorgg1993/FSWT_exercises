import UNO from './src/model/uno.mjs';

let joc_uno = new UNO();

while (joc_uno.semafor) {
    joc_uno.gestio();
}


// to-do: dóna problemes al anunciar l'uno