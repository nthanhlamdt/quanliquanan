const SALARY_API = "http://localhost:3000/salary"

const contentWage = document.querySelector('.content-wage')
const wageDetail = document.querySelector('.wage-detail ')

const wageDetailTbody = document.querySelector('.wage-detail tbody')
async function buildDetail(id_staff) {
  contentWage.classList.add('hide')
  wageDetail.classList.remove('hide')

  const salarys = (await fetch(SALARY_API)).json()

  const staff = salarys.find((st) => {
    return st.id_staff == id_staff
  })

  wageDetailTbody.innerHTML = ''
  var i = 1
  staff.detail.map((wg) => {
    if (StringToDate(wg.date_time).getMonth() + 1 == getMonthSelect) {
      wageDetailTbody.innerHTML += `<tr>
              <td>${i++}</td>
              <td>${formatTime(wg.date_time)}</td>
              <td> ${minuteToHour(wg.time_work)}</td>
              <td>${formatNumber(wg.time_work * 500)}</td>
            </tr>`
    }
  })
}

function formatTime(date_time) {
  date_time = date_time.split('-')
  return `${date_time[2]}/${date_time[1]}/${date_time[0]}`
}

function minuteToHour(minutes) {
  var hours = 0
  while (minutes >= 60) {
    hours++
    minutes -= 60
  }
  return `${hours} giờ ${minutes} phút`
}


const tableWageTbody = document.querySelector('.table-wage tbody')
const monthSelect = document.querySelector('.month-select')

var getMonthSelect = monthSelect.value
buildLuongTable()
monthSelect.addEventListener("change", function () {
  getMonthSelect = monthSelect.value;
  tableWageTbody.innerHTML = ''
  buildLuongTable()
});


function buildLuongTable() {
  var i = 0;
  SALARY.map(luong => {
    i++
    const getStaff = STAFF.find((staff) => {
      return staff.id === luong.id_staff
    })

    var sumLuong = 0
    luong.detail.map((dt) => {
      if (StringToDate(dt.date_time).getMonth() + 1 == getMonthSelect) {
        sumLuong += dt.time_work * 500
      }
    })
    tableWageTbody.innerHTML += `<tr>
              <td>${i}</td>
              <td>NV00${luong.id_staff}</td>
              <td>${getStaff.HoTen}</td>
              <td>${formatNumber(sumLuong)}</td>
              <td>${getMonthSelect}</td>
              <td><span onclick="buildDetail(${luong.id_staff})">Chi Tiết</span></td>
            </tr>`

  })
}

function StringToDate(dateString) {
  return new Date(dateString)
}

function formatNumber(number) {
  return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '');
}

