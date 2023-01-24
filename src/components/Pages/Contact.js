import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();

  // It takes some time for Getform.io to take care of submitting, so we can't just clear the form
  // Otherwise it sends empty messages. So, we must find another way to clear form
  // After submiting form, a custom page opens. We use this to clear the form
  useEffect(() => {
    return () => {
      setName("");
      setEmail("");
      setMessage("");
    };
  }, [location.pathname]);

  return (
    <div
      className="flex flex-col border-2 border-solid border-white justify-center items-center min-h-[380px]
      md:w-[600px] md:h-[400px] w-[85%] h-[60%] p-10 rounded-xl z-20 bg-gradient-to-r from-[#485C90] to-[#6078AB]"
    >
      <p
        className="flex justify-center items-center font-bold text-[20px] text-white border-2 border-solid border-white
       bg-[#003d6b] rounded-xl w-full mt-5"
      >
        Contact
      </p>
      <form
        action="https://getform.io/f/2315e144-e2f1-404d-8455-8b6d0935ec74"
        className="flex flex-col w-full"
        method="POST"
      >
        <label className="text-white mt-3" htmlFor="name">
          Name:
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl p-2 outline-none mb-2"
          type="text"
          id="name"
          name="name"
          required
        />
        <label className="text-white" htmlFor="email">
          Email:
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl p-2 outline-none mb-2"
          type="email"
          id="email"
          name="email"
          required
        />
        <label className="text-white" htmlFor="message">
          Message:
        </label>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="rounded-xl px-2 py-4 outline-none"
          type="text"
          id="message"
          name="message"
          required
        ></input>
        <div className="flex justify-center items-center mt-5">
          <button
            className="border-2 border-solid border-white rounded-xl w-[100px]
           text-white mt-3 bg-[#003d6b] hover:bg-[#d5d8f0] hover:text-[#003d6b] hover:font-medium hover:border-[#003d6b]"
            type="submit"
            value="Submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
