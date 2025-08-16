import React, { useEffect, useState } from "react";
import CustomBox from "../components/Containers/CustomBox.jsx";
import CustomInputField from "../components/Inputs/CustomInput.jsx";
import CustomTypography from "../components/Containers/CustomTypography.jsx";
import SearchIcon from "@mui/icons-material/Search";
import { fetchGetWeddingGuests } from "./weddingService.js";
import { Box, Typography } from "@mui/material";
import { rgba } from "framer-motion";

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
          console.log(result.result.rows);
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

  useEffect(() => {
    if (loading) return;

    const canvas = document.getElementById("fireworks-canvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let particles = [];
    let balloons = [];

    // Funcție pentru desenat inimă la poziția (x, y) cu o dimensiune (size)
    function drawHeart(ctx, x, y, size, color) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size, size);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(0, -3, -2, -3, -2, -1.5);
      ctx.bezierCurveTo(-2, 0, 0, 0.5, 0, 1);
      ctx.bezierCurveTo(0, 0.5, 2, 0, 2, -1.5);
      ctx.bezierCurveTo(2, -3, 0, -3, 0, 0);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    }

    // Clasa pentru balon inimă
    class HeartBalloon {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20 + Math.random() * 50;
        this.size = 6 + Math.random() * 10; // dimensiune scalată
        this.speedY = 1 + Math.random() * 1.5; // viteza urcării
        this.swing = Math.random() * 0.05 + 0.02; // viteza legănatului pe orizontală
        this.swingAngle = Math.random() * Math.PI * 2;
        this.color = `rgba(255, ${Math.floor(50 + Math.random() * 205)}, ${Math.floor(50 + Math.random() * 205)}, 0.8)`; // roșu-rozaliu semi-transparent
      }
      update() {
        this.y -= this.speedY;
        this.swingAngle += this.swing;
        this.x += Math.sin(this.swingAngle) * 0.5;
      }
      draw(ctx) {
        ctx.font = `${this.size * 2}px serif`;
        ctx.fillStyle = this.color;
        ctx.textAlign = "center";
        ctx.fillText("❤️", this.x, this.y);
      }
    }

    function createFirework() {
      const x = Math.random() * canvas.width;
      const y = canvas.height - 10 * 16; // 10em mai sus de jos
      const colors = ["#08ff01", "#0077ff", "#ffffff", "#f6ea00"];

      for (let i = 0; i < 30; i++) {
        const angle = (Math.PI * 2 * i) / 30;
        const speed = Math.random() * 3 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed * 1.2,
          life: 120,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }

    function createBalloon() {
      balloons.push(new HeartBalloon());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Desen artificii
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.life -= 1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}80`;
        ctx.fill();

        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      });

      // Desen baloane inimă
      balloons.forEach((b, i) => {
        b.update();
        b.draw(ctx);

        if (b.y < canvas.height * 0.4) {
          balloons.splice(i, 1);
        }
      });

      requestAnimationFrame(animate);
    }

    // Creează artificii și baloane periodic
    setInterval(createFirework, 1000);
    setInterval(createBalloon, 800);

    animate();

    return () => {
      particles = [];
      balloons = [];
    };
  }, [loading]);

  return (
    <div>
      {loading ? (
        "Imediat se incarca..."
      ) : (
        <CustomBox
          background={"linear-gradient( #F693EBFF, #ff0083)"}
          minHeight={"100vh"}
          justifyContent={"start"}
          color={"#fff"}
          sx={{ position: "relative" }}
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
                          masa - {guest.guest_table}
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
          <canvas
            id="fireworks-canvas"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        </CustomBox>
      )}
    </div>
  );
}

export default WeddingPage;
