let apiEmployee = "https://cukcuk.manhnv.net/api/v1/Employees";
/**
 * Hàm tự động chạy khi load trang load xong
 * Author: Phạm Đình Duy (26/05/2023)
 */
$(document).ready(function () {
  loadData();
  initEvents();
});

/**
 * Lấy danh sách nhân viên từ server hiển thị lên bảng dữ liệu.
 * Author: PDDUY (26/05/2023)
 */
function loadData() {
  try {
    //Hiển thị loading trước khi dữ liệu được load lên bảng
    $(".loading").show();

    //Gọi API lấy dữ liệu
    $.ajax({
      type: "GET",
      url: "https://cukcuk.manhnv.net/api/v1/Employees",
      success: function (response) {
        //Xóa hết dữ liệu có sẵn trong bảng
        $("#tbEmployeeList tbody").empty();
        //Duyệt qua từng employee lấy được từ API
        for (const emp of response) {
          let employeeId = emp.EmployeeId;
          let employeeCode = emp.EmployeeCode;
          let fullName = emp.FullName;
          let gender = emp.GenderName;
          let dateOfBirth = emp.DateOfBirth;
          dateOfBirth = formatDate(dateOfBirth);
          let identityNumber = emp.IdentityNumber;
          let positionName = emp.PositionName;
          let departmentName = emp.DepartmentName;
          let bankAccountNumber = emp.BankAccountNumber;
          let bankName = emp.BankName;
          let bankBranchName = emp.BankBranchName;

          trHTML = `<tr>
                      <td ><input type="checkbox"></td>
                      <td>${employeeCode || ""}</td>
                      <td>${fullName || ""}</td>
                      <td>${gender || ""}</td>
                      <td  class="text-align--center">${dateOfBirth || ""}</td>
                      <td>${identityNumber || ""}</td>
                      <td>${positionName || ""}</td>
                      <td>${departmentName || ""}</td>
                      <td>${bankAccountNumber || ""}</td>
                      <td>${bankName || ""}</td>
                      <td>${bankBranchName || ""}</td>
                      <td class="td-last">
                              <button class="td-button fix-function">Sửa</button>
                              <button class="td-button btn-function"><i class="icofont-caret-down"></i></button>
                      </td>
                    </tr>`;

          $("#tbEmployeeList tbody").append(trHTML);
          let totalRecord = `
                            Tổng số :
                            <b>${response.length}</b>
                            bản ghi
                          </div>`;
          $(".table-footer__left").empty();
          $(".table-footer__left").append(totalRecord);
          // Ẩn loading
          $(".loading").hide();
        }
      },
      error: function (error) {
        let statusCode = error.status;
        switch (statusCode) {
          case 400:
            break;
          case 500:
            break;
          default:
            break;
        }
      },
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
        //Lấy mã nhân viên mới
        // debugger;
        let newEmployeeCode = getNewEmployeeCode();
        console.log(newEmployeeCode);
        $("#input-employeeCode").val(newEmployeeCode);
        // focus vào ô nhập liệu đầu tiên
        $("#input-employeeCode").focus();
        //lấy danh sách phòng ban từ api
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
 * Tự động lấy ra một mã nhân viên mới khi mở form thêm mới nhân viên
 * Author : PDDUY (31/05/2023)
 */
function getNewEmployeeCode() {
  try {
    let employeeCode;
    fetch("https://cukcuk.manhnv.net/api/v1/Employees/NewEmployeeCode")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        employeeCode = data;
      })
      .catch((error) => {
        console.log(error);
      });
    return employeeCode;
  } catch (error) {
    console.log(error);
  }
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
 * Lấy ra thông tin của nhân viên được nhập từ form
 * @returns {employee}: Trả về 1 nhân viên được nhập từ form
 * Author: PDDUY (30/05/2023)
 */
function getEmployee() {
  let employeeCode = $("#input-employeeCode").val();
  let fullName = $("#input-employeeName").val();
  let departmentName = $("#input-department option").filter(":selected").val();
  let positionName = $("#input-employeePosition").val();
  let gender = $("input[type='radio'][name='gender']:checked").val();
  let dateOfBirth = $("#input-dateOfBirth").val();
  let identityNumber = $("#input-identityNumber").val();
  let identityDate = $("#input-identityDate").val();
  let identityPlace = $("#input-identityPlace").val();

  let employee = {
    EmployeeCode: employeeCode,
    FullName: fullName,
    DepartmentName: departmentName,
    PositionName: positionName,
    Gender: gender,
    DateOfBirth: dateOfBirth,
    IdentityNumber: identityNumber,
    IdentityDate: identityDate,
    IdentityPlace: identityPlace,
  };
  return employee;
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
