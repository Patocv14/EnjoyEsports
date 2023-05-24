import { useState, useEffect } from "react";
import Alerta from "../globales/Alerta";
import useAdmin from "../../hooks/useAdmin";
import { useParams } from "react-router-dom";
import { Modal } from "../globales/Modal";
import TagsInput from "../globales/TagsInput";

const FormularioUniversidad = () => {
  const [uni, setUni] = useState("");
  const [imgUni, setImgUni] = useState("");
  const [inicialesUni, setInicialesUni] = useState("");
  let [categorias, setCategorias] = useState([]);
  const [redes, setRedes] = useState([]);
  const [correo, setCorreo] = useState("");
  const [discord, setDiscord] = useState("");
  const [id, setId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [cat, setCat] = useState([]);

  const { submitUniversidad, universidad, mostrarAlerta, alerta } = useAdmin();

  const params = useParams();

  useEffect(() => {
    if (params.id && universidad.uni) {
      setUni(universidad.uni);
      setImgUni(universidad.imgUni);
      setInicialesUni(universidad.inicialesUni);
      setCategorias(universidad.categorias);
      setRedes(universidad.redes);
      setCorreo(universidad.correo);
      setDiscord(universidad.discord);
      setId(universidad.id);
    }
  }, [params]);

  const hanldeSubmit = async (e) => {
    e.preventDefault();

    if ([uni, imgUni, inicialesUni, redes, correo, discord].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    //Pasar datos al provider
    await submitUniversidad({
      id,
      uni,
      imgUni,
      inicialesUni,
      categorias,
      redes,
      correo,
      discord,
    });
  };

  const handleTagsData = (data) => {
    // Realiza las operaciones necesarias con los datos enviados desde TagsInput
    console.log("Datos recibidos desde TagsInput:", data);
  };

  const handleTagsChange = (newTags) => {
    setCat(newTags); // Actualiza el estado tags
  };

  const { msg } = alerta;
  let juego = [];
  cat.map((obj) => juego.push(obj._id));

  categorias = juego;

  return (
    <>
      <form
        className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
        onSubmit={hanldeSubmit}
      >
        {msg && <Alerta alerta={alerta} />}
        <div className="pb-5">
          <label
            className="text-gray-700 uppercase font-bold text-sm "
            htmlFor="uniName"
          >
            Nombre de la Universidad
          </label>
          <input
            type="text"
            id="uniName"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
            placeholder="Nombre de la Universidad"
            value={uni}
            onChange={(e) => setUni(e.target.value)}
          />
        </div>

        <div className="pb-5">
          <label
            className="text-gray-700 uppercase font-bold text-sm "
            htmlFor="imgUni"
          >
            Imagen de la Universidad
          </label>
          <input
            type="text"
            id="imgUni"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
            placeholder="Imagen de la Universidad"
            value={imgUni}
            onChange={(e) => setImgUni(e.target.value)}
          />
        </div>
        <div className="pb-5">
          <label
            className="text-gray-700 uppercase font-bold text-sm "
            htmlFor="iniciales"
          >
            Iniciales de la uni
          </label>
          <input
            type="text"
            id="iniciales"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
            placeholder="Iniciales de la uni"
            value={inicialesUni}
            onChange={(e) => setInicialesUni(e.target.value)}
          />
        </div>

        <div className="pb-5">
          <label
            className="text-gray-700 uppercase font-bold text-sm "
            htmlFor="juegosP"
          >
            Juegos en las que Participa
          </label>
          <input
            type="text"
            id="juegosP"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
            placeholder="Juegos en las que Participa"
            value={cat.map((obj) => obj.titulo)}
            onClick={() => setShowModal(true)}
          />
        </div>

        <div className="pb-5">
          <label
            className="text-gray-700 uppercase font-bold text-sm "
            htmlFor="redUni"
          >
            Redes de la Universidad
          </label>
          <input
            type="text"
            id="redUni"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
            placeholder="Redes de la Universidad"
            value={redes}
            onChange={(e) => setRedes(e.target.value.split(","))}
          />
        </div>

        <div className="pb-5">
          <label
            className="text-gray-700 uppercase font-bold text-sm "
            htmlFor="correo"
          >
            Correo del Coordinador
          </label>
          <input
            type="email"
            id="correo"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
            placeholder="Correo del Coordinador"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <div className="pb-5">
          <label
            className="text-gray-700 uppercase font-bold text-sm "
            htmlFor="discord"
          >
            Discord del Coordinador
          </label>
          <input
            type="text"
            id="discord"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
            placeholder="Discord del Coordinador"
            value={discord}
            onChange={(e) => setDiscord(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Crear Universidad"
          className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
        />
      </form>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="p-6">
          <TagsInput
            onTagsChange={handleTagsChange}
            onTagsData={handleTagsData}
            cat={cat}
          />
        </div>
      </Modal>
    </>
  );
};

export default FormularioUniversidad;
