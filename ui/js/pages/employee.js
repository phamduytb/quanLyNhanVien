var apiEmployee = "http://localhost:3000/Employees";
/**
 * Hàm tự động chạy khi load trang load xong
 * Author: PDDUY (26/05/2023)
 */
$(document).ready(function () {
  //Load dữ liệu danh sách nhân viên
  loadData();
  //Tạo sự kiện cho các thành phần trong page
  initEvents();
});

/**
 * Lấy danh sách nhân viên từ server hiển thị lên bảng dữ liệu.
 * Author: PDDUY (26/05/2023)
 */
function loadData() {
  try {
    // Gọi API lấy dữ liệu
    fetch(apiEmployee)
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

          //Định dạng dữ liệu ngày tháng: Chuyển thành dd/mm/yyyy
          dateOfBirth = fomatDate(dateOfBirth);
          //Định dạng dữ liệu tiền tệ

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
          //Chèn phần tử trHTML vào cuối phần tbody của bảng nhân viên
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
 * Lập trình bắt các sự kiện cho các thành phần
 * Author: PDDUY (26/05/2023)
 */
function initEvents() {
  try {
    // Nhấn vào button thêm mới nhân viên hiển thị form để thêm nhân viên
    try {
      $("#btn-add-employee").click(function () {
        $("#form-employee").css("display", "flex");
        // focus vào ô nhập liệu đầu tiên
        $("#input-employeeCode").focus();
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

    //Bắt sự kiện focus đến nút hủy, ta ấn phím tab sẽ quay lại focus vào ô  mã nhân viên
    try {
      $(".form-footer .btn-cancel").keyup(function (e) {
        //Ngăn chặn hành vi mặc định của sự kiện
        e.preventDefault();
        $("#input-employeeCode").focus();
      });
    } catch (error) {
      console.log(error);
    }

    // Bắt sự kiện blur của những trường bắt buộc nhập trong form
    $("input[required]").blur(function () {
      validateInputRequired(this);
    });
    $("select[required]").blur(function () {
      validateInputRequired(this);
    });

    // Bắt sự kiện click vào nút cất trên form
    try {
      $("#store-form").click(function () {
        let employee = getEmployee();

        // hiển thị các câu cảnh báo khi lưu dữ liệu mà chưa nhập các trường bắt buộc
        validateInputRequired("input[required]");
        validateInputRequired("select[required]");

        // Nếu không hiển thị dialog cảnh báo nhập trường bắt buộc của form
        // thì có thể thực hiện cất dữ liệu của form
        if (!showEmptyFieldDialog(employee)) {
          createEmployee(employee);
          // Đóng form khi sau khi cất dữ liệu
          $("#form-employee").hide();
        }
      });
    } catch (error) {
      console.log(error);
    }

    // Bắt sự kiện button đóng trên các dialog cảnh báo
    try {
      $(".dialog-container .btn-close").click(function () {
        $(".dialog-container").hide();
      });
    } catch (error) {
      console.log(error);
    }

    try {
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Lấy ra thông tin của nhân viên được nhập từ form
 * Author: PDDUY (30/05/2023)
 * @returns {employee}: Trả về 1 nhân viên được nhập từ form
 */
function getEmployee() {
  let employeeCode = $("#input-employeeCode").val();
  let fullName = $("#input-employeeName").val();
  let departmentName = $("#input-department").val();
  let positionName = $("#input-employeePosition").val();
  // let gender = $("#input-employeeCode").val();
  let dateOfBirth = $("#input-dateOfBirth").val();
  let identityNumber = $("#input-identityNumber").val();
  
  let employee = {
    EmployeeCode: employeeCode,
    FullName: fullName,
    DepartmentName: departmentName,
    // GenderName: gender,
    DateOfBirth: dateOfBirth,
    IdentityNumber: identityNumber,
    PositionName: positionName,
    
  };
  return employee;
}
/**
 * Hiển thị cảnh báo dưới các trường bắt buộc của form khi người dùng không nhập dữ liệu
 * Author: PDDUY (30/05/2023)
 */
function validateInputRequired(input) {
  try {
    let value = $(input).val();
    if (value == null || value == "") {
      $(input).addClass("textfield__input--required");
      $(input)
        .parent(".textfield-container")
        .children(".textfield__message")
        .show();
    } else {
      $(input).removeClass("textfield__input--required");
      $(input)
        .parent(".textfield-container")
        .children(".textfield__message")
        .hide();
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Hiển thị các dialog cảnh báo khi cất form mà chưa nhập các trường bắt buộc
 * Author: PDDUY (30/05/2023)
 * @returns {boolean}: Trả về true nếu có hiển thị dialog cảnh báo ngược lại sẽ trả về false
 */
function showEmptyFieldDialog(employee) {
  try {
    if (employee.EmployeeCode == null || employee.EmployeeCode == "") {
      $("#dialog-empty-field").css("display", "flex");
      $("#dialog-empty-field .dialog-body__detail").text(
        "Mã không được để trống."
      );
      return true;
    } else if (employee.FullName == null || employee.FullName == "") {
      $("#dialog-empty-field").css("display", "flex");
      $("#dialog-empty-field .dialog-body__detail").text(
        "Tên không được để trống."
      );
      return true;
    } else if (
      employee.DepartmentName == null ||
      employee.DepartmentName == ""
    ) {
      $("#dialog-empty-field").css("display", "flex");
      $("#dialog-empty-field .dialog-body__detail").text(
        "Đơn vị không được để trống."
      );
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Thêm mới một nhân viên được nhập vào từ form
 * Author :PDDUY (30/05/2023)
 */
function createEmployee(employee) {
  try {
    let post = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(employee),
    };

    fetch(apiEmployee, post).then(function () {
      loadData();
    });
  } catch (error) {
    console.log(error);
  }
}
