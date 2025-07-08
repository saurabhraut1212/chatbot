import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Chatbot App!</h1>
        <p className="mb-3 text-lg">
          To use the chatbot, you must first{" "}
          <Link href="/login" className="text-blue-600 underline hover:text-blue-800">
            login
          </Link>
          .
        </p>
        <p className="mb-3 text-gray-700">
          After logging in, you can start chatting and exploring the features.
        </p>
        <p className="text-gray-400">Enjoy your experience!</p>
      </div>
    </main>
  );
};

export default HomePage;