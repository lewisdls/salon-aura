require("dotenv");
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const sgMail = require("@sendgrid/mail");

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      select: {
        date: true,
        time: true,
      },
    });
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
      from: `whatsapp:${process.env.TWILIO_NUMBER}`,
      to: `whatsapp:+1${client_phone.replace(/\D/g, "")}`,
      body: `Hola, ${client_name}. Tu cita ha sido agendada para el día ${date} a las ${time}. El servicio que solicitaste fue ${service}. ¡Gracias por elegir nuestro salón!`,
    });
    console.log(message);
  }

  async function createEmail() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: "burbjs21@gmail.com",
      from: "lewisdls21@hotmail.com",
      subject: "Confirmación de cita",
      text: `${client_name} ha agendado una cita para el día ${date} a las ${time}. El servicio elegido fue ${service}`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  try {
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        date,
        time,
      },
    });

    const personBooked = await prisma.appointment.findFirst({
      where: {
        client_name,
        date,
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
    } else if (personBooked) {
      return new Response(
        JSON.stringify({
          error:
            "Ya tienes una cita para este día, por favor elige otra fecha.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await createMessage();

    await createEmail();

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
