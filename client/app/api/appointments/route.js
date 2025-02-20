import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;
const businessPhone = process.env.BUSINESS_PHONE;
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
  // const businessMessage = `Nueva cita: ${client_name} ha agendado una cita para el día ${date} a las ${time}. El servicio solicitado es: ${service}.`;

  try {
    await client.messages.create({
      from: `whatsapp:${twilioPhone}`,
      to: `whatsapp:+1${client_phone}`,
      body: `Hola, ${client_name}. Tu cita ha sido agendada para el día ${date} a las ${time}. El servicio que solicitaste fue ${service}. ¡Gracias por elegir nuestro salón!`,
    });

    /* await client.messages.create({
      from: `whatsapp:${twilioPhone}`,
      to: `whatsapp:${businessPhone}`,
      body: businessMessage,
    }); */

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
    res.status(500).json({ success: false, error: "Failed to send messages." });
  }
}
