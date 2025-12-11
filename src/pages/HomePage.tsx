import Grid from "@mui/material/Grid";
import Header from "../components/Header/Header";
import HomeContent from "../components/Home/HomeContent";
import Footer from "../components/Footer/Footer";
import MainHeart from "../components/MainHeart/MainHeart";

export default function HomePage() {
  return (
    <Grid
      container
      display={"grid"}
      direction={"column"}
      gridTemplateRows={"1fr repeat(1,4fr) 1fr"}
      height={"100vh"}
      sx={(theme) => ({
        color: "#fff",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        [theme.breakpoints.down("lg")]: {
          background: `linear-gradient(150deg, ${theme.palette.secondary.main} 0vw, ${theme.palette.secondary.light} 100vw)`,
        },
        [theme.breakpoints.up("lg")]: {
          background: `linear-gradient(150deg, ${theme.palette.secondary.main} 20vw, ${theme.palette.secondary.light} 80vw, rgba(255, 255, 255, 1) 80vw 100vw)`,
        },
        [theme.breakpoints.up("xl")]: {
          background: `linear-gradient(150deg, ${theme.palette.secondary.main} 20vw, ${theme.palette.secondary.light} 60vw, rgba(255, 255, 255, 1) 60vw 100vw)`,
        },
      })}
    >
      <Grid>
        <Header />
      </Grid>
      <Grid
        sx={(theme) => ({
          mx: 16,
          [theme.breakpoints.down("lg")]: {
            mx: 8,
          },
          [theme.breakpoints.down("sm")]: {
            mx: 2,
          },
        })}
      >
        <HomeContent />
      </Grid>
      <Grid
        sx={(theme) => ({
          mx: 16,
          placeContent: "center",
          [theme.breakpoints.down("lg")]: {
            mx: 8,
          },
          [theme.breakpoints.down("sm")]: {
            mx: 2,
          },
        })}
      >
        <Footer />
      </Grid>

      {/* Heart */}
      <MainHeart />
    </Grid>
  );
}
