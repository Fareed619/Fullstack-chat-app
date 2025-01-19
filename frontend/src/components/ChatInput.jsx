import { Images, Send } from "lucide-react";
import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { X } from "lucide-react";
import toast from "react-hot-toast";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [imgPreview, setImgPreview] = useState("");

  const { sendMessage } = useChatStore();

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    console.log("reader ", reader);
    reader.onload = () => {
      setImgPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const removeImg = () => {
    setImgPreview(null);
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() && !imgPreview) return;
    try {
      await sendMessage({
        text: message.trim(),
        image: imgPreview,
      });

      setMessage("");
      setImgPreview(null);
    } catch (error) {
      console.error("Failed to send message: ", error);
    }
  };

  return (
    <div className="w-[98%] ">
      {imgPreview && (
        <div className="relative mb-3 pl-2">
          <img src={imgPreview} alt="" className="size-28 rounded-xl" />
          <button
            className="absolute top-0 left-24 bg-base-300 rounded-b-lg"
            onClick={removeImg}
          >
            <X size={17} />
          </button>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex items-center gap-4 ">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full input input-bordered rounded-lg input-sm sm:input-md"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <label
          htmlFor="img-input"
          className={`cursor-pointer ${
            imgPreview ? "text-emerald-500" : "text-zinc-400"
          } btn btn-sm btn-circle`}
        >
          <Images size={20} />
          <input type="file" id="img-input" hidden onChange={handleImgChange} />
        </label>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!message.trim() && !imgPreview}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
