import { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import validateEmail from "../lib/validateEmail";

const SubscribeForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(isSubmitting) return;
    setIsSubmitting(true);

    const subToast = toast.loading("Submitting");

    const formData = new FormData(e.currentTarget);
    console.log("Check form data", formData);
    const formInputs = Object.fromEntries(formData);
    console.log("Handle Submits", formInputs)

    const email = formInputs.email;
    
    // Check if email exists
    if(!email){
      return toast.error("Please provide an email address ❌", {
        id: subToast,
      });
    }

    // Check if email is valid
    if(!validateEmail((email as string).trim())){
      return toast.error("Please provide a valid email address 🤔", {
        id: subToast,
      });
    }

    try {
      const res = await fetch("/api/subscribe.json", {
        method: "POST",
        body: JSON.stringify(formInputs),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("❌ Error, yikes, this does not look good!");
      }
      
      const successMessage = await res.json();
      console.log("Test success submit", successMessage);

      toast.success(successMessage.message, {
        id: subToast,
      });
      formRef.current?.reset();
      setIsSubmitting(false);
    } catch (e) {
      setIsSubmitting(false);
      toast.error("There was a problem subscribing you, sorry, please try again! 😱", {
        id: subToast,
      });
      if (e instanceof Error) {
        return console.error(e.message);
      }
      console.error(e);

    }
  };

  return (<form ref={formRef} onSubmit={handleSubmit}>
    <label htmlFor="email">Enter your email</label>
    <input className="text-black" type="email" name="email" id="email" required/>
    <button type="submit" disabled={isSubmitting}>Subscribe</button>
    <Toaster />
    </form>
  );
};

export default SubscribeForm