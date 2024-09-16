import AdminLanding from "./pages/AdminLanding/AdminLanding";
// import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/AdminHome" element={<AdminLanding />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
