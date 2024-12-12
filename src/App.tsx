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
import HomepageEmployers from "./pages/HomepageEmployers";
import LoginEmployers from "./pages/LoginEmployers";
import PostEmployers from "./pages/PostEmployers";
import RegisterEmployers from "./pages/RegisterEmployers";
import TrackEmployers from "./pages/TrackEmployers";
import TrackDetailsEmployers from "./pages/TrackDetailsEmployers";

function App() {
  return (
    <div>
      <Routes>
        {/* หน้าหลัก */}
        <Route path="/" element={<Home />} />
        <Route path="find" element={<Find />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="contactus" element={<ContactUs />} />
        <Route path="application" element={<ApplicationForm />} />

        {/* Routes สำหรับ Employers */}
        <Route path="employers/home" element={<HomepageEmployers />} />
        <Route path="employers/login" element={<LoginEmployers />} />
        <Route path="employers/post" element={<PostEmployers />} />
        <Route path="employers/register" element={<RegisterEmployers />} />
        <Route path="employers/track" element={<TrackEmployers />} />
        <Route path="employers/trackdetails" element={<TrackDetailsEmployers />} />

        {/* หน้าสำหรับ Route ที่ไม่พบ */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  );
}

export default App;
