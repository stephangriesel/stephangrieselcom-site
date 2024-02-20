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
    const subRes = await fetch(`https://api.convertkit.com/v3/subscribers?api_secret=${import.meta.env.CONVERT_KIT_SECRET_KEY}&email_address=${email}`);
    if (!subRes.ok) {
      throw new Error("Noooooooo!!! :'(");
    }
    const subData = await subRes.json();
    console.log("Check subscriber data", subData);
    const isSubscribed = subData.total_subscribers > 0;
    // const isSubscribed = true; // Set to true to test
    console.log("Total subscribed", isSubscribed);

    if (isSubscribed) {
      return new Response(
        JSON.stringify({
          message: "Already subscribed! PARTY!!!",
        }),
        {
          status: 200,
          statusText: "OK",
        }
      );
    }

    // subscribe email
    // TODO: REVIEW
    const res = await fetch(
      `https://api.convertkit.com/v3/forms/${import.meta.env.CONVERT_KIT_SUBSCRIBE_ID}/subscribe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          api_key: import.meta.env.CONVERT_KIT_API_KEY,
          email,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Subscribing failed");
    }

    const resText = await res.json();

    if (resText.error) {
      throw new Error(resText.error.message);
    }

    return new Response(
      JSON.stringify({
        message:
          "Woohooo! Please check email to confirm subscription.",
      }),
      {
        status: 200,
        statusText: "OK",
      }
    );
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