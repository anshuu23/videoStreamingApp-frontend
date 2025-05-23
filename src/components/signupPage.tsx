import { FormEvent, useState } from "react";
import "../index.css"
import { useNavigate  } from "react-router-dom";
import { apiRequest } from "../helper/request";
function SignupPage() {
  const [value, setValue] = useState({
    userName : '',
    email : '' ,
    password : ''
  })
          const navigate = useNavigate();

  const [er , changeEr]= useState('')
  const [currentField , changeCurrentField] = useState('')

  const btnClicked = async(e :  FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(value)
    const res : any = await apiRequest('/createAccount' , {
    method : 'POST' ,
     body:{
        userName : value.userName ,
        userEmail : value.email,
        userPassword : value.password 
    }})
    console.log('res---' , res)
    if(res.status == 200){
        alert("account created sucessfully")
        navigate('/user/login')
    }
  }

  const onChange = (e :  React.ChangeEvent<HTMLInputElement>) =>{
    setValue(prev => ({
      ...prev , 
      [e.target.name] : e.target.value
    }))
    validateInput(e.target.name , e.target.value)
    changeCurrentField(e.target.name)
  }

  const validateInput = (name : string ,value : string) =>{

    if(name == "userName"){
      
      if(value.length<3){
        changeEr(`${name} length should me more than 3`)
        
      }
      else if(value.length > 10){
        changeEr(`${name} length must me less than 10`)
      }
      else{
        changeEr('')
      }
      console.log(er)
    }

     else if(name == "email" && !value.includes('@')){
      changeEr(`pls ente rvalid email`)
    }else{
      changeEr(``)
    }

  }

  return (
    <>
    <div className='bg-black min-h-[100vh] font-[Poppins] md:grid grid-cols-2 '>
    
        <div className=" h-[100%] pt-[2%]">
            <div className=" h-[98%] w-[95%] bg-[rgb(47_47_42)] bg-[url(/images/img3.svg)] m-auto rounded-4xl  bg-center bg-no-repeat bg-cover">
                
            </div>
        </div>
      <form action=""  onSubmit={(e)=>{btnClicked(e)}} className='signupForm text-neutral-300 max-w-[300px] m-auto mt-[10vw]' >

        <h1 className="text-3xl font-[Ancizar Sans]      font-extrabold mb-5 text-center">Sign-up</h1>

        <p className="">enter your credentials to Sign-up</p>
        <br />
        Name :
        <br />
        <input type="text" name='userName' value = {value.userName} onChange={(e)=>{onChange(e)}} className='order-black' required/>
        <br />
        {currentField == 'userName' ? er : <></>}
        <br />

        email :
        <input type="email" name='email' value = {value.email} onChange={(e)=>{onChange(e)}} className='border-black' required />
        <br />
        {currentField == 'email' && er ? er : <></>}
        <br />

        Password :
        <input type="password" name='password' value = {value.password} onChange={(e)=>{onChange(e)}} 
        className='border-black' required />
        <br />
        {currentField == 'password' && er ? er : <></>}   
        <br />

        <button type='submit' className="!bg-amber-400 !text-black font-extrabold cursor-pointer ">Sign-up</button>
        <br />
        <br />
        <p>already user ? <a href="/user/login" className="!text-amber-400 underline">log-in</a> to crux</p>
      </form>
     </div>
    </>
  )
}

export {SignupPage}
