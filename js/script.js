let speed;
let distance;
let startTime;
let breakTime;
let targetETA;


function storeSpeed() {
  const speedInput = document.getElementById("speedInput").value;
  speed = speedInput;
  // You can manipulate and change the "speed" variable as needed here
  document.getElementById("speedDisplay").textContent = speed + "mph";
}

function storeDistance() {
  const distanceInput = document.getElementById("distanceInput").value;
  distance = distanceInput;
  // You can manipulate and change the "distance" variable as needed here
  document.getElementById("distanceDisplay").textContent = distance + "miles";
}

function storeStartTime() {
  const startTimeInput = document.getElementById("startTimeInput").value;
  startTime = startTimeInput;
  // You can manipulate and change the "startTime" variable as needed here
  document.getElementById("startTimeDisplay").textContent = startTime;
}

function storeBreakTime() {
  const breakTimeInput = document.getElementById("breakTimeInput").value;
  breakTime = breakTimeInput;
  // You can manipulate and change the "startTime" variable as needed here
  document.getElementById("breakTimeDisplay").textContent = breakTime;
}

//--------------CURRENT TIME----------------
function updateTime() {
  var now = new Date();
  var timeSpan = document.getElementById("current-time");
  timeSpan.innerHTML = now.toLocaleTimeString();
}
setInterval(updateTime, 1000); // update every second

// ------ Distance Remaining ------
function storeDistance() {
  var distanceInput = document.getElementById("distanceInput");
  var remainingDistance = 205 - distanceInput.value;
  document.getElementById("remainingDistanceDisplay").textContent = remainingDistance;
}

// Add an event listener to the distance input field
var distanceInput = document.getElementById("distanceInput");
distanceInput.addEventListener("input", storeDistance);


// ----------TIME TO FINISH -------------

function calculateTimeToFinish() {
  const speedInput = parseFloat(document.getElementById("speedInput").value);
  const distanceRemaining = parseFloat(document.getElementById("remainingDistanceDisplay").textContent);
  const breakTimeRemaining = parseFloat(document.getElementById("breakTimeInput").value);

  const timeToFinish = (distanceRemaining / speedInput) * 60; // Time in minutes
  const totalTime = timeToFinish + breakTimeRemaining;

  const hours = Math.floor(totalTime / 60);
  const minutes = Math.floor(totalTime % 60);

  const timeToFinishDisplay = document.getElementById("timeToFinishDisplay");
  timeToFinishDisplay.textContent = hours + "h " + minutes + "m";
}

// Add event listeners
document.getElementById("speedInput").addEventListener("input", calculateTimeToFinish);
document.getElementById("remainingDistanceDisplay").addEventListener("input", calculateTimeToFinish);
document.getElementById("breakTimeInput").addEventListener("input", calculateTimeToFinish);
document.getElementById("startTimeInput").addEventListener("input", calculateTimeToFinish);
document.getElementById("distanceInput").addEventListener("input", calculateTimeToFinish);

//------ Calculating current ETA ------

setInterval(displayCurrentTimePlusTimeToFinish, 1000);

function displayCurrentTimePlusTimeToFinish() {
  const currentTimeElement = document.getElementById("current-time");
  const timeToFinishElement = document.getElementById("timeToFinishDisplay");

  const currentTimeText = currentTimeElement.innerHTML;
  const timeToFinishText = timeToFinishElement.textContent;

  // Extract hours and minutes from timeToFinishText
  const regex = /(\d+)h (\d+)m/; // Updated regex pattern to match the format "Xh Ym"
  const match = timeToFinishText.match(regex);

  if (match) {
    const hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);

    // Create a new Date object and add hours and minutes to it
    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + hours);
    currentTime.setMinutes(currentTime.getMinutes() + minutes);

    // Format the result as a string
    const options = { hour: 'numeric', minute: 'numeric' };
    const currentTimePlusTimeToFinish = currentTime.toLocaleTimeString(undefined, options);

    // Display the result
    document.getElementById("finishTimeDisplay").textContent = currentTimePlusTimeToFinish;
  } else {
    document.getElementById("finishTimeDisplay").textContent = "N/A";
  }
}

// -------- Calculating extra break time allowed -----
setInterval(calculateTimeDifference, 1000);

function calculateTimeDifference() {
  const currentETADisplay = document.getElementById("finishTimeDisplay");
  const currentETA = currentETADisplay.textContent;

  // Validate current ETA format
  const currentETAMatch = currentETA.match(/^(\d{1,2}):(\d{2})$/);
  if (!currentETAMatch) {
    const extraBreakTimeDisplay = document.getElementById("extraBreakTimeDisplay");
    extraBreakTimeDisplay.textContent = "N/A";
    return;
  }

  // Extract hours and minutes from current ETA
  const currentHours = parseInt(currentETAMatch[1]);
  const currentMinutes = parseInt(currentETAMatch[2]);

  // Convert current ETA to minutes
  const currentETAInMinutes = currentHours * 60 + currentMinutes;

  // Convert target ETA ("21:00") to minutes
  const targetETAInMinutes = 21 * 60;

  // Calculate the time difference in minutes
  const timeDifferenceInMinutes = targetETAInMinutes - currentETAInMinutes;

  // Convert the time difference to hours and minutes
  const timeDifferenceHours = Math.floor(timeDifferenceInMinutes / 60);
  const timeDifferenceMinutes = timeDifferenceInMinutes % 60;

  // Update the content of the extraBreakTimeDisplay h2 element with the time difference
  const extraBreakTimeDisplay = document.getElementById("extraBreakTimeDisplay");
  extraBreakTimeDisplay.textContent = timeDifferenceHours + "h " + timeDifferenceMinutes + "m";
}

// ------------ Calculating time amassed --------------------

function calculateTimeAmassed() {
  const currentTime = new Date();
  const startTimeInput = document.getElementById("startTimeInput").value;
  const [startHours, startMinutes] = startTimeInput.split(":");
  const startTime = new Date();
  startTime.setHours(startHours, startMinutes, 0, 0);

  // Calculate the time difference in milliseconds
  const timeDifference = currentTime - startTime;

  // Convert the time difference to hours and minutes
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  // Display the result
  const timeAmassedDisplay = document.getElementById("timeAmassedDisplay");
  timeAmassedDisplay.textContent = hours + " hrs " + minutes + " mins";
}

// Add an event listener to the startTimeInput field
var startTimeInput = document.getElementById("startTimeInput");
startTimeInput.addEventListener("input", calculateTimeAmassed);


// -------------Sunrise-Sunset API-------------------------

const latitude1 = 51.4168969; // Example latitude for Location 1
const longitude1 = 0.808862; // Example longitude for Location 1
const latitude2 = 51.3471927; // Example latitude for Location 2
const longitude2 = -2.9778916; // Example longitude for Location 2

const apiUrl1 = `https://api.sunrise-sunset.org/json?lat=${latitude1}&lng=${longitude1}`;
const apiUrl2 = `https://api.sunrise-sunset.org/json?lat=${latitude2}&lng=${longitude2}`;

// --- SUNRISE ---
fetch(apiUrl1)
  .then(response => response.json())
  .then(data => {
    const sunriseTime = parseTimeString(data.results.sunrise);

    const sunriseElement = document.getElementById('sunrise');
    sunriseElement.textContent = `Sunrise: ${sunriseTime}`;

  })
  .catch(error => {
    console.error('Error:', error);
  });

// --- SUNSET ---
fetch(apiUrl2)
  .then(response => response.json())
  .then(data => {
    const sunsetTime = parseTimeString(data.results.sunset);

    const sunsetElement = document.getElementById('sunset');
    sunsetElement.textContent = `Sunset: ${sunsetTime}`;

  })
  .catch(error => {
    console.error('Error:', error);
  });

function parseTimeString(timeString, use24HourFormat) {
  const time = timeString.split(' ')[0]; // Extract time part without AM/PM
  const [hours, minutes, seconds] = time.split(':');
  const date = new Date();
  if (use24HourFormat) {
    date.setUTCHours(hours, minutes, seconds);
    return date.toISOString().substr(11, 5); // Extract hours and minutes in 24-hour format
  } else {
    date.setUTCHours(hours % 12, minutes, seconds);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}

//  ------------FINDING THE TIME UNTIL SUNSET--------------



//----------MAN ON BIKE-----------
const biker = document.getElementById('biker');

function setBikerPosition() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const sunrise = new Date();
  sunrise.setHours(0o4, 45, 0o0); // set sunrise time to 4:45 AM
  const sunset = new Date();
  sunset.setHours(21, 33, 0o0); // set sunset time to 9:23 PM

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

//---------Second man on bike----------
const biker2 = document.getElementById('biker2');

function updateBiker2Position() {
  const distanceInput2 = document.getElementById("distanceInput").value;
  const bikerContainer = document.getElementById("biker-container");
  const containerWidth = bikerContainer.offsetWidth;
  const maxDistance = 205;
  const position = (distanceInput2 / maxDistance) * containerWidth;
  biker2.style.left = `${position}px`;
}

// Add an event listener to the distance input field
const distanceInput2 = document.getElementById("distanceInput");
distanceInput2.addEventListener("input", updateBiker2Position);
