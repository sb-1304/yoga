import { Navigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useState } from "react";

import { POST } from "../Apis/Apis"
import CONSTANTS from "../CONSTANTS.json";
import { setUser, setLoadingFalse, setLoadingTrue } from "../Redux/loginSlicer";
import { setCurrentTab } from "../Redux/appData";
import { customDate } from "../common";

const LogIn = () => {
  const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const user = useSelector(_ => _.user);
  const [isStudent, setIsStudent] = useState(true);

  const dispatch = useDispatch();

  const handleDropdown = (e) => {
    setIsStudent(e.target.value === "student" ? true : false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    if (!pattern.test(email.value)) {
      alert("Please enter valid email address");
      return;
    }

    dispatch(setLoadingTrue());
    const data = await POST(CONSTANTS.LOGIN, { username: email.value, password: password.value, student: isStudent });

    if (data && data.username) {
      data.dob = data.dob.substring(0, 10);
      dispatch(setCurrentTab('profile'))
      dispatch(setUser({ ...data, student: isStudent }));
    }
    dispatch(setLoadingFalse());
  };

  if (user?.username) {
    return <Navigate to="/home" replace={true} />;
  }

  return (
    <div className="loginForm form-group">
      <h1 className="display-3">
        Log In
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" required={true}>Email<span style={{ color: "red" }}>*</span></label>
          <input id='email' type="email" className="form-control" required={true} placeholder="Enter Email" />
        </div>

        <div className="form-group">
          <label htmlFor="password" required={true}>Password<span style={{ color: "red" }}>*</span></label>
          <input id="password" type="password" name="password" required={true}
            placeholder="Password" className="form-control" />
        </div>

        <div className="form-group">
          <label htmlFor="loginAs">Login as?</label>
          <select className="form-control" id="loginAs" onChange={handleDropdown}>
            <option value='student'>Student</option>
            <option value='teacher'>Teacher</option>
          </select>
        </div>

        <div>
          <button className="btn btn-primary form-control">
            Login
          </button>
        </div>

      </form>
      <Link to="/signup" className="form-control btn btn-secondary buttonSignUp">Sign Up</Link>
    </div>
  );
};

export default LogIn;
