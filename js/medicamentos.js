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

    let singrem_file = '../JSON/singrem_cdmx.json';
    console.log(alcaldia_file);

    let request = new XMLHttpRequest();
    request.open('GET', singrem_file);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        singrem_info = request.response;
        const cdmx_singrem = JSON.stringify(singrem_info); // convert it to an object
        console.log(singrem_info[0]['Alcaldia']);

        //filter data by chosen Alcaldia

        var selected_alcaldia_info = singrem_info.filter(function(entry) {
            return entry.Alcaldia === getAlcaldia.toUpperCase();
        });
        console.log(selected_alcaldia_info);

        const colonias = get_colonias(selected_alcaldia_info);

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
            colonias_array.push(jsonObject[i]['Colonia']); //get colonias
        }
        console.log(colonias_array);
        //remove repeated colonias
        colonias_array = [...new Set(colonias_array)];
        colonias_array.sort();
        colonias_array.unshift('Elige...');
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
    const alcaldia = JSON.stringify(singrem_info); // convert it to an object
    //console.log(alcaldia_info[1]['COLONIA']);
    populate_header(getAlcaldia, getColonia);

    //filter data by chosen Colonia

    var selected_colonia_info = singrem_info.filter(function(entry) {
        return entry.Colonia === getColonia;
    });
    console.log(selected_colonia_info);

    show_colonia_info(selected_colonia_info);
}

function remove_all_childnodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function populate_header(getAlcaldia, getColonia) {
    document.getElementById("alcaldia-heading").innerHTML = 'Alcaldía ' + getAlcaldia;
    document.getElementById("colonia-heading").innerHTML = 'Contenedores SINGREM en la colonia ' + getColonia;
}

function show_colonia_info(jsonObj) {
    var listas = document.getElementById("lista-cont-colonia");
    remove_all_childnodes(listas); //remove directions from previous search

    for (let i = 0; i < jsonObj.length; i++) {
        const contenido = document.createElement('contenido');
        const nombre = document.createElement('p');
        const direccion = document.createElement('p');
        const colonia = document.createElement('p');
        const alcaldia = document.createElement('p');
        const estado = document.createElement('p');

        //const cod_pos = document.createElement('p');
        const line_bar = document.createElement('hr');
        nombre.textContent = 'Establecimiento: ' + jsonObj[i].Nombre + ' ' + jsonObj[i].Establecimiento;
        direccion.textContent = 'Ubicación: ' + jsonObj[i].Direccion;
        colonia.textContent = 'Colonia: ' + jsonObj[i].Colonia;
        alcaldia.textContent = 'Alcaldía/Municipio: ' + jsonObj[i].Alcaldia;
        estado.textContent = 'Estado: ' + jsonObj[i].Estado;
        //cod_pos.textContent = 'C. P. : ' + jsonObj[i].CP;

        contenido.appendChild(nombre);
        contenido.appendChild(direccion);
        contenido.appendChild(colonia);
        contenido.appendChild(alcaldia);
        contenido.appendChild(estado);
        //contenido.appendChild(cod_pos);
        contenido.appendChild(line_bar);
        listas.appendChild(contenido);
    }
    window.scrollTo({
        top: 500,
        behavior: "smooth"
    })



}