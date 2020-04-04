import Jugadors from './jugadors.mjs';
import Cartes from './cartes.mjs';
import Missatges from '../views/missatges.mjs';

import tiza from "chalk";
import llegir_linia from "readline-sync";

// const
const N_SALTS = 15;

let msg = new Missatges();

export default class Logica {

    cartes = new Cartes();

    //constants
    INICI = 0;
    PARTIDA_INICIADA = 1;
    PARTIDA_INICIADA_PRINT_CARTES_JUGADOR = 2;
    FINAL_PARTIDA = 3;

    //variables
    estat_joc = 0; // en quina fase es trova
    sentit_joc = 1; // 1 = sentit horari, -1 = sentit anti-horari
    torn_partida = 0; // id usuari que li toca
    jugadors = [];

    constructor() { }

    // Funcions "publiques"
    // case INICI
    generar_cartes() {
        this.cartes.generar_cartes_partida();
    }
    demanar_usuaris() {
        let array_usuaris = llegir_linia.question(tiza.greenBright("Noms dels usuaris ( separats per una coma ): "));
        let noms_jugadors = array_usuaris.split(', ');
        let errors = this.crear_jugadors(noms_jugadors, 2, 10);

        if (errors == 0) {
            this.partida_reset();
            return 0;
        }
        this.estat_joc = this.PARTIDA_INICIADA; // començem!
    }
    gestiona_qui_comenca() {
        if (this.jugadors.length > 1 && this.jugadors.length < 11) { // mínim 2 jugadors, màxim 10

            // to-do: fer que cada usuari pilli una carta i el nº més gran comença
            let _usuari = llegir_linia.question(tiza.greenBright("Qui vol començar? (introdueix nom): "));
            let i = 0;

            for (i = 0; i < this.jugadors.length; i++) {
                if (_usuari.localeCompare(this.jugadors[i].nom) == 0) { // si té el mateix nom
                    break;
                }
            }
            this.torn_partida = i;
        }
    }
    posar_primera_carta() {
        if (this.jugadors.length > 1 && this.jugadors.length < 11) { // mínim 2, màxim 10

            let primera_carta = this.cartes.mazo_pop(); // agafem carta mazo

            while (this.es_carta_especial(primera_carta)) {
                this.cartes.monto_insertar_carta(0, primera_carta); // retornem la carta al final
                primera_carta = this.cartes.mazo_pop(); // agafem nova carta
            }
            this.cartes.monto_push(primera_carta); // posem alguna carta que no sigui especial
        }
    }
    //case PARTIDA_INICIADA
    logica_monto() {
        let monto = this.cartes.monto_peek();
        let jugador = this.jugadors[this.torn_partida];

        switch (monto.valor) {
            case '+2': this.carta_robar_2(jugador); break;
            case '+4': this.carta_robar_4(jugador); break;
            case 'no torn': this.carta_no_torn(); break;
            case 'sentit': this.carta_canvi_sentit(jugador); break;
            case 'sel color': this.carta_demanar_color(); break;
        }
        this.estat_joc = this.PARTIDA_INICIADA_PRINT_CARTES_JUGADOR;

        if (this.algun_usuari_te_0_cartes(this.jugadors)) {

            if (jugador.ha_dit_uno) {
                this.estat_joc = this.FINAL_PARTIDA;
            }
            else {
                msg.pintar_missatge_error(`el jugador ${jugador.nom} no ha dit UNO, +2 cartes`, N_SALTS);
                jugador.guardar_carta(2); // ens menjem 2
            }
        }
    }
    // case PARTIDA_INICIADA_PRINT_CARTES_JUGADOR
    llegir_entrada_usuari() {
        // to-do: sanitize entrada
        let jugador = this.jugadors[this.torn_partida];
        let ordre = llegir_linia.question(tiza.blueBright(`\nJugador ${jugador.nom}, id carta / ordre: `));
        let posible_numero = parseInt(ordre);

        if (Number.isInteger(posible_numero)) { // Número ( carta normal / especial )

            let index_carta = this.donar_index_carta(posible_numero, jugador);

            if (index_carta != -1) { // la id existeix
                //this.carta_a_tirar = jugador.mostrar_carta(index_carta);
                let carta_a_tirar = jugador.mostrar_carta(index_carta);
                this.logica_carta_a_tirar(jugador, carta_a_tirar);
            }
            else { // la ID no existeix
                msg.pintar_salt_linia(N_SALTS);
                console.log(tiza.bgRedBright(">>>>>>>>> Error, la carta no existeix <<<<<<<<<\n\n"));
                msg.pintar_carta_monto(this.cartes);
            }
        }
        else {
            this.logica_ordre(ordre);
        }
    }

    // Funcions "privades". Altres funcions
    crear_jugadors(array_noms_jugadors, min_jugadors, max_jugadors) { // moure  crear_jugadors a jugadors.mjs (?)

        if (array_noms_jugadors.length < min_jugadors) { // pendent de fer-ho bé amb throw errors
            msg.pintar_missatge_error("creació de jugadors: Mínim 2 jugadors", N_SALTS);
            return 0;
        }
        if (array_noms_jugadors.length > max_jugadors) { // pendent de fer-ho bé amb throw errors
            msg.pintar_missatge_error("creació de jugadors: Màxim 10 jugadors", N_SALTS);
            return 0;
        }

        for (let i = 0; i < array_noms_jugadors.length; i++) {
            this.jugadors[i] = new Jugadors(array_noms_jugadors[i]);
        }
    }
    donar_index_carta(id_carta, jugador) {
        let cartes = jugador.ma;
        let _error = 1;
        let i = 0;

        for (i = 0; i < jugador.numero_cartes; i++) {

            if (id_carta == cartes[i].id) {
                _error = 0;
                break;
            }
        }

        if (_error == 0) return i;  // la id existeix
        return -1;                  // la id no existeix
    }
    es_carta_especial(carta) {
        let cartes_especials = ['+2', 'no torn', 'sentit', '+4', 'sel color'];

        for (let i = 0; i < cartes_especials.length; i++) {
            if (carta.valor == cartes_especials[i]) {
                return true;
            }
        }
        return false;
    }
    saltar_proxim_jugador() {
        this.torn_partida += this.sentit_joc;

        if (this.torn_partida < 0) {
            this.torn_partida = (this.jugadors.length - 1); // evitem negatius
        }
        this.torn_partida %= this.jugadors.length; // mòdul per a evitar overflows

        return this.jugadors[this.torn_partida];
    }
    invertir_sentit_joc() {
        this.sentit_joc *= -1;
    }
    processar_carta_especial(carta) {
        let monto = this.cartes.monto_peek();
        let jugador = this.jugadors[this.torn_partida];
        let carta_a_donar = this.donar_index_carta(carta.id, jugador);

        switch (carta.valor) {

            case '+2': this.carta_robar_2(jugador, carta_a_donar, carta, monto); break;
            case '+4': this.carta_robar_4(jugador, carta_a_donar); break;

            case 'no torn': this.carta_no_torn(carta_a_donar); break;
            case 'sel color': this.carta_demanar_color(jugador, carta_a_donar); break;
            case 'sentit': this.carta_canvi_sentit(jugador, carta_a_donar, carta, monto); break;
        }

        this.estat_joc = this.PARTIDA_INICIADA_PRINT_CARTES_JUGADOR;
        msg.pintar_carta_monto(this.cartes);
    }
    demanar_color() {
        // to-do: sanitize entrada
        let _color = llegir_linia.question(tiza.greenBright("Quin color vols? ('blau', 'vermell', 'verd','groc'): "));

        for (let i = 0; i < this.cartes.Colors.length; i++) {
            if (this.cartes.Colors[i] == _color) {
                return _color;
            }
        }
        return 0;
    }
    algun_usuari_te_0_cartes(jugador) {
        for (let i = 0; i < jugador.length; i++) {
            if (jugador[i].ma_cartes.length == 0) {
                return true;
            }
        }
        return false;
    }
    partida_reset() {
        this.estat_joc = 0;
    }

    // Logica cartes especials
    carta_robar_2(jugador, carta_a_deixar, carta, monto) {

        //if (carta && monto) {
        if ((carta.color == monto.color)) {

            jugador.deixar_carta(carta_a_deixar);
            jugador = this.saltar_proxim_jugador();
            jugador.guardar_carta(2); // ens menjem 2

            msg.pintar_salt_linia(N_SALTS);
            this.saltar_proxim_jugador();
            return 0;
        }
        msg.pintar_missatge_error("carta no permesa", N_SALTS); // else
    }
    carta_robar_4(jugador, carta_a_deixar) {

        let _color = this.demanar_color();
        if (_color != 0) {
            jugador.deixar_carta(carta_a_deixar);
            this.cartes.monto_canvi_color(_color); // canviar color monto
            jugador = this.saltar_proxim_jugador(); // apuntem nou jugador
            jugador.guardar_carta(4); // es menja 4
            this.saltar_proxim_jugador(); // ens saltem el jugador ( perd la ronda )
            msg.pintar_salt_linia(N_SALTS);
        } else {
            msg.pintar_missatge_error("error carta +4, color no existeix", N_SALTS);
        }
    }
    carta_no_torn(carta_a_deixar) {
        let jugador = this.jugadors[this.torn_partida];

        jugador.deixar_carta(carta_a_deixar);
        msg.pintar_salt_linia(N_SALTS);
        jugador = this.saltar_proxim_jugador();
        this.saltar_proxim_jugador();
    }
    carta_canvi_sentit(jugador, carta_a_deixar, carta, monto) {

        if ((carta.color == monto.color)) {

            jugador.deixar_carta(carta_a_deixar);
            msg.pintar_salt_linia(N_SALTS);
            this.invertir_sentit_joc();
            this.saltar_proxim_jugador();
            return 0;
        }
        msg.pintar_missatge_error("carta no permesa", N_SALTS); // else
    }
    carta_demanar_color(jugador, carta_a_deixar) {

        let _color = this.demanar_color();
        if (_color != 0) {
            jugador.deixar_carta(carta_a_deixar);
            this.cartes.monto_canvi_color(_color); // canviar color monto
            msg.pintar_salt_linia(N_SALTS);
            this.saltar_proxim_jugador();
        }
        else {
            msg.pintar_missatge_error("error comodín color, color no existeix", N_SALTS);
        }
    }

    // Logica ordres
    ordre_robar(jugador) {
        if (jugador.ordre_robar == false) {

            jugador.ordre_robar = true;
            jugador.guardar_carta(1);
            msg.pintar_salt_linia(N_SALTS);
            return 0;
        }
        msg.pintar_salt_linia(N_SALTS); //else
        console.log(tiza.bgGreenBright(">>>>>>>>> Ja has robat <<<<<<<<<\n\n"));
    }
    ordre_pasar(jugador) {
        if (jugador.ordre_robar) {

            jugador.ordre_robar = false;
            this.saltar_proxim_jugador();
            msg.pintar_salt_linia(N_SALTS);
            return 0;
        }
        msg.pintar_missatge_error("encara no has robat!", N_SALTS); // else
    }

    //case logic.PARTIDA_INICIADA:
    logica_carta_a_tirar(jugador, carta) {

        if (this.es_carta_especial(carta)) { // carta especial o una ordre
            this.processar_carta_especial(carta);
        }
        else {
            let carta_monto = this.cartes.monto_peek(); // (else) carta normal

            if ((carta.color == carta_monto.color) || (carta.valor == carta_monto.valor)) {

                jugador.deixar_carta(this.donar_index_carta(carta.id, jugador));
                this.saltar_proxim_jugador();
                msg.pintar_salt_linia(N_SALTS);
                this.estat_joc = this.PARTIDA_INICIADA;
                return 0;
            }
            msg.pintar_missatge_error("carta no permesa", N_SALTS); // else
            msg.pintar_carta_monto(this.cartes);
        }
    }
    logica_ordre(ordre) {

        let jugador = this.jugadors[this.torn_partida];

        switch (ordre) {
            case 'reset': this.partida_reset(); break;
            case 'robar': this.ordre_robar(jugador); break;
            case 'pasar': this.ordre_pasar(jugador); break;
            case 'uno':
                console.log(tiza.bgGreenBright(`>>>>>>>>> UNO anunciat pel jugador ${jugador}! <<<<<<<<<\n\n`));
                jugador.ha_dit_uno = true;
                break;

            default: msg.pintar_missatge_error("ordre no detectada", N_SALTS); break;
        }

        this.estat_joc = this.PARTIDA_INICIADA_PRINT_CARTES_JUGADOR;
        msg.pintar_carta_monto(this.cartes);
    }

    //case logic.FINAL_PARTIDA:
}
