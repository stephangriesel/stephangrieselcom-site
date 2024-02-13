export const prerender = false;

import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email } = body;
    console.log("POST: APIRoute", email);

    if(email){
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