const CODE_ATTENDANCE = "123456";

let timeInterval = null;

// lấy thông tin người dùng trên localStorage
const user = JSON.parse(localStorage.getItem("user"))

const nameStrong = document.querySelector(".company-present p strong")
nameStrong.innerText = user.HoTen
// Lấy các phần tử cần thao tác
const attendancePresent = document.querySelector(".company-present");
const attendanceContent = document.querySelector(".company-content");
const buttonStartAttendance = document.querySelector(".btnStartAttendance");
const buttonEndAttendance = document.querySelector(".btnEndAttendance");
const workTimer = document.querySelector(".work-timer");

// Hàm bắt đầu đếm giờ
function startTimer(startTime) {
  function updateTimer() {
    let now = new Date();
    let elapsedSeconds = Math.floor((now - startTime) / 1000); // Tính số giây đã trôi qua

    let hours = Math.floor(elapsedSeconds / 3600);
    let minutes = Math.floor((elapsedSeconds % 3600) / 60);
    let seconds = elapsedSeconds % 60;

    workTimer.innerText = `${hours} giờ ${minutes} phút ${seconds} giây`;
  }

  // Cập nhật mỗi giây
  timeInterval = setInterval(updateTimer, 1000);
  updateTimer();
}

// Kiểm tra nếu đã chấm công trước khi tải lại trang
let storedStartTime = localStorage.getItem("start-time");
if (storedStartTime) {
  attendancePresent.classList.remove("hide");
  attendanceContent.classList.add("hide");
  startTimer(new Date(storedStartTime));
}

// Bắt đầu chấm công
buttonStartAttendance.addEventListener("click", () => {
  const codeStartAttendance = document.querySelector(".code-start-attendance");

  if (codeStartAttendance.value === CODE_ATTENDANCE) {
    let startTime = new Date();
    localStorage.setItem("start-time", startTime.toISOString());

    attendancePresent.classList.remove("hide");
    attendanceContent.classList.add("hide");

    startTimer(startTime);
  } else {
    alert("❌ Mã chấm công sai, vui lòng thử lại!");
  }
});

// Kết thúc chấm công
buttonEndAttendance.addEventListener("click", () => {
  clearInterval(timeInterval);
  localStorage.removeItem("start-time");

  attendancePresent.classList.add("hide");
  attendanceContent.classList.remove("hide");

  alert("✅ Bạn đã kết thúc chấm công!");
});
