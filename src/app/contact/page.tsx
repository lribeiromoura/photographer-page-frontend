/* eslint-disable react/no-unescaped-entities */
"use client";
import Link from "next/link";
import InstagramIcon from "@/components/Icons/Instagram";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FormContact } from "./components/FormContact";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formSended, setFormSended] = useState(false);

  const handleSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const formData = new FormData(target);
    try {
      setLoading(true);
      const response = await fetch("/api/contact", {
        method: "post",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`response status: ${response.status}`);
      }
      const responseData = await response.json();
      toast.success("Message successfully sent");
      setFormSended(true);
      formData.forEach((value, key) => {
        target[key].value = "";
      });
    } catch (err) {
      console.error(err);
      toast.error(
        `There was an error sending your message. Please try again later.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h1 className="font-bold text-3xl text-center">LET'S GET IN TOUCH!</h1>
        <div className="flex flex-col justify-center items-center my-3">
          <p className="text-center my-2">
            {formSended
              ? "Thank you for your message! I will get back to you as soon as possible."
              : "Send me a messages and I will get back to you as soon as possible!"}
          </p>
          <Link
            href="https://www.instagram.com/lucasshtorache/"
            target="_blank"
            className="my-2"
          >
            <InstagramIcon />
          </Link>
        </div>
        {formSended ? (
          <p className="text-center"></p>
        ) : (
          <FormContact loading={loading} handleSendEmail={handleSendEmail} />
        )}
      </div>
      <ToastContainer />
    </>
  );
}
