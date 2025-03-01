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
import JobPositionForm from "./pages/JobSeeker/JobPositionForm";
import TrackJobSeeker from "./pages/JobSeeker/TrackJobSeeker";
import TrackDetailsJobSeeker from "./pages/JobSeeker/TrackDetailsJobSeeker";
import PostJob from "./pages/JobSeeker/Post";
import JobDetail from "./pages/JobSeeker/JobDetail";
import JobDetailEmp from "./pages/Employers/๋JobDetailsEmp";
import UserTypeWizard from "./pages/UserTypeWizard";
import Admin from "./pages/Admin";
import ExampleComponent from "./components/ExampleComponent";
import Terms from "./pages/Term";
import ForgotPassword from "./pages/ForgotPassword";
import ViewPostJobseeker from "./pages/JobSeeker/ViewPostJobseeker";

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
        <Route path="/trackjobseeker" element={<TrackJobSeeker />} />
        <Route path="/trackJobseeker/:id" element={<TrackDetailsJobSeeker />} />
        <Route path="/postjob" element={<PostJob />} />
        <Route path="/jobseeker/details/:id" element={<JobDetail />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/jobseeker/viewpost/:id" element={<ViewPostJobseeker />} />

        {/* Routes สำหรับ Employers */}
        <Route path="signUp/Employer" element={<SignUpEmp />} />
        <Route path="homeemp" element={<HomepageEmployers />} />
        <Route path="postjobemp" element={<PostJobEmp />} />
        <Route path="trackemp" element={<TrackEmployers />} />
        <Route path="track/:id" element={<TrackDetailsEmployers />} />
        <Route path="findemp" element={<FindEmployers />} />
        <Route path="profileemp" element={<ProfileEmployers />} />
        <Route path="/employer/viewpost/:id" element={<ViewPostEmployers />} />
        <Route path="/employer/details/:id" element={<JobDetailEmp />} />

        {/* หน้าสำหรับ Route ที่ไม่พบ */}
        {/* Routes สำหรับ Admin */}
        <Route path="/example" element={<ExampleComponent />} />
        <Route path="/select-user-type" element={<UserTypeWizard />} />
        <Route path="admin" element={<Admin />} />
        <Route path="*" element={<NoPage />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
