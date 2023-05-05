// Current time
function updateTime() {
  var now = new Date();
  var timeSpan = document.getElementById("current-time");
  timeSpan.innerHTML = now.toLocaleTimeString();
}
setInterval(updateTime, 1000); // update every second
