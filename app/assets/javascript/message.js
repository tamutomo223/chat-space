$(function() {
  function buildHTML(message){
    let image = ( message.image ) ? `<img class= "lower-message__image" src=${message.image} >` : "";
    let html = `<div class="message", data-message-id="${message.id}">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                      ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                      ${message.date}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                      ${message.content}
                      </p>
                      ${image}
                    </div>
                  </div> `
  $('.messages').append(html);
  }

  function scroll() {
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
  };

  $('.new_message').on('submit', function(e){
  e.preventDefault();
  let formData = new FormData(this);
  let url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
  .done(function(data){
    buildHTML(data);    
    scroll();
    $('form')[0].reset();
  })
  .fail(function(){
    alert('error');
  });
  return false;
  });
  

  let reloadMessages = function () {
    
    let last_message_id = $('.message:last').data("message-id");
    let group_id = $(".group").data("group-id");

    $.ajax({
      url: "api/messages",
      type: 'get', 
      dataType: 'json', 
      data: {last_id: last_message_id} 
    })
    .done(function (messages) { 
      let insertHTML = '';
      messages.forEach(function (message) {
        insertHTML = buildHTML(message); 
        $('.messages').append(insertHTML);
      })
      scroll();
    })
    .fail(function () {
      alert('自動更新に失敗しました');
    });
  };
  
  if (window.location.href.match(/\/groups\/\d+\/messages/)){
  setInterval(reloadMessages, 3000);
  };


});
