import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../Redux/loginSlicer'

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <>
      <div className="Navigation">
        <p className="h1 font-italic font-weight-bolder text-info">Yoga Planner</p>
        {user.username ? <button className="btn btn-secondary" onClick={() => dispatch(deleteUser())}>Log Out</button> : <></>}
      </div>
    </>
  );
};

export default NavBar;
