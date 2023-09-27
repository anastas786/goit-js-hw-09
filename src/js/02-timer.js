
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const datetimePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector('button[data-start]');
const timer = document.querySelector('.timer');

let intervalId = null;
let selectedDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0];
        const currentDate = new Date();

        if (selectedDate <= currentDate) {
            alert("Please choose a date in the future");
            startButton.disabled = true;
        } else {
            startButton.disabled = false;
        }
    },
};

const datepicker = flatpickr(datetimePicker, options);

startButton.addEventListener('click', () => {
    if (!selectedDate) {
        alert("Please choose a valid future date and time.");
        return;
    }

    startButton.disabled = true;
    datetimePicker.disabled = true;

    intervalId = setInterval(() => {
        const currentDate = new Date();
        const timeRemaining = selectedDate - currentDate;

        if (timeRemaining <= 0) {
            clearInterval(intervalId);
            timer.textContent = "00:00:00:00";
            startButton.disabled = false;
            datetimePicker.disabled = false;
        } else {
            updateTimerDisplay(timeRemaining);
        }
    }, 1000);
});

function updateTimerDisplay(timeRemaining) {
    const { days, hours, minutes, seconds } = convertMs(timeRemaining);

    const formattedTime = `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    timer.textContent = formattedTime;
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}


function updateTimerDisplay(timeRemaining) {
    const { days, hours, minutes, seconds } = convertMs(timeRemaining);

    const formattedTime = `${addLeadingZero(days)}:${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;

    timer.textContent = formattedTime;
}

