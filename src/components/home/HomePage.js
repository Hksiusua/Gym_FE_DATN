import "./HomePage.scss";
import { useSelector } from "react-redux";
import CustomCarousel from "./banner"; 

const HomePage = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);

  return (
    <div className="homepage-container">
      <CustomCarousel />
    </div>
  );
};

export default HomePage;
