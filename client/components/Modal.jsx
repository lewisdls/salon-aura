import { MdCheck } from "react-icons/md";
import { motion } from "framer-motion";

const Modal = ({ close }) => {
  return (
    <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl">
      <div className="text-center flex flex-col items-center justify-center">
        <MdCheck className="bg-[#DCFCE7] text-[#17A24A] text-5xl p-3 rounded-full" />
        <p className="text-xl font-medium mt-4 mb-1">Exito!</p>
        <p className="text-gray-500 font-light">
          Su cita fue programada exitosamente.
        </p>
        <button
          onClick={close}
          className="mt-6 py-1 px-3 bg-[#2B2A2B] text-white rounded-md"
        >
          Cerrar
        </button>
      </div>
    </motion.div>
  );
};

export default Modal;
