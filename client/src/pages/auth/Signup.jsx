import Form from '@/components/utility/Form'
import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import {SignupFormTemplate} from '../../config/config'
import { useDispatch } from 'react-redux';
import { userSignup } from '@/store/auth-slice';
import { useToast } from '@/hooks/use-toast';
function Signup() {
  const [formData,setFormData] = useState({
    username : "",
    email : "",
    password : ""
  })
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {toast} = useToast();


  function onSubmit(e){
    e.preventDefault();
    dispatch(userSignup(formData)).then((data) => {
      if(data?.payload?.success){
        toast({
          title : data.payload.message
        });
        navigate('/auth/login');
      }
      else{
        toast({
          title : data.payload.message,
          variant: "destructive"
        });
      }
    });
  }

  return (
    <div className='mx-auto w-full max-w-md space-y-1'>
      <h1 className='text-3xl font-bold tracking-tight text-foreground-primary'>
          Welcome to <span className='font-stick-no-bills text-4xl font-bold'>FLINT
            <span className='text-red-400 text-5xl'>.</span>
          </span></h1>
      <h1 className='text-1xl font-semibold text-slate-600'>Create your new account and explore Flint</h1>
      <br />
      <Form FormTemplate={SignupFormTemplate}
            FormData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            EventName="Sign Up"
      >
      </Form>
      <h1 className='text-center'>Already have an account? 
            <NavLink to="/auth/login" className="text-violet-700 font-semibold">
                &nbsp;Login
            </NavLink>
      </h1>
    </div>
  )
}

export default Signup