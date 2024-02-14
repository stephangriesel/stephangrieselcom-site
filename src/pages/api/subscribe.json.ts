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
      throw new Error("Not working");
    }

    // Validate email
    if(!validateEmail(email as string)){
      throw new Error("Not working");
    }

    // Check if email subscribed
    // const subRes = await fetch(`https://api.convertkit.com/v3/subscribers?api_secret=${import.meta.env.CONVERT_KIT_SECRET_KEY}&email_address${email}`);
    // const subData = await subRes.json();
    // console.log("Check subscriber data", subData);
    
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return new Response(null, {
        status: 400,
        statusText: error.message,
      });
    }
  }
  return new Response(null, {
    status: 400,
    statusText: "Unexpected Error!",
  });
}