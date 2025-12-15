import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <Routes>
      {/* Routes WITH sidebar */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        {/* later: dashboard, profile, settings, etc. */}
      </Route>

      {/* Routes WITHOUT sidebar */}
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />

      {/* Optional 404 */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default App;
