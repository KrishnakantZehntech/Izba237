// Get the input field
const inputEmail = document.getElementById("LemailAddress");
const inputPassword = document.getElementById("Lpassword");

inputEmail.removeAttribute("required");
inputPassword.removeAttribute("required");

// error handaling
function showError(selector, message) {
  $(selector).text(message).show();
}

function hideError(selector) {
  $(selector).hide();
}

//Emial error
function showAllErrorsEmail() {
  const LemailAddress = $("#LemailAddress").val();

  if (!LemailAddress) {
    showError("#lemailError", "Email Address should not be blank");
    return false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(LemailAddress)) {
    showError("#lemailError", "Invalid Email Address");
    return false;
  } else {
    hideError("#lemailError");
    return true;
  }
}
//Password error
function showAllErrorsPassword() {
  const Lpassword = $("#Lpassword").val();

  if (!Lpassword) {
    showError("#lPassError", "Password should not be blank");
    return false;
  } else {
    hideError("#lPassError");
    return true;
  }
}

// Hide errors when the user starts typing in the specific field
$("#LemailAddress").on("input", function () {
  if ($(this).val()) {
    hideError("#lemailError");
    hideError("#headerBlock");
  } else {
    showError("#lemailError", "Email Address should not be blank");
  }
});

$("#Lpassword").on("input", function () {
  if ($(this).val()) {
    hideError("#lPassError");
    hideError("#headerBlock");
  } else {
    showError("#lPassError", "Password should not be blank");
  }
});

// User Login------------------------------------------------------------------------------
$(document).ready(function () {
  // document.getElementById("Lpassword").type = "text";

  $("#SignIpButton").click(function () {
    showAllErrorsEmail();
    showAllErrorsPassword();
    if (showAllErrorsEmail() && showAllErrorsPassword()) {
      const LemailAddress = $("#LemailAddress").val();
      const Lpassword = $("#Lpassword").val();

      // If any of the fields have errors, prevent form submission
      //if (!LemailAddress || !Lpassword) {
      //  return false;
      //   }

      // If all fields are valid, proceed with the login submission
      $.ajax({
        url: "https://api.backendless.com/4921FD25-45AC-9E96-FF7F-865537F72100/6B4F94DC-59DA-42A3-AC9D-C7974DD0B601/users/login",
        type: "POST",
        data: JSON.stringify({ login: LemailAddress, password: Lpassword }),
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        success: function (data) {
          $("#sign-in-form").show();
          // Store user data in localStorage for session management
          localStorage.setItem("userData", JSON.stringify(data));
          document.getElementById("LemailAddress").value = "";
          document.getElementById("Lpassword").value = "";
          // Set the success message for the login
          $("#loginSuccessmessage").show();
          // .text("Login Successful")
          // .css({ display: "block", color: "green" });
          $("#loginSection").hide();
          $("#loginBtn").hide();
          $("#UserNameBlock").show();
          document.getElementById("UserNameText").innerHTML = data.first_name;

          // Redirect to another page after successful login
          const redirectUrl =
            "https://izba-exchange.webflow.io/fulfillment-contract";
          window.location.href = redirectUrl;
        },
        error: function (error) {
          console.log(error);

          $("#loginSuccessmessage").hide();
          $("#headerBlock")
            .text(
              "Error: Login failed. Please check your credentials and try again."
            )
            .css({ display: "block", color: "red" });
          $("#sign-in-form").show();
        },
      });
    }
  });
});
