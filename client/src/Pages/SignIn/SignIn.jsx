import React, { useState } from 'react'
import { FaUserSecret } from "react-icons/fa";
import character from "../../assets/character.svg"
import { useDispatch } from "react-redux"
import "./SignIn.css"
import { Link } from "react-router-dom"
import Navbar from '../../components/Navbar';
import { userLogin } from '../../http';
import { toast } from 'react-toastify';
import { setUser } from '../../store/user.slice';
import { useNavigate } from 'react-router-dom';

const initialState = {
  emailAndUsername: "",
  password: ""
}

function SignUp() {

  const [isChecked, setIsChecked] = useState(true);
  const [inputs, setInputs] = useState(initialState)
  const [showHide, setShowHide] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()





  const handleInputChanges = e => {
    setInputs(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }


  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (!inputs.emailAndUsername || !inputs.password) {
        return toast.error("All fields are required.", {
          icon: "😓"
        })
      }
      const { data } = await userLogin(inputs);
      if (data.reqStatus) {
        const User = {
          auth: data.data.auth,
          user: data.data.userDto
        }
        dispatch(setUser(User))
        setInputs(initialState)
        navigate('/')
      }
      toast.success("Welcome to Kira.", {
        icon: "🎉"
      })
    }
    catch (e) {
      console.log(e)
      toast.error("e.response.data.data", {
        icon: "😰"
      })
    }
  }



  async function handleGuestLogin(e) {
    e.preventDefault()
    try {
      const payload = {
        emailAndUsername: "Guest",
        password: "Guest"
      }
      const { data } = await userLogin(payload);
      if (data.reqStatus) {
        const User = {
          auth: data.data.auth,
          user: data.data.userDto
        }
        dispatch(setUser(User))
        navigate('/')
      }
      toast.success("You are logged in as a guest.", {
        icon: "🎉"
      })
    }
    catch (e) {
      console.log(e)
      toast.error("e.response.data.data", {
        icon: "😰"
      })
    }
  }


  return (
    <div className='bg-secondary-light text-black min-h-screen max-h-screen flex items-center justify-center'>
      <Navbar _Route={"SignUp"} />
      <img className='login-character-image absolute bottom-10 right-20' src={character} alt="" />
      <div className='form-body px-12 py-12 bg-white  w-form-width-login  relative z-50 rounded-3xl shadow-sm'>
        <h1 className='signup__form__welcome text-center mb-10 text-2xl'>Agent Login</h1>
        <form className='w-full h-full' onSubmit={handleSubmit} action="">
          <div class="flex flex-col w-full border-opacity-50">
            <div class="grid card rounded-box place-items-center">
              <div class="form-control w-full max-w-full mb-2">
                <label class="label">
                  <span class="label-text">Enter email or username</span>
                </label>
                <input type="text" name='emailAndUsername' value={inputs.emailAndUsername} onChange={handleInputChanges} placeholder="Email / Username" class="bg-secondary-light input input-bordered w-full max-w-full" />
              </div>
              <div class="form-control w-full max-w-full mb-2 relative select-none">
                <label class="label">
                  <span class="label-text">What is your password?</span>
                </label>
                <input type={showHide ? "text" : "password"} name='password' value={inputs.password} onChange={handleInputChanges} placeholder="eg. stay strong" class="bg-secondary-light select-none input input-bordered w-full max-w-full relative" />
                <span onClick={(e) => {
                  setShowHide(prev => !prev);
                }} className='text-gray-600 cursor-pointer absolute right-6 h-12 flex items-center justify-center bottom-0'>{!showHide ? "Show" : "Hide"}</span>
              </div>
              <div className="flex w-full justify-between items-center mb-6">
                <div className='checkbox-wrapper '>
                  <label class="cursor-pointer label">
                    <input type="checkbox" className={isChecked ? "checked" : ""} checked={isChecked} onChange={(e) => setIsChecked(prev => !prev)} />
                    <span class="label-text">Terms & Conditions</span>
                  </label>
                </div>
                <label class="label">
                  <Link to="/troubleshoot" class="label-text-alt link text-sm  link-hover">Having trouble in sign in?</Link>
                </label>
              </div>
              <button className="pushable normal-case mt-2 rounded-full">
                <span className="front rounded-full w-56 py-3">
                  Sign in
                </span>
              </button>
            </div>
            <div class="divider my-8">Alternatively, you may give a guest visit.</div>
            <div class=" flex w-full text-center justify-center">
              <button onClick={handleGuestLogin} className="btn mr-3 normal-case rounded-xl bg-transparent border-1 border-solid border-black/10 text-black hover:bg-transparent"><FaUserSecret className='mr-2' />Guest Visit</button>
            </div>
          </div>
          <p className='text-sm text-center mt-6'><span className='text-gray-500 mr-2'>Don't have an account?</span>
            <Link className='cursor-pointer' to="/SignUp">Request now</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignUp

