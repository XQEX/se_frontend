import { Route, Routes } from "react-router-dom";
import NoPage from "./pages/JobSeeker/NoPage";
import SignUpJobSeek from "./pages/JobSeeker/SignUpJobSeek";
import SignUpEmp from "./pages/Employers/SignUpEmp";
import SignIn from "./pages/JobSeeker/SignIn";
import ContactUs from "./pages/JobSeeker/ContactUs";
import Profile from "./pages/JobSeeker/Profile";
import Settings from "./pages/JobSeeker/Settings";
import Home from "./pages/JobSeeker/Home";
import Find from "./pages/JobSeeker/Find";
import ApplicationForm from "./pages/JobSeeker/Application";
import HomepageEmployers from "./pages/Employers/HomepageEmployers";
import PostJobEmp from "./pages/Employers/PostEmployers";
import TrackEmployers from "./pages/Employers/TrackEmployers";
import TrackDetailsEmployers from "./pages/Employers/TrackDetailsEmployers";
import FindEmployers from "./pages/Employers/FindEmployers";
import ViewPostEmployers from "./pages/Employers/ViewPostEmployers";
import ProfileEmployers from "./pages/Employers/ProfileEmployers";
import JobPositionForm from "./pages/JobPositionForm";
import JobDetail from "./pages/JobDetail";
import TrackJobSeeker from "./pages/JobSeeker/TrackJobSeeker";
import TrackDetailsJobSeeker from "./pages/JobSeeker/TrackDetailsJobSeeker";
import PostJob from "./pages/JobSeeker/Post";
import UserTypeWizard from "./pages/UserTypeWizard";
import Admin from "./pages/Admin";

function App() {
  return (
    <div>
      <Routes>
        {/* หน้าหลัก */}
        <Route path="/" element={<Home />} />
        <Route path="find" element={<Find />} />
        <Route path="signUp/job-seeker" element={<SignUpJobSeek />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="contactus" element={<ContactUs />} />
        <Route path="application" element={<ApplicationForm />} />
        <Route path="application/JobPosition" element={<JobPositionForm />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="/trackjobseeker" element={<TrackJobSeeker />} />
        <Route path="/trackJobseeker/:id" element={<TrackDetailsJobSeeker />} />
        <Route path="/postjob" element={<PostJob />} />

        {/* Routes สำหรับ Employers */}
        <Route path="signUp/Employer" element={<SignUpEmp />} />
        <Route path="homeemp" element={<HomepageEmployers />} />
        <Route path="postjobemp" element={<PostJobEmp />} />
        <Route path="trackemp" element={<TrackEmployers />} />
        <Route path="track/:id" element={<TrackDetailsEmployers />} />
        <Route path="findemp" element={<FindEmployers />} />
        <Route path="viewpost/:id" element={<ViewPostEmployers />} />
        <Route path="profileemp" element={<ProfileEmployers />} />

        {/* หน้าสำหรับ Route ที่ไม่พบ */}
        {/* Routes สำหรับ Admin */}
        <Route path="/select-user-type" element={<UserTypeWizard />} />
        <Route path="admin" element={<Admin />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  );
}

export default App;
