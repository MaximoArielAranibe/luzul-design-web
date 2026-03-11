import React from "react";
import "../../styles/decorations/Blob.scss";

const Blob = ({
  inverted = false,
  backgroundColor = "#d4af37",
  pos = "top",
}) => {
  return (
    <div className={`blob-container ${pos}`}>
      <svg
        className={`blob ${inverted ? "inverted" : ""}`}
        viewBox="0 0 900 600"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 -91.2C130.6 -69.3 157.3 -34.6 173.9 16.6C190.5 67.9 197.1 135.8 166.4 210.8C135.8 285.8 67.9 367.9 -19 386.9C-105.8 405.8 -211.7 361.7 -299.2 286.7C-386.7 211.7 -455.8 105.8 -434.6 21.2C-413.4 -63.4 -301.8 -126.8 -214.3 -148.7C-126.8 -170.6 -63.4 -150.9 -14.4 -136.5C34.6 -122.2 69.3 -113 100 -91.2"
          fill={backgroundColor}
          transform="translate(450 300)"
        />
      </svg>

    </div>
  );
};

export default Blob;
