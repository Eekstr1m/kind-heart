import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { IoSearchOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";

const languages = ["УКР", "EN"];

export default function Header() {
  const [locale, setLocale] = useState("УКР");
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement | SVGElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid
      container
      component={"header"}
      display="grid"
      justifyContent="space-between"
      alignItems="center"
      gridTemplateAreas={"'logo nav login'"}
      fontSize={"1rem"}
      fontWeight={"bold"}
      sx={(theme) => ({
        mx: 4,
        my: 2,
        [theme.breakpoints.down("sm")]: {
          gridTemplateColumns: "1fr 1fr 1fr",
          placeItems: "center",
          mx: 2,
        },
        [theme.breakpoints.between("sm", "md")]: {
          gridTemplateAreas: "'logo login' 'nav nav'",
          gridTemplateColumns: "1fr",
          gap: 1,
        },
      })}
    >
      <Grid gridArea={"logo"}>
        <Box
          display="flex"
          alignItems="center"
          sx={(theme) => ({
            gap: 16,
            [theme.breakpoints.down("lg")]: {
              gap: 4,
            },
            [theme.breakpoints.between("md", "sm")]: {
              gap: 8,
            },
          })}
        >
          <FaHeart size={"3rem"} style={{ fill: "url(#gradient)" }} />
          <Box display="flex" gap={1}>
            {languages.map((lang) => (
              <Link
                key={lang}
                underline="none"
                color="inherit"
                sx={{
                  opacity: lang === locale ? 1 : 0.6,
                  cursor: "pointer",
                  transition: "scale 0.3s ease",
                  "&:hover": {
                    scale: 1.1,
                  },
                }}
                onClick={() => setLocale(lang)}
              >
                {lang}
              </Link>
            ))}
          </Box>
        </Box>
      </Grid>
      <Grid gridArea={"nav"}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"space-between"}
          width={"100%"}
          gap={4}
          fontSize={"1.2rem"}
        >
          {matches ? (
            // <RxHamburgerMenu />
            <Box>
              <Box
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                {open ? (
                  <IoCloseOutline size={"2rem"} />
                ) : (
                  <RxHamburgerMenu size={"1.75rem"} />
                )}
              </Box>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                  list: {
                    "aria-labelledby": "basic-button",
                  },
                  paper: {
                    sx: (theme) => ({
                      color: "#fff",
                      width: "100%",
                      mt: 2,
                      background: `linear-gradient(150deg, ${theme.palette.secondary.main} 0vw, ${theme.palette.secondary.light} 100vw)`,
                    }),
                  },
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <>
              <NavItem href={"/projects"} label="Проекти" />
              <NavItem href={"/archive"} label="Архів" />
              <NavItem href={"/contacts"} label="Контакти" />
              <NavItem
                href={"/emergency"}
                label="Термінова допомога"
                emergency
              />
            </>
          )}
        </Box>
      </Grid>
      <Grid gridArea={"login"}>
        <Box
          display="flex"
          alignItems="center"
          sx={(theme) => ({
            gap: 16,
            [theme.breakpoints.down("lg")]: {
              gap: 4,
            },
            [theme.breakpoints.between("md", "sm")]: {
              gap: 8,
            },
          })}
        >
          <IoSearchOutline size={"1.5rem"} />
          <Box display={"flex"} gap={1}>
            <NavItem href={"/login"} label={"Вхід"} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

function NavItem({
  href,
  label,
  emergency,
}: {
  href: string;
  label: string;
  emergency?: boolean;
}) {
  return (
    <Link
      href={href}
      underline="none"
      color="inherit"
      sx={(theme) => ({
        ...(emergency && {
          background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
          borderRadius: "8px",
          padding: "7px 20px",
        }),
        transition: "scale 0.3s ease",
        ":hover": {
          scale: "1.1",
        },
      })}
    >
      {label}
    </Link>
  );
}
