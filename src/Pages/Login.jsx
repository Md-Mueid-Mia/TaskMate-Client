import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Login = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignin = async () => {
    googleSignIn().then((res) => {
      const userInfo = {
        name: res.user?.displayName,
        email: res.user?.email,
        photoURL: res.user?.photoURL,
      };
      axios
        .post("https://task-mate-server-ashen.vercel.app/users", userInfo)
        .then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Successfully Signed",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome to TaskMate
          </h2>
          <p className="mt-2 text-gray-600">Please sign in to continue</p>
        </div>
        <button
          onClick={handleGoogleSignin}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
