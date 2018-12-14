function scrollBotom() {
  $('#messageBox').animate({
    scrollTop: $('#messageBox')[0].scrollHeight}, "slow");
}


// obtaining DOM elements from the interface
const $messageForm = $("#message-form");
const $messageBox = $("#message");
const $chat = $("#chat");
const $users = $("#usernames");
let $imageBtn = $("#image-send");
const root = document.documentElement;
let sentMessage = $messageBox.val();
let flag = false;

// DEBUGGING
let user =  JSON.parse(localStorage.getItem('user'));
// alert(`Welcome ${user.username}!`);

// SOCKET 
let socket = io();
socket.username = user.username;
socket.avatar = user.avatar;

socket.on('new message', (data) => {
  if(data.username !== socket.username){
    $chat.append(`
      <div class="row my-1" id="received-msg-${data.username}">
        <div class="col-1" style="padding: 0">
          <img class="rounded-circle avatar" src="${data.avatar}">
        </div>
        <div class="col-11">
          <em class="d-block" style="font-size: 11px">@${data.username}</em>
          <p class="single-message" data-toggle="tooltip" data-placement="left" title="${moment().format('lll')}">${data.message}</p>
        </div>
      </div>
    `)
  } else if(data.username == socket.username) {
    $chat.append(`
      <div class="row my-1" id="received-msg-${data.username}"> 
        <div class="col-11">
          <p style="float: right" class="single-message" data-toggle="tooltip" data-placement="right" title="${moment().format('lll')}">${data.message}</p>
        </div>
        <div class="col-1" style="padding: 0">
          <img class="rounded-circle avatar" src="${data.avatar}">
        </div>
      </div>
    `)
  }
  scrollBotom();
})

// EVENTS
$messageForm.submit( function(event) {
  event.preventDefault();
  if($messageBox.val() !== ''){
    socket.emit("send message",{
      username: socket.username,
      avatar: socket.avatar,
      message: $messageBox.val()
    })
  }
  $messageBox.val("");
  scrollBotom();
});