import "./HomePage.scss";
import { useSelector } from "react-redux";
import CustomCarousel from "./banner"; 
import Choose from "./choose";
import Advantage from "./advantage";
import BannerRegister from "./banner-register";
import Footer from "../footer";
import { useRef } from "react";
import FormRegister from "../form-register";

const HomePage = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);

  const formRef = useRef(null);

  const handleScrollToForm = () => {
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="homepage">
      <div>
        <CustomCarousel />
      </div>
      <div className="custom-choose">
        <Choose />
      </div>
      <div>
        <Advantage onIconClick={handleScrollToForm} />
      </div>
      <div>
        <BannerRegister onButtonClick={handleScrollToForm} />
      </div>
      <div ref={formRef}> 
        <FormRegister />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
