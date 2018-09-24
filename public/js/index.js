var socket = io();

socket.on('connect', () => {
  console.log('connected to server');
})

socket.on('disconnect', () => {
  console.log('disconnected from server');
})

socket.on('newMessage', function(message) {
  console.log('newMessage', message);
  var li = $('<li></li>')
  li.text(`${message.from}: ${message.text}`)

  $('#messages').append(li)
})

socket.on('newLocationMessage', function (message){
  console.log(message);
  var li = $('<li></li>')
  var a = $('<a target="_Blank">My current location</a>')
  li.text(`${message.from}: `)
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li)
})

$('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from:'User',
    text: jQuery('[name=message]').val()
  }, function() {

  })
})

var locationButton = $('#send-location');

locationButton.on('click', function () {
  if(!navigator.geolocation){
      return alert('You are not using geolocation')
  }
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    })
  }, function (){
    alert('Unable to fetch location')
  })

});
