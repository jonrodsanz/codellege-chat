let user = {};

$( "#registerForm" ).submit(function( event ) {
  let confirmation = confirm("What a amazing profile picture! Is that yours?");
  if(confirmation){
    user.username = $("#registerForm__username").val();
    user.email = $("#registerForm__email").val();
    user.creationDate = moment().format('MMMM Do YYYY, h:mm:ss a');
    localStorage.setItem('user', JSON.stringify(user));  
  } else{
    event.preventDefault();
  }
});

$("#registerForm__devLanguage").click(function( event ) {
  let $username = $("#registerForm__username").val();
  $.get( `https://api.github.com/users/${$username}`, function( data ) {
    console.log(data);
    if(data == 'undefined'){
      alert("Your user hasn't found");
      $("#registerForm__submit").attr('disabled');
    } else{
      $("#profilePicture").attr('src', data.avatar_url);
      user.avatar = data.avatar_url;
      $("#registerForm__submit").removeAttr('disabled');
    }
  });
})