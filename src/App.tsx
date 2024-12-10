import { Route, Routes } from "react-router-dom";
import Find from "./pages/Find";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ContactUs from "./pages/ContactUs";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ApplicationForm from "./pages/Application";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="find" element={<Find />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="contactus" element={<ContactUs />} />
        <Route path="application" element={<ApplicationForm />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  );
}

export default App;
