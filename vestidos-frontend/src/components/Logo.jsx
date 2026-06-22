function Logo() {
  return (
    <svg
      width="180"
      height="70"
      viewBox="0 0 180 70"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Mariposa */}
      <path
        d="M32 25
           C20 10,8 15,12 30
           C15 40,22 42,32 35
           C42 42,49 40,52 30
           C56 15,44 10,32 25Z"
        fill="#D4AF37"
      />

      {/* RF */}
      <text
        x="70"
        y="38"
        fontSize="32"
        fontFamily="Cinzel, serif"
        fill="#D4AF37"
        fontWeight="bold"
      >
        RF
      </text>

      {/* Nombre */}
      <text
        x="90"
        y="60"
        textAnchor="middle"
        fontSize="10"
        letterSpacing="2"
        fill="#D4AF37"
      >
        REYNA FASHION
      </text>
    </svg>
  );
}

export default Logo;