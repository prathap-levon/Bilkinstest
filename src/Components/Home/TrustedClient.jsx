import React, { useRef, useState } from "react";
import client1 from "../../Assets/Img/other-logos/client-1.png";
import client2 from "../../Assets/Img/other-logos/client-2.png";
import client3 from "../../Assets/Img/other-logos/client-3.png";
import client4 from "../../Assets/Img/other-logos/client-4.png";
import client5 from "../../Assets/Img/other-logos/client-5.png";
import Animate from "../Animation/Animate";

const clients = [
  {
    icon: client1,
  },
  {
    icon: client2,
  },
  {
    icon: client3,
  },
  {
    icon: client4,
  },
  {
    icon: client5,
  },
];

const TrustedClient = () => {
  const marqueeRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - marqueeRef.current.offsetLeft);
    setScrollLeft(marqueeRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - marqueeRef.current.offsetLeft;
    const walk = (x - startX) * 3;
    marqueeRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <>
      <div className="home-trusted-client">
        <div className="title-home-trusted-client">
          <Animate>
            <h3>
              Trusted by leading brands{" "}
              <span style={{ fontWeight: "400" }}>worldwide</span>
            </h3>
          </Animate>

          <div
            className="clients-logos-marquee-section"
            ref={marqueeRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {clients.map((client) => (
              <div className="client-cards-marquee" key={client.icon}>
                <div className="client-card">
                  <img src={client.icon} alt="" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TrustedClient;
