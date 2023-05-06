// --------------CURRENT TIME----------------
function updateTime() {
  var now = new Date();
  var timeSpan = document.getElementById("current-time");
  timeSpan.innerHTML = now.toLocaleTimeString();
}
setInterval(updateTime, 1000); // update every second

//--------------HIDING THE INPUT BOX AND SUBMIT BUTTON------------
function handleClick() {
  const inputBox = document.getElementById("input-box");
  const displayText = document.getElementById("display-text");
  const enterButton = document.getElementById("enter-button");
  const inputValue = inputBox.value;

  displayText.innerText = inputValue;
  displayText.style.display = "block";
  inputBox.style.display = "none";
  enterButton.style.display = "none";
}

//  ------------FINDING THE TIME UNTIL SUNSET--------------

function updateTimeDiff() {
  // Get the current time
  const now = new Date();

  // Define the sunset time (replace with your own variable)
  const sunsetTime = new Date("2023-05-05T21:23:00");

  // Calculate the difference between the current time and sunset time in milliseconds
  const diffInMillis = sunsetTime - now;

  // Convert the difference to hours, minutes, and seconds
  const diffInHours = Math.floor(diffInMillis / (1000 * 60 * 60));
  const diffInMinutes = Math.floor((diffInMillis % (1000 * 60 * 60)) / (1000 * 60));
  const diffInSeconds = Math.floor((diffInMillis % (1000 * 60)) / 1000);

  // Format the time difference as "h:mm:ss"
  const formattedTimeDiff = `${diffInHours}:${diffInMinutes.toString().padStart(2, "0")}:${diffInSeconds.toString().padStart(2, "0")}`;

  // Get the h2 tag by its ID
  const timeDiffTag = document.getElementById("time-diff");

  // Set the innerHTML of the h2 tag to display the formatted time difference
  timeDiffTag.innerHTML = `${formattedTimeDiff}`;
}

// Call updateTimeDiff() immediately to update the time difference when the page loads
updateTimeDiff();

// Call updateTimeDiff() every second to update the time difference continuously
setInterval(updateTimeDiff, 1000);

//----------MAN ON BIKE-----------
const biker = document.getElementById('biker');

function setBikerPosition() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const sunrise = new Date();
  sunrise.setHours(04, 45, 00); // set sunrise time to 4:45 AM
  const sunset = new Date();
  sunset.setHours(21, 23, 00); // set sunset time to 9:23 PM

  if (date < sunrise || date > sunset) {
    // hide the biker outside sunrise and sunset hours
    biker.style.display = 'none';
  } else {
    // show the biker during sunrise and sunset hours
    biker.style.display = 'block';
    const totalMinutes = (hours - 4) * 60 + (minutes - 45) ; // calculate the total minutes elapsed since 4:00 AM
    const position = (totalMinutes / (15 * 60 + 38)) * 95; // calculate the position of the biker based on the elapsed time
    biker.style.left = `${position}%`;
  }
}

setBikerPosition(); // call the function once at the beginning to set the initial position of the biker

setInterval(setBikerPosition, 60000); // update the position of the biker every minute
