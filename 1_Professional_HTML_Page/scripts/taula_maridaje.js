
function crear_taula_maridaje() {
    let taula = document.createElement("table");
    taula.setAttribute("id", "taula_maridaje");
    taula.setAttribute("class", "taula");
    document.getElementById("div_maridaje").appendChild(taula);
}

// Pintar titols de la taula
function pintar_titols_maridaje() {
    let titols = ['Albaricoque', 'Arándano', 'Calabaza', 'Cereza', 'Ciruela', 'Ciruela damascena', 'Ciruela Mirabel',
        'Coco', 'Dátil', 'Frambuesa', 'Fresa', 'Fruta pasión', 'Grosella negra', 'Grosella roja', 'Higo', 'Kiwi',
        'Kumqat', 'Lichi',];

    let _tr = document.createElement("tr");
    _tr.setAttribute("id", "titols_maridaje");
    document.getElementById("taula_maridaje").appendChild(_tr);

    for (let i = 0; i < titols.length; i++) {
        let _th = document.createElement("th");
        let contingut = document.createTextNode(titols[i]);
        _th.appendChild(contingut);
        document.getElementById("titols_maridaje").appendChild(_th);
    }
}

// Pintar contingut de la taula
function pintar_files_maridaje() {

    let dades_maridaje = [
        ['Albahaca', 'x', ' ', ' ', ' ', 'x', ' ', ' ', ' ', ' ', 'x', 'x', ' ', ' ', 'x', ' ', ' ', ' ',],
        ['Anís estrellado', ' ', 'x', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'x', ' ', ' ', ' ', 'x', ' ',],
        ['Anís verde', '', '', '', '', '', '', '', '', '', '', '', '', 'x', '', '', '', ''],
        ['Azafrán', 'x', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['Cardamomo', '', 'x', '', '', '', '', '', '', 'x', '', '', '', '', 'x', '', '', ''],
        ['Cebolla', '', '', '', '', '', '', '', '', 'x', '', '', '', '', '', '', '', ''],
        ['Chalote', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        ['Cilantro', '', 'x', '', '', '', '', '', 'x', 'x', '', '', '', '', '', '', '', ''],
        ['Cinco especias', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'x', '', ''],
        ['Citronela', '', '', 'x', '', '', '', 'x', '', '', '', '', '', '', '', '', '', 'x'],
        ['Clavos', 'x', '', '', '', 'x', 'x', '', '', '', '', '', '', '', 'x', '', '', ''],
        ['Comino', 'x', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ];

    for (let j = 0; j < dades_maridaje.length; j++) {

        let _tr = document.createElement("tr");
        _tr.setAttribute("class", "tr_taules");
        document.getElementById("taula_maridaje").appendChild(_tr);

        for (let i = 0; i < dades_maridaje[0].length; i++) {
            let _td = document.createElement("td");
            let contingut = document.createTextNode(dades_maridaje[j][i]);
            _td.appendChild(contingut);
            _tr.appendChild(_td);
            //document.getElementsByClassName("tr_taules").appendChild(_td);
        }
    }
}
