$(document).ready(function(){
    $('.modal').modal();
    $('.datepicker').datepicker({
      format: 'dd-mm-yyyy',
      i18n: {
        cancel: 'Отмена',
        weekdaysShort:
          [
            "Вс",
            "Пн",
            "Вт",
            "Ср",
            "Чт",
            "Пт",
            "Сб"
          ]
        }
    });
    $.getJSON('http://localhost:3000/inv?_limit=5',
    function(data) {
      $.each(data, function(key,value) {
        $('#table-main tbody').append(
          '<tr>'
              +'<td>'+value.create+'</td>'
              +'<td>'+value.number+'</td>'
              +'<td>'+value.supply+'</td>'
              +'<td>'+value.comment+'</td>'
            +'<td style="width: 300px;">'
              +'<a class="waves-effect waves-light btn" data_id="'+key+'"><i class="material-icons left">create</i>Изменить '+key+'</a>'
              +'<a class="waves-effect waves-light btn" data_id="'+key+'"><i class="material-icons left">clear</i>Удалить</a>'
            +'</td>'
          +'</tr>'
        )
      });
      $('#every-btn').html('<a class="waves-effect waves-light btn" onclick="EveryBtn(2)"><i class="material-icons left">add_circle_outline</i>Еще загрузить</a>');
    });
});

function EveryBtn (id){
  $.getJSON('http://localhost:3000/inv?_limit=5&_page='+id,
  function(data) {
    $.each(data, function(key,value) {
      $('#table-main tbody').append(
        '<tr>'
            +'<td>'+value.create+'</td>'
            +'<td>'+value.number+'</td>'
            +'<td>'+value.supply+'</td>'
            +'<td>'+value.comment+'</td>'
          +'<td style="width: 300px;">'
            +'<a class="waves-effect waves-light btn" data_id="'+value.id+'"><i class="material-icons left">create</i>Изменить '+value.id+'</a>'
            +'<a class="waves-effect waves-light btn" data_id="'+value.id+'"><i class="material-icons left">clear</i>Удалить</a>'
          +'</td>'
        +'</tr>'
      )
    });
    id=id+1;
    $('#every-btn').html('<a class="waves-effect waves-light btn" onclick="EveryBtn('+id+')"><i class="material-icons left">add_circle_outline</i>Еще загрузить</a>');
  });

}
