// Globals
const Colors = [
    'blau',
    'vermell',
    'verd',
    'groc',
];
let mazo_cartes = []; // array de les cartes actuals del mazo
let monto = []; // monto on es van apilant les cartes

export default class _Cartes {

    constructor() {
    }

    // Métodos
    crear_cartes() {
        let id = 0;
        let _arr_valor_carta = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+2', 'no torn', 'sentit', '+4', 'sel color'];

        //debug:
        //let _arr_valor_carta = ['+4', '+4', '+4', '+4', '+4', '+4', '+4', '+4', '+4', '1', '2', '3', '4', '5', '6'];

        let _n_cops_carta = [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4];
        let _n_colors_carta = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0];

        for (let i = 0; i < _arr_valor_carta.length; i++) { // 0 ~ comodín

            for (let j = 0; j < _n_cops_carta[i]; j++) { // nº cops ( 1 ~ 4 )

                if (_n_colors_carta[i] > 0) { // amb color

                    for (let k = 0; k < 4; k++) {
                        mazo_cartes.push({ 'id': id, 'valor': _arr_valor_carta[i], 'color': `${Colors[k]}` });
                        id++;
                    }
                }
                else { // sense color
                    mazo_cartes.push({ 'id': id, 'valor': _arr_valor_carta[i] });
                    id++;
                }
            }
        }
    }

    generar_cartes_partida(){
        this.crear_cartes();
        this.barrejar_cartes();
    }

    barrejar_cartes() {
        mazo_cartes.sort(() => Math.random() - 0.5);
    }

    // Métodos usuario
    monto_push(carta) {
        monto.push(carta);
    }
    mazo_pop() {
        let carta = mazo_cartes.splice((mazo_cartes.length - 1), 1);
        return carta[0];
    }
    monto_peek() {
        return monto[(monto.length - 1)];
    }
    monto_insertar_carta(_index, carta) {
        monto.splice(_index, 0, carta); // retornem la carta al final
    }

    get valor() { // valor carta
        let carta = this.monto_peek();
        return (carta.valor);
    }
    get color() { // color carta
        let carta = this.monto_peek();
        return (carta.color);
    }

    monto_canvi_color(color) {
        let carta = this.monto_peek();
        carta.color = color;
        monto[(monto.length - 1)] = carta;
    }
}