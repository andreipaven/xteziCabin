import React, { useEffect, useState } from "react";
import CustomBox from "../components/Containers/CustomBox.jsx";
import CustomInputField from "../components/Inputs/CustomInput.jsx";
import CustomTypography from "../components/Containers/CustomTypography.jsx";
import SearchIcon from "@mui/icons-material/Search";
import { fetchGetWeddingGuests } from "./weddingService.js";
import { Box, Typography } from "@mui/material";

function WeddingPage() {
  const [weddingGuests, setWeddingGuests] = useState([]); // obiecte complete
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchGetWeddingGuests()
      .then((result) => {
        if (result.success) {
          // Setăm obiectele complete (nu doar numele)
          setWeddingGuests(result.result.rows);
        } else {
          console.log(result.message);
        }
      })
      .catch((e) => {
        console.log("Error: " + e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredGuests = weddingGuests.filter((guest) => {
    const guestName = guest.name.toLowerCase();
    const searchWords = searchTerm.toLowerCase().split(" ");
    return searchWords.every((word) => guestName.includes(word));
  });

  return (
    <div>
      {loading ? (
        "Imediat se incarca..."
      ) : (
        <CustomBox
          background={"linear-gradient( #F693EBFF, #fff)"}
          minHeight={"100vh"}
          justifyContent={"start"}
          color={"#fff"}
        >
          <CustomBox maxWidth={"100em"} padding={"1em"}>
            <CustomBox gap={"1em"}>
              <CustomTypography
                fontSize={"2em"}
                fontWeight={"bold"}
                textAlign={"center"}
                color={"#ffffff"}
              >
                Bine ați venit la nuntă! 👰🤵
              </CustomTypography>
              <CustomInputField
                fullWidth={true}
                variant={"standard"}
                label={"Nume"}
                inputIcon={<SearchIcon sx={{ color: "#fff" }} />}
                borderColor={"#fff"}
                color={"#fff"}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {searchTerm !== "" && (
                <CustomBox marginTop="1em">
                  {filteredGuests.length > 0 ? (
                    filteredGuests.map((guest, index) => (
                      <CustomBox
                        alignItems={"start"}
                        justifyContent={"start"}
                        key={index}
                        flexDirection={"row"}
                        gap={"1em"}
                      >
                        {/* exemplu: afișează numele și masa */}
                        <Typography fontSize={"1.2em"}>{guest.name}</Typography>
                        <Typography fontSize={"1.2em"} fontWeight={"bold"}>
                          2{guest.table_guest}
                        </Typography>
                      </CustomBox>
                    ))
                  ) : (
                    <div>
                      Nu există invitați care să corespundă. Numele de familie
                      în față!
                    </div>
                  )}
                </CustomBox>
              )}
            </CustomBox>
          </CustomBox>
        </CustomBox>
      )}
    </div>
  );
}

export default WeddingPage;
