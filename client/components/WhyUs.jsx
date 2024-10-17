import { FaPeopleGroup, FaStar, FaScissors, FaLeaf } from "react-icons/fa6";

const WhyUs = () => {
  return (
    <div
      id="about"
      className="bg-[#9E2B2A] py-12 px-6 md:py-20 md:px-16 flex flex-col lg:flex-row text-center lg:text-left text-white gap-16"
    >
      <div className="w-full flex flex-col gap-12 lg:gap-0 items-center lg:items-start lg:justify-between">
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl md:text-6xl lg:w-max">Por Qué Nosotros</h1>
          <p className="text-xl font-light leading-relaxed">
            Calidad y profesionalismo en cada servicio donde tu belleza y
            bienestar son nuestra prioridad
          </p>
        </div>
        <div className="text-xl font-light leading-relaxed flex gap-16">
          <div>
            <p className="text-4xl font-medium">+100</p>
            <p>Clientes satisfechos</p>
          </div>
          <div>
            <p className="text-4xl font-medium">1</p>
            <p>Salon en la ciudad</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:text-left">
        <div className="bg-[#B03A3A] flex flex-col md:flex-row items-center gap-6 rounded-xl p-6">
          <FaPeopleGroup className="text-4xl lg:text-[5rem]" />
          <p className="font-light leading-relaxed">
            Nuestro equipo está formado por estilistas capacitados y con años de
            experiencia en el sector. Nos mantenemos a la vanguardia de las
            últimas tendencias para ofrecerte siempre lo mejor.
          </p>
        </div>
        <div className="bg-[#B03A3A] flex flex-col md:flex-row items-center gap-6 rounded-xl p-6">
          <FaScissors className="text-4xl lg:text-[5rem]" />
          <p className="font-light leading-relaxed">
            Utilizamos productos de las mejores marcas del mercado, garantizando
            que cada tratamiento sea no solo efectivo, sino también seguro para
            tu salud y bienestar.
          </p>
        </div>
        <div className="bg-[#B03A3A] flex flex-col md:flex-row items-center gap-6 rounded-xl p-6">
          <FaLeaf className="text-4xl lg:text-[5rem]" />
          <p className="font-light leading-relaxed">
            Creemos que tu visita al salón debe ser más que un simple servicio
            de belleza. Disfruta de un ambiente cómodo, moderno y relajante,
            diseñado para que desconectes y te consientas.
          </p>
        </div>
        <div className="bg-[#B03A3A] flex flex-col md:flex-row items-center gap-6 rounded-xl p-6">
          <FaStar className="text-4xl lg:text-[5rem]" />
          <p className="font-light leading-relaxed">
            Tu satisfacción es nuestra prioridad. Escuchamos tus necesidades y
            personalizamos cada servicio para que salgas de nuestro salón
            sintiéndote increíble y con ganas de regresar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
