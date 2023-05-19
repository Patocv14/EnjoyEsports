import Header from "../../components/publica/Inicio/Header";
import Navbar from "../../components/publica/Inicio/Navbar";
import Footer from "../../components/publica/Inicio/Footer";

import tazon from "../../assets/tazon.jpg";

const SobreNosotros = () => {
  const pagina = "nosotros";
  return (
    <div className="bg-fondo">
      <Navbar pagina={pagina} />
      <Header />
      <div>
        <div className="fuenteEnjoy text-center my-10 uppercase">
          <h1 className="md:text-5xl text-3xl pb-1">Quienes Somos</h1>
          <h2 className="md:text-4xl text-2xl text-naranja">
            Enjoy Esports League
          </h2>
        </div>
        <div className="flex justify-center">
          <div className="md:w-1/2 md:p-0 p-10">
            <p className="">
              ontrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source. Lorem Ipsum comes
              from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
              Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
              BC. This book is a treatise on the theory of ethics, very popular
              during the Renaissance. The first line of Lorem Ipsum, "Lorem
              ipsum dolor sit amet..", comes from a line in section 1.10.32. The
              standard chunk of Lorem Ipsum used since the 1500s is reproduced
              below for those interested. Sections 1.10.32 and 1.10.33 from "de
              Finibus Bonorum et Malorum" by Cicero are also reproduced in their
              exact original form, accompanied by English versions from the 1914
              translation by H. Rackham.
            </p>
          </div>
        </div>

        <div className="py-10 flex justify-center">
          <div className="bg-grisClaro xl:w-[1100px] sm:w-[700px] w-[300px] rounded-xl">
            <div className="xl:grid grid-cols-2 p-8 gap-10 ">
              <div className="flex flex-col items-center">
                <h1 className="text-4xl fuenteEnjoy uppercase mb-5 pt-5">
                  Organizador de eventos de esports
                </h1>
                <p>
                  ontrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin words, consectetur,
                  from a Lorem Ipsum passage, and going through the cites of the
                  word in classical literature, discovered the undoubtable
                  source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of
                  "de Finibus Bonorum et Malorum" (The Extremes of Good and
                  Evil) by Cicero, written in 45 BC. This book is a treatise on
                  the theory of ethics, very popular during the Renaissance. The
                  first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                  comes from a line in section 1.10.32. The standard chunk of
                  Lorem Ipsum used since the 1500s is reproduced below for those
                  interested. Sections 1.10.32 and 1.10.33 from "de Finibus
                  Bonorum et Malorum" by Cicero are also reproduced in their
                  exact original form, accompanied by English versions from the
                  1914 translation by H. Rackham.
                </p>
              </div>
              <div>
                <img
                  className="rounded-xl xl:mt-0 mt-5"
                  src={tazon}
                  alt="tazon Imagen"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="py-10 flex justify-center">
          <div className="bg-grisClaro xl:w-[1100px] sm:w-[700px] w-[300px] rounded-xl">
            <div className="xl:grid grid-cols-2 p-8 gap-10 ">
              <div>
                <img
                  className="rounded-xl xl:mt-0 mt-5"
                  src={tazon}
                  alt="tazon Imagen"
                />
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-4xl fuenteEnjoy uppercase mb-5 pt-5">
                  Desarolladores de talento a nivel universitario
                </h1>
                <p>
                  ontrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin words, consectetur,
                  from a Lorem Ipsum passage, and going through the cites of the
                  word in classical literature, discovered the undoubtable
                  source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of
                  "de Finibus Bonorum et Malorum" (The Extremes of Good and
                  Evil) by Cicero, written in 45 BC. This book is a treatise on
                  the theory of ethics, very popular during the Renaissance. The
                  first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                  comes from a line in section 1.10.32. The standard chunk of
                  Lorem Ipsum used since the 1500s is reproduced below for those
                  interested. Sections 1.10.32 and 1.10.33 from "de Finibus
                  Bonorum et Malorum" by
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" laptop:h-[640px]">
          <div className="enjoyImage enjoyImage2"></div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SobreNosotros;
