import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EmailVerificationLink() {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function verify() {
      const data = await axios.post(
        "http://localhost:8000/api/v1/auth/linkverify",
        {
          token: params.token,
        }
      );

      navigate("/login");

      console.log("dekha bai", data);
    }

    verify();
  });
  return <div>Loading</div>;
}
