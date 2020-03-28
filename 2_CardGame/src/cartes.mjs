
// Globals
const Colors = {
    BLAU: 'blau',
    VERD: 'verd',
    GROC: 'groc',
    VERMELL: 'vermell'
}

let _color;

// Métodos
export default class Cartes {
    constructor(color) {
        this._color = color;
        console.log("color:", this._color);
    }


    // setters / getters:
    get_color() {
        return this._color;
    }

    set_color(color) {
        this._color = color;
    }
}



