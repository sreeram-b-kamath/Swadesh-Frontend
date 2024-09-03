// routes.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "../components/LoginSignUp/SignUp";
import OtpVerificationPage from "../components/LoginSignUp/OTP";
import LoginPage from "../pages/LoginPage/LoginPage";
import AddToMenu from "../pages/AddToMenu";

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route
          path="/otp-verification"
          element={
            <OtpVerificationPage
              onSubmit={function (otp: string): void {
                throw new Error("Function not implemented.");
              }}
            />
          }
        />
        <Route path="/AddToMenu" element={<AddToMenu />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
