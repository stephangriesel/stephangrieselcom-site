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