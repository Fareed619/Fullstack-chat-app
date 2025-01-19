import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { AUTH_URL, BASE_URL } from "../lib/constants";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],

  socket: null,

  // To check if the user is authenticated or not
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get(`${AUTH_URL}/check`);
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log(`Error in checkAuth: ${error}`);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (formData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post(`${AUTH_URL}/signup`, formData);
      set({ authUser: res.data });
      toast.success("Account Created Successfully");
      get().connectSocket();
    } catch (error) {
      console.log(`Error in sign up ${error}`);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (formData) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post(`${AUTH_URL}/login`, formData);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      console.log(`Error in login ${error}`);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post(`${AUTH_URL}/logout`);
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSokent();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put(`${AUTH_URL}/update-profile`, data);
      console.log("res from server ", res);
      set({ authUser: res.data });
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log(`Error in update profile ${error}`);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get.socket?.connected) return;
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  
  disconnectSokent: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
