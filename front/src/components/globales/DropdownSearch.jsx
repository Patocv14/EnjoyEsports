import React, { useState, useEffect } from "react";
import Select from "react-select";
import clienteAxios from "../../config/clienteAxios";

const DropdownSearch = ({ handleMiembrosChange, isMulti }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedObjects, setSelectedObjects] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const { data } = await clienteAxios(`/usuarios/allUsers`);
        console.log(data);

        const formattedOptions = data.map((item) => ({
          value: item._id,
          label: item.nombre,
        }));

        setOptions(formattedOptions);
        setLoading(false);
      } catch (error) {
        console.log("Error al cargar los datos de la API:", error);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
    const selectedValues = selected ? selected.map((item) => item.value) : [];
    setSelectedObjects(selected);
    handleMiembrosChange(selectedValues);
  };

  if (loading) {
    return <p>Cargando opciones...</p>;
  }

  if (!options.length) {
    return <p>No hay opciones disponibles</p>;
  }

  return (
    <Select
      value={selectedOptions}
      onChange={handleChange}
      options={options}
      isMulti={isMulti}
      isSearchable
    />
  );
};

export default DropdownSearch;
