import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=59.9139&lon=10.7522",
      {
        method: "GET",
        headers: {
          "User-Agent": "IMD", // Required by met.no
        },
        cache: "no-store", // Prevents caching issues
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch weather data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
