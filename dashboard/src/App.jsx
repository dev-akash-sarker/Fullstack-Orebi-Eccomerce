import "./App.css";
import EmailVerificationLink from "./page/EmailVerification";
import Login from "./page/Login";
import Otpverification from "./page/Otpverification";
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
        {/* <Route path="/emailverification/:email" element={<Otpverification />} /> */}
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
