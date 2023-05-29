// common viết những hàm dùng chung

/**
 * Chuyển dữ liệu ngày tháng về dạng dd/mm/yyyy
 * CreatedBy PDDUY (26/05/2023)
 */
function fomatDate(dateTime) {
  try {
    //if (datetime) kiểm tra giá trị datetime khác các giá trị falsy:  undefined, null, false, 0, -0, 0n, NaN, "".
    if (dateTime) {
      // Chuyển thành dữ liệu ngày tháng:
      dateTime = new Date(dateTime);
      let date = dateTime.getDate();
      date = date < 10 ? `0${date}` : date;
      let month = dateTime.getMonth() + 1;
      month = month < 10 ? `0${month}` : month;
      let year = dateTime.getFullYear();
      return `${date}/${month}/${year}`;
    } else {
      return "";
    }
  } catch (error) {
    console.log(error);
    return "";
  }
}

/**
 * Định dạng tiền tệ
 * CreatedBy PDDUY (26/05/2023)
 */
function formatMoney(money) {
  try {
    console.log(
      new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(money)
    );
  } catch (error) {
    console.log(error);
    return "";
  }
}
