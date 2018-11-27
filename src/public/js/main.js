$(function () {

  const socket = io();
  
  // obtaining DOM elements from the interface
  const $messageForm = $("#message-form")
  const $messageBox  = $("#message")
  const $chat        = $("#chat")

  // events
  $messageForm.submit((e) => {
    e.preventDefault();
    socket.emit("send message", $messageBox.val())
    $messageBox.val("")
  })

  socket.on("new message", (data) => {
    // $chat.append("&gt " + data + "<br />")
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