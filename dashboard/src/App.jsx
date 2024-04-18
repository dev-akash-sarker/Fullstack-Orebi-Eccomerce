import "./App.css";
import EmailVerificationLink from "./page/EmailVerification";
import ForgetPassword from "./page/ForgetPassword";
import Login from "./page/Login";
import Newpassword from "./page/Newpassword";

import Registration from "./page/Registration";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
// import ResendVerification from "./page/ResendVerification";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/newpassword/:token" element={<Newpassword />} />
        <Route
          path="/emailverification/:token"
          element={<EmailVerificationLink />}
        />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
