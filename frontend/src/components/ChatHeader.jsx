import { useChatStore } from "../store/useChatStore";
import profileImg from "../assets/profile-img.png";
import { useAuthStore } from "../store/useAuthStore";
import { X } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  return (
    <header className="shadow-2xl flex justify-between items-center pb-1 border-b border-base-300  ">
      <div className="flex items-center gap-3">
        <img
          src={selectedUser?.profilePic || profileImg}
          alt=""
          className="size-11 rounded-full"
        />
        <div className="flex flex-col ">
          <p className="font-medium">{selectedUser?.fullName || "John Doe"}</p>
          <span className="text-zinc-400 text-xs">
            {onlineUsers.includes(selectedUser?._id) ? "online" : "offline"}
          </span>
        </div>
      </div>
      <button
        onClick={() => {
          setSelectedUser(null);
        }}
      >
        <X/>
      </button>
    </header>
  );
};

export default ChatHeader;
