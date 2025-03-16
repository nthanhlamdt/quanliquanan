const HISTORY_API = 'http://localhost:3000/history';
const TABLE_API = 'http://localhost:3000/table';
const ORDER_API = 'http://localhost:3000/order';

const dateHistory = document.querySelector('.date-history');

// ✅ Đặt ngày hiện tại mặc định cho input date
let today = new Date();
let formattedDate = today.toISOString().split('T')[0];
dateHistory.value = formattedDate;

// ✅ Hàm kiểm tra timestamp có cùng ngày với targetDate không
function isSameDay(timestamp, targetDate) {
    let date = new Date(parseInt(timestamp));
    let target = new Date(targetDate);
    return (
        date.getFullYear() === target.getFullYear() &&
        date.getMonth() === target.getMonth() &&
        date.getDate() === target.getDate()
    );
}

// ✅ Hàm tính khoảng cách thời gian giữa 2 timestamp
function timeDifference(timestamp1, timestamp2) {
    let date1 = new Date(parseInt(timestamp1));
    let date2 = new Date(parseInt(timestamp2));

    let diffMs = Math.abs(date2 - date1);
    let hours = Math.floor(diffMs / (1000 * 60 * 60));
    let minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    if (hours === 0 && minutes === 0) {
        return `${seconds} giây`;
    } else {
        return `${hours} giờ ${minutes} phút`;
    }
}

// ✅ Hàm hiển thị danh sách lịch sử hóa đơn theo ngày
const getHistoryBill = async (selectedDate) => {
    try {
        const historyResponse = await fetch(HISTORY_API);
        const historys = await historyResponse.json();

        // 🔍 Lọc danh sách theo ngày chọn
        const filteredHistory = historys.filter(history => isSameDay(history.time_start, selectedDate));

        // ✅ Gọi API TABLE & ORDER trước để tránh gọi nhiều lần
        const [tables, orders] = await Promise.all([
            fetch(TABLE_API).then(res => res.json()),
            fetch(ORDER_API).then(res => res.json())
        ]);

        // ✅ Tạo HTML danh sách hóa đơn
        let historyBillHTML = filteredHistory.map(history => historyBillItem(history, tables, orders)).join("");

        // ✅ Cập nhật vào giao diện
        document.querySelector('.history-bill').innerHTML = historyBillHTML;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
    }
};

// ✅ Hàm tạo HTML cho 1 hóa đơn
const historyBillItem = (history, tables, orders) => {
    let nameHistory = "Không xác định";

    if (history.type === 'table') {
        let table = tables.find(t => t.id === history.id_type);
        nameHistory = table ? table.nameTable : 'Không xác định';
    } else {
        let order = orders.find(o => o.id === history.id_type);
        nameHistory = order ? order.nameTable : 'Không xác định';
    }

    const date = new Date(history.time_start);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const timeStart = `${hours}:${minutes}`;
    const fullTime = timeDifference(history.time_start, history.time_end);

    return `
        <li class="history-bill_item">
            <table>
                <tr>
                    <th class="bill-name" colspan="2">${nameHistory}</th>
                </tr>
                <tr>
                    <th class="fulltime" rowspan="2">${fullTime}</th>
                    <th class="start-time"> <i class="fa-regular fa-clock"></i> ${timeStart}</th>
                </tr>
                <tr>
                    <th class="total"> <i class="fa-solid fa-coins"></i> ${formatNumber(history.total)}đ</th>
                </tr>
            </table>
        </li>`;
};

// ✅ Gọi danh sách hóa đơn khi tải trang (ngày hôm nay)
getHistoryBill(formattedDate);

// ✅ Lắng nghe sự kiện khi chọn ngày mới
dateHistory.addEventListener("change", function () {
    let selectedDate = this.value;
    getHistoryBill(selectedDate);
});
