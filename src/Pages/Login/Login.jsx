import React, { useState } from 'react';
import { useFormik } from 'formik';
import { loginSchema } from '../../Schemas/index';
import { Link } from 'react-router-dom';
import '../Registration/Registration.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../../config';

const initialValues = {
  identifier: '',
  password: '',
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        console.log('Login Form Values:', values);
        action.resetForm();
      },
    });

  const loginHandle = () => {
    axios
      .post(`${baseUrl}/user/login`, {
        identifier: values.identifier, // Add the identifier value here
        password: values.password,
      })
      .then((data) => {
        console.log(data.data);
        if (data.data.status === 200) {
          localStorage.setItem('userInfo', data.data.token);
          toast.success(data.data.message);
          navigate('/home/LandingPage');
        } else {
          toast.error(data.data.message);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="heading-tab">
        <h1></h1>
      </div>
      <div className="container">
        <div className="modal">
          <div className="modal-container">
            <div className="modal-left">
              <h1 className="modal-title">welcome !</h1>
              <p className="modal-desc">Login to your account</p>
              <ToastContainer
                position="bottom-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
              <form onSubmit={handleSubmit}>
                <div className="input-block">
                  <label htmlFor="identifier" className="input-label">
                    Username or Email
                  </label>
                  {/* <input
                    type="text"
                    autoComplete="off"
                    name="identifier"
                    id="identifier"
                    placeholder="Username or Email"
                    value={values.identifier}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{lg:w-[50%] }}
                  /> */}
                  <input
                    type="text"
                    autoComplete="off"
                    name="identifier"
                    id="identifier"
                    placeholder="Username or Email"
                    value={values.identifier}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      width: '100%', // Default width for mobile
                      maxWidth: '300px', // Limit max width on larger screens
                      padding: '8px 12px', // Add spacing for better usability
                      fontSize: '16px', // Default font size
                      border: '1px solid #ccc', // Add a border
                      borderRadius: '4px', // Rounded corners
                      boxSizing: 'border-box', // Ensure padding doesn't affect width
                      '@media (min-width: 1024px)': {
                        width: '50%', // Apply 50% width for desktop
                      },
                    }}
                  />

                  {errors.identifier && touched.identifier ? (
                    <p className="form-error">{errors.identifier}</p>
                  ) : null}
                </div>
                <div className="input-block">
                  <label
                    htmlFor="password"
                    className="input-label"
                    onClick={() => setShowPassword(!showPassword)}
                    color="black"
                  >
                    Password 👁️
                  </label>

                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="off"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      width: '100%', // Default width for mobile
                      maxWidth: '300px', // Limit max width on larger screens
                      padding: '8px 12px', // Add spacing for better usability
                      fontSize: '16px', // Default font size
                      border: '1px solid #ccc', // Add a border
                      borderRadius: '4px', // Rounded corners
                      boxSizing: 'border-box', // Ensure padding doesn't affect width
                      '@media (min-width: 1024px)': {
                        width: '50%', // Apply 50% width for desktop
                      },
                    }}
                  />
                  {errors.password && touched.password ? (
                    <p className="form-error">{errors.password}</p>
                  ) : null}
                </div>
                <div className="modal-buttons">
                  <button
                    className="input-button"
                    type="submit"
                    onClick={() => {
                      loginHandle();
                    }}
                    style={{
                      width: '100%', // Default width for mobile
                      maxWidth: '300px', // Limit max width on larger screens
                      padding: '8px 12px', // Add spacing for better usability
                      fontSize: '16px', // Default font size
                      margin: "auto",
                      border: '1px solid #ccc', // Add a border
                      borderRadius: '4px', // Rounded corners
                      boxSizing: 'border-box', // Ensure padding doesn't affect width
                      '@media (min-width: 1024px)': {
                        width: '50%', // Apply 50% width for desktop
                      },
                    }}
                  >
                    Login
                  </button>
                </div>
              </form>
              <p className="sign-up">
                Forgot Password?
                <Link to="/reset-password">Reset Now</Link>
              </p>
              <p className="sign-up">
                Don't have an account? <Link to="/">Sign Up now</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import { loginSchema } from '../../Schemas/index';
// import { Link, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import baseUrl from '../../config';

// const initialValues = {
//   identifier: '',
//   password: '',
// };

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
//     initialValues,
//     validationSchema: loginSchema,
//     onSubmit: (values, action) => {
//       console.log('Login Form Values:', values);
//       loginHandle();
//     },
//   });

//   const loginHandle = () => {
//     axios
//       .post(`${baseUrl}/user/login`, {
//         identifier: values.identifier,
//         password: values.password
//       })
//       .then((response) => {
//         const data = response.data;
//         if (data.status === 200) {
//           localStorage.setItem('userInfo', data.token);
//           toast.success(data.message);
//           navigate('/home/LandingPage');
//         } else {
//           toast.error(data.message);
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error('An error occurred. Please try again.');
//       });
//   };

//   return (
//     <div className="container">
//       <div className="card">
//         <h1 className="title">Police Division Portal</h1>
//         <h2 className="subtitle">Login</h2>
//         <form onSubmit={handleSubmit} className="form">
//           <div className="input-group">
//             <label htmlFor="identifier" className="label">
//               Username or Email
//             </label>
//             <input
//               type="text"
//               id="identifier"
//               name="identifier"
//               className="input"
//               placeholder="Enter username or email"
//               value={values.identifier}
//               onChange={handleChange}
//               onBlur={handleBlur}
//             />
//             {errors.identifier && touched.identifier && (
//               <p className="error">{errors.identifier}</p>
//             )}
//           </div>
//           <div className="input-group">
//             <label htmlFor="password" className="label">
//               Password
//             </label>
//             <div className="password-input">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 id="password"
//                 name="password"
//                 className="input"
//                 placeholder="Enter password"
//                 value={values.password}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />
//               <button
//                 type="button"
//                 className="password-toggle"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? 'Hide Password' : 'Show Password'}
//               </button>
//             </div>
//             {errors.password && touched.password && (
//               <p className="error">{errors.password}</p>
//             )}
//           </div>
//           <button
//             type="submit"
//             className="button"
//           >
//             Login
//           </button>
//         </form>
//         <div className="links">
//           <Link to="/reset-password" className="link">
//             Forgot Password?
//           </Link>
//           <Link to="/" className="link">
//             Don't have an account? Sign Up
//           </Link>
//         </div>
//       </div>
//       <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
//     </div>
//   );
// };

// export default Login;
