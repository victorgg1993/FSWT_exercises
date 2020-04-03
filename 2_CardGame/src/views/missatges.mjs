import tiza from "chalk";


export default class Missatges {

    constructor() { }

    pintar_missatge_benvinguda() {
        console.log("\n\n");
        console.log(tiza.redBright("|--------------------------------------------------------------------|"));
        console.log(tiza.greenBright("|--------------------------------------------------------------------|"));
        console.log(tiza.blueBright("|                        Benvingut al joc UNO                        |"));
        console.log(tiza.redBright("|--------------------------------------------------------------------|"));
        console.log(tiza.greenBright("|--------------------------------------------------------------------|\n"));
        console.log(tiza.yellowBright("· Si durant la partida vols reiniciar, escriu: reset.\n"));
        console.log(tiza.yellowBright("· Si en el teu torn vols una carta, escriu: robar.\n"));
        console.log(tiza.yellowBright("· Si ja has robat i no pots tirar, escriu: pasar.\n"));
        console.log(tiza.yellowBright("· Quan et quedi una carta i sigui el teu torn,\n  escriu: uno. Si no ho fas, penalitza amb 2 cartes.\n"));
        console.log("\n");
    }

    pintar_cartes_jugador_actual(jugador) {
        let t_cartes = jugador.ma;

        console.log(tiza.redBright(`|           Cartes de: ${jugador.nom}`));
        console.log(tiza.redBright(`|-----------------------------------------------------|`));

        for (let i = 0; i < jugador.numero_cartes; i++) {
            console.log(tiza.redBright("|   "), t_cartes[i]);
        }

        console.log(tiza.redBright(`|-----------------------------------------------------|`));
    }

    pintar_carta_monto(cartes) {
        console.log(tiza.blueBright(`|-----------------------------------------------------|`));
        console.log(tiza.blueBright("  Carta del monto: "), cartes.monto_peek());
        console.log(tiza.blueBright(`|-----------------------------------------------------|\n\n`));
    }

    pintar_resultats(jugadors) {
        console.log(tiza.blueBright(`|-----------------------------------------------------|`));
        console.log(tiza.blueBright("|-------------------- Resultats  ---------------------|"));
        console.log(tiza.blueBright(`|-----------------------------------------------------|\n\n`));

        for (let i = 0; i < jugadors.length; i++) {

            if (jugadors[i].ma_cartes.length == 0) {
                console.log(tiza.greenBright("Guanyador: ", jugadors[i].nom));
                break;
            }
        }
        this.pintar_salt_linia(3);
    }

    pintar_salt_linia(n) {
        for (let i = 0; i < n; i++) {
            console.log("\n");
        }
    }

    pintar_missatge_error(missatge, n_salts) {
        this.pintar_salt_linia(n_salts);
        console.log(tiza.bgRedBright(`>>>>>>>>> Error, ${missatge} <<<<<<<<<\n\n`));
    }
}