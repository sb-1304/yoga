import { Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useState } from "react";

import { POST } from "../Apis/Apis";
import CONSTANTS from "../CONSTANTS.json";
import { setLoadingFalse, setLoadingTrue } from "../Redux/loginSlicer";

const SignUp = () => {
  const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const user = useSelector(_ => _.user);
  const [isStudent, setisStudent] = useState(true);
  const [gender, setGender] = useState(undefined);
  const dispatch = useDispatch();

  const handleDropdown = (e) => {
    setisStudent(e.target.value);
  }

  const handleRadio = e => {
    setGender(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, dob } = e.target.elements;

    if (!pattern.test(email.value)) {
      alert("Please enter valid email address");
      return;
    }

    dispatch(setLoadingTrue());
    const data = await POST(CONSTANTS.REGISTER, {
      name: name.value, username: email.value, password: password.value,
      dob: dob.value, gender, student: isStudent,
    });
    if (data) {
      alert(data);
      // dispatch(setUser({ ...data, student: isStudent }));
    }
    dispatch(setLoadingFalse());
  };

  if (user?.username) {
    return <Navigate to="/home" replace={true} />;
  }

  return (<>
    <div className="signUpForm form-group">
      <h1 className="display-3">
        Sign Up
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name<span style={{ color: "red" }}>*</span></label>
          <input className="form-control" id="name" type="text" name="name" required={true} placeholder="Full Name" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email<span style={{ color: "red" }}>*</span></label>
          <input className="form-control" id="email" type="email" name="email" required={true} placeholder="Email" />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password<span style={{ color: "red" }}>*</span></label>
          <input className="form-control" id="password" type="password" name="password" required={true} placeholder="Password" />
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth<span style={{ color: "red" }}>*</span></label>
          <input className="form-control" id="dob" type="date" name="dob" required={true} placeholder="Enter DOB" />
        </div>

        <div>Gender<span style={{ color: "red" }}>*</span></div>
        <div onChange={handleRadio}>
          <div className="form-check">
            <input type="radio" className="form-check-input" name="gender" id="male" required={true} autoComplete="off" value="male" />
            <label className="form-check-label" htmlFor="male">Male</label>
          </div>

          <div className="form-check">
            <input type="radio" className="form-check-input" name="gender" id="female" required={true} autoComplete="off" value="female" />
            <label className="form-check-label" htmlFor="female">Female</label>
          </div>

          <div className="form-check">
            <input type="radio" className="form-check-input" name="gender" id="other" required={true} autoComplete="off" value="other" />
            <label className="form-check-label" htmlFor="other">Other</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="loginAs">Login as?</label>
          <select className="form-control" id="loginAs" onChange={handleDropdown} value={isStudent}>
            <option value={true}>Student</option>
            <option value={false}>Teacher</option>
          </select>
        </div>

        <div>
          <button className="btn btn-primary form-control topmargin15">
            Submit
          </button>
        </div>
      </form>
      <Link to="/login" className="form-control btn btn-secondary buttonLogin">Login</Link>
    </div>
  </>);
};

export default SignUp;
