// import Image from "../../assets/hinhTest.jpg";
import "./HomePage.scss";
import { useSelector } from "react-redux";
const HomePage = (props) => {
  // access rootReducer take user=>userReducer take the data
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  // console.log("account: ", account, " isAuthenticated ", isAuthenticated);
  return (
    <div className="homepage-container">
   
    </div>
  );
};
export default HomePage;
