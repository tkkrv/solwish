import { ACTIONS_CORS_HEADERS } from "@solana/actions";

export async function OPTIONS() {
  return new Response(null, { headers: ACTIONS_CORS_HEADERS });
}

export async function GET() {
  const payload = {
    rules: [
      {
        pathPattern: "/*",
        apiPath: "/api/actions/*",
      },
      {
        pathPattern: "/api/actions/**",
        apiPath: "/api/actions/**",
      },
    ],
  };

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
}