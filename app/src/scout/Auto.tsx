import { Box, Button, Stack } from "@mui/material";
import { ScoutLayout, ScoutPage } from "./Scout.tsx";

type AutoProps = {
  setPage: (value: ScoutPage) => void;
};
export default function Auto({ setPage }: AutoProps) {
  return (
    <ScoutLayout
      title="Auto"
      //TODO: uncomment when match is present as a prop
      // nowScouting={{
      //   teamNumber: match.teamNumber,
      //   alliance: match.alliance,
      //   robotPosition: math.robotNumbers,
      // }}
      navButtons={
        <>
          <Button
            onClick={() => {
              setPage("matchinfo");
            }}
            variant="outlined">
            Back
          </Button>
          <Button
            onClick={() => {
              setPage("teleop");
            }}
            variant="contained">
            Continue
          </Button>
        </>
      }>
      {
        //TODO: (For Iraa) Write Auto Layout
        // main: "#000f5d", // Indiana Flag Blue
        //main: "#d59f0f", // Indiana Flag Gold
        //default: "##f1dc8e", // Light Indiana Flag Gold
      }
      ,
      <Stack
        direction="row"
        spacing={2}>
        <Box
          sx={{
            height: "60px", // Set height to 20px
            width: "60px", // Set width to 50px
            backgroundColor: "##f1dc8e", // Pink background color
            border: "7px solid #000f5d", // Orange border with 2px thickness
            borderRadius: "4px", // Optional: rounded corners
            position: "absolute", // Position the box absolutely
            right: "0", // Place it at the right side of the screen
            top: "20%", // Optionally center it vertically (adjust as needed)
            transform: "translateX(-150%)", // Optionally center it vertically (adjust as needed)
          }}>
          box 1
        </Box>
        <Box
          sx={{
            height: "60px", // Set height to 20px
            width: "60px", // Set width to 50px
            backgroundColor: "##f1dc8e", // Pink background color
            border: "7px solid #000f5d", // Orange border with 2px thickness
            borderRadius: "4px", // Optional: rounded corners
            position: "absolute", // Position the box absolutely
            right: "0", // Place it at the right side of the screen
            top: "20%", // Optionally center it vertically (adjust as needed)
            transform: "translateX(-400%)", // Optionally center it vertically (adjust as needed)
          }}>
          box 2
        </Box>
      </Stack>
      <Stack
        direction="row"
        spacing={2}>
        <Box
          sx={{
            height: "60px",
            width: "60px",
            backgroundColor: "#f1dc8e",
            border: "7px solid #000f5d",
            borderRadius: "4px",
            position: "absolute",
            right: "13%",
            top: "30%",
            // transform: "translateY(-400)",
          }}>
          box 3
        </Box>
        <Box
          sx={{
            height: "60px",
            width: "60px",
            backgroundColor: "#f1dc8e",
            border: "7px solid #000f5d",
            borderRadius: "4px",
            position: "absolute",
            right: "13%",
            top: "40%",
          }}>
          box 4
        </Box>
        <Box
          sx={{
            height: "40px",
            width: "128px",
            borderRadius: "15px",
            backgroundColor: "red",
            position: "absolute",
            right: "3%",
            top: "6%",
            color: "white", // Make text color white
            display: "flex", // Use flexbox for centering
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically
            fontFamily: "Arial",
            fontSize: "18px",
          }}>
          3494/ RED 1
        </Box>
        <Box
          sx={{
            height: "60px",
            width: "60px",
            fontSize: "50px",
            // backgroundColor: "#f1dc8e",
            position: "absolute",
            right: "17%",
            top: "29%",
          }}>
          -
        </Box>
        <Box
          sx={{
            height: "60px",
            width: "60px",
            fontSize: "50px",
            // backgroundColor: "#f1dc8e",
            position: "absolute",
            right: "6%",
            top: "29%",
          }}>
          +
        </Box>
        <Box
          sx={{
            height: "60px",
            width: "60px",
            fontSize: "50px",
            position: "absolute",
            right: "17%",
            top: "40%",
          }}>
          -
        </Box>
        <Box
          sx={{
            height: "60px",
            width: "60px",
            fontSize: "50px",
            position: "absolute",
            right: "6%",
            top: "40%",
          }}>
          +
        </Box>
        <Box
          sx={{
            height: "100spx",
            width: "100px",
            fontSize: "20px",
            position: "absolute",
            right: "25%",
            top: "20%",
            fontFamily: "Arial",
          }}>
          LEFT THE STARTING ZONE
        </Box>
        <Box
          sx={{
            height: "100spx",
            width: "100px",
            fontSize: "20px",
            position: "absolute",
            right: "25%",
            top: "33%",
            fontFamily: "Arial",
          }}>
          SPEAKER
        </Box>
        <Box
          sx={{
            height: "100spx",
            width: "100px",
            fontSize: "20px",
            position: "absolute",
            right: "25%",
            top: "43%",
            fontFamily: "Arial",
          }}>
          AMP
        </Box>
        <Box>
          <img />
        </Box>
      </Stack>
      {/* <Stack
        direction="row"
        sx={{ width: 1, height: 1 }}>
        <Box
          sx={{
            flex: 1,
            // border: "1px solid red",
          }}></Box>
        <Divider orientation="vertical" />
        <Stack
          sx={{
            flex: 1,
            // border: "1px solid purple",
          }}>
          <FormControlLabel
            control={<Switch />}
            label="LEFT THE STARTING ZONE"
            labelPlacement="start"
          />
          <NumberInput label="SPEAKER" />
          <NumberInput label="AMP" />
        </Stack>
      </Stack> */}
    </ScoutLayout>
  );
}

// Commented out so build doesn't fail
// type NumberInputProps = {
//   label: string;
// };
// function NumberInput({ label }: NumberInputProps) {
//   return (
//     <Stack direction={"row"}>
//       <Typography>{label}</Typography>
//       <TextField type="number" />
//     </Stack>
//   );
// }
