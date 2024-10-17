import Booking from "./Booking";

const Schedule = () => {
  return (
    <div
      id="booking"
      className="bg-[#FAF5F1] py-12 px-6 md:py-24 md:px-16 flex flex-col md:flex-row md:justify-between gap-10 text-center md:text-left"
    >
      <div className="flex flex-col gap-6">
        <h1 className="text-5xl md:text-6xl">Citas</h1>
        <p className="text-xl font-light leading-relaxed">
          ¿Listo para una experiencia transformadora? Reserva tu cita ahora en
          Salon Aura y déjanos crear un estilo que te defina.
        </p>
        <div className="h-[200px] bg-[#D9BFB0] bg-[url('/long-hair.png')] bg-[length:250px_175px] bg-bottom bg-no-repeat rounded-3xl p-4"></div>
      </div>
      <div className="bg-white p-8 rounded-xl w-full h-max flex flex-col gap-8">
        <h2 className="text-4xl">Horas Laborables</h2>
        <div className="flex items-center justify-between text-lg border-b-[1px] border-gray-300 pb-2">
          <p>Lunes a Sábados</p>
          <p>9 AM - 9 PM</p>
        </div>
        <div className="flex items-center justify-between text-lg border-b-[1px] border-gray-300 pb-2">
          <p>Domingos</p>
          <p>9 AM - 1 PM</p>
        </div>
        <div className="flex items-center justify-between text-lg border-b-[1px] border-gray-300 pb-2">
          <p>Martes</p>
          <p>No laborables</p>
        </div>
        <Booking
          button={
            <button className="md:self-end mt-6 bg-[#9E2B2A] text-white text-lg font-normal py-4 px-6 rounded-full md:w-max">
              Programar cita
            </button>
          }
        />
      </div>
    </div>
  );
};

export default Schedule;
