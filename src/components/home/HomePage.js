import "./HomePage.scss";
import { useSelector } from "react-redux";
import CustomCarousel from "./banner"; 
import Choose from "./choose";
import Advantage from "./advantage";

const HomePage = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);

  return (
    <div className="homepage">
      <div>
      <CustomCarousel />
      </div>
      <div className="custom-choose">
        <Choose/>
      </div>
      <div>
        <Advantage/>
      </div>
    </div>
  
  );
};

export default HomePage;
