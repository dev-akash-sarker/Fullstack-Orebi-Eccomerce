import "./App.css";
import AddCategory from "./page/Category/AddCategory";
import ViewCategory from "./page/Category/ViewCategory";
import Dashbaord from "./page/Dashbaord";
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
import AddUser from "./page/User/AddUser";
import ViewUser from "./page/User/ViewUser";
import AddProduct from "./page/Product/AddProduct";
import ViewProduct from "./page/Product/ViewProduct";
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
        <Route path="/dashboard" element={<Dashbaord />}>
          <Route path="adduser" element={<AddUser />} />
          <Route path="viewuser" element={<ViewUser />} />
          <Route path="addcategory" element={<AddCategory />} />
          <Route path="viewcategory" element={<ViewCategory />} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="viewproduct" element={<ViewProduct />} />
        </Route>
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
