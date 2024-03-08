import React from "react";
import "./BodyComoIniciar.css";

import { HiOutlineMail } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";

function BodyAnuncios() {
  return (
    <div className="body-anuncios">
      <h1>Explora el Camino Menos Transitado</h1>
      <p>
        ¿Alguna vez has soñado con tomar el volante de tu destino económico? En{" "}
        <strong>Tu Primer Negocio</strong>, convertimos esa visión en una
        realidad tangible. Sumérgete en el dinámico mundo del comercio vehicular
        y descubre cómo un volante puede dirigirte hacia nuevos horizontes
        financieros.
      </p>
      <p>
        Nuestro enfoque único para capacitar a emprendedores como tú, combina la
        sabiduría de más de una década en el mercado con innovadoras estrategias
        de ingresos. No se requiere capital inicial, solo tu pasión por aprender
        y la voluntad de acelerar hacia el éxito.
      </p>
      <p>
        La industria vehicular no es solo para los mecánicos y vendedores de
        autos, es un ecosistema vibrante con un asiento esperando por ti. Desde
        consultoría hasta gestión de flotas, las oportunidades son tan vastas
        como tu ambición.
      </p>
      <div className="separator"></div>
      <h2 className="steps-to-sucess-title">
        Tu Ruta hacia el Éxito y la Libertad Económica
      </h2>
      <div className="steps-to-success">
        <div className="card">
          <p className="step-number">1</p>
          <p>Crea tu cuenta y únete a nuestra comunidad de visionarios.</p>
        </div>
        <div className="card">
          <p className="step-number">2</p>
          <p>Inicia sesión con tus credenciales únicas.</p>
        </div>
        <div className="card">
          <p className="step-number">3</p>
          <p>Navega a la sección de videos educativos.</p>
        </div>
        <div className="card">
          <p className="step-number">4</p>
          <p>
            Selecciona el curso que deseas y efectúa el pago de manera segura.
          </p>
        </div>
        <div className="card">
          <p className="step-number">5</p>
          <p>¡Emprende tu viaje hacia el éxito y la independencia económica!</p>
        </div>
      </div>
      <div className="separator"></div>
      <h2>Comienza tu Viaje Hoy</h2>
      <p>
        Conecta con nosotros y descubre cómo puedes ser parte de este
        emocionante viaje. Estamos aquí para guiarte en cada curva y acelerar tu
        éxito.
      </p>
      <div className="contact-info">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <HiOutlineMail size={30} style={{ marginRight: "10px" }} />

          <p>
            Email:{" "}
            <a href="mailto:info@tuprimernegocio.org">
              info@tuprimernegocio.org
            </a>
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <FaWhatsapp
            size={30}
            style={{ marginRight: "10px", color: "green" }}
          />

          <p>
            Whatsapp: <a href="https://wa.me/50671902300">+(506) 7190 2300</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default BodyAnuncios;
