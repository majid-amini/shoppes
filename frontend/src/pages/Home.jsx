import React from "react";
import Header from "../components/Header";
import { Box, Typography } from "@mui/material";
export default function Home() {
  const styles = {
    paperContainer: {
      backgroundImage: `url(${"./images/Bg.png"})`,
      backgroundPosition: "right",
      backgroundSize: "50%",
      backgroundRepeat: "no-repeat",
    },
  };
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
      <Box position={"relative"} style={styles.paperContainer}>
        <img src="./images/Image.png" style={{ width: "100%" }} alt="" />
        <div style={{display:"flex",width:"100%",justifyContent:"space-around"}}>
          <img style={{width:"70px"}} src="./images/Image (1).png" alt="" />
          <img style={{width:"70px"}} src="./images/Image (2).png" alt="" />
          <img style={{width:"70px"}} src="./images/Image (3).png" alt="" />
          <img style={{width:"70px"}} src="./images/Image (4).png" alt="" />
        </div>
      </Box>
    </div>
  );
}
