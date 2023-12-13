export function reset() {
  // resets all fields 
  $("#first-name").val("");
  $("#last-name").val("");
  $("#phone-number").val("");
  $("#date-of-birth").val("");
  $("#sign-up-email").val("");
  $("#sign-up-password").val("");
}

// validate first name
export function validateFirstName() {
  const string = $("#first-name").val();
  //   console.log(string);
  // first name should be at least 3 character long 
  const regex = /^[A-Za-z]{3,}/g;
  //   console.log(regex.test(string));
  if (regex.test(string) == true) {
    // console.log(true);
    $("#first-name").removeClass("is-invalid");
    $("#first-name").addClass("is-valid");
    return true;
  } else {
    $("#first-name").addClass("is-invalid");
    $("#first-name").removeClass("is-valid");
    swal.fire("Error","3 or more alphabets only ","warning");
    return false;
  }
}
// validate last name
export function validateLastName() {
  const string = $("#last-name").val();
  //   console.log(string);
  // last name should also be at least 3 character long
  const regex = /^[A-Za-z]{3,}/g;
  //   console.log(regex.test(string));
  if (regex.test(string) == true) {
    // console.log(true);
    $("#last-name").removeClass("is-invalid");
    $("#last-name").addClass("is-valid");
    return true;
  } else {
    $("#last-name").addClass("is-invalid");
    $("#last-name").removeClass("is-valid");
    swal.fire("Error","3 or more alphabets only ","warning");
    return false;
  }
}
export function validatePhoneNumber() {
  const string = $("#phone-number").val();
  //   console.log(string);
  //   start with 6 7 8 9 in india then 9 digits i.e total 10
  const regex = /^[9867][\d]{9}$/g;
  //   console.log(regex.test(string));
  if (regex.test(string) == true) {
    // console.log(true);
    $("#phone-number").removeClass("is-invalid");
    $("#phone-number").addClass("is-valid");
    return true;
  } else {
    $("#phone-number").addClass("is-invalid");
    $("#phone-number").removeClass("is-valid");
    swal.fire("Error","starts with 6,7,8,9 and 10 digits only","warning");
    return false;
  }
}
export function validateDateOfBirth() {
  const string = $("#date-of-birth").val();

  const date = new Date(string);
  const year = date.getFullYear();
  // should be at least 12 years old 
  if (2023 - year >= 12) {
    // console.log(true);
    $("#date-of-birth").removeClass("is-invalid");
    $("#date-of-birth").addClass("is-valid");
    return true;
  } else {
    $("#date-of-birth").addClass("is-invalid");
    $("#date-of-birth").removeClass("is-valid");
    swal.fire("Error","Must be at least 12 years old","warning");
    return false;
    
  }
}
export function validateEmail(loginDetails = false) {
  //   console.log(string);
  const regex = /^\w{3,}@\w{3,}\.\w{2,}$/;
  //   console.log(regex.test(string));

  // validating of login email
  if (loginDetails) {
    const string = $("#login-email").val();
    if (regex.test(string) == true) {
      // console.log(true);
      $("#login-email").removeClass("is-invalid");
      $("#login-email").addClass("is-valid");
      return true;
    } else {
      $("#login-email").addClass("is-invalid");
      $("#login-email").removeClass("is-valid");
      
      return false;
    }
  }
  // validating of sign up email
  else {
    const string = $("#sign-up-email").val();
    if (regex.test(string) == true) {
      // console.log(true);
      $("#sign-up-email").removeClass("is-invalid");
      $("#sign-up-email").addClass("is-valid");
      return true;
    } else {
      $("#sign-up-email").addClass("is-invalid");
      $("#sign-up-email").removeClass("is-valid");
      return false;
    }
  }
}
export function validatePassword(loginDetails = false) {
  const regex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\\-])(?=.*[0-9]).{6,}$/;
  // console.log(loginDetails + "login");
//  validation of login password
  if (loginDetails) {
    const string = $("#login-password").val();

    if (regex.test(string) == true) {
      // console.log(true);
      $("#login-password").removeClass("is-invalid");
      $("#login-password").addClass("is-valid");
      return true;
    } else {
      $("#login-password").addClass("is-invalid");
      $("#login-password").removeClass("is-valid");
      return false;
    }
  } else {
    // validation of sign up password
    const string = $("#sign-up-password").val();
    //   console.log(string);
    //   console.log(regex.test(string));
    if (regex.test(string) == true) {
      // console.log(true);
      $("#sign-up-password").removeClass("is-invalid");
      $("#sign-up-password").addClass("is-valid");
      return true;
    } else {
      $("#sign-up-password").addClass("is-invalid");
      $("#sign-up-password").removeClass("is-valid");
      return false;
    }
  }
}

 