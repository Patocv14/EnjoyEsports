import useAdmin from "../../hooks/useAdmin";
import NavbarAdmin from "../../components/Admin/Navbar";

const Home = () => {
  const pagina = "home";

  return (
    <>
      <NavbarAdmin pagina={pagina} />
    </>
  );
};

export default Home;
