"use client";
import { sendEmail } from "@/services/contact";
import { useState } from "react";

interface FormContactProps {
  loading: boolean;
  handleSendEmail: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const FormContact = ({
  loading,
  handleSendEmail,
}: FormContactProps) => {
  return (
    <form
      onSubmit={handleSendEmail}
      className="flex flex-col justify-center items-center gap-4 my-4 w-1/2 mx-auto p-4 border-2 border-gray-300 rounded-md shadow-md"
    >
      <label htmlFor="name" className="w-full font-bold text-xl">
        Name *
      </label>
      <input
        type="text"
        id="name"
        name="name"
        className="w-full border-2 border-gray-300 rounded-md p-2"
      />
      <label htmlFor="email" className="w-full font-bold text-xl">
        Email *
      </label>
      <input
        type="email"
        name="email"
        id="email"
        className="w-full border-2 border-gray-300 rounded-md p-2"
      />
      <label htmlFor="message" className="w-full font-bold text-xl">
        Message *
      </label>
      <textarea
        name="message"
        id="message"
        cols={30}
        rows={10}
        className="w-full border-2 border-gray-300 rounded-md p-2"
      ></textarea>
      <button
        disabled={loading}
        className={`${
          loading ? "cursor-not-allowed bg-slate-600" : "cursor-pointer"
        }w-full bg-black text-white font-bold p-2 rounded-md hover:bg-gray-800 transition-all duration-300 ease-in-out`}
      >
        Send
      </button>
    </form>
  );
};
