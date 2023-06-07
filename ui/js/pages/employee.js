let apiEmployee = "https://cukcuk.manhnv.net/api/v1/Employees";
/**
 * Hàm tự động chạy khi load trang load xong
 * Author: Phạm Đình Duy (02/06/2023)
 */
$(document).ready(function () {
  loadData();
  initEvents();
});

//Khai báo biến toàn cục
var data = {
  formMode: "add",
  employeeId: null,
};

/**
 * Lấy danh sách nhân viên từ server hiển thị lên bảng dữ liệu.
 * Author: PDDUY (02/06/2023)
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
 * Author: PDDUY (02/06/2023)
 */
function initEvents() {
  try {
    // Bắt sự kiện cho nút thêm mới nhân viên
    $("#btn-add-employee").click(addEmployeeBtn);

    //Bắt sự kiện blur qua các trường bắt buộc
    $(".enter-required").blur(function () {
      try {
        validateInputRequired(this);
      } catch (error) {
        console.log(error);
      }
    });

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

    // Bắt sự kiện click vào nút cất trên form
    $("#save-form").click(saveForm);

    //Bắt sự kiện nút cất và thêm
    $("#save-add-form").click(saveAndAddForm);

    //Bắt sự kiện nút x và nút hủy trên form nhân viên
    $("#form-employee .btn-cancel").click(cancelForm);

    // Bắt sự kiện nút đóng và nút x trên các dialog cảnh báo
    $(".dialog-container .btn-close").click(hideDialogWarning);
    
  } catch (error) {
    console.log(error);
  }
}

/**
 * Bắt sự kiện người dùng click nút thêm mới nhân viên
 * Author: Phạm Đình Duy (02/06/2023)
 */
function addEmployeeBtn() {
  try {
    formMode = "add";
    //Hiển thị form
    $("#form-employee").css("display", "flex");
    // Thay đổi title form thành thêm mới nhân viên
    $(".form-header__left .form-title").text("Thêm mới nhân viên");
    //Lấy mã nhân viên mới
    getNewEmployeeCode();
    // Bỏ cảnh báo ở các trường bắt buộc nhập khi mở form lên
    removeInputRequired();
    // focus vào ô nhập liệu đầu tiên
    $("#input-employeeCode").focus();
    //lấy danh sách phòng ban từ API
    getDepartments();
    //Lấy danh sách các chức danh từ API
    getPositions();
  } catch (error) {
    console.log(error);
  }
}

/**
 * Tự động lấy ra một mã nhân viên mới khi mở form thêm mới nhân viên
 * Author : Phạm Đình Duy (02/06/2023)
 */
function getNewEmployeeCode() {
  try {
    $.ajax({
      type: "GET",
      url: "https://cukcuk.manhnv.net/api/v1/Employees/NewEmployeeCode",
      success: function (response) {
        $("#input-employeeCode").val(response);
      },
    });
  } catch (error) {
    console.log(error);
  }
}

/**
 * Gọi API lấy ra danh sách phòng ban
 * Author: Phạm Đình Duy (02/06/2023)
 */
function getDepartments() {
  $.ajax({
    type: "get",
    url: "https://cukcuk.manhnv.net/api/v1/Departments",
    success: function (response) {
      $("#input-department").empty();
      $("#input-department").append(
        `<option value="">---Chọn phòng ban---</option>`
      );
      for (const d of response) {
        let item = `<option value="${d.DepartmentId}">
                    ${d.DepartmentName}
                  </option>`;
        $("#input-department").append(item);
      }
    },
  });
}

/**
 * Goị API lấy danh sách các chức danh
 * Author: Phạm Đình Duy (03/06/2023)
 */
function getPositions() {
  $.ajax({
    type: "get",
    url: "https://cukcuk.manhnv.net/api/v1/Positions",
    success: function (response) {
      $("#input-employeePosition").empty();
      $("#input-employeePosition").append(
        `<option value="">---Chọn chức danh---</option>`
      );
      for (const p of response) {
        let item = `<option value="${p.PositionId}">
                    ${p.PositionName}
                  </option>`;
        $("#input-employeePosition").append(item);
      }
    },
  });
}
/**
 * Click vào icon đơn vị để hiện thị danh sách đơn vị trên form nhân viên
 */
function clickComboboxIcon() {}

/**
 * Hiển thị cảnh báo dưới các trường bắt buộc của form khi người dùng không nhập dữ liệu
 * Author: Phạm Đình Duy (05/06/2023)
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
 * Bỏ cảnh báo ở các trường bắt buộc nhập khi mở form lên
 * Author: Phạm Đình Duy (05/06/2023)
 */
function removeInputRequired() {
  try {
    $(".enter-required").removeClass("textfield__input--required");
    $(".enter-required")
      .parent(".textfield-container")
      .children(".textfield__message")
      .hide();
  } catch (error) {
    console.log(error);
  }
}

/**
 * Lưu thông tin nhân viên  đồng thời đóng form
 * Author: Phạm Đình Duy (05/06/2023)
 */
async function saveForm() {
  try {
    if (await saveEmployee()) {
      // Đóng form khi sau khi cất dữ liệu thành công
      $("#form-employee").hide();
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Lưu thông tin nhân viên, sau đó hiển thị form mới để tiếp tục nhập thông tin
 * Author: Phạm Đình Duy (07/06/2023)
 */
async function saveAndAddForm() {
  try {
    if (await saveEmployee()) {
      //Mở lại form thêm mới nhân viên sau khi cất dữ liệu thành công
      addEmployeeBtn();
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Lưu thông tin nhân viên lấy được từ form
 * @returns {boolean}: Trả về true nếu thêm nhân viên thành công, ngược lại trả về false
 * Author: Phạm Đình Duy (07/06/2023)
 */
async function saveEmployee() {
  try {
    let employee = getEmployee();
    // hiển thị các câu cảnh báo khi lưu dữ liệu mà chưa nhập các trường bắt buộc
    validateInputRequired("input[required]");
    validateInputRequired("select[required]");
    // Nếu không hiển thị dialog cảnh báo  thì có thể thực hiện cất dữ liệu của form
    if (
      !showEmptyFieldDialog(employee) &&
      !(await showDuplicateCodeDialog(employee.EmployeeCode))
    ) {
      if (formMode == "add") {
        await createEmployee(JSON.stringify(employee));
      } else {
        updateEmployee(employee);
      }
      clearData();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Click nút hủy và nút x trên form nhân viên để ẩn form
 * Author: Phạm Đình Duy (07/06/2023)
 */
function cancelForm() {
  removeInputRequired();
  $("#dialog-warning").hide();
  clearData();
  $("#form-employee").hide();
}

/**
 * Click nút đóng và nút x trên dialog cảnh báo để ẩn chúng đi
 * Author: Phạm Đình Duy (07/06/2023)
 */
function hideDialogWarning() {
  try {
    $("#dialog-warning").hide();
  } catch (error) {
    console.log(error);
  }
}

/**
 * Hiển thị các dialog cảnh báo khi cất form mà chưa nhập các trường bắt buộc
 * Author: PDDUY (05/06/2023)
 * @returns {boolean}: Trả về true nếu có hiển thị dialog cảnh báo ngược lại sẽ trả về false
 */
function showEmptyFieldDialog(employee) {
  try {
    if (employee.EmployeeCode == null || employee.EmployeeCode == "") {
      $("#dialog-warning").css("display", "flex");
      $("#dialog-warning .dialog-body__icon").addClass("icon-empty-warning");
      $("#dialog-warning .dialog-body__detail").text(
        "Mã không được để trống."
      );
      return true;
    } else if (employee.FullName == null || employee.FullName == "") {
      $("#dialog-warning").css("display", "flex");
      $("#dialog-warning .dialog-body__icon").addClass("icon-empty-warning");
      $("#dialog-warning .dialog-body__detail").text(
        "Tên không được để trống."
      );
      return true;
    } else if (employee.DepartmentId == null || employee.DepartmentId == "") {
      $("#dialog-warning").css("display", "flex");
      $("#dialog-warning .dialog-body__icon").addClass("icon-empty-warning");
      $("#dialog-warning .dialog-body__detail").text(
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
 * Hiển thị cảnh báo mã nhân viên bị trùng
 * @param {*} employeeCode
 * @returns {boolean}: Trả về true nếu hiển thị cảnh báo, ngược lại trả về false
 * Author: Phạm Đình Duy (05/06/2023)
 */
async function showDuplicateCodeDialog(employeeCode) {
  try {
    let employeeList = await getEmployeeList();
    for (const item of employeeList) {
      if (employeeCode === item.EmployeeCode) {
        $("#dialog-warning").css("display", "flex");
        $("#dialog-warning .dialog-body__icon").addClass("icon-duplicate-wraning");
        $("#dialog-warning .dialog-body__detail").text(
          `Mã nhân viên <${employeeCode}> đã tồn tại trong hệ thống, vui lòng kiểm tra lại.`
        );
        return true;
      }
    }
    return false;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Gọi API lấy danh sách nhân viên
 * Author: Phạm Đình Duy (05/06/2023)
 */
async function getEmployeeList() {
  try {
    let employees = [];
    await $.ajax({
      type: "GET",
      url: "https://cukcuk.manhnv.net/api/v1/Employees",
      success: function (response) {
        employees = [...response];
      },
    });
    return employees;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Lấy ra thông tin của nhân viên được nhập từ form
 * @returns {Object} : Trả về 1 nhân viên được nhập từ form
 * Author: Phạm Đình Duy (05/06/2023)
 */
function getEmployee() {
  try {
    let employeeCode = $("#input-employeeCode").val();
    let fullName = $("#input-employeeName").val();
    let departmentID = $("#input-department option").filter(":selected").val();
    let positionID = $("#input-employeePosition option")
      .filter(":selected")
      .val();
    let gender = $("input[type='radio'][name='gender']:checked").val();
    let dateOfBirth = $("#input-dateOfBirth").val();
    let identityNumber = $("#input-identityNumber").val();
    let identityDate = $("#input-identityDate").val();
    let identityPlace = $("#input-identityPlace").val();
    let phoneNumber = $("#input-mobiephone").val();
    let email = $("#input-email").val();
    let address = $("#input-address").val();

    let employee = {
      EmployeeCode: employeeCode,
      FullName: fullName,
      DepartmentId: departmentID,
      PositionId: positionID,
      Gender: gender,
      DateOfBirth: dateOfBirth,
      IdentityNumber: identityNumber,
      IdentityDate: identityDate,
      IdentityPlace: identityPlace,
      PhoneNumber: phoneNumber,
      Email: email,
      Address: address,
    };
    return employee;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Gọi API để thêm mới 1 nhân viên
 * Author :Phạm Đình Duy (05/06/2023)
 */
function createEmployee(employee) {
  try {
    $.ajax({
      type: "POST",
      url: "https://cukcuk.manhnv.net/api/v1/Employees",
      data: employee,
      contentType: "application/json",
      dataType: "json",
      success: function (response) {
        // Nếu thành công hiển thị thông báo thêm thành công
        $("#toast__success").show();
        // Sau 3s thông báo tự động ẩn đi
        setTimeout(function () {
          $("#toast__success").hide();
        }, 3000);
        // Thực hiện load lại dữ liệu cho bảng khi đã thêm mới thành công
        loadData();
      },
      error: function (error) {
        let statusCode = error.status;
        switch (statusCode) {
          case 400:
            let errMsg = error.responseJSON.userMsg;
            alert(errMsg);
            break;
          case 500:
            let err = error.responseJSON.userMsg;
            alert(err);
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
 * Xóa hết dữ liệu của các ô input trong form sau khi cất dữ liệu
 * Author: Phạm Đình Duy ( 05/06/2023)
 */
function clearData() {
  try {
    $("#form-employee .textfield__input").val("");
  } catch (error) {
    console.log(error);
  }
}
