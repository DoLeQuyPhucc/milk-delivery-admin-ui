import React, { useState } from 'react';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from '@/data/UserAPI';
import { toast } from 'react-toastify';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export function SignIn() {
  const handleGoogleLoginSuccess = async (response) => {
    try {
      const res = await axios.post('http://localhost:8000/api/auth/google', { token: response.credential });
      console.log('Google Login Response:', res.data);
      
      if (res.data.error === 'duplicate_email') {
        setError('Email already exists. Please use a different email or log in with your credentials.');
        toast.warn('Email has been registered, please try different email')
      } else {
        navigate('/home');
      }
    } catch (error) {
      console.error('Error during Google login:', error);
      if (error.response) {
        console.error('Response:', error.response.data);
      }
    }
  };
  
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await LogIn(userName, password);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      setError('');
      navigate('/home');
      toast.success("User has logged in successfully");
      console.log("Token:", data.token)
    } catch (err) {
      setError(err.message);
    }
  };  

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              User Name
            </Typography>
            <Input
              size="lg"
              placeholder="username"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="mt-6" fullWidth type="submit">
            Sign In
          </Button>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {user && (
            <div>
              <h3>Welcome, {user.firstName} {user.lastName}</h3>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phoneNumber}</p>
              <p>Role: {user.role}</p>
              <img src={user.avatarImage} alt="Avatar" />
            </div>
          )}

          <div className="flex items-center justify-between gap-2 mt-6">
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center justify-start font-medium"
                >
                  Subscribe me to newsletter
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#">
                Forgot Password
              </a>
            </Typography>
          </div>
          <div className="space-y-4 mt-8">
            <GoogleOAuthProvider clientId="40702596662-b4e2ffmhvjlh104iolkedg8fef9qbddu.apps.googleusercontent.com">
              <div>
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => {
                    console.log('Google Login Failed');
                  }}
                />
              </div>
            </GoogleOAuthProvider>
          </div>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Not registered?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">Create account</Link>
          </Typography>
        </form>

      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}

export default SignIn;
