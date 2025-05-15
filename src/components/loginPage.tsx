import { useState } from "react";
import { useNavigate  } from "react-router-dom";
function LoginPage() {
  const navigate = useNavigate()

  const [value, changeValue] = useState({
    userEmail : "",
    userPassword : ""
  });

  const [ parsedRes ,changeParsedRes] = useState('')
  function handelInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value} = e.target;

    changeValue((prev) => ({
      ...prev,
      [name]:  value,
    }));
  }

  async function formSubmitted(e: React.FormEvent) {
    e.preventDefault();
    console.log(value);

    const res = await fetch("http://localhost:2001/LoginUser", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        
        userEmail : value.userEmail,
        userPassword : value.userPassword

      }),
      method: "POST",
    });

    console.log("res.status-----", res.status);

    // if(res.status == 200){
    //     changeIsPhotoUploaded("photo uploaded successfully")
    // }
    // else{
    //     changeIsPhotoUploaded("error in uploading photo")
    // }
    if(res.status == 201){
        alert("account created successfully")
        navigate("/login")
    }
    const hi = await res.json();
    changeParsedRes(hi);
    console.log(parsedRes);
    window.localStorage.setItem("token" , parsedRes?.data.token)
    window.localStorage.setItem("role" , parsedRes.data.role)

    alert("you are now logged in")
    if(parsedRes.data.role == "Admin"){
        navigate("/adminDashboard")
    }
  }
  return (
    <>
      <h1>Log In</h1>

      <form onSubmit={formSubmitted}>

       
        <input
          type="email"
          name="userEmail"
          onChange={handelInputChange}
          placeholder="enter email"
          required
        />

        <input
          type="text"
          name="userPassword"
          onChange={handelInputChange}
          placeholder="enter password"
          required
        />


        <button>send</button>

        </form>
    </>
  );
}

export {LoginPage}
