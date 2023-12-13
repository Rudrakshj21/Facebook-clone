"use strict";
import { restrictAccessLogin } from "./utils.js";
import { store_post } from "./ajax.js";

$(document).ready(function () {
  // redirect if user accesses  this page  without token
  restrictAccessLogin();

  // check for existing posts by the current user using their token in the database
  check_post(localStorage.getItem("token"));

  $("#contentError").hide();
  // store_post(localStorage.getItem("token"), "text", "image");

  // profile pic
  let fileUrl = "";
  // post pic
  let postImageUrl = "";
  // console.log("hi");
  checkProfileUrl();
  // check for existing user profile pic url of current user using their token in the database
  function checkProfileUrl() {
    $.ajax({
      url: "../php/get_profile_url.php",
      type: "GET",
      headers: { token: localStorage.getItem("token") },
      dataType: "JSON", //converts response into json
      success: function (response) {
        // console.log("this");
        // console.log(response);
        // profile pic found

        if (response.status == true) {
          // console.log("tests");
          // get url of profile picture
          const imgSrc = response.data.profile_pic_url;
          // set profile picture
          // console.log(imgSrc);
          setProfilePicture(imgSrc);
        } else {
          // profile pic not found
          // ask user to upload their profile pic
          promptForProfilePicture();
        }
        // post
      },
      error: function (error) {
        // console.log("in error of check profile");
        console.log(error);
      },
    });
  }

  function promptForProfilePicture() {
    //  shows a modal which prompts user to upload their profile pic
    $("#staticBackdrop").modal("show");
  }

  //   when profile picture file gets uploaded event

  $("#profilePictureFile").change(function () {
    // using prop method access file
    const reader = new FileReader();
    // file object
    const imageFile = $("#profilePictureFile").prop("files")[0];
    // fileUrl = URL.createObjectURL(imageFile);
    reader.readAsDataURL(imageFile);
    // convert file into url when it loads  (this is triggered when file is completed read using readAsDataURL)
    reader.addEventListener("load", function (e) {
      // console.log(e);
      // console.log(reader.result);

      //  $("#userProfilePicture").attr("src", reader.result);
      fileUrl = reader.result;
    });
  });

  // when upload profile picture  button is clicked
  $("#uploadPictureBtn").click(function () {
    // change user profile

    if (fileUrl !== "") {
      // set user profile picture using the profile pic url
      setProfilePicture(fileUrl);
      // now user can click on close button
      $(".closeButton").removeClass("disabled");
    }
  });

  // sets user profile on the page
  function setProfilePicture(fileUrl) {
    $("#userProfilePicture").attr("src", fileUrl);
    $("#userProfilePicture").css("width", "100px");
    $("#userProfilePicture").css("height", "80px");
    $("#userProfilePicture").css("border-radius", "50%");

    // width: 100px; height: 80px; border-radius: 50%
  }

  // once user has finished uploading the profile pic
  $(".closeButton").click(function () {
    updateProfilePicture(fileUrl);
  });

  // update profile picture url for the current user in database
  function updateProfilePicture(fileUrl) {
    const token = localStorage.getItem("token");
    $.ajax({
      url: "../php/set_profile_url.php",
      type: "POST",
      data: {
        image: fileUrl,
        token: token,
      },
      success: function (response) {
        console.log(response);
      },
      error: function (error) {
        console.log(error);
      },
    });
  }

  // confirm logout (yes)
  $("#confirmLogout").click(() => {
    localStorage.removeItem("token");

    location.replace("../html/sign_up.html");
  });

  // on publish post button check post content
  $("#publishPostButton").click(function () {
    checkPostContent();
  });

  // when use uploads pic for the post event
  $("#postImage").change(function () {
    const imageFile = $("#postImage").prop("files")[0];
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.addEventListener("load", () => {
      // console.log(reader.result);
      postImageUrl = reader.result;
    });
    // console.log(imageUrl);
  });

  // check if user inputs  any content for post
  function checkPostContent() {
    // if user inputs publish post
    if ($("#postContent").val()) {
      // getImageUrl()

      console.log($("#postContent").val());
      // console.log(postImageUrl);
      $("#contentError").hide();
      $("#postContent").addClass("is-valid");
      $("#postContent").removeClass("is-invalid");

      const userProfilePicSrc = $("#userProfilePicture").attr("src");
      publishPost(
        postImageUrl,
        $("#postContent").val(),
        "You",
        userProfilePicSrc,
        "now"
      );
      store_post(
        localStorage.getItem("token"),
        $("#postContent").val(),
        postImageUrl
      );
      $("#postmodal").modal("hide");
    }
    // show error
    else {
      $("#contentError").show();
      $("#postContent").addClass("is-invalid");
      $("#postContent").removeClass("is-valid");
    }
  }

  // checks for existing posts
  function check_post(token) {
    $.ajax({
      url: "../php/user_post/check_post.php",
      type: "GET",
      headers: { token },
      dataType: "JSON", //converts response into json
      success: function (response) {
        // console.log(response.data);

        if (response.status == true) {
          // console.log(response.data);
          const postsArrayObject = response.data;
          const fullname =
            postsArrayObject[0].first_name +
            " " +
            postsArrayObject[0].last_name;

          const profile_pic_url = postsArrayObject[0].profile_pic_url;
          const post_created_time = postsArrayObject[0].created_at;
          // console.log(post_created_time);
          let date = new Date(post_created_time);
          date =
            date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();

          console.log(date);
          // console.log(post_created_time);
          // console.log(fullname);
          postsArrayObject.forEach((post, index) => {
            // console.log(post.post_content,post.post_image_url);//order check
            // console.log(post);
            publishPost(
              post.post_image_url,
              post.post_content,
              fullname,
              profile_pic_url,
              date
            );
          });
        } else {
          console.log("could not fetch any previous posts....");
        }
      },
      error: function (error) {
        console.log(error);
      },
    });
  }

  // renders posts
  function publishPost(imageUrl, content, fullname, profile_pic_url, date) {
    const html = `<div class="card px-3 mt-4 "style="width: 45vw;margin-left:-11px">
    <div class="card-body">
      <h5 class="card-title d-flex gap-3">
        <!-- todo this will be same as user profile -->
        <img
          src="${profile_pic_url}"
          alt=""
          style="width: 40px; height: 40px; border-radius: 50%"
        />
        <div class="d-flex flex-column">
          <span> ${fullname}</span>
          <!-- todo insert time now - created time  -->
          <div
            class="fs-6 text-secondary d-flex align-items-center"
          >
            Posted by You &#183;<span class="ms-1">${date}</span
            ><span class="ms-1 fs-5">&#183;</span>
            <span
              ><i class="ms-1 fa-solid fa-earth-americas fs-6"></i
            ></span>
          </div>
        </div>
      </h5>
      <p class="card-text">
       ${content}
      </p>
    </div>
    <!-- post image -->
    ${
      imageUrl == ""
        ? ""
        : `<img src="${imageUrl}" class="card-img" alt="..." />`
    }
  
    <!-- post footer -->

    <div class="card-body" style="margin-top: -12px">
      <!-- row for like icons -->
      <div
        class="row d-flex justify-content-between align-items-center"
      >
        <div
          class="col-12 d-flex justify-content-between align-items-center"
        >
          <div class="">
            <div class="d-flex align-items-center mt-3">
              <img
                src="../img/like.svg"
                alt=""
                style="margin-right: -5px; z-index: 100"
              />
              <img src="../img/heart.svg" alt="" />
              <span>42k</span>
            </div>
          </div>
          <div>
            <span class="text-secondary">220 comments</span
            ><span class="ms-2 text-secondary">1.7k shares</span>
          </div>
        </div>
        <!-- divider -->
        <div class="px-3">
          <hr class="mt-2" id="divider" />
        </div>
        <!-- row/col for comment share  like buttons -->
        <div class="col">
          <div
            class="row d-flex justify-content-around"
            id="row-like-comment-share"
          >
            <button class="btn text-white col-3">
              <span
                ><i
                  class="fa-regular fa-thumbs-up ms-2 me-2 fs-5 text-secondary"
                ></i
              ></span>
              <span class="ms-1 text-secondary fw-bold"
                >Like</span
              >
            </button>
            <button class="btn text-white col-3">
              <span
                ><i
                  class="fa-regular fa-comments text-secondary"
                ></i
              ></span>
              <span class="ms-1 text-secondary fw-bold"
                >Comment</span
              >
            </button>
            <button class="btn text-white col-3">
              <span
                ><i class="text-secondary fa-solid fa-share"></i
              ></span>
              <span class="ms-1 text-secondary fw-bold"
                >Share</span
              >
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>`;
    $("#postBody").append(html);
  }
});
