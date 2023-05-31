import React, { useState, useEffect } from "react";
import Select from "react-select";
import clienteAxios from "../../config/clienteAxios";

const SingleUniversityDropdownSearch = ({ handleUniversidadChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const { data } = await clienteAxios.get("/universidad");
        console.log(data);

        const formattedOptions = data.map((item) => ({
          value: item._id,
          label: item.inicialesUni,
        }));

        setOptions(formattedOptions);
        setLoading(false);
      } catch (error) {
        console.log("Error al cargar los datos de las universidades:", error);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (selected) => {
    setSelectedOption(selected);
    handleUniversidadChange(selected ? selected.value : "");
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

export default SingleUniversityDropdownSearch;
