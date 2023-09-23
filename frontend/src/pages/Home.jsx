import React from "react";
import Header from "../components/Header";
import { Typography } from "@mui/material";
export default function Home() {
  return (
    <div>
      <Header />
      <Typography
        variant="h6"
        component="div"
        sx={{
          flexGrow: 1,
          fontWeight: "bold",
          marginTop: "50px",
          padding: "0 10px",
          fontSize: "16px",
          background:
            "linear-gradient(142.07deg, #AB238F 0.94%, #DF3295 34.4%, #FE9D9B 71.35%, #FF7770 100.91%);",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Road Racing Shoes
      </Typography>
      <Typography
        variant="h4"
        component="div"
        sx={{
          flexGrow: 1,
          fontWeight: "bold",
          color: "black",
          marginTop: "10px",
          padding: "0 10px",
        }}
      >
        Nike ZoomX<br></br> Streakfly
      </Typography>
    </div>
  );
}
