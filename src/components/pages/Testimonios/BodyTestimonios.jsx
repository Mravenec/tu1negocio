import React, { useRef, useState, useEffect } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { MdSkipNext } from "react-icons/md";
import { MdSkipPrevious } from "react-icons/md";

import "./BodyTestimonios.css";
import ReactPlayer from "react-player";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonios = () => {
  const videos = [
    {
      url: "https://vimeo.com/920557391?share=copy",
      text: 'Steven Obregón: \n  " Ha sido una experiencia muy enriquecedora, he aprendido muchísimo pero más que eso, he visto resultados monetarios y financieros. Hoy en dia cuento con más libertad y tiempo, estoy mas contento, tengo más paz y puedo ejecutar el negocio en momentos donde más me convienen. "',
    },

    {
      url: "https://vimeo.com/918692270?share=copy",
      text: 'Mauricio Cruz: \n " Es demasiado sencillo, demasiado fácil sólo es dejarse guiar por las recomendaciones y herramientas necesarias. "',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const playerRefs = useRef([]);
  const carouselRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <MdSkipPrevious color="white" size={30} />,
    nextArrow: <MdSkipNext color="white" size={30} />,
    afterChange: (current) => setCurrentSlide(current),
  };

  useEffect(() => {
    playerRefs.current.forEach((playerRef, index) => {
      if (playerRef && playerRef.current) {
        if (index !== currentSlide) {
          playerRef.current.seekTo(0);
          playerRef.current.pause();
        } else {
          playerRef.current.seekTo(0);
          playerRef.current.play();
        }
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  return (
    <div className="testimonios-container">
      <div className="video-container">
        <div className="text" style={{ textAlign: "center" }}>
          <h1>Testimonios</h1>
          <p className="sub">
            Historias reales de personas iniciando en
            <strong> Tu Primer Negocio</strong>
          </p>
        </div>
        <div className="separator"></div>
        <div className="mainVideo">
          <div className="videoPlayer">
            <Slider {...settings} ref={carouselRef}>
              {videos.map((video, index) => (
                <div key={index}>
                  <ReactPlayer
                    ref={(ref) => (playerRefs.current[index] = ref)}
                    url={video.url}
                    controls={true} // Desactivar las barras de control
                    muted={true}
                    className="react-player"
                    playing={index === currentSlide}
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="videoDescription">
            <p>
              <FaRegCommentDots size={20} style={{ marginRight: "10px" }} />
              {videos[currentSlide].text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonios;
