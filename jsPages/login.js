const studentLogin = document.querySelector("#studentLogin");
const inputs = document.querySelectorAll("#studentLogin input");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

// login submit
studentLogin.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    // emptyFields error

    let emptyField = false;
    inputs.forEach((input) => {
      if (input.value.trim() == "") {
        input.classList.add("redInput");
        emptyField = true;
      }
    });

    if (emptyField) return;

    // login user
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Swal.fire({
          icon: "error",
        title: "Login Failed",
        text: "The email or password you entered is incorrect.",
      });
      return;
    }

    console.log(data);
    console.log(error);
    

    window.location.href = "./home.html";
  } catch (error) {
    console.log(error);
  }
});

// remove error
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("redInput");
  });
});
