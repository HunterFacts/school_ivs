var ch = 1;
var idValue = 0;
$(document).ready(function(){
    $('.modal').modal({
      onCloseEnd: function(){
          $('#number').val("");
          $('#supply_date').val("");
          $('#comment').val("");
          $('#invoice_date').val("");
          $("#checker").prop("checked", false);
          $("#addBtn").html("Добавить");
          idValue = 0;
      }
    });
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
    setTimeout(function tick() {
      if (ch == 1){
        $('body').css('background-image', 'url("img/background.png")');
        ch = 2;
      }
      else if (ch == 2){
        $('body').css('background-image', 'url("img/background68.png")');
        ch == 1;
      }
    }, 30000);
    $.getJSON('http://localhost:3000/inv?_limit=10',
    function(data) {
      $.each(data, function(key,value) {
        $('#table-main tbody').append(
          '<tr id="data_'+value.id+'">'
              +'<td>'+value.create+'</td>'
              +'<td>'+value.number+'</td>'
              +'<td>'+value.supply+'</td>'
              +'<td>'+value.comment+'</td>'
            +'<td style="width: 300px;">'
              +'<a class="waves-effect waves-light btn modal-trigger" href="#modal-create" onclick="Edit ('+value.id+');" data_id="'+value.id+'"><i class="material-icons left">create</i>Изменить</a>'
              +'<a class="waves-effect waves-light btn" onclick="Delete ('+value.id+');" data_id="'+value.id+'"><i class="material-icons left">clear</i>Удалить</a>'
            +'</td>'
          +'</tr>'
        )
      });
      $('#every-btn').html('<a class="waves-effect waves-light btn" onclick="EveryBtn(2)"><i class="material-icons left">add_circle_outline</i>Еще загрузить</a>');
    });
});

function EveryBtn (id){
  $.getJSON('http://localhost:3000/inv?_limit=10&_page='+id,
  function(data) {
    $.each(data, function(key,value) {
      $('#table-main tbody').append(
        '<tr id="data_'+value.id+'">'
            +'<td>'+value.create+'</td>'
            +'<td>'+value.number+'</td>'
            +'<td>'+value.supply+'</td>'
            +'<td>'+value.comment+'</td>'
          +'<td style="width: 300px;">'
            +'<a class="waves-effect waves-light btn modal-trigger" href="#modal-create" onclick="Edit ('+value.id+');" data_id="'+value.id+'"><i class="material-icons left">create</i>Изменить</a>'
            +'<a class="waves-effect waves-light btn" onclick="Delete ('+value.id+');" data_id="'+value.id+'"><i class="material-icons left">clear</i>Удалить</a>'
          +'</td>'
        +'</tr>'
      )
    });
    id=id+1;
    $('#every-btn').html('<a class="waves-effect waves-light btn" onclick="EveryBtn('+id+')"><i class="material-icons left">add_circle_outline</i>Еще загрузить</a>');
  });
}
function htmlEscape(str) {
  return String(str)
          .replace(/&/g, '&amp;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
}
function CreateString(){
  var number = htmlEscape($('#number').val());
  var invoice = htmlEscape($('#invoice_date').val());
  var supply_date = htmlEscape($('#supply_date').val());
  var comment = htmlEscape($('#comment').val());

  if (number != "" || number != null){
    if (invoice != "" || invoice != null){
      if (supply_date != "" || supply_date != null){
        if (comment != "" || comment != null){
          if ($("#checker").prop("checked")){
            $.ajax({
              url: "http://localhost:3000/inv/" + idValue,
              type: "PATCH",
              data:
              {
                "create": invoice,
                "number": number,
                "supply": supply_date,
                "comment": comment
              },

            });
            $("#data_"+idValue+" td:nth-child(2)").html($('#number').val());
            $("#data_"+idValue+" td:nth-child(1)").html($('#invoice_date').val());
            $("#data_"+idValue+" td:nth-child(3)").html($('#supply_date').val());
            $("#data_"+idValue+" td:nth-child(4)").html($('#comment').val());
            idValue = 0;
            $('#number').val("");
            $('#supply_date').val("");
            $('#comment').val("");
            $('#invoice_date').val("");
            $("#checker").prop("checked", false);
            $("#addBtn").html("Добавить");
          }
          else {
            $.post('http://localhost:3000/inv',
                {
                  "create": invoice,
                  "number": number,
                  "supply": supply_date,
                  "comment": comment
                }
            )
          }
        }
        else {
          M.toast({html: 'Введите комментарий'});
        }
      }
      else {
        M.toast({html: 'Введите дату'});
      }
    }
    else {
      M.toast({html: 'Введите дату'});
    }
  }
  else {
    M.toast({html: 'Введите номер'});
  }
}

function Edit (editId){
  if (editId != ""){
    idValue = editId;
    $('#number-l').addClass('active');
    $('#invoice_date-l').addClass('active');
    $('#supply_date-l').addClass('active');
    $('#comment-l').addClass('active');
    $('#number').val($("#data_"+editId+" td:nth-child(2)").text());
    $('#invoice_date').val($("#data_"+editId+" td:nth-child(1)").text());
    $('#supply_date').val($("#data_"+editId+" td:nth-child(3)").text());
    $('#comment').val($("#data_"+editId+" td:nth-child(4)").text());
    $("#addBtn").html("Изменить");
    $("#checker").prop("checked", true);
  }
}

function Delete (deleteId){
  $.ajax({
    url: "http://localhost:3000/inv/" + deleteId,
    type: "DELETE"
  });
  $("#data_"+deleteId).hide();
}
