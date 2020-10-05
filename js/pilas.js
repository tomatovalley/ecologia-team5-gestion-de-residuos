var getValue;
var getAlcaldia;
var getColonia;
var colonias_array = [];
var alcaldia_file;
const header = document.querySelector('header');
const select = document.querySelector('.lista-colonias');


function get_alcaldia() {
    getValue = document.getElementById('select-alcaldia').selectedOptions[0].value;
    getAlcaldia = document.getElementById('select-alcaldia').selectedOptions[0].text;
    console.log(getAlcaldia);

    let alcaldia_file = '../JSON/' + getValue + '.json';
    console.log(alcaldia_file);

    let request = new XMLHttpRequest();
    request.open('GET', alcaldia_file);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        alcaldia_info = request.response;
        const alcaldia = JSON.stringify(alcaldia_info); // convert it to an object
        console.log(alcaldia_info[0]['COLONIA']);

        const colonias = get_colonias(alcaldia_info);

        var select = document.getElementById("lista-colonias");
        colonias.map(function(item) {
            var option = document.createElement("option");
            option.value = item;
            option.text = item;
            select.appendChild(option);
            console.log(colonias.length);
        });

    }


    function get_colonias(jsonObject) {
        colonias_array = [];
        remove_all_childnodes(select); //remove colonias from previous search
        for (let i = 0; i < jsonObject.length; i++) {
            colonias_array.push(jsonObject[i]['COLONIA']); //get colonias
        }
        console.log(colonias_array);
        //remove repeated colonias
        colonias_array = [...new Set(colonias_array)];
        console.log(colonias_array);
        return colonias_array;
    }
}

function get_info_by_colonia() {
    getColonia = document.getElementById('lista-colonias').selectedOptions[0].text;
    //console.log(getColonia);
    //console.log(getAlcaldia);


}

function show_data() { // shows places according to previous selection of Alcaldia and Colonia
    console.log(getColonia);
    console.log(getAlcaldia);
    const alcaldia = JSON.stringify(alcaldia_info); // convert it to an object
    //console.log(alcaldia_info[1]['COLONIA']);
    populate_header(getAlcaldia, getColonia);

    //filter data by chosen Colonia

    var selected_colonia_info = alcaldia_info.filter(function(entry) {
        return entry.COLONIA === getColonia;
    });

    show_colonia_info(selected_colonia_info);
}

function remove_all_childnodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function populate_header(getAlcaldia, getColonia) {
    document.getElementById("alcaldia-heading").innerHTML = 'Alcaldía ' + getAlcaldia;
    document.getElementById("colonia-heading").innerHTML = 'Contenedores en la colonia ' + getColonia;
}

function show_colonia_info(jsonObj) {
    var listas = document.getElementById("lista-cont-colonia");
    remove_all_childnodes(listas); //remove directions from previous search

    for (let i = 0; i < jsonObj.length; i++) {
        const contenido = document.createElement('contenido');
        const estatus = document.createElement('p');
        const ubicacion = document.createElement('p');
        const alcaldia = document.createElement('p');
        const colonia = document.createElement('p');
        const cod_pos = document.createElement('p');
        const line_bar = document.createElement('hr');
        estatus.textContent = 'Estatus: ' + jsonObj[i].ESTATUS;
        ubicacion.textContent = 'Ubicación: ' + jsonObj[i].UBICACIÓN;
        alcaldia.textContent = 'Alcaldía: ' + jsonObj[i].ALCALDIA;
        colonia.textContent = 'Colonia: ' + jsonObj[i].COLONIA;
        cod_pos.textContent = 'C. P. : ' + jsonObj[i].CP;

        //console.log(jsonObj[i].ESTATUS);
        contenido.appendChild(estatus);
        contenido.appendChild(ubicacion);
        contenido.appendChild(alcaldia);
        contenido.appendChild(colonia);
        contenido.appendChild(cod_pos);
        contenido.appendChild(line_bar);
        listas.appendChild(contenido);
    }
    window.scrollTo({
        top: 500,
        behavior: "smooth"
    })



}