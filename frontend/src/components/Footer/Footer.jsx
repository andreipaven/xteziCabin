import React, { useState } from "react";
import { Box, ClickAwayListener, Tooltip, Typography } from "@mui/material";
import CustomBox from "../Containers/CustomBox.jsx";
import themeColor from "../../Theme/themeColors.jsx";
import useResponsive from "../Hooks/UseResponsive.jsx";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import InstagramIcon from "@mui/icons-material/Instagram";
import Divider from "../Details/Divider.jsx";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/DesktopNavBar.css";
import "../Styles/Footer.css";

function Footer() {
    const currentYear = new Date().getFullYear();
    const { isSmallScreen, isMediumScreen } = useResponsive();

    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    const [openIndex, setOpenIndex] = useState(null);

    const footerItems = [
        {
            title: "Link-uri rapide",
            value: ["Acasa", "Despre", "Servicii", "Contact", "Rezervare"],
            path: ["/", "/about", "/services", "/contact", "/shop"],
        },
        {
            title: "Legal",
            value: [
                "Politica de confidentialitate",
                "Termenii si conditiile",
                "Politica de anulare",
                "Regulamentul cabanei",
            ],
            path: [],
        },
        {
            title: "Contact",
            value: [<LocationOnIcon />, <EmailIcon />, <PhoneIcon />, "Social media"],
            infoValue: ["*****:))", "*****@gmail.com", "**********"],
            mediaIcons: [
                <FacebookIcon sx={{ fontSize: "2em", color: "inherit" }} />,
                <InstagramIcon sx={{ fontSize: "2em", color: "inherit" }} />,
            ],
            path: [
                "https://www.google.com/",
                "https://www.google.com/",
            ],
        },
    ];

    return (
        <Box
            sx={{
                backgroundColor: themeColor.palette.secondary.contrastText,
                width: "100%",
                color: themeColor.palette.primary.contrastText,
                display: "flex",
                justifyContent: "center",
            }}
        >
            <CustomBox
                maxWidth={"100em"}
                padding={isSmallScreen ? "3em 1em" : "3em"}
                gap={"2em"}
            >
                <CustomBox
                    display={"grid"}
                    gridTemplateColumns={
                        isSmallScreen
                        ? "repeat(1, 1fr)"
                        : isMediumScreen
                          ? "repeat(2,1fr)"
                          : "repeat(3, 1fr)"
                    }
                    gap={"3em"}
                    alignItems={"start"}
                >
                    {footerItems.map((item, index) => (
                        <CustomBox
                            key={index}
                            gap={"1em"}
                            alignItems={"start"}
                            padding={"1em"}
                            className={"border-run"}
                        >
                            <Typography fontSize={"1.5em"} fontWeight={"bold"}>
                                {item.title}
                            </Typography>

                            <Divider
                                color={themeColor.palette.primary.contrastText}
                                maxWidth={"50%"}
                                height={".1em"}
                            />

                            {item.value.map((vItem, vIndex) => {
                                // SOCIAL MEDIA
                                if (vItem === "Social media") {
                                    return (
                                        <Box key={vIndex}>
                                            <CustomBox
                                                flexDirection={"row"}
                                                justifyContent={"start"}
                                                gap={".5em"}
                                            >
                                                {item.mediaIcons.map((miIcon, miIndex) => (
                                                    <Box
                                                        key={miIndex}
                                                        component="a"
                                                        href={item.path[miIndex]}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        sx={{
                                                            padding: ".2em",
                                                            borderRadius: "2em",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            color: themeColor.palette.primary.contrastText,
                                                            "&:hover": {
                                                                backgroundColor:
                                                                themeColor.palette.primary.contrastText,
                                                                color:
                                                                themeColor.palette.secondary.contrastText,
                                                            },
                                                        }}
                                                    >
                                                        {miIcon}
                                                    </Box>
                                                ))}
                                            </CustomBox>
                                        </Box>
                                    );
                                }

                                // TERMS & CONDITIONS TOOLTIP
                                if (vItem === "Termenii si conditiile") {
                                    return (
                                        <ClickAwayListener
                                            key={vIndex}
                                            onClickAway={() => setOpenIndex(null)}
                                        >
                                            <div>
                                                <Tooltip
                                                    open={openIndex === vIndex}
                                                    disableFocusListener
                                                    disableHoverListener
                                                    disableTouchListener
                                                    title="Acesta este un site demonstrativ de portofoliu. Datele trimise prin formulare sunt utilizate doar pentru funcționalitatea aplicației (ex: contact sau rezervări) și nu sunt vândute sau distribuite către terți."
                                                >
                                                    <Typography
                                                        component="p"
                                                        sx={{ cursor: "pointer" }}
                                                        onClick={() =>
                                                            setOpenIndex(
                                                                openIndex === vIndex ? null : vIndex
                                                            )
                                                        }
                                                    >
                                                        {vItem}
                                                    </Typography>
                                                </Tooltip>
                                            </div>
                                        </ClickAwayListener>
                                    );
                                }

                                // DEFAULT LINKS
                                return (
                                    <Box
                                        key={vIndex}
                                        className={
                                            currentPath === item.path[vIndex] ||
                                            item.title === "Contact"
                                            ? ""
                                            : "underline-from-center"
                                        }
                                        onClick={() => {
                                            if (item.title !== "Contact") {
                                                navigate(
                                                    `/${item.path[vIndex].replace(/^\/?/, "")}`
                                                );
                                            }
                                        }}
                                        sx={{
                                            cursor:
                                                item.title !== "Contact" ? "pointer" : "default",
                                            color: themeColor.palette.primary.contrastText,
                                        }}
                                        display={"flex"}
                                        alignItems={"center"}
                                        gap={".5em"}
                                    >
                                        {vItem}
                                        {item.infoValue && item.infoValue[vIndex]}
                                    </Box>
                                );
                            })}
                        </CustomBox>
                    ))}
                </CustomBox>

                <Divider
                    maxWidth={"100%"}
                    color={themeColor.palette.primary.contrastText}
                    height={"1px"}
                    opacity={"0.7"}
                />

                <CustomBox>
                    <Typography>
                        © {currentYear} ***** - Toate drepturile rezervate.
                    </Typography>
                </CustomBox>
            </CustomBox>
        </Box>
    );
}

export default Footer;