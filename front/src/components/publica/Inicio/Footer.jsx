import React from "react";
import face from "../../../assets/facebook.svg";
import ig from "../../../assets/instagram.svg";
import twitch from "../../../assets/twitch.svg";
import tw from "../../../assets/twitter.svg";
import yt from "../../../assets/youtube.svg";

const Footer = () => {
  return (
    <div className="bg-gris3 ">
      <div className="flex flex-col ">
        <div>
          <h1 className="md:text-6xl text-4xl text-cyan fuenteEnjoy text-center mt-5 ">
            ¡Contactanos!
          </h1>
        </div>
        <div className="flex md:gap-10 gap-4 justify-center md:py-10 py-5">
          <a target="_blank" href="https://www.facebook.com/EnjoyEsportsL">
            <img src={face} alt="Facebook Logo" />
          </a>
          <a
            target="_blank"
            href="https://www.youtube.com/@enjoyesportsleague2158"
          >
            <img src={yt} alt="Youtube Logo" />
          </a>
          <a target="_blank" href="https://twitter.com/EnjoyeSportsL">
            <img src={tw} alt="Twitter Logo" />
          </a>
          <a target="_blank" href="https://www.instagram.com/enjoyesportsl">
            <img src={ig} alt="Instagram Logo" />
          </a>
          <a target="_blank" href="https://www.twitch.tv/enjoyesportsleague">
            <img src={twitch} alt="Twitch Logo" />
          </a>
          {/* //TODO: Agregar tiktok */}
        </div>
        <div className="text-white text-center text-xl mb-12">
          <p>©2023 por Enjoy Esports.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
