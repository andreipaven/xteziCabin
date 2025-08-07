import React, { useEffect, useState } from "react";
import CustomBox from "../components/Containers/CustomBox.jsx";
import CustomInputField from "../components/Inputs/CustomInput.jsx";
import CustomTypography from "../components/Containers/CustomTypography.jsx";
import SearchIcon from "@mui/icons-material/Search";
import { fetchGetWeddingGuests } from "./weddingService.js";

function WeddingPage() {
  const [weddingGuests, setWeddingGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchGetWeddingGuests()
      .then((result) => {
        if (result.success) {
          const guestNames = result.result.rows.map((guest) => guest.name);
          setWeddingGuests(guestNames);
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

  const filteredGuests = weddingGuests.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      {loading ? (
        "Imediat se incarca..."
      ) : (
        <CustomBox>
          <CustomBox maxWidth={"100em"} padding={"1em"}>
            <CustomBox gap={"1em"}>
              <CustomTypography
                fontSize={"2em"}
                fontWeight={"bold"}
                textAlign={"center"}
              >
                Bine ati venit la nunta!
              </CustomTypography>
              <CustomInputField
                fullWidth={true}
                variant={"standard"}
                label={"Nume"}
                inputIcon={<SearchIcon />}
                borderColor={"pink"}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {/* Afișăm lista doar dacă searchTerm NU e gol */}
              {searchTerm !== "" && (
                <CustomBox>
                  {filteredGuests.length > 0 ? (
                    filteredGuests.map((name, index) => (
                      <div key={index}>{name}</div>
                    ))
                  ) : (
                    <div>
                      Nu există invitați care să corespundă. Numele de familie
                      in fata!
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
