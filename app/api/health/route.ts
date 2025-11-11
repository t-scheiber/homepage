import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Log request for debugging
  console.log("Health check requested:", {
    url: request.url,
    method: request.method,
    headers: Object.fromEntries(request.headers.entries()),
  });

  return NextResponse.json(
    { status: "ok", message: "App is up and running" },
    { status: 200 }
  );
}

