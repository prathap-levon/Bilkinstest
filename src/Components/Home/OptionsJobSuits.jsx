import React, { useState, useEffect } from "react";
import option1 from "../../Assets/Img/icons/option-1.png";
import option2 from "../../Assets/Img/icons/option-2.png";
import option3 from "../../Assets/Img/icons/option-3.png";
import option4 from "../../Assets/Img/icons/option-4.png";

const options = [
  { image: option1, count: 2500, label: "Hired" },
  { image: option2, count: 40, label: "Recruiters" },
  { image: option3, count: 150, label: "Facilities" },
  { image: option4, count: 10, label: "Locations" },
];

const OptionsJobSuits = () => {
  const [countValues, setCountValues] = useState(Array.from({ length: options.length }, () => 0));
  const [isAnimating, setIsAnimating] = useState(false);

 
  const animateCounts = (duration = 6000) => {
    setIsAnimating(true);
    const start = Date.now();
    const endValues = options.map(option => option.count); 
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - start) / duration, 1);
      const updatedCounts = endValues.map((count, index) => Math.floor(progress * count));
      setCountValues(updatedCounts);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    animate();
  };

  useEffect(() => {
    animateCounts(); 
  }, []);

  return (
    <div className="options-job-suits">
      <div className="row">
        {options.map((option, index) => (
          <div className="col-lg-3" key={index}>
            <div className="card-morphism">
              <img src={option.image} alt="option" />
              <h3>{isAnimating ? countValues[index] : option.count}</h3>
              <p>{option.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default OptionsJobSuits;
