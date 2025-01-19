import { useAuthStore } from "../store/useAuthStore";
import imgProfile from "../assets/profile-img.png";
import { Camera, User, Mail } from "lucide-react";
import { useState } from "react";

const ProfilePage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };
  return (
    <div className="h-screen w-full flex justify-center items-center pt-10">
      <div className=" w-[80%]  md:w-1/2 py-5 rounded-md bg-base-300">
        <div className="text-center">
          <h1 className="text-lg font-semibold ">Profile</h1>
          <p className="text-sm">Your Profile information</p>
          <div className="relative w-fit mx-auto">
            <img
              src={selectedImg || authUser?.profilePic || imgProfile}
              alt=""
              className="size-32 rounded-full m-auto mt-5 border-4 object-cover"
            />
            <label
              htmlFor="avater-upload"
              className={`absolute right-0 bottom-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
              }`}
            >
              <Camera className="size-5 text-base-200" />
              <input
                type="file"
                id="avater-upload"
                className="hidden"
                accept="image/*"
                disabled={isUpdatingProfile}
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <p className="mt-3 text-sm text-zinc-400">
            {isUpdatingProfile
              ? "Uploading...."
              : "Click the camera icon to update your photo"}
          </p>
        </div>
        <div className="w-[90%] m-auto mt-4 ">
          <div className="flex items-center gap-2 mb-1 justify-start text-zinc-400">
            <User className="size-5 " />
            <label htmlFor="" className="text-sm font-semibold ">
              FullName
            </label>
          </div>
          <input
            type="text"
            value={authUser?.fullName}
            readOnly={true}
            className=" w-full py-1 text-base  px-2  rounded-md border bg-base-200 outline-none"
          />
        </div>
        <div className="w-[90%] m-auto mt-4 ">
          <div className="flex items-center gap-2 mb-1 justify-start text-zinc-400">
            <Mail className="size-5 " />
            <label htmlFor="" className="text-sm font-semibold ">
              Email Address
            </label>
          </div>
          <input
            type="email"
            value={authUser?.email}
            readOnly={true}
            className=" w-full py-1 text-base  px-2 rounded-md  border bg-base-200 outline-none"
          />
        </div>
        <div className="acc-info w-4/5 m-auto mt-10 mb-3 bg-base-300">
          <h2 className="text-lg font-semibold mb-4 ">Account Information</h2>
          <div className="flex items-center justify-between border-b border-zinc-700">
            <p className="">Member Since</p>
            <span className="text-sm">{authUser.createdAt?.split("T")[0]}</span>
          </div>
          <hr />
          <div className="flex items-center justify-between mt-2">
            <p className="">Account Status</p>
            <span className="text-green-500">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
