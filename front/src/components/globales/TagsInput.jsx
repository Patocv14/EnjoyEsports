import { useState, useEffect } from "react";
import useUsuario from "../../hooks/useUsuario";

const TagsInput = ({ onTagsChange, onTagsData, cat }) => {
  const { categoria } = useUsuario();

  const [tags, setTags] = useState(cat);

  function test(e) {
    const value = e;
    setTags((prev) => {
      const updatedTags = [...prev, value];
      return updatedTags;
    });

    onTagsData(tags);
  }

  useEffect(() => {
    onTagsChange(tags);
  }, [tags, onTagsChange]);

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  return (
    <div>
      <div className="tags-input-container flex items-center overflow-x-auto w-full gap-2 border-b-2">
        {categoria.map((tag, index) => (
          <div key={index}>
            <div className="tag-item mb-2">
              <span className="text text-xs" onClick={() => test(tag)}>
                {tag.titulo}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="tags-input-container flex items-center overflow-x-auto w-full gap-2">
        {tags.map((tag, index) => (
          <div key={index}>
            <div className="tag-item flex">
              <span className="text">{tag.titulo}</span>
              <span
                className="close cursor-pointer"
                onClick={() => removeTag(index)}
              >
                &times;
              </span>
            </div>
          </div>
        ))}
      </div>
      <input
        type="text"
        className="p-3 my-2 w-full"
        placeholder="Escribe categoria"
      />
    </div>
  );
};

export default TagsInput;
