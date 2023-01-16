import React from "react";
import "./login.scss";
import Logo from "../../assets/images/logo.svg";

const Login = () => {
  return (
    <React.Fragment>
      <div className="authPageWrapper">
        <div className="authPageContent pt-6 pb-6">
          <div className="logoWrapper">
            <img className="logo" alt="logo" src={Logo} />
          </div>

          <div className="loginWrapper">
            <div className="loginContent">
              <div className="title">Yantra</div>

              <div className="formWrapper">
                <div className="formTitle">Login</div>
                <form action="#">
                  <div className="inputWrapper">
                    <input type="text"
                           name="userId"
                           className="loginControl"
                           placeholder="Enter registered user ID"/>

                    <input type="password"
                           name="password"
                           className="loginControl"
                           placeholder="Password"/>
                  </div>

                  <div className="buttonWrapper">
                    <button type="submit"
                            className="btnLogin">
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
