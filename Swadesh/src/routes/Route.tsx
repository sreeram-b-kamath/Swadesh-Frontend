// routes.tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from '../components/LoginSignUp/SignUp';
import OtpVerificationPage from '../components/LoginSignUp/OTP';
import LoginPage from '../pages/LoginPage/LoginPage';
import CustomRestrictions from '../pages/CustomRestrictions';
import CustomCategories from '../pages/CustomCategories';
import AddToMenu from '../pages/AddToMenu';
import Preference from '../pages/Preference/Preference';
import Filter from '../pages/FilterPage/Filter';
import MenuPage from '../pages/MenuPage/MenuPage';

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<LoginPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/otp-verification" element={<OtpVerificationPage onSubmit={function (otp: string): void {
                  throw new Error('Function not implemented.');
              } } />} />
         <Route path="/add-to-menu" element={<AddToMenu />} />
         <Route path="/categories" element={<CustomCategories />} />
         <Route path="/restrictions" element={<CustomRestrictions />} />
         <Route path="/preference/:restaurantId" element={<Preference />} />
        <Route path="/preference-selection" element={<Filter />} />  
        <Route path="/menu" element={<MenuPage />} />        
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;