import Cartes from './cartes.mjs';

let n_cartes = 7;
let n_jugadors = 0;

let cartes = new Cartes();

// Métodos
export default class Jugadors {
    nom;
    ma_cartes = []; // cartes actuals del jugador
    id = 0;
    ordre_robar = false;
    ha_dit_uno = false;
    
    constructor(_nom) {
        if (_nom) {
            this.id = n_jugadors;
            this.nom = _nom;
            n_jugadors++;

            this.guardar_carta(n_cartes); // guardem x cartes per a començar la partida
        }
    }

    get nom() {
        return this.nom;
    }
    get id() {
        return this.id;
    }
    get ma() {
        return this.ma_cartes;
    }
    get numero_cartes() {
        return this.ma_cartes.length;
    }

    set ha_robat(_t) {
        this.ja_ha_robat = _t;
    }
    get ha_robat() {
        return this.ja_ha_robat;
    }

    mostrar_carta(n_carta) {
        return this.ma_cartes[n_carta];
    }

    guardar_carta(n_cops) { // agafem una carta del mazo i ens la quedem

        for (let i = 0; i < n_cops; i++) {
            this.ma_cartes.push(cartes.mazo_pop());
        }
    }

    deixar_carta(carta_a_deixar) { // deixem carta en el mazo de descartes

        let carta = this.ma_cartes[carta_a_deixar]; // guardem carta
        this.ma_cartes.splice(carta_a_deixar, 1);   // borrem
        cartes.monto_push(carta);                         // posem carta mazo de descartes
    }

}