function scrollBotom() {
  $('#messageBox').animate({
    scrollTop: $('#messageBox')[0].scrollHeight}, "slow");
}

$(document).ready(scrollBotom());

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
socket.technology = user.technology;

socket.on('new message', (data) => {
  if(data.username !== socket.username){
    $chat.append(`
      <div class="row my-1" id="received-msg-${data.username}">
        <div class="col-1" style="padding: 0">
          <img class="rounded-circle avatar" src="${data.avatar}">
        </div>
        <div class="col-10">
          <em class="d-block" style="font-size: 11px">@${data.username}</em>
          <p class="single-message" data-toggle="tooltip" data-placement="left" title="${moment().format('lll')}">${data.message}</p>
        </div>
      </div>
    `)
  } else if(data.username == socket.username) {
    $chat.append(`
      <div class="row my-2" id="received-msg-${data.username}"> 
        <div class="col-1"></div>
        <div class="col-10">
          <p style="float: right" class="single-message blue-background" data-toggle="tooltip" data-placement="right" title="${moment().format('lll')}">${data.message}</p>
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

$(`.${socket.username}_msg`).css("float", "right");
$(`.${socket.username}_msg`).css("background-color", "#073045")
$(`.${socket.username}_img`).css("order", "3");
$(`.${socket.username}_wrapper`).css("order", "2");
$(`.${socket.username}_oculted`).css("order", "1");
$(`.${socket.username}_row`).removeClass("mb-3");
$(`.${socket.username}_name`).remove()


let repos = $("#github-repos");
let userGithub = $("#github-user");

$(".user-github").click(function(event) {
  repos.html('');
  event.preventDefault();
  let $selectedUser = $(event.target).attr('id');
  $selectedUser = $selectedUser ? $selectedUser: socket.username;
  console.log($selectedUser);
  $.get(`https://api.github.com/users/${$selectedUser}/repos`, function( data ) {
    userGithub.attr('src', data[0].owner.avatar_url)
    data.forEach((repo) => {
      repos.append(`
        <div class="mb-2">
          <a href='${repo.html_url}' target="_blank">${repo.name} (${repo.language ? repo.language: 'General'})</a>
          <em class="d-block">${repo.description ? repo.description:''}</em>
        </div>
      `)
    })
  });
})

let room = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];

if(socket.technology !== room){
  $("#msg-input").css('visibility', 'hidden')
} else if (socket.technology === room){
  $("#msg-input").css('visibility', 'true')
}