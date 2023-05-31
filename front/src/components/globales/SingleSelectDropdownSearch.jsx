import React, { useState, useEffect } from "react";
import Select from "react-select";
import clienteAxios from "../../config/clienteAxios";

const SingleObjectDropdownSearch = ({ handleCategoriaChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const { data } = await clienteAxios(`/categoria`);
        console.log(data);

        const formattedOptions = data.map((item) => ({
          value: item._id,
          label: item.titulo,
        }));

        setOptions(formattedOptions);
        setLoading(false);
      } catch (error) {
        console.log("Error al cargar los datos del juego:", error);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (selected) => {
    setSelectedOption(selected);
    handleCategoriaChange(selected ? selected.value : "");
  };

  if (loading) {
    return <p>Cargando opciones...</p>;
  }

  if (!options.length) {
    return <p>No hay opciones disponibles</p>;
  }

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
      isSearchable
    />
  );
};

export default SingleObjectDropdownSearch;
