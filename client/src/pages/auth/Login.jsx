import Form from '@/components/utility/Form';
import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { LoginFormTemplate } from '../../config/config';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import { userLogin } from '@/store/auth-slice';
import { syncLocalCart } from '@/store/customer-slice/cart'; // Import the syncLocalCart action

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginResult = await dispatch(userLogin(formData)).unwrap();

      if (loginResult?.success) {
        toast({
          title: loginResult.message,
        });

        // Sync local cart items with the backend after successful login
        const token = localStorage.getItem('flint_token');
        const userId = loginResult.user.id;
        await dispatch(syncLocalCart({ token, userId })).unwrap();

        // Redirect based on user role
        if (loginResult.user.role === 'ADMIN') {
          navigate('/admin/dashboard');
        } else {
          // Check if there's a redirect path in local storage (e.g., from checkout)
          const redirectPath = localStorage.getItem('redirectPath');
          if (redirectPath) {
            localStorage.removeItem('redirectPath'); // Clear the redirect path
            navigate(redirectPath); // Redirect to the saved path (e.g., checkout)
          } else {
            navigate('/shop/home'); // Default redirect
          }
        }
      }
    } catch (error) {
      toast({
        title: error.payload?.message || 'Login failed. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='mx-auto w-full max-w-md space-y-1'>
      <h1 className='text-3xl font-bold tracking-tight text-foreground-primary'>
        Explore{' '}
        <span className='font-stick-no-bills text-4xl font-bold'>
          FLINT
          <span className='text-red-400 text-5xl'>.</span>
        </span>
      </h1>
      <h1 className='text-1xl font-semibold text-slate-600'>
        Login to your account and explore Flint
      </h1>
      <br />
      <Form
        FormTemplate={LoginFormTemplate}
        FormData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        EventName='Login'
      ></Form>
      <h1 className='text-center'>
        New to Flint?
        <NavLink to='/auth/signup' className='text-violet-700 font-semibold'>
          &nbsp;Sign-Up
        </NavLink>
      </h1>
    </div>
  );
}

export default Login;