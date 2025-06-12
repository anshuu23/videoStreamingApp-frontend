import { FormEvent, useState  } from "react";
import "../index.css"
import { useNavigate  } from "react-router-dom";
import { apiRequest } from "../helper/request";
function LoginPage() {
  const [value, setValue] = useState({
    userName : '',
    email : '' ,
    password : ''
  })
    const navigate = useNavigate();

  const [er , changeEr]= useState('')
  const [currentField , changeCurrentField] = useState('')
const [errorFromServer , ChangeErrorFromServer]= useState('')


  const btnClicked = async(e :  FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(value)
    const res : any = await apiRequest('/loginUser' , {
    method : 'POST' ,
     body:{
        userEmail : value.email,
        userPassword : value.password 
    }})
    console.log('res---' , res)
    if(res.status == 200){
        localStorage.setItem("token" , res.data)
         console.log(res.status)
        navigate('/')
    }
    else if(res.error.statusCode == 400){
        ChangeErrorFromServer(res.msg)
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

    if(name == "userName" || name == "password"){
      
      if(value.length<5){
        changeEr(`${name} length should me more than 5`)
        
      }
      else if(value.length > 30){
        changeEr(`${name} length must me less than 30`)
      }
      else{
        changeEr('')
      }
      console.log(er)
    }

     else if(name == "email" && !value.includes('@')){
      changeEr(`pls ente valid email`)
    }else{
      changeEr(``)
    }

  }

  return (
    <>
    <div className=' min-h-[100vh] font-[Poppins] md:grid grid-cols-2 '>
    
        <div className=" h-[100%] pt-[2%]  bg-no-repeat bg-cover text-white ">
            <div className=" h-[98%] w-[95%]  m-auto rounded-4xl bg-[url(/images/loginPage.png)] bg-center bg-no-repeat bg-cover p-6 flex flex-col justify-between">
                <h1 className="text-2xl font-bold text-amber-400 ">CRUX</h1>
                
                <br />
                <p className="font-light">
                    <p className="text-2xl mb-3.5 ">Core-Level Performance. <br />Every <span className="text-zinc-500">Stream.</span> </p>
                    
                    CRUX is a high-performance video streaming platform built for speed, quality, and simplicity. We focus on what truly matters — delivering seamless, bitrate-optimized content without the noise. Whether you're watching or uploading, CRUX keeps things fast, clean, and reliable.</p>
            </div>
        </div>
      <form action=""  onSubmit={(e)=>{btnClicked(e)}} className='signupForm text-neutral-300 max-w-[300px] m-auto mt-[10vw]' >

        <h1 className="text-3xl font-[Ancizar Sans]      font-extrabold mb-5 text-center">Log-in</h1>

        <p className="">enter your credentials to log-in</p>
            
        <br />
        <p className="text-gray-300"> Demo Credentials:</p>
        <p><b>Email :</b> anshumj321@gmail.com</p>
        <p> <b>Password :</b>12345</p>
        <br />
        
        Email :
        <input type="email" name='email' value = {value.email} onChange={(e)=>{onChange(e)}} className='border-black' required />
        <br />
        {currentField == 'email' && er ? <p className="text-red-700"> {er} </p> : <></>}
        <br />

        Password :
        <input type="password" name='password' value = {value.password} onChange={(e)=>{onChange(e)}} 
        className='border-black' required minLength={5} maxLength={30} />
        <br />
        {currentField == 'password' && er ?<p className="text-red-700"> {er} </p> : <></>}   
        <br />
        <button type='submit' className="!bg-amber-400 !text-black font-extrabold cursor-pointer ">log-in</button>
        <br />
        {errorFromServer && (
            <p className="text-red-700">{ errorFromServer} </p>
        )

        }
        <br />
        <p>new user ? <a href="/user/signup" className="!text-amber-400 underline">sign-up</a> to crux</p>

        
      </form>
     </div>
    </>
  )
}

export {LoginPage}
