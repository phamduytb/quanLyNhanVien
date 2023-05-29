// Hàm tự động chạy khi trang load xong
$(document).ready(function () {
  // demo();
  //Load dữ liệu danh sách nhân viên
  loadData();
  //Tạo sự kiện cho các thành phần trong page
  initEvents();
});

// function demo() {
//     let d = null;
//     console.log(d||"khac")
// }
/**
 * Load dữ liệu
 * CreatedBy: PDDUY (26/05/2023)
 */
function loadData() {
  try {
   // Gọi API lấy dữ liệu
    fetch("http://localhost:3000/Employees")
      .then((res) => res.json())
      .then((data) => {
        // Hiển thị loading
        $(".loading").show();
        // Xóa dữ liệu có sẵn trong bảng
        $("table#tbEmployeeList tbody").empty();
        // Lấy ra từng employee trong danh sách employee nhận được từ API
        for (const employee of data) {
          let employeeCodde = employee.EmployeeCode;
          let fullName = employee.FullName;
          let gender = employee.GenderName;
          let dateOfBirth = employee.DateOfBirth;
          let identityNumber = employee.IdentityNumber;
          let positionName = employee.PositionName;
          let departmentName = employee.DepartmentName;
          // Xử lý dữ liệu:
          // --> Định dạng dữ liệu ngày tháng: Chuyển thành dd/mm/yyyy
          dateOfBirth = fomatDate(dateOfBirth);
          // --> Định dạng dữ liệu tiền tệ
          // tạo phần tử trHTML là 1 hàng trong phần tbody của bảng
          let trHTML = `<tr>
                                <td ><input type="checkbox"></td>
                                <td>${employeeCodde || ""}</td>
                                <td>${fullName || ""}</td>
                                <td>${gender || ""}</td>
                                <td  class="text-align--center">${
                                  dateOfBirth || ""
                                }</td>
                                <td>${identityNumber || ""}</td>
                                <td>${positionName || ""}</td>
                                <td>${departmentName || ""}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td class="td-last">
                                        <button class="td-button fix-function">Sửa</button>
                                        <button class="td-button btn-function"><i class="icofont-caret-down"></i></button>
                                </td>
                            </tr>`;
          //Chèn phần tử trHTML vào cuối phần tbody
          $("table#tbEmployeeList tbody").append(trHTML);
        }
        // Ẩn loading
        $(".loading").hide();
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

/**
 * Lập trình sự kiện cho các thành phần
 * CreatedBy: PDDUY (26/05/2023)
 */
function initEvents() {
  try {

    // Nhấn vào button thêm mới nhân viên hiển thị form để thêm nhân viên
    try {
      $("#btn-add-employee").click(function () { 
        $("#form-employee").css("display", "flex");
        $("#input-code-employee").focus();
      });
    } catch (error) {
      console.log(error);
    }

    // Nhấn icon x để đóng form nhân viên
    try {
      $(".form-header__right .btn-x").click(function () { 
        $("#form-employee").hide();
      });
    } catch (error) {
      console.log(error);
    }

    //Khi focus đến nút hủy, ta ấn phím tab sẽ quay lại focus vào ô  mã nhân viên
    try {
      $(".form-footer .btn-cancel").keyup(function (e) { 
        //Ngăn chặn hành vi mặc định của sự kiện
        e.preventDefault();
        $("#input-code-employee").focus();
      });
    } catch (error) {
      console.log(error);
    }

    // 
    try {
    } catch (error) {
      console.log(error);
    }

  } catch (error) {
    console.log(error);
  }
}
