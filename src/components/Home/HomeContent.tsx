import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import { PiPlusCircleLight } from "react-icons/pi";
import HelpDialog from "../Dialogs/HelpDialog/HelpDialog";

export default function HomeContent() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid
      component={"section"}
      container
      spacing={3}
      direction={"column"}
      display={"grid"}
      sx={{
        height: "100%",
        placeItems: "center left",
      }}
    >
      <Grid>
        <Box
          display={"flex"}
          alignItems="end"
          gap={1}
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              alignItems: "flex-start",
            },
          })}
        >
          <Typography
            variant="h2"
            fontSize={"clamp(2rem, 5vw, 5.5rem)"}
            fontWeight={"bold"}
            sx={(theme) => ({
              [theme.breakpoints.up("xl")]: {
                lineHeight: 1,
              },
              [theme.breakpoints.between("md", "sm")]: {
                lineHeight: 1.5,
              },
            })}
          >
            Добре Серце
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            display="flex"
            alignItems={"center"}
            gap={1}
          >
            детальніше про проект
            <GradientIconButton type="chevron" />
          </Typography>
        </Box>
      </Grid>

      <Grid>
        <Box>
          <Box
            sx={{
              mb: 3,
              width: "60px",
              height: "2px",
              backgroundColor: "#FFF",
            }}
          ></Box>

          <Typography variant="h6" fontWeight={"light"} sx={{ mb: 3 }}>
            Вже зараз Ви можете допомогти тим, хто дійсно
            <br />
            потребує допомоги
          </Typography>
          <Box
            display={"flex"}
            alignItems={"center"}
            sx={(theme) => ({
              gap: 16,
              [theme.breakpoints.down("md")]: {
                gap: 4,
              },
              [theme.breakpoints.down(730)]: {
                flexDirection: "column",
                alignItems: "flex-start",
              },
            })}
          >
            <Typography
              variant="h6"
              fontWeight={"bold"}
              display="flex"
              alignItems={"center"}
              gap={1}
              sx={{ cursor: "pointer" }}
              onClick={handleClickOpen}
            >
              Як Ви можете допомогти?
              <GradientIconButton type="chevron" />
            </Typography>
            <Button
              variant="contained"
              sx={(theme) => ({
                backgroundColor: `${theme.palette.secondary.dark}`,
                boxShadow: `0px 0px 30px ${theme.palette.primary.main}`,
                borderRadius: "15px",
                padding: "15px 30px",
                textTransform: "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: `0px 0px 50px ${theme.palette.primary.main}`,
                  transform: "scale(1.05)",
                },
              })}
            >
              <HelpDialog open={open} handleClose={handleClose} />
              <Typography
                onClick={handleClickOpen}
                variant="h6"
                fontWeight={"bold"}
              >
                Допомогти вже зараз
              </Typography>
            </Button>
          </Box>
        </Box>
      </Grid>

      <Grid>
        <Box>
          <Box
            sx={{
              mb: 3,
              width: "60px",
              height: "2px",
              backgroundColor: "#FFF",
            }}
          />
          <Typography variant="h6" fontWeight={"light"} sx={{ mb: 3 }}>
            Якщо Вам необхідна допомога, додайте проект
          </Typography>
          <Typography
            variant="h6"
            fontWeight={"bold"}
            display="flex"
            alignItems={"center"}
            gap={1}
          >
            Додати проект
            <GradientIconButton type="plus" />
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

function GradientIconButton({ type }: { type: "chevron" | "plus" }) {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      alignItems={"center"}
      sx={{
        transition: "scale 0.3s ease",
        "&:hover": {
          scale: "1.1",
          cursor: "pointer",
        },
      }}
    >
      {type === "chevron" && (
        <IoChevronForwardCircleOutline
          size={"2rem"}
          style={{ stroke: "url(#gradient)" }}
        />
      )}
      {type === "plus" && (
        <PiPlusCircleLight size={"2rem"} style={{ fill: "url(#gradient)" }} />
      )}
      {/* Gradient for icons */}
      <svg width="0" height="0">
        <linearGradient id="gradient">
          <stop stopColor={theme.palette.primary.main} offset="0%" />
          <stop stopColor={theme.palette.primary.light} offset="100%" />
        </linearGradient>
      </svg>
    </Box>
  );
}
