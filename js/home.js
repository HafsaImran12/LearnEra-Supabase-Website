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
    .select("firstname, lastname")
    .eq("user_id", user.id)
    .single();

  if (studentData) {
    console.log(studentData.firstname);
    console.log(studentData.lastname);
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
