function random(min, max) {
  return Math.floor(Math.random()*((max+1) - min) + min);
}

// $(function () {
  const socket = io();

  // obtaining DOM elements from the interface
  const $messageForm = $("#message-form")
  const $messageBox  = $("#message")
  const $chat        = $("#chat")
  const $users       = $("#usernames")
  let $imageBtn      = $("#image-send")  
  
  const root = document.documentElement;

  $("#color-1").click(() => {
    root.style.setProperty("--msg-color","steelblue")
    $("body").css("background-image", "url(https://linux.pictures/content/1-projects/200-solarized-dark-wallpaper/solarized-wallpaper-arch.png)")
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
        message: sentMessage
      })
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
    // if(data.username == personalUsername){
    //   $chat.append(
    //     `<div class="row mb-1 mt-2" style="text-align: right">
    //       <div class="col-12">
    //         <p class="single-message" data-toggle="tooltip" data-placement="left" title="${moment().format('lll')}">${data.message}</p>
    //       </div>
    //     </div>`
    //   )
    // } else{
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
    // }
    
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
// })