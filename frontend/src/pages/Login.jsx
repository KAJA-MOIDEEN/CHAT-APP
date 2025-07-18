import { useContext, useEffect, useRef, useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import axios from "axios";
import { backendUrl } from '../../config';
import toast from 'react-hot-toast';
import { AuthContext } from '../authcontext/AuthContext';
import LoadingButton from '../components/LoadingButton';
import assets from '../assets/assets';

const Login = () => {
  const { setToken, state, setState, navigate, loading, setLoading, signup, login } = useContext(AuthContext);
  const refFullName = useRef(null);
  const refUserName = useRef(null);
  const refGenderMale = useRef(null);
  const refGenderFemMale = useRef(null);
  const refGenderOthers = useRef(null);
  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const refConfirmPassword = useRef(null);
  const refPhone = useRef(null);
  const [show, setShow] = useState({ password: false, confirmPassword: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state === "Signup") {
      const gender = refGenderMale.current.checked
        ? "male"
        : refGenderFemMale.current.checked
          ? "female"
          : refGenderOthers.current.checked
            ? "others"
            : null;

      const data = {
        fullName: refFullName?.current.value,
        userName: refUserName?.current.value,
        gender: gender,
        phone: refPhone?.current.value,
        email: refEmail?.current.value,
        password: refPassword?.current.value,
        confirmPassword: refConfirmPassword?.current.value
      };
      signup(data);
    } else {
      const data = {
        email: refEmail?.current.value,
        password: refPassword?.current.value
      };
      login(data);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setToken(token);
    if (token) {
      navigate("/");
    }
  }, []);

  // Toggle password visibility function
  const togglePasswordVisibility = (field) => {
    setShow(prevState => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

  return (
    <div className="bg-cover bg-center h-screen flex items-center justify-center bg-gray-900 text-white relative select-none">
      <img src={assets.loginBG} alt="background" className="absolute inset-0 h-full w-full object-cover z-0 opacity-30" />

      <form onSubmit={handleSubmit} className="relative z-10 bg-opacity-10 border border-white/70 px-6 py-8 backdrop-blur-md rounded-lg sm:w-[420px] w-full mx-4">
        <h1 className="text-center text-2xl font-semibold mb-8">{state === "Signup" ? "Signup" : "Login"}</h1>

        <div className="space-y-4">
          {state === "Signup" && (
            <>
              <div className="flex items-center border border-white/70 px-4 rounded-full">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="bg-transparent text-lg flex-1 py-3 text-white placeholder-white focus:outline-none"
                  ref={refFullName}
                />
                <i className="ri-account-circle-fill text-xl"></i>
              </div>

              <div className="flex items-center border border-white/70 px-4 rounded-full">
                <input
                  type="text"
                  placeholder="User Name"
                  required
                  className="bg-transparent text-lg flex-1 py-3 text-white placeholder-white focus:outline-none"
                  ref={refUserName}
                />
                <i className="ri-user-fill text-xl"></i>
              </div>
              <div className="flex items-center border border-white/70 px-4 rounded-full">
                <input
                  type="number"
                  placeholder="phone"
                  required
                  className="bg-transparent text-lg flex-1 py-3 text-white placeholder-white focus:outline-none"
                  ref={refPhone}
                />
                <i className="ri-cell-fill text-xl"></i>
              </div>
              {/* Gender Selection */}
              <div className="flex items-center justify-between border border-white/70 px-4 py-3 rounded-full space-x-4 text-white">
                <span className="text-white">Gender:</span>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="gender" ref={refGenderMale} value="male" className="text-white focus:ring-2 focus:ring-white cursor-pointer " />
                  <span className='cursor-pointer hover:underline'>Male</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="gender" ref={refGenderFemMale} value="female" className="text-white focus:ring-2 focus:ring-white cursor-pointer" />
                  <span className='cursor-pointer hover:underline'>Female</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="gender" ref={refGenderOthers} value="others" className="text-white focus:ring-2 focus:ring-white cursor-pointer" />
                  <span className='cursor-pointer hover:underline'>Others</span>
                </label>
              </div>
            </>
          )}

          <div className="flex items-center border border-white/70 px-4 rounded-full">
            <input
              type="email"
              placeholder="Email ID"
              required
              className="bg-transparent flex-1 py-3 text-lg text-white placeholder-white focus:outline-none"
              ref={refEmail}
            />
            <i className="ri-mail-fill text-xl"></i>
          </div>

          <div className="flex items-center border border-white/70 px-4 rounded-full">
            <input
              type={show.password ? 'text' : 'password'}
              placeholder="Password"
              required
              className="bg-transparent flex-1 py-3 text-lg text-white placeholder-white focus:outline-none"
              ref={refPassword}
            />
            <i className="ri-lock-2-fill text-xl" onClick={() => togglePasswordVisibility('password')}></i>
          </div>

          {state === "Signup" && (
            <div className="flex items-center border border-white/70 px-4 rounded-full">
              <input
                type={show.confirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                required
                className="bg-transparent flex-1 py-3 text-lg text-white placeholder-white focus:outline-none"
                ref={refConfirmPassword}
              />
              <i className="ri-lock-2-fill text-xl" onClick={() => togglePasswordVisibility('confirmPassword')}></i>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <input type="checkbox" className="w-4 h-4 text-white rounded" />
            <label className="text-white">Remember me</label>
          </div>

          <button className="text-white hover:underline">Forgot Password?</button>
        </div>

        {loading ? (
          <LoadingButton />
        ) : (
          <button type="submit" className="w-full py-3 mt-6 bg-white text-black font-semibold rounded-full hover:bg-gray-200">
            {state === "Signup" ? "Signup" : "Login"}
          </button>
        )}

        {state === "Signup" ? (
          <div onClick={() => setState("Login")} className="text-sm text-center mt-4">
            Already have an account? <div href="#" className="text-white font-medium hover:underline">Login</div>
          </div>
        ) : (
          <div onClick={() => setState("Signup")} className="text-sm text-center mt-4">
            Don't have an account? <div className="text-white font-medium hover:underline">Register</div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
