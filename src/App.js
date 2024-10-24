import "./App.scss";
import Header from "./components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { restoreSession } from "./store/userSlice";
import { Outlet, useNavigate } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.user);
  useEffect(() => {
    const userState = localStorage.getItem('userState');
    if (userState) {
      const parsedUserState = JSON.parse(userState);
      dispatch(restoreSession(parsedUserState.user));  
    }
  }, [dispatch]);

  return (
    <div>
       <div className="header-container">
         <Header/>
       </div>
       <div className="app-content">
         <Outlet />
       </div>
    </div>
  );
};

export default App;
