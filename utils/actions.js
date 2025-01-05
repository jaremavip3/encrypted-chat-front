"use server";

import { z } from "zod";
import { createSession, deleteSession } from "./sessions";
import { redirect } from "next/navigation";

const API_BASE_URL = "https://encrypted-chat-app-zrlv.onrender.com/api";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).trim(),
});
const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).trim(),
  displayName: z.string().min(3, { message: "Display name must be at least 3 characters" }).trim(),
});

export async function login(prevState, formData) {
  try {
    const rawFormData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rawFormData),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      return { status: "error", message: data.message };
    }
    console.log("Login response data:", data);
    await createSession(data.data.user_id);
    return { status: "success" };
  } catch (error) {
    console.log("Login error:", error);
    return { status: "error", message: "Connection error. Please try again." };
  }
}

export async function register(prevState, formData) {
  try {
    const rawFormData = {
      email: formData.get("email"),
      password: formData.get("password1"),
      displayName: formData.get("name"),
    };

    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rawFormData),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      return { status: "error", message: data.message };
    }
    console.log("Register response data:", data);
    return { status: "success" };
  } catch (error) {
    console.log("Register error:", error);
    return { status: "error", message: "Connection error. Please try again." };
  }
}
export async function logout(prevState) {
  try {
    await deleteSession();
    return { success: true };
  } catch (error) {
    console.log("Logout error:", error);
    return "Error logging out";
  }
}
