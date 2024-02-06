import { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import validateEmail from "../lib/validateEmail";

const SubscribeForm = () => {
  const [isSumbitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(isSumbitting) return;
    setIsSubmitting(true);

    const subToast = toast.loading("Submitting");

    const formData = new FormData(e.currentTarget);
    const formInputs = Object.fromEntries(formData);
    console.log("Handle Submits", formInputs)
    
    if(!formInputs?.email){
      return toast.error("Please provide an email address", {
        id: subToast,
      })
    }

    if(!validateEmail((formInputs.email as string).trim())){
      return toast.error("Please enter an valid email address", {
        id: subToast,
      })
    }
  };

  return (<form ref={formRef} onSubmit={handleSubmit}>
    <label htmlFor="email">Enter your email</label>
    <input type="email" name="email" id="email" required/>
    <button type="submit" disabled={isSumbitting}>Subscribe</button>
    <Toaster />
    </form>
  );
};

export default SubscribeForm