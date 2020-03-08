
let id_capes = ["vlt_md", "vlt_smp", "vlt_dbl"];
let id_resultats = ["rslt_manteg", "rslt_massa", "rslt_total"];
let in_capas = [0, 0, 0]; // medias simples, dobles
let out_capas = [0, 0, 0]; // mantega, massa, totals

let boto_calc_capes = document.getElementById('btn_calc_capes');
boto_calc_capes.addEventListener('click', () => {
    event.preventDefault();

    in_capas = guardar_inputs(id_capes);

    print_result_capes(id_resultats, calcular_capes(in_capas));
})

function guardar_inputs(id) {
    let in_capas = [0, 0, 0];

    for (let i = 0; i < 3; i++) {
        in_capas[i] = document.getElementById(id[i]).value;
    }

    return in_capas;
}

function calcular_capes(n_voltes) {
    let totals = 3; // el mínim són 3, 1 de mantega + 2 masa
    let n_capes = [0, 0, 0];

    for (let i = 0; i < 3; i++) // 3 = med. vlta, vlta. simp., vlta. dob.
    {
        for (let j = 0; j < n_voltes[i]; j++) {
            totals = (totals * (i + 2)) - (1 + i);
        }
    }

    let disc = 2;
    for (let i = 0; i < 3; i++) { // mantega( = totals-2), massa( = totals-1), totals
        n_capes[i] = (totals - disc);
        disc--;
    }
    return n_capes;
}

function print_result_capes(id, valors) {
    for (let i = 0; i < 3; i++) {
        document.getElementById(id[i]).innerText = valors[i];
    }
}