import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { name: "asc" },
    });
    return new Response(JSON.stringify(services), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch services." }),
      { status: 500 }
    );
  }
}
