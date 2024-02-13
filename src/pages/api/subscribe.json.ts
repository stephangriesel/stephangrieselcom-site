export const prerender = false;

import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email } = body;
    console.log("POST: APIRoute", email);
  } catch (error) {
    
  }
  return new Response(JSON.stringify({
      message: "This was a POST!"
    })
  )
}