import React from 'react';
import Image from 'next/image';

const competenciaMain = ({ comp }) => {
  console.log(comp);

  return (
    <div className="container mx-auto">
      <div className="fuenteEnjoy text-center md:text-5xl text-3xl py-2 uppercase">
        <h1>Competencias</h1>
        <h2 className="text-naranja">2023</h2>
        <h3 className="py-16">College Collition</h3>
      </div>
      <div className=" grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
        {comp.map((obj) => (
          <div key={obj.id}>
            <div className="flex justify-center">
              <Image
                className="imagenCompetencias rounded-xl transition duration-300 ease-in-out hover:scale-110 cursor-pointer shadow-2xl"
                src={obj.image}
                alt={obj.alt}
                width={384}
                height={384}
              />
            </div>
            <div className="text-center pt-5 pb-10 fuenteEnjoy text-xl uppercase">
              <h1>{obj.text}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default competenciaMain;
