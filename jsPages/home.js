// get data from user

async function userData() {
  const {
    data: { user },
  } = await client.auth.getUser();

  // show user email

  const userEmail = document.querySelectorAll(".userEmail");
  userEmail.forEach((email) => {
    email.innerHTML = `${user.email}`;
  });

  const { data: studentData, error } = await client
    .from("students_data")
    .select("firstname, lastname, course")
    .eq("user_id", user.id)
    .single();

  if (studentData) {
    console.log(studentData.firstname);
    console.log(studentData.lastname);
    console.log(studentData.course);
  } else {
    console.log(error);
  }

  // show userName

  let userName = document.querySelectorAll(".userName");
  userName.forEach((name) => {
    name.innerHTML = `${studentData.firstname} ${studentData.lastname}`;
  });

  // show hero sec user name
  let userHome = document.querySelector("#user");
  userHome.innerHTML = `${studentData.firstname} ${studentData.lastname}`;

  // show first letter of user
  let firstLetter = document.querySelectorAll(".firstLetter");

  firstLetter.forEach((letter) => {
    letter.innerHTML = `${studentData.firstname[0]}${studentData.lastname[0]}`;
  });

  // show course

  const userCourse = document.querySelector(".course");
  userCourse.innerHTML = `${studentData.course}`;

  const courseImg = document.querySelector(".courseImg");

  if (studentData.course === "Web Development") {
    courseImg.src = "../images/webDev.png";
  } else if (studentData.course === "Data Science") {
    courseImg.src = "../images/dataScience.png";
  } else if (studentData.course === "UI/UX Design") {
    courseImg.src = "../images/ui-uxDesign.png";
  } else if (studentData.course === "Digital Marketing") {
    courseImg.src = "../images/digitalMarketing.png";
  }
}

userData();

// signout user
const signOut = document.querySelectorAll(".signOut");

signOut.forEach((out) => {
  out.addEventListener("click", async () => {
    const { error: signOutError } = await client.auth.signOut();
    if (signOutError) {
      console.log(signOutError.message);
    }
  });
});
