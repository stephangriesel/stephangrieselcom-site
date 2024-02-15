export const prerender = false;

import type { APIRoute } from "astro"
import validateEmail from "../../lib/validateEmail";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email } = body;
    console.log("POST: APIRoute", email);

    // Check if email exists
    if(!email){
      throw new Error("Please provide email 🤨"); // Expected error here ✅
    }

    // Check if email is valid
    if(!validateEmail(email as string)){
      throw new Error("Email is not valid 😠"); // Expected error here ✅
    }

    // Check if email subscribed
    // const subRes = await fetch(`https://api.convertkit.com/v3/subscribers?api_secret=${import.meta.env.CONVERT_KIT_SECRET_KEY}&email_address${email}`);
    // const subData = await subRes.json();
    // console.log("Check subscriber data", subData);
    
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
      return new Response(null, {
        status: 400,
        statusText: e.message,
      });
    }
  }
  return new Response(null, {
    status: 400,
    statusText: "There is unexpected error ¯\_(ツ)_/¯",
  });
}