$(function (){

    var ciudades = $("#selectCiudad");
    var tipos = $("#selectTipo");
    var resultado = $("#resultado");
  

    function Ciudades(){

        $.ajax({
            url: 'php/data.php',
            type: 'POST',
            data: 'tipo=ciudades',
            success: function(data,  jqXHR) {
                ciudades.find('option').remove();
                ciudades.append('<option value="" selected>Elige una ciudad</option>');
                $.each(data, function (id,value){
                    ciudades.append('<option value="'+value+'">'+value+'</option>');

                });
                $('select').material_select();
            },
            error: function(data) {
                console.log('message=:' + data);
            }
        });
    }

    function Tipos(){

        $.ajax({
            url: 'php/data.php',
            type: 'POST',
            data: 'tipo=tipos',
            success: function(data, jqXHR) {
                tipos.find('option').remove();
                tipos.append('<option value="" selected>Elige un tipo</option>');
                $.each(data, function (id,value){
                    tipos.append('<option value="'+value+'">'+value+'</option>');
                });
                $('select').material_select();
            },
            error: function(data) {
                console.log('message=:' + data);
            }
        });
    }


    $("#mostrarTodos").click(function () {
       resultado.find('div').remove();

        $.ajax({
            url: 'php/data.php',
            type: 'POST',
            data: 'tipo=todos',
            success: function(data, jqXHR) {
                $.each(data, function (id,value){
                   var insertar=
                   "<div class='card itemMostrado'>" +
                   "<div class='card-image'  style='width:50%;'><img src='img/home.jpg'/></div>" +
                       "<div class='card-stacked'>" +
                       "<div class='card-content'>" +
                       "<div><strong>Direccion: </strong>"+ value['Direccion'] +"</div>" +
                       "<div><strong>Ciudad: </strong>"+value['Ciudad']+"</div>" +
                       "<div><strong>Telefono: </strong>"+value['Telefono']+"</div>" +
                       "<div><strong>Código postal: </strong>"+value['Codigo_Postal']+"</div>" +
                       "<div><strong>Tipo: </strong>"+value['Tipo']+"</div>" +
                       "<div class='precioTexto'><strong>Precio: </strong>"+value['Precio']+"</div>" +
                       "</div>" +
                       "<div class='card-action' >" +
                       "<a href='#'>Ver mas</a> " +
                       "</div>" +
                       "</div>" +
                    "</div>";
                   resultado.append(insertar);
                });
            },
            error: function(data) {
                console.log('message=:' + data);
            }
        });
    });

    var request;

    $("#formulario").submit(function(event)
    {

        event.preventDefault();
        if (request) {
            request.abort();
        }
        var $form = $(this);
        var $inputs = $form.find("input, select, button, textarea");
        var serializedData = $form.serialize();
        var postForm = { //Fetch form data
            'sCiudad' : $('select[name=ciudad]').val(), //Store name fields value
            'sTipo' : $('select[name=tipo]').val(),
            'sDesde': $('#rangoPrecio').data().from,
            'sHasta': $('#rangoPrecio').data().to,
            'tipo'  : 'filtro'
        };
        $inputs.prop("disabled", true);
        resultado.find('div').remove();
        $.ajax({
            url: 'buscador.php',
            type: 'POST',
            data: postForm,
            success: function(data, jqXHR) {
                $.each(data, function (id,value){
                   var insertar=
                    "<div class='card itemMostrado'>" +
                       "<div class='card-image'  style='width:50%;'><img src='img/home.jpg'/></div>" +
                       "<div class='card-stacked'>" +
                       "<div class='card-content'>" +
                       "<div><strong>Direccion: </strong>"+ value['Direccion'] +"</div>" +
                       "<div><strong>Ciudad: </strong>"+value['Ciudad']+"</div>" +
                       "<div><strong>Telefono: </strong>"+value['Telefono']+"</div>" +
                       "<div><strong>Código postal: </strong>"+value['Codigo_Postal']+"</div>" +
                       "<div><strong>Tipo: </strong>"+value['Tipo']+"</div>" +
                       "<div class='precioTexto'><strong>Precio: </strong>"+value['Precio']+"</div>" +
                       "</div>" +
                       "<div class='card-action'>" +
                       "<a href='#'>Ver mas</a> " +
                       "</div>" +
                       "</div>" +
                    "</div>";
                   resultado.append(insertar);
                });
                $inputs.prop("disabled", false);
            },
            error: function(data) {
                console.log('message=:' + data);
                $inputs.prop("disabled", false);
            }
        });
        $inputs.prop("disabled", false);

    });

    $(function () {
        $('select').material_select();
        Ciudades();
        Tipos();
    });
});



