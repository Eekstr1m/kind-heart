import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

export default function MainHeart() {
  return (
    <Box
      sx={(theme) => ({
        display: "none",
        overflow: "hidden",
        [theme.breakpoints.only("xl")]: {
          display: "block",
        },
      })}
    >
      <Pill top={43} left={80} isSmall />
      <Pill top={45} left={88} isSmall />
      <Pill top={87} left={70} isSmall />
      <Pill top={68} left={85} />
      <Pill top={81} left={59} />
      <Circle top={66} left={62} />
      <Circle top={56} left={86} />
      <Circle top={82} left={67} />
      <Heart top={44} left={65} />
    </Box>
  );
}

function Heart({ top, left }: { top: number; left: number }) {
  const theme = useTheme();
  return (
    <Box
      sx={(theme) => ({
        position: "absolute",
        overflow: "hidden",
        top: `${top}vh`,
        left: `${left}vw`,
        width: "550px",
        zIndex: 0,
        [theme.breakpoints.down(1920)]: {
          width: "450px",
        },
      })}
    >
      <svg
        viewBox="0 0 100 90"
        preserveAspectRatio="xMidYMid meet"
        style={{
          transform:
            "rotate(-45deg) scaleX(1.05) perspective(1000px) rotateY(20deg) rotateX(0deg) rotateZ(0deg) skewY(10deg)",
        }}
      >
        <defs>
          <linearGradient id="g">
            <stop offset="40%" stopColor={theme.palette.primary.main} />
            <stop offset="100%" stopColor={theme.palette.primary.light} />
          </linearGradient>
        </defs>

        {/* thicker shadow / extrude */}
        <path
          d="M50 18c-6-9-24-8-28 6-4 14 8 26 28 44 20-18 32-30 28-44-4-14-22-15-28-6z"
          fill={theme.palette.primary.dark}
          transform="translate(-2,-1)"
          opacity="1"
          filter="url(#shadow)"
        />

        {/* main heart */}
        <path
          d="M50 15c-6-9-24-8-28 6-4 14 8 26 28 44 20-18 32-30 28-44-4-14-22-15-28-6z"
          fill="url(#g)"
        />
      </svg>
    </Box>
  );
}

function Circle({ top, left }: { top: number; left: number }) {
  const theme = useTheme();
  return (
    <Box
      component={"span"}
      sx={{
        position: "absolute",
        width: "50px",
        height: "50px",
        borderRadius: "999px",
        background: `linear-gradient(90deg, ${theme.palette.primary.main} 60%, ${theme.palette.primary.light})`,
        boxShadow: `-4px 6px 0px ${theme.palette.primary.dark}, -3px 5px 6px rgba(66, 65, 65, 0.8)`,
        top: `${top}vh`,
        left: `${left}vw`,
        zIndex: 0,
      }}
    />
  );
}

function Pill({
  top,
  left,
  isSmall,
}: {
  top: number;
  left: number;
  isSmall?: boolean;
}) {
  const theme = useTheme();
  return (
    <Box
      component={"span"}
      sx={{
        position: "absolute",
        width: `${isSmall ? "120px" : "105px"}`,
        height: `${isSmall ? "35px" : "50px"}`,
        borderRadius: "999px",
        background: `linear-gradient(90deg, ${theme.palette.primary.main} 60%, ${theme.palette.primary.light})`,
        boxShadow: `-7px 7px 0px ${theme.palette.primary.dark}, -6px 6px 8px rgba(66, 65, 65, 0.8)`,
        rotate: "-30deg",
        top: `${top}vh`,
        left: `${left}vw`,
        zIndex: 0,
      }}
    />
  );
}
