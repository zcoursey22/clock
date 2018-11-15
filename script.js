let alarm = {
  hour: null,
  minute: null,
  meridiem: null
};

function setTime() {
  const date = new Date();
  document.querySelector('#hour').innerHTML = formatHour(date);
  document.querySelector('#minute').innerHTML = formatMinute(date);
  document.querySelector('#second').innerHTML = formatSecond(date);
  document.querySelector('#meridiem').innerHTML = formatMeridiem(date);
  checkAlarm(date);
}

function formatHour(date) {
  let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  if (hour === '00') hour = '12';
  return hour > 12 ? hour - 12 : hour;
}

function formatMinute(date) {
  return date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
}

function formatSecond(date) {
  return date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
}

function formatMeridiem(date) {
  return date.getHours() > 11 ? 'PM' : 'AM';
}

function setAlarm() {
  alarm.hour = document.querySelector("#alarmHour").value;
  alarm.minute = document.querySelector("#alarmMinute").value;
  alarm.meridiem = document.querySelector("#alarmMeridiem").value;
  console.log(`alarm set for ${alarm.hour}:${alarm.minute} ${alarm.meridiem}`);
}

function checkAlarm(date) {
  if (alarm.hour === formatHour(date) && alarm.minute === formatMinute(date) && alarm.meridiem === formatMeridiem(date)) {
    console.log("BEEP BEEP BEEP!!!");
    alarm = {
      hour: null,
      minute: null,
      meridiem: null
    }
  }
}

setTime();
window.setInterval(setTime, 100);
