import React from "react";
import face from "../../public/assets/facebook.svg";
import ig from "../../public/assets/instagram.svg";
import twitch from "../../public/assets/twitch.svg";
import tw from "../../public/assets/twitter.svg";
import yt from "../../public/assets/youtube.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

const Footer = () => {
  const router = useRouter();

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
            <Image src={face} alt="Facebook Logo" />
          </a>

          <a
            target="_blank"
            href="https://www.youtube.com/@enjoyesportsleague2158"
          >
            <Image src={yt} alt="Youtube Logo" />
          </a>

          <a target="_blank" href="https://twitter.com/EnjoyeSportsL">
            <Image src={tw} alt="Twitter Logo" />
          </a>
          <a target="_blank" href="https://www.instagram.com/enjoyesportsl">
            <Image src={ig} alt="Instagram Logo" />
          </a>
          <a target="_blank" href="https://www.twitch.tv/enjoyesportsleague">
            <Image src={twitch} alt="Twitch Logo" />
          </a>
        </div>
        <div className="text-white text-center text-xl mb-12">
          <p>©2023 por Enjoy Esports.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
