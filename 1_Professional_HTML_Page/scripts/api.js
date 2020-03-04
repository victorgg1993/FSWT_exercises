function crear_taula(id, clase, qui_penja) {
    let taula = document.createElement("table");
    taula.setAttribute("id", id);
    taula.setAttribute("classe", clase);
    document.getElementById(qui_penja).appendChild(taula);
}

function pintar_titols(id, qui_penja, array_titols) {

    let _tr = document.createElement("tr");
    _tr.setAttribute("id", id);
    document.getElementById(qui_penja).appendChild(_tr);

    for (let i = 0; i < array_titols.length; i++) {
        let _th = document.createElement("th");
        let contingut = document.createTextNode(array_titols[i]);
        _th.appendChild(contingut);
        document.getElementById(id).appendChild(_th);
    }
 }

 function pintar_files(clase, qui_penja, array_2D_dades){

    for (let j = 0; j < array_2D_dades.length; j++) {

        let _tr = document.createElement("tr");
        _tr.setAttribute("class", clase);
        document.getElementById(qui_penja).appendChild(_tr);

        for (let i = 0; i < array_2D_dades[0].length; i++) {
            let _td = document.createElement("td");
            let contingut = document.createTextNode(array_2D_dades[j][i]);
            _td.appendChild(contingut);
            _tr.appendChild(_td);
        }
    }
 }