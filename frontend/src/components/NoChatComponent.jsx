import { MessageSquareShare } from "lucide-react";

const NoChatComponent = () => {
  return (
    <div className="hidden sm:flex w-[70%] justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="py-1 px-2 w-fit rounded-md bg-primary/10 border-none outline-none  animate-bounce">
          {/* LOGO  */}
          <MessageSquareShare className="size-5 text-primary " />
        </div>
        <h1 className="text-xl font-bold my-2 ">Welcome to Chatty!</h1>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting{" "}
        </p>
      </div>
    </div>
  );
};

export default NoChatComponent;
