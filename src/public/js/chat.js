// obtaining DOM elements from the interface
const $messageForm = $("#message-form")
const $messageBox = $("#message")
const $chat = $("#chat")
const $users = $("#usernames")
let $imageBtn = $("#image-send") 
const root = document.documentElement;
let sentMessage = $messageBox.val();
let flag = false;

// DEBUGGING
let user =  JSON.parse(localStorage.getItem('user'));
alert(`Welcome ${user.username}!`);

// SOCKET 
let socket = io();
socket.username = user.username;
socket.on('new message', (data) => {
  
})

// EVENTS
