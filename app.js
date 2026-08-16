const supabaseUrl = "https://piuwjiifsluzggzojhuz.supabase.co";
const supabaseKey = "sb_publishable_mfss4b_IaFPV7gB9OPXp-A_rIwnB6hW";
const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);

const form = document.querySelector("#studentRegistration")
form.addEventListener("submit",(event)=>{
    event.preventDefault()
    const formData= new FormData(form)
    const data = Object.fromEntries(formData)
console.log(data);
})
