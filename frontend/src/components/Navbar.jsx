import { LogOut, MessageSquareShare, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  return (
    <header className="h-12   border-b border-base-300  w-full z-40 fixed top-0 bg-base-100 backdrop-blur-lg ">
      <nav className="container md:w-[90%] m-auto pt-2 flex items-center justify-between">
        {/* Left Section */}
        {/* Logo */}
        <div className="logo flex items-center gap-2">
          <div className="py-1 px-2 rounded-md  bg-primary/10 cursor-pointer ">
            <MessageSquareShare className="size-5 text-primary" />
          </div>
          <Link to="/" className="text-base font-bold">
            Chatty
          </Link>
        </div>
        {/* Right Section */}
        <div className="flex items-center gap-5">
          {/* Settings */}
          <Link to={"/settings"} className=" btn btn-sm">
            <Settings className="siz-4" size={18} />
            <span className="hidden md:inline text-sm font-semibold">
              Settings
            </span>
          </Link>
          {authUser ? (
            <>
              {" "}
              {/* Profile */}
              <Link to={"/profile"} className="btn btn-sm">
                <User className="siz-4" size={20} />
                <span className="hidden md:inline text-sm font-semibold">
                  Profile
                </span>
              </Link>
              {/* Logout */}
              <button className=" btn btn-sm " onClick={logout}>
                <LogOut className="siz-4" size={20} />
                <span className=" hidden md:inline text-sm font-semibold">
                  Logout
                </span>
              </button>
            </>
          ) : null}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
