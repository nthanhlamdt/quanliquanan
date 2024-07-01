var timer;
const company = document.querySelector('.company');
var codeCompany = '12345';
var startTime = localStorage.getItem('startTime');
// Hàm khởi động
startCompany();

function setLocalStatusCompany(status) {
  const companyInputContent = document.querySelector('.company-content input');
  const companyInputPresent = document.querySelector('.company-present input');
  
  if (status == true) {
    if (companyInputContent.value === codeCompany) {
      localStorage.setItem('startTime', Date.now());
      localStorage.setItem('StatusCompany', status);
      startCompany();
    } else {
      alert('Mã Chấm Công Không Hợp Lệ!');
    }
  } else {
    if (companyInputPresent.value === codeCompany) {
      localStorage.setItem('StatusCompany', status);
      startCompany();
      const timeWorkSave = hour * 60 + minute;
      resetTimer();
      localStorage.setItem('TIMEWORK', JSON.stringify({ hour, minute, second }));
      getAddSalary(timeWorkSave);
      clearInterval(timer);
    } else {
      alert('Mã Chấm Công Không Hợp Lệ!');
    }
  }
}

function getAddSalary(timeWork) {
  const staffId = JSON.parse(localStorage.getItem('StaffId'));

  const getSalary = SALARY.find((w) => w.id_staff == staffId.id);
  const currentDate = new Date();
  const detailSalaryAdd = {
    date_time: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`,
    time_work: timeWork
  };
  
  getSalary.detail.push(detailSalaryAdd);
  updateCompanyDataOnServer(getSalary, getSalary.id);
}

function startCompany() {
  var statusCompany = localStorage.getItem('StatusCompany');
  if (statusCompany === 'true') {
    createCompanyPresent();
  } else {
    createCompanyContent();
  }
}

function createCompanyContent() {
  company.innerHTML = `
    <div class="company-content">
      <h1>VUI LÒNG NHẬP MÃ CHẤM CÔNG</h1>
      <input type="text" id="codeCompany" autocomplete="off">
      <button onclick="setLocalStatusCompany(true)">Chấm công</button>
    </div>`;
}

function timeCompany() {
  if (second < 60) {
    second++;
  } else {
    second = 0;
    if (minute < 60) {
      minute++;
    } else {
      minute = 0;
      hour++;
    }
  }
  return `${hour}:${minute}:${second}`;
}
var updateTime = updateTimer();
var hour = updateTime.hour,
  minute = updateTime.minute,
  second = updateTime.second;


function createCompanyPresent() {
  startTime = localStorage.getItem('startTime');
    updateTime = updateTimer();
    hour = updateTime.hour,
    minute = updateTime.minute,
    second = updateTime.second;
  var getStaff = JSON.parse(localStorage.getItem('StaffId'));
  company.innerHTML = `
    <div class="company-present">
      <p>Xin Chào <strong>${getStaff.HoTen}</strong> Thời gian làm việc hiện tại của bạn là
        <span class="time-work">${hour} giờ ${minute} phút ${second} giây</span>
      </p>
      <h1>VUI LÒNG NHẬP MÃ ĐỂ KẾT THÚC</h1>
      <input type="text" id="codeCompany" autocomplete="off">
      <button onclick="setLocalStatusCompany(false)">Chấm công</button>
    </div>`;
  
  timer = setInterval(() => {
    timeCompany();
    if (hour > 15) {
      localStorage.setItem('StatusCompany', false);
      startCompany();
      resetTimer()
    } 
    
    document.querySelector('.time-work').innerText = `${hour} giờ ${minute} phút ${second} giây`;
  }, 1000);
}

function resetTimer() {
  hour = 0;
  minute = 0;
  second = 0;
}

function updateTimer() {
  
  var currentTime = Date.now();
  var elapsedTime = currentTime - startTime;
  var hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  var minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  
  return {
    hour: hours,
    minute: minutes,
    second: seconds
  };
}

function updateCompanyDataOnServer(updatedCompany, id) {
  fetch(SALARY_API + '/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedCompany)
  })
    .then(response => response.json())
    .then(data => console.log('Dữ liệu đã được cập nhật trên server:', data))
    .catch(error => console.error('Đã xảy ra lỗi:', error));
}
