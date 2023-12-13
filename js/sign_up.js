"use strict";
import {
  reset,
  validateFirstName,
  validateLastName,
  validateEmail,
  validateDateOfBirth,
  validatePhoneNumber,
  validatePassword,
} from "./validate.js";

import { checkData, postData } from "./ajax.js";

import { restrictAccessSignUp } from "./utils.js";

$(document).ready(function () {
  // check if a token is present which means a user did not logout
  restrictAccessSignUp();

  // console.log("test");
  // login

  // when login button is clicked
  $("#login-button").click(function () {
    // console.log(validateEmail(true));

    // checks if both password and email are in correct format
    if (validatePassword(true) && validateEmail(true)) {
      // ajax call to confirm email and password
      checkData();
    } else {
      Swal.fire(
        "Incorrect Format",
        "Please ensure email and password are in the right format",
        "error"
      );
    }
  });

  // focus out event on first name
  $("#first-name").focusout(function () {
    // console.log($("#first-name").val());

    // if nothing is entered in first name input
    if ($("#first-name").val() == "") {
      // show input is invalid
      $("#first-name").addClass("is-invalid");
    } else {
      // if something is in input then validate first name
      validateFirstName();
    }
  });
  // focus out event on last name
  $("#last-name").focusout(function () {
    // console.log($("#last-name").val());
    if ($("#last-name").val() == "") {
      $("#last-name").addClass("is-invalid");
    } else {
      validateLastName();
    }
  });
  // focus out event on  phone number

  $("#phone-number").focusout(function () {
    // console.log($("#phone-number").val());
    if ($("#phone-number").val() == "") {
      $("#phone-number").addClass("is-invalid");
    } else {
      validatePhoneNumber();
    }
  });
  // focus out event on  date of birth

  $("#date-of-birth").focusout(function () {
    // console.log($("#date-of-birth").val());
    if ($("#date-of-birth").val() == "") {
      $("#date-of-birth").addClass("is-invalid");
    } else {
      validateDateOfBirth();
    }
  });

  // focus out event on  email
  $("#sign-up-email").focusout(function () {
    // console.log($("#sign-up-email").val());
    if ($("#sign-up-email").val() == "") {
      $("#sign-up-email").addClass("is-invalid");
    } else {
      validateEmail();
    }
  });
  // focus out event on password
  $("#sign-up-password").focusout(function () {
    // console.log($("#sign-up-password").val());
    if ($("#sign-up-password").val() == "") {
      $("#sign-up-password").addClass("is-invalid");
    } else {
      validatePassword();
    }
  });

  // when user clicks sign up button validate all field
  $("#sign-up-button").click(function () {
    if (
      validateFirstName() &&
      validateLastName() &&
      validatePhoneNumber() &&
      validateDateOfBirth() &&
      validateEmail() &&
      validatePassword()
    ) {
      //   console.log("all good");
      // if all details are in correct format store in db
      // send data with ajax call
      postData();
    } else {
      //   console.log("not good");
      Swal.fire(
        "Registration failed",
        "Please ensure the information is in correct format",
        "error"
      );
    }
  });
});

// reset all values when create account modal is closed (clicking on x  button icon)
$("#close-modal-button").click(() => {
  reset();
});
