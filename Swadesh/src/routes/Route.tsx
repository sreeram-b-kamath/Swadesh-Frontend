// routes.tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from '../components/LoginSignUp/SignUp';
import OtpVerificationPage from '../components/LoginSignUp/OTP';
import LoginPage from '../pages/LoginPage/LoginPage';
import Preference from '../pages/Preference/Preference';
import Filter from '../pages/FilterPage/Filter';
import Menu from '../components/MenuComponent/Menu';
import MenuPage from '../pages/MenuPage/MenuPage';
import AddToMenu from '../pages/AddToMenu';


const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<LoginPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/otp-verification" element={<OtpVerificationPage onSubmit={function (otp: string): void {
                  throw new Error('Function not implemented.');
              } } />} />
        <Route path="/preference" element={<Preference />} /> 
        <Route path="/preference-selection" element={<Filter />} />  
        <Route path="/menu" element={<MenuPage />} />        
        <Route path= "/chef-restaurant" element = {<AddToMenu/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;