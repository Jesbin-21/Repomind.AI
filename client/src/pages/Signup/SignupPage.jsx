import "./Signup.css";
import Login from "../../components/Login";
import Signup from "../../components/Signup";
import { useState } from "react";

function SignupPage() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="signup-wrapper">
      {isLogin ? (
        <Login key="login-form" switchToSignup={() => setIsLogin(false)} />
      ) : (
        <Signup key="signup-form" switchToSignup={() => setIsLogin(true)} />
      )}
    </div>
  );
}

export default SignupPage;