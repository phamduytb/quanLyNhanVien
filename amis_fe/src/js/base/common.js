const MISACommon = {
  /**
   * Chuyển dữ liệu ngày tháng về dạng dd/mm/yyy
   * @param {*} dateTime
   * @returns
   * Author: Phạm Đình Duy (27/06/2023)
   */
  formatDate: function (dateTime) {
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
  },

  /**
   * Chuyển dữ liệu ngày tháng về định dạng năm - tháng -ngày để hiển thị lên ô input có type ="date"
   * Author: Phạm Đình Duy (27/06/2023)
   */
  bidingDate: function (dateTime) {
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
        return `${year}-${month}-${date}`;
      } else {
        return "";
      }
    } catch (error) {
      console.log(error);
      return "";
    }
  },

  /**
   * Xử lý giới tính
   * Author: Phạm Đình Duy
   */
  formatGender: function (gender) {
    if (gender) {
      if (gender == "0") {
        return "Nam";
      } else if (gender == "1") {
        return "Nữ";
      } else {
        return "Khác";
      }
    } else {
      return "";
    }
  },

  /**
   * Định dạng tiền tệ
   * Author: Phạm Đình Duy
   */
  formatMoney: function (money) {
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
  },

  /**
   *Hàm validateEmail
   * @param {String} emailValue email text
   * @returns true - hợp lệ; false- không hợp lệ
   */
  //  validateEmail: function(emailValue) {
  //     let mailformat =
  //     /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
  //     if (emailValue.match(mailformat)) {
  //     return true;
  //     } else {
  //     return false;
  //     }
  // }
};

export default MISACommon;
