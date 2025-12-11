import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { FaTwitter, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <Box
      component={"footer"}
      fontSize={"1rem"}
      display={"flex"}
      alignItems={"center"}
      gap={2}
    >
      <Typography variant="body1" fontWeight={"bold"}>
        Розповісти всім:
      </Typography>
      <Link
        color="inherit"
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        underline="none"
        sx={{
          transition: "color 0.3s ease",
          "&:hover": {
            color: "#1DA1F2",
            cursor: "pointer",
          },
        }}
      >
        <FaTwitter size={"1.5rem"} />
      </Link>
      <Link
        color="inherit"
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        underline="none"
        sx={{
          transition: "color 0.3s ease",
          "&:hover": {
            color: "#1877F2",
            cursor: "pointer",
          },
        }}
      >
        <FaFacebookF size={"1.5rem"} />
      </Link>
    </Box>
  );
}
