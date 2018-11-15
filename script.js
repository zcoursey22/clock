let lightTimeout;
let alarm = {
  hour: null,
  minute: null,
  meridiem: null
};
let second = new Date().getSeconds();

function setTime() {
  const date = new Date();
  document.querySelector('#hour').innerHTML = formatHour(date);
  document.querySelector('#minute').innerHTML = formatMinute(date);
  document.querySelector('#second').innerHTML = formatSecond(date);
  document.querySelector('#meridiem').innerHTML = formatMeridiem(date);
  document.querySelector('#day').innerHTML = formatDate(date);
  newSecond = date.getSeconds();
  toggleColon(newSecond);
  second = newSecond;
  checkAlarm(date);
}

function formatHour(date) {
  let hour = date.getHours() > 12 ? (date.getHours() - 12).toString() : date.getHours().toString();
  hour = hour < 10 ? '0' + hour : hour;
  if (hour === '00') hour = '12';
  return hour;
}

function formatMinute(date) {
  return date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes().toString();
}

function formatSecond(date) {
  return date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
}

function formatMeridiem(date) {
  return date.getHours() > 11 ? 'PM' : 'AM';
}

function formatDate(date) {
  const days = {
    '1': 'MON',
    '2': 'TUE',
    '3': 'WED',
    '4': 'THU',
    '5': 'FRI',
    '6': 'SAT',
    '7': 'SUN'
  }

  function formatMonth(date) {
    return date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth();
  }

  function formatDay(date) {
    return date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  }

  let weekDay = days[date.getDay()];
  let monthDay = `${formatMonth(date)}/${formatDay(date)}`;
  return `${weekDay} ${monthDay}`;
}

function lightUp(duration) {
  const snoozeButtonClick = new Audio('snoozeButtonClick.mp3');
  snoozeButtonClick.volume = 0.25;
  snoozeButtonClick.play();
  clearTimeout(lightTimeout);
  document.querySelector("#screen").style.backgroundColor = '#2f5aff';
  lightTimeout = setTimeout(() => {
    document.querySelector("#screen").style.backgroundColor = '#aaba95';
  }, duration * 1000);
}

function setAlarm() {
  const alarmButtonClick = new Audio('alarmButtonClick.mp3');
  alarmButtonClick.volume = 0.25;
  alarmButtonClick.play();
  alarm.hour = document.querySelector("#alarmHour").value;
  alarm.minute = document.querySelector("#alarmMinute").value;
  alarm.meridiem = document.querySelector("#alarmMeridiem").value;
  document.querySelector("#alarmTime").innerHTML = `${alarm.hour}<span id="alarmColon">:</span>${alarm.minute} ${alarm.meridiem}`;
  document.querySelector("#alarmIndicator").style.display = 'block';
}

function checkAlarm(date) {
  if (alarm.hour === formatHour(date) && alarm.minute === formatMinute(date) && alarm.meridiem === formatMeridiem(date)) {
    const alarmSound = new Audio('alarm.mp3');
    alarmSound.volume = 0.5;
    alarmSound.play();
    lightUp(12.5);
    alarm = {
      hour: null,
      minute: null,
      meridiem: null
    }
  }
}

function toggleColon(newSecond) {
  if (newSecond !== second) {
    if (document.querySelector("#timeColon").style.visibility === 'hidden') {
      document.querySelector("#timeColon").style.visibility = 'visible';
      document.querySelector("#alarmColon").style.visibility = 'hidden';
    } else {
      document.querySelector("#timeColon").style.visibility = 'hidden';
      document.querySelector("#alarmColon").style.visibility = 'visible';
    }
  }
}


setTime();
window.setInterval(setTime, 100);
