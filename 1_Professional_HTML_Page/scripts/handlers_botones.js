// Apuntem als div que volem mostrar / amagar
let d_mar = document.getElementById('div_maridaje');
let d_temp = document.getElementById('div_temporada');
let d_fact_conv = document.getElementById('div_fact_conv');
let d_calc = document.getElementById('div_calc');


let doc_maridaje = document.getElementById('maridaje');
doc_maridaje.addEventListener('click', () => {
    event.preventDefault();

    if (d_mar.hidden === true) {
        d_mar.hidden = false;
        d_temp.hidden = true;
        d_fact_conv.hidden = true;
        d_calc.hidden = true;
    }
})

let doc_temporada = document.getElementById('temporada');
doc_temporada.addEventListener('click', () => {
    event.preventDefault();

    if (d_temp.hidden === true) {
        d_temp.hidden = false;
        d_mar.hidden = true;
        d_fact_conv.hidden = true;
        d_calc.hidden = true;
    }
})

let doc_fact_conv = document.getElementById('fact_conv');
doc_fact_conv.addEventListener('click', () => {
    event.preventDefault();

    if (d_fact_conv.hidden === true) {
        d_fact_conv.hidden = false;
        d_temp.hidden = true;
        d_mar.hidden = true;
        d_calc.hidden = true;
    }
})

let doc_calculadora = document.getElementById('calc');
doc_calculadora.addEventListener('click', () => {
    event.preventDefault();
    if (d_calc.hidden === true) {
        d_calc.hidden = false;
        d_fact_conv.hidden = true;
        d_temp.hidden = true;
        d_mar.hidden = true;
    }
})

