import { redirectAlert } from "./utils.js";

export function checkData() {
  $.ajax({
    url: "../php/login.php",
    type: "POST",
    data: {
      email: $("#login-email").val(),
      password: $("#login-password").val(),
    },
    success: function (response) {
      // todo check status true or false
      // if true utils alert and redirect
      // console.log(token);
      const responseObject = JSON.parse(response);
      console.log(responseObject);
      if (responseObject.status) {
        const token = responseObject.data;
        // set token in local storage
        localStorage.setItem("token", token);
        redirectAlert();
        setTimeout(() => {
          location.href = "../html/profile.html";
        }, 2000);
      } else {
        Swal.fire("Log in Failed", "Incorrect Email or Password", "error");
      }

      console.log(response);
    },
    error: function (error) {
      console.error(error);
    },
  });
}

export function postData() {
  $.ajax({
    url: "../php/sign_up.php",
    type: "POST",
    data: {
      "first-name": $("#first-name").val(),
      "last-name": $("#last-name").val(),
      "phone-number": $("#phone-number").val(),
      "date-of-birth": $("#date-of-birth").val(),
      "sign-up-email": $("#sign-up-email").val(),
      "sign-up-password": $("#sign-up-password").val(),
    },
    success: function (response) {
      const responseObject = JSON.parse(response);
      if (responseObject.status == false) {
        Swal.fire("Error", responseObject.message, "error");
        console.log($("#create-account-modal"));
        $("#create-account-modal").modal("hide");
      } else {
        Swal.fire("Signed up", "You can now log in", "success");
        $("#create-account-modal").modal("hide");
      }
    },
    error: function (error) {
      console.error(error);
      Swal.fire("Oops", error, "error");
    },
  });
}

export function store_post(token, postContent, postImageUrl) {
  $.ajax({
    url: "../php/user_post/store_post.php",
    type: "POST",
    data: { token, postContent, postImageUrl },
    dataType: "JSON", //converts response into json
    success: function (response) {
      console.log(response);

      if (response.status == true) {
        console.log("stored..user post..success");
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
}

// export function publishPostNow(imageUrl, content) {
//   const html = `<div class="card px-2 mt-4">
//   <div class="card-body">
//     <h5 class="card-title d-flex gap-3">
//       <!-- todo this will be same as user profile -->
//       <img
//         src="../img/post2.avif"
//         alt=""
//         style="width: 40px; height: 40px; border-radius: 50%"
//       />
//       <div class="d-flex flex-column">
//         <span>You </span>
//         <!-- todo insert time now - created time  -->
//         <div
//           class="fs-6 text-secondary d-flex align-items-center"
//         >
//           Posted by You &#183;<span class="ms-1">time</span
//           ><span class="ms-1 fs-5">&#183;</span>
//           <span
//             ><i class="ms-1 fa-solid fa-earth-americas fs-6"></i
//           ></span>
//         </div>
//       </div>
//     </h5>
//     <p class="card-text">
//      ${content}
//     </p>
//   </div>
//   <!-- post image -->
//   <img src="${imageUrl}" class="card-img" alt="..." />
//   <!-- post footer -->

//   <div class="card-body" style="margin-top: -12px">
//     <!-- row for like icons -->
//     <div
//       class="row d-flex justify-content-between align-items-center"
//     >
//       <div
//         class="col-12 d-flex justify-content-between align-items-center"
//       >
//         <div class="">
//           <div class="d-flex align-items-center mt-3">
//             <img
//               src="../img/like.svg"
//               alt=""
//               style="margin-right: -5px; z-index: 100"
//             />
//             <img src="../img/heart.svg" alt="" />
//             <span>42k</span>
//           </div>
//         </div>
//         <div>
//           <span class="text-secondary">220 comments</span
//           ><span class="ms-2 text-secondary">1.7k shares</span>
//         </div>
//       </div>
//       <!-- divider -->
//       <div class="px-3">
//         <hr class="mt-2" id="divider" />
//       </div>
//       <!-- row/col for comment share  like buttons -->
//       <div class="col">
//         <div
//           class="row d-flex justify-content-around"
//           id="row-like-comment-share"
//         >
//           <button class="btn text-white col-3">
//             <span
//               ><i
//                 class="fa-regular fa-thumbs-up ms-2 me-2 fs-5 text-secondary"
//               ></i
//             ></span>
//             <span class="ms-1 text-secondary fw-bold"
//               >Like</span
//             >
//           </button>
//           <button class="btn text-white col-3">
//             <span
//               ><i
//                 class="fa-regular fa-comments text-secondary"
//               ></i
//             ></span>
//             <span class="ms-1 text-secondary fw-bold"
//               >Comment</span
//             >
//           </button>
//           <button class="btn text-white col-3">
//             <span
//               ><i class="text-secondary fa-solid fa-share"></i
//             ></span>
//             <span class="ms-1 text-secondary fw-bold"
//               >Share</span
//             >
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>`;
//   $("#postBody").append(html);
// }
