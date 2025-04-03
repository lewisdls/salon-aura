import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;
const client = require("twilio")(accountSid, authToken);

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany();
    return new Response(JSON.stringify(appointments), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch appointments." }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const body = await req.json();
  const { client_name, client_phone, date, time, service } = body;

  if (!client_name || !client_phone || !date || !time || !service) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  async function createMessage() {
    const message = await client.messages.create({
      from: `whatsapp:${twilioPhone}`,
      to: `whatsapp:+1${client_phone}`,
      contentSid: "HX856b551107a49db9e261fdd776e3d6a6",
      contentVariables: JSON.stringify({
        client_name,
        date,
        time,
        service,
      }),
    });
    console.log(message);
  }

  try {
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        date,
        time,
      },
    });

    if (existingAppointment) {
      return new Response(
        JSON.stringify({
          error:
            "La hora seleccionada ya está reservada, por favor elige otra hora.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    createMessage();

    const newAppointment = await prisma.appointment.create({
      data: {
        client_name,
        client_phone,
        date,
        time,
        service,
      },
    });

    return new Response(JSON.stringify(newAppointment), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to send messages." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
