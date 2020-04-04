import Logica from './logica.mjs';
import Missatges from '../views/missatges.mjs';

let logic = new Logica();
let msg = new Missatges();

// Métodos
export default class UNO {

    semafor = true;

    constructor() { }

    gestio() {

        switch (logic.estat_joc) {

            case logic.INICI:
                logic.generar_cartes();
                msg.pintar_missatge_benvinguda();
                logic.demanar_usuaris();
                logic.gestiona_qui_comenca();
                logic.posar_primera_carta();
                break;

            case logic.PARTIDA_INICIADA:
                msg.pintar_carta_monto(logic.cartes);
                logic.logica_monto();
                break;

            case logic.PARTIDA_INICIADA_PRINT_CARTES_JUGADOR:
                msg.pintar_cartes_jugador_actual(logic.jugadors[logic.torn_partida]);
                logic.llegir_entrada_usuari();
                break;

            case logic.FINAL_PARTIDA:
                msg.pintar_resultats(logic.jugadors);
                this.semafor = false;
                break;
        }
    }

}