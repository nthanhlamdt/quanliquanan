const SALARY_API = "http://localhost:3000/salary";
const ACCOUNT_API = "http://localhost:3000/account";

const contentWage = document.querySelector('.content-wage');
const tableWage = document.querySelector('.table-wage');
const wageDetail = document.querySelector('.wage-detail');

// Hàm xử lý khi nhấn vào "Chi tiết"
const detailHandelClick = (idSalary, month) => {
  contentWage.classList.add('hide');
  wageDetail.classList.remove('hide');
  buildDetail(idSalary, month);
};

// Hàm lấy dữ liệu nhân viên và hiển thị bảng lương
const getStaff = async (month) => {
  const tableWageTbody = document.querySelector('.table-wage tbody');

  try {
    // Lấy dữ liệu lương và tài khoản
    const salaryResponse = await fetch(SALARY_API);
    const salarys = await salaryResponse.json();

    const accountResponse = await fetch(ACCOUNT_API);
    const accounts = await accountResponse.json();

    let i = 1;
    tableWageTbody.innerHTML = ''; // Clear bảng trước khi thêm dữ liệu mới

    salarys.forEach(salary => {
      const nameStaff = accounts.find(account => account.id === salary.id_account)?.HoTen || 'Không tìm thấy'; // Tránh lỗi nếu không tìm thấy account
      let sumSalary = 0;

      // Tính tổng lương cho nhân viên trong tháng
      salary.details.forEach(detail => {
        if ((new Date(detail.date_time).getMonth() + 1 === parseInt(month))) {
          sumSalary += detail.time_work * salary.coefficient;
        }
      });

      const salaryId = salary.id;
      // Nếu có lương thì hiển thị thông tin
      if (sumSalary !== 0) {
        tableWageTbody.innerHTML += `
          <tr>
            <td>${i}</td>
            <td>${salary.id}</td>
            <td>${nameStaff}</td>
            <td>${formatNumber(salary.coefficient)}</td>
            <td>${formatNumber(sumSalary/60)}</td>
            <td>${month}</td>
            <td class='detail' onClick="detailHandelClick('${salaryId}', ${month})">Chi tiết</td>
          </tr>
        `;
        i++;
      }
    });
  } catch (error) {
    console.error("Có lỗi khi lấy dữ liệu lương và tài khoản:", error);
  }
};

// Lắng nghe sự kiện thay đổi tháng
const monthSelect = document.querySelector('.month-select');
let month = monthSelect.value;

monthSelect.addEventListener('change', function () {
  getStaff(this.value); // Gọi lại getStaff khi chọn tháng mới
});

// Gọi lần đầu tiên khi trang tải
getStaff(month);

// Hàm chuyển đổi số thành định dạng tiền tệ
function formatNumber(number) {
  return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '');
}

async function buildDetail(salaryId, month) {
  try {
    const salaryResponse = await fetch(SALARY_API);
    const salarys = await salaryResponse.json();
    
    // Tìm thông tin chi tiết của lương theo salaryId
    const salary = salarys.find(salary => salary.id === salaryId);
    if (!salary) return;

    const wageDetailTbody = document.querySelector('.wage-detail tbody');
    wageDetailTbody.innerHTML = ''; // Clear chi tiết cũ

    let i = 1;
    salary.details.forEach(detail => {
      // Kiểm tra tháng và chỉ hiển thị chi tiết cho tháng tương ứng
      if ((new Date(detail.date_time).getMonth() + 1 === parseInt(month))) {
        wageDetailTbody.innerHTML += `
          <tr>
            <td>${i}</td>
            <td>${formatDate(detail.date_time)}</td>
            <td>${formatStartTime(detail.time_start)}</td> <!-- Hiển thị thời gian bắt đầu -->
            <td>${minuteToHour(detail.time_work)}</td>
            <td>${formatNumber(detail.time_work * salary.coefficient/60)}</td>
          </tr>
        `;
        i++;
      }
    });
  } catch (error) {
    console.error("Có lỗi khi lấy dữ liệu chi tiết lương:", error);
  }
}

// Hàm chuyển đổi timestamp thành định dạng ngày giờ
function formatStartTime(timestamp) {
  const date = new Date(timestamp); // Chuyển đổi timestamp thành đối tượng Date
  const hours = date.getHours().toString().padStart(2, '0'); // Lấy giờ
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Lấy phút
  return `${hours}:${minutes}`; // Trả về giờ:phút
}

// Hàm định dạng ngày tháng từ chuỗi date_time
function formatDate(date_time) {
  const date = new Date(date_time);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

// Hàm chuyển đổi phút thành giờ
function minuteToHour(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours} giờ ${remainingMinutes} phút`;
}
