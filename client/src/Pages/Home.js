import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import Student from "./Student";
import Teacher from "./Teacher";

const Home = () => {
  const user = useSelector(_ => _.user);

  return (
    <>
      {
        user.username ?
          <div >
            {user.student ? <Student /> : <Teacher />}
          </div>

          :
          <Navigate to="/login" replace={true} />
      }
    </>
  );
};

export default Home;
