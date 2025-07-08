import { AuthFormValues } from "@/types/next-auth";

export const registerUser = async (values: AuthFormValues) => {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to register");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Registration error:", error.message);
      throw new Error(error.message || "Registration failed");
    } else {
      throw new Error("Unknown error occurred");
    }
  }
};
