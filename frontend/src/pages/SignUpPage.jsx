import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-hot-toast";
import {
  MessageSquareShare,
  UserRound,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LoaderCircle,
} from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";
function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signUp, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is requried");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      signUp(formData);
    }
  };
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2 w-full h-screen ">
      {/* left side  */}
      <div className=" w-full md:w-3/4 m-auto lg:w-full flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="py-1 px-2 rounded-md  bg-primary/10 border-none outline-none">
          {/* LOGO  */}
          <MessageSquareShare className="size-5 text-primary" />
        </div>
        <h1 className="text-xl font-bold my-2 ">Create Account</h1>
        <p className="text-base-content/60">
          Get Started with Your free account
        </p>
        <form className="mt-5 w-3/4" onSubmit={handleSubmit}>
          {/* User name  */}
          <div className="form-control my-3">
            <label htmlFor="username" className="text-sm font-semibold pb-1">
              Full Name
            </label>
            <div className="relative w-full">
              {" "}
              <UserRound
                size={20}
                className="absolute bottom-3 left-2  text-base-content/40"
              />
              <input
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="outline-none border border-gray-400 py-2 px-4 pl-10  rounded-md w-full"
              />
            </div>
          </div>
          {/* Email */}
          <div className="form-control my-3">
            <label htmlFor="username" className="text-sm font-semibold pb-1 ">
              Email
            </label>
            <div className="relative w-full">
              {" "}
              <Mail
                size={20}
                className="absolute bottom-3 left-2  text-base-content/40"
              />
              <input
                type="text"
                placeholder="You@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="outline-none border border-gray-400 py-2 px-4 pl-10  rounded-md w-full"
              />
            </div>
          </div>
          {/* Password */}
          <div className="form-control my-3">
            <label
              htmlFor="passwrod"
              className="text-sm font-semibold pb-1 "
            >
              Password
            </label>
            <div className="relative w-full">
              {" "}
              <Lock size={20} className="absolute bottom-3 left-2  text-base-content/40" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="***********"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="outline-none border border-gray-400 py-2 px-4 pl-10  rounded-md w-full"
              />
              {showPassword ? (
                <EyeOff
                  size={20}
                  className="absolute right-3 top-3 cursor-pointer text-base-content/40"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <Eye
                  size={20}
                  className="absolute right-3 top-3 cursor-pointer text-base-content/40"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full mt-3"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <>
                <LoaderCircle className="animate-spin size-5" />
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        <div className="mt-3 text-center">
          <p className="text-base-content/60">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      {/* right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
}

export default SignUpPage;
