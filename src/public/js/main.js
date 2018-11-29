function random(min, max) {
  return Math.floor(Math.random()*((max+1) - min) + min);
}

$(function () {
  const socket = io();

  const notificationSound = [new Audio("../assets/audio/roblox.mp3"), new Audio("../assets/audio/minecraft.mp3")];
  // obtaining DOM elements from the interface
  const $messageForm = $("#message-form")
  const $messageBox  = $("#message")
  const $chat        = $("#chat")
  const $users     = $("#usernames")
  let $imageBtn      = $("#image-send")
  // obtaining DOM elements from the nickname form
  const $nickForm  = $("#nickForm")
  const $nickError = $("#nickError")
  const $nickname  = $("#nickname")

  $nickForm.submit((e) => {
    e.preventDefault();
    socket.emit("new user", $nickname.val(), (data) => {
      if(data){
        $("#nickWrap").hide()
        $("#contentWrap").show()
      } else {
        alert("Nombre de usuario ocupado")
      }
    })
  })

  // operationals variables
  let sentMessage = $messageBox.val();
  let flag = false;
  // events
  $messageForm.submit((e) => {
    e.preventDefault();
    if($messageBox.val() !== ""){
      let protocol = $messageBox.val().split(":")[0]
      if(flag === true && (protocol === "http" || protocol === "data" || protocol === "https")){
        sentMessage = "<img src='" + $messageBox.val() +"' />"
      }
      else {
        sentMessage = $messageBox.val();
      }
      socket.emit("send message", sentMessage)
      $messageBox.val("")
      // notificationSound[1].play()
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
    // notificationSound[1].play()
    $chat.append(
      `<div class="row">
        <div style="padding: 0" class="col-lg-1 col-1">
          <img class="avatar" src="http://assets.stickpng.com/thumbs/588359a32c9eb99faafea8bc.png" width="100%" />
        </div>
        <div class="col-lg-11 col-11">
          <p class="single-message">${data}</p>
        </div>
      </div>`
    )
  })

  socket.on("user join", (nickname) => {
    $chat.append(`
    <div class="row"><div class="col text-center my-1"><em>${nickname} ingresó a la conversacion</em></div></div>
    `)
  })

  socket.on("user left", (nickname) => {
    $chat.append(`
    <div class="row"><div class="col text-center my-1"><em>${nickname} abandonó la conversacion</em></div></div>
    `)
  })
})