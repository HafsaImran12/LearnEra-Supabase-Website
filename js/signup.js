const form = document.querySelector("#studentRegistration");
const resetBtn = document.querySelector("#reset");
const inputs = document.querySelectorAll("input");
const select = document.querySelector("select");


// form submit

form &&
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      // show empty fields

      let emptyField = false;

      // show empty input

      inputs.forEach((input) => {
        if (input.value.trim() === "") {
          input.classList.add("redInput");
          emptyField = true;
        }
      });

      // show empty select

      if (select.value === "") {
        select.classList.add("redInput");
        emptyField = true;
      }

      // show empty radio

      const gender = document.querySelector("input[name='gender']:checked")?.value;
      if (!gender) {
        document.querySelectorAll("input[name='gender']").forEach((radio) => {
          radio.classList.add("redInput");
        });
        emptyField = true;
      }

      // flag

      if (emptyField) return;

      // data convert into object

      const formData = new FormData(form);
      let data = Object.fromEntries(formData);
      let { email, password, firstname, lastname, course, city } = data;

      // connect data to auth (signup)

      const { data: signUpData, error } = await client.auth.signUp({
        email,
        password,
      });

       if (error) {
        Swal.fire({
          icon: "info",
    title: "Account Already Registered",
    text: "This email is already registered. Please login to your account.",
        });
           console.log(error.message);
           
        return
      }

      const id = signUpData?.user?.id;

      // insert user data

      const { error: databaseError } = await client
        .from("students_data")
        .insert({ firstname, lastname, city, gender, course, user_id: id });
        // if (window.location.href.includes("/home.html")){
          window.location.href="./home.html"
    //   }

      if (databaseError) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Fill Correct Data!",
        });
        return
      }
    } catch (error) {
      console.log(error);
    }
  });

// remove class list

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("redInput");
  });
});
select &&
  select.addEventListener("change", () => {
    select.classList.remove("redInput");
  });
document.querySelectorAll("input[name='gender']").forEach((radio) => {
  radio.addEventListener("change", () => {
    document.querySelectorAll("input[name='gender']").forEach((radio) => {
      radio.classList.remove("redInput");
    });
  });
});