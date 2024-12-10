import { Route, Routes } from "react-router-dom";
import Find from "./pages/Find";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path = "find" element = {<Find/>} />
        <Route path="signup" element={<SignUp/>} />
        <Route path = "signin" element = {<SignIn/>} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  );
}

export default App;
