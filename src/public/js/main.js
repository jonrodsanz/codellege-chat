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
  const $users       = $("#usernames")
  let $imageBtn      = $("#image-send")
  // obtaining DOM elements from the nickname form
  const $nickForm  = $("#nickForm")
  // const $nickError = $("#nickError")
  const $nickname  = $("#nickname")

  var personalUsername;
  var avatarSelection = $("input[name='avatar']");
  var personalAvatar;

  $nickForm.submit((e) => {
    e.preventDefault();
    personalUsername = $nickname.val()
    personalAvatar = avatarSelection.filter(":checked").val();
    socket.emit("new user", personalUsername, (data) => {
      if(data){
        $("#nickWrap").hide()
        $("#contentWrap").show()
      } else {
        alert("Elija otro nombre de usuario")
      }
    })
  })

  // Leer artículo de medium para modificar variables de CSS
  // Reestructurar JS y CSS
  
  const root = document.documentElement;

  $("#color-1").click(() => {
    root.style.setProperty("--msg-color","steelblue")
    $("body").css("background-image", "url(https://i.pinimg.com/originals/e7/54/ac/e754ac49620ebfb36c4cb18fd1cdd512.jpg)")
  })

  $("#color-2").click(() => {
    root.style.setProperty("--msg-color","#dc3545")
    $("body").css("background-image", "url(https://i.imgur.com/H0ZWBv8.jpg)")
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
      socket.emit("send message", {
        message: sentMessage,
        avatar: personalAvatar
      })
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
    if(data.username == personalUsername){
      $chat.append(
        `<div class="row mb-1 mt-2" style="text-align: right">
          <div class="col-12">
            <p class="single-message" data-toggle="tooltip" data-placement="left" title="${moment().format('lll')}">${data.message}</p>
          </div>
        </div>`
      )
      // <div style="padding: 0" class="col-lg-1 col-1">
      //       <img class="avatar" src="http://assets.stickpng.com/thumbs/588359a32c9eb99faafea8bc.png" width="100%" />
      //     </div>
    } else{
      $chat.append(
        `<div class="row my-1">
          <div style="padding: 0" class="col-lg-1 col-1">
            <img class="avatar" src="${data.avatar ? data.avatar: 'http://assets.stickpng.com/thumbs/588359a32c9eb99faafea8bc.png'}" width="100%" />
          </div>
          <div class="col-lg-11 col-11">
            <em class="d-block" style="font-size: 11px">${data.username}</em>
            <p class="single-message" data-toggle="tooltip" data-placement="left" title="${moment().format('lll')}">${data.message}</p>
          </div>
        </div>`
      )
    }
    // $chat.animate({
    //   scrollTop: document.querySelectorAll(".single-message")[document.querySelectorAll(".single-message").length -1].offset().top
    // }, 1000);
    
  })

  socket.on("user join", (data) => {
    $chat.append(`
    <div class="row"><div class="col text-center my-2"><em>${data} ingresó a la conversacion</em></div></div>
    `)
    $users.append(`
    <div class="row my-2" id="${data}">
      <em>${data}</em>
    </div>
    `)
  })

  socket.on("user left", (nickname) => {
    if(nickname !== null){
      $chat.append(`
      <div class="row"><div class="col text-center my-2"><em>${nickname} abandonó la conversacion</em></div></div>
      `)
      $(`#${nickname}`).remove();
    }
  })
})