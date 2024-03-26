import "./App.css";
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
        <Route path="/otpverification/:email" element={<Otpverification />} />
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
