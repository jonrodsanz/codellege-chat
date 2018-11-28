$(function () {

  const socket = io();
  
  // obtaining DOM elements from the interface
  const $messageForm = $("#message-form")
  const $messageBox  = $("#message")
  const $chat        = $("#chat")
  let $imageBtn      = $("#image-send")

  let sentMessage = $messageBox.val();
  let flag = false;

  // events
  $messageForm.submit((e) => {
    e.preventDefault();
    if($messageBox.val() !== ""){
      let protocol = $messageBox.val().split(":")[0]
      if(flag === true && protocol === "http" || protocol === "data" || protocol === "https"){
        sentMessage = "<img src='" + $messageBox.val() +"' />"
      }
      else {
        sentMessage = $messageBox.val();
      }
      socket.emit("send message", sentMessage)
      $messageBox.val("")
    }
  })

  $imageBtn.click(() => {
    if(!flag){
      flag = true
      $imageBtn.removeClass("btn-dark").addClass("btn-success")
    } else {
      flag = false
      $imageBtn.removeClass("btn-success").addClass("btn-dark")
    }
  })

  socket.on("new message", (data) => {
    $chat.append(
      `<div style="padding: 0" class="col-lg-1 col-1">
        <img src="http://assets.stickpng.com/thumbs/588359a32c9eb99faafea8bc.png" width="100%" />
       </div>
       <div class="col-lg-11 col-11">
        <p class="single-message">${data}</p>
       </div>`
    )
  })
})