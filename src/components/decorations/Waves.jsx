import React from "react";
import '../../styles/decorations/Waves.scss';

const Wave = ({ inverted = false, backgroundColor = "#000", pos = "top", }) => {
  return (
    <div className={`about-wave ${pos}`}>
      <svg
        className={`wave ${inverted ? "inverted" : ""}`}
        viewBox="0 0 450 150"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="450" height="150" fill="#fafafa" />

        <path
          d="M0 125L3.5 128.3C7 131.7 14 138.3 21.2 137.7C28.3 137 35.7 129 42.8 128.8C50 128.7 57 136.3 64.2 137.8C71.3 139.3 78.7 134.7 85.8 132.8C93 131 100 132 107.2 130.7C114.3 129.3 121.7 125.7 128.8 124C136 122.3 143 122.7 150 124.8C157 127 164 131 171.2 134.8C178.3 138.7 185.7 142.3 192.8 141.8C200 141.3 207 136.7 214.2 135.2C221.3 133.7 228.7 135.3 235.8 136.8C243 138.3 250 139.7 257.2 139.3C264.3 139 271.7 137 278.8 136.5C286 136 293 137 300 136.2C307 135.3 314 132.7 321.2 134.2C328.3 135.7 335.7 141.3 342.8 143.3C350 145.3 357 143.7 364.2 142.8C371.3 142 378.7 142 385.8 142.8C393 143.7 400 145.3 407.2 142.3C414.3 139.3 421.7 131.7 428.8 127.7C436 123.7 443 123.3 446.5 123.2L450 123L450 0L0 0Z"
          fill={backgroundColor}
        />
      </svg>
    </div>
  );
};

export default Wave;
