var ch = 1;
var idValue = "0";
$(document).ready(function(){
    $('select').formSelect();
    $('.modal').modal({
      onCloseEnd: function(){
          $('#number').val("");
          $('#supply_date').val("");
          $('#comment').val("");
          $('#invoice_date').val("");
          $("#checker").prop("checked", false);
          $("#addBtn").html("Добавить");
          idValue = "0";
          M.toast({html: 'Данные с формы очищены'});
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
    $.getJSON('https://my-cool-project-mlukanin.herokuapp.com/posts?_limit=10',
    function(data) {
      $.each(data, function(key,value) {
        $('#table-main tbody').append(
          '<tr id="data_'+value.id+'">'
              +'<td>'+value.create+'</td>'
              +'<td>'+value.number+'</td>'
              +'<td>'+value.supply+'</td>'
              +'<td>'+value.comment+'</td>'
            +'<td style="width: 300px;">'
              +'<a class="waves-effect waves-light btn modal-trigger" href="#modal-create" onclick="Edit (\''+value.id+'\');" data_id="'+value.id+'"><i class="material-icons left">create</i>Изменить</a>'
              +'<a class="waves-effect waves-light btn" onclick="Delete (\''+value.id+'\');" data_id="'+value.id+'"><i class="material-icons left">clear</i>Удалить</a>'
            +'</td>'
          +'</tr>'
        )
      });
      $('#every-btn').html('<a class="waves-effect waves-light btn" onclick="EveryBtn(2)"><i class="material-icons left">add_circle_outline</i>Еще загрузить</a>');
    });
});

function EveryBtn (id){
  $.getJSON('https://my-cool-project-mlukanin.herokuapp.com/posts?_limit=10&_page='+id,
  function(data) {
    $.each(data, function(key,value) {
      $('#table-main tbody').append(
        '<tr id="data_'+value.id+'">'
            +'<td>'+value.create+'</td>'
            +'<td>'+value.number+'</td>'
            +'<td>'+value.supply+'</td>'
            +'<td>'+value.comment+'</td>'
          +'<td style="width: 300px;">'
            +'<a class="waves-effect waves-light btn modal-trigger" href="#modal-create" onclick="Edit (\''+value.id+'\');" data_id="'+value.id+'"><i class="material-icons left">create</i>Изменить</a>'
            +'<a class="waves-effect waves-light btn" onclick="Delete (\''+value.id+'\');" data_id="'+value.id+'"><i class="material-icons left">clear</i>Удалить</a>'
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

  if (number != ""){
    if (invoice != ""){
      if (supply_date != ""){
        if (comment != ""){
          if ($("#checker").prop("checked")){
            $.ajax({
              url: "https://my-cool-project-mlukanin.herokuapp.com/posts/" + idValue,
              type: "PATCH",
              data:
              {
                "create": invoice,
                "number": number,
                "supply": supply_date,
                "comment": comment
              },
              success:function (data){
                M.toast({html: 'Запись обновлена'});
                $('.modal').modal('close');
              }

            });
          }
          else {
            $.post('https://my-cool-project-mlukanin.herokuapp.com/posts',
                {
                  "create": invoice,
                  "number": number,
                  "supply": supply_date,
                  "comment": comment
                },
                function (data){
                  M.toast({html: 'Запись добавлена'});
                  $('.modal').modal('close');
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
    url: "https://my-cool-project-mlukanin.herokuapp.com/posts/" + deleteId,
    type: "DELETE",
    success: function (data){
      M.toast({html: 'Запись удалена'});
      $("#data_"+deleteId).hide();
    }
  });

}

function Reverse (){
  var searchText = htmlEscape($('#search').val());
  var searchId = htmlEscape($('#search-id').val());
  var searchFilter = htmlEscape($('#filter').val());
  var searchAsc = htmlEscape($('#asc').val());
  var url = "_sort=";
  if (searchFilter == 1){
    url = url + "id";
  }
  else {
    url = url="number";
  }
  if (searchAsc == 1){
    url = url+"&_order=ASC";
  }
  else if (searchAsc == 2){
    url = "";
  }
  if (searchText != ""){
    if (searchId ==2){
      url = url + "&number="+searchText;
    }
    else if (searchId ==3){
      url = url + "&create="+searchText;
    }
    else if (searchId ==4){
      url = url + "&supply="+searchText;
    }
    else if (searchId ==5){
      url = url + "&comment="+searchText;
    }
    else {
      url = url + "&q="+searchText;
    }
  }
  $('#table-main tbody').html("");
  $.getJSON('https://my-cool-project-mlukanin.herokuapp.com/posts?' + url,
  function(data) {
    $.each(data, function(key,value) {
      $('#table-main tbody').append(
        '<tr id="data_'+value.id+'">'
            +'<td>'+value.create+'</td>'
            +'<td>'+value.number+'</td>'
            +'<td>'+value.supply+'</td>'
            +'<td>'+value.comment+'</td>'
          +'<td style="width: 300px;">'
            +'<a class="waves-effect waves-light btn modal-trigger" href="#modal-create" onclick="Edit (\''+value.id+'\');" data_id="'+value.id+'"><i class="material-icons left">create</i>Изменить</a>'
            +'<a class="waves-effect waves-light btn" onclick="Delete (\''+value.id+'\');" data_id="'+value.id+'"><i class="material-icons left">clear</i>Удалить</a>'
          +'</td>'
        +'</tr>'
      )
    });
    $('#every-btn').html('<a class="waves-effect waves-light btn" onclick="EveryBtn(2)"><i class="material-icons left">add_circle_outline</i>Еще загрузить</a>');
  });
}
$('#search').focus(function(){
  $('#search').css("color","#9e9e9e");
});
$('#search').blur(function(){
  $('#search').css("color","white");
});
