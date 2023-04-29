// Get elements
const datePicker = document.querySelector(".date-picker");
const datePickerHeader = document.querySelector(".date-picker-header");
const datePickerTitle = document.querySelector(".date-picker-title");
const datePickerNavLeft = document.querySelector(".date-picker-nav-left");
const datePickerNavRight = document.querySelector(".date-picker-nav-right");
const datePickerWeekdays = document.querySelector(".date-picker-weekdays");
const datePickerDays = document.querySelector(".date-picker-days");
const dateInput = document.querySelector("#date");

// Set date picker date
const datePickerDate = new Date();
let datePickerYear = datePickerDate.getFullYear();
let datePickerMonth = datePickerDate.getMonth();

// Update date picker
const updateDatePicker = () => {
  // Set date picker title
  datePickerTitle.textContent = `${datePickerYear}/${datePickerMonth + 1}`;

  // Clear date picker days
  datePickerDays.innerHTML = "";

  // Get first day of month
  const firstDayOfMonth = new Date(datePickerYear, datePickerMonth, 1);

  // Get last day of month
  const lastDayOfMonth = new Date(
    datePickerYear,
    datePickerMonth + 1,
    0
  );

  // Add days to date picker
  let dayCount = 1;
  for (let i = 0; i < 42; i++) {
    const datePickerDay = document.createElement("div");
    datePickerDay.classList.add("date-picker-day");

    if (
      i >= firstDayOfMonth.getDay() &&
      dayCount <= lastDayOfMonth.getDate()
    ) {
      datePickerDay.textContent = dayCount;
      datePickerDay.dataset.date = `${datePickerYear}-${datePickerMonth + 1}-${dayCount}`;
      dayCount++;
    }

    datePickerDays.appendChild(datePickerDay);
  }

  // Set selected date
  const selectedDate = new Date(dateInput.value);
  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth();
  const selectedDay = selectedDate.getDate();

  // Set active date picker day
  const activeDatePickerDay = document.querySelector(
    `.date-picker-day[data-date='${selectedYear}-${selectedMonth + 1}-${selectedDay}']`
  );
  if (activeDatePickerDay) {
    activeDatePickerDay.classList.add("active");
  }
};

// Show date picker
dateInput.addEventListener("click", () => {
  datePicker.classList.add("active");
  updateDatePicker();
});

// Hide date picker
window.addEventListener("click", (event) => {
  if (!datePicker.contains(event.target) && event.target !== dateInput) {
    datePicker.classList.remove("active");
  }
});

// Previous month
datePickerNavLeft.addEventListener("click", () => {
  datePickerMonth--;
  if (datePickerMonth < 0) {
    datePickerYear--;
    datePickerMonth = 11;
  }
  updateDatePicker();
});

// Next month
datePickerNavRight.addEventListener("click", () => {
  datePickerMonth++;
  if (datePickerMonth > 11) {
    datePickerYear++;
    datePickerMonth = 0;
  }
  updateDatePicker();
});

// Select date
datePickerDays.addEventListener("click", (event) => {
  if (event.target.classList.contains("date-picker-day")) {
    const selectedDate = event.target.dataset.date;
    dateInput.value = selectedDate;
    datePicker.classList.remove("active");
    updateDatePicker();
  }
});
