import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLoginUser } from "../service/apiService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux"; // the dispath the same navigate
import { doLogin } from "../../redux/action/userAction";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault(); 

    const emailValue = email;
    const passwordValue = password;

    let res = await postLoginUser(emailValue, passwordValue);
    if (res.data && res.data.EC === 0) {
      dispatch(doLogin(res.data));
      toast.success(res.data.EM);
      navigate("/");
    }

    if (res.data && res.data.EC !== 0) {
      toast.error(res.data.EM);
    }
  };

  return (
    <div className="container">
      <div className="showQuestion">Don't have an account yet</div>
      <div className="showName">Cong Nghia IT</div>
      <div className="showName">Hello who's this ?</div>

      <form className="formLogin" onSubmit={handleLogin}>
        <label className="mt-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="desingInput"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <label className="mt-2" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="desingInput"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <span className="forgot">Forgot password?</span>
        <button type="submit" className="btn btn-secondary mt-2">
          Login to Nghia
        </button>
        <div>
          <span
            onClick={() => {
              navigate("/");
            }}
          >
            Go to Page
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
