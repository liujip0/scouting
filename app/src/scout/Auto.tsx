import {
  HumanPlayerEntry,
  TeamMatchEntry,
} from "@isa2025/api/src/utils/dbtypes.ts";
import { Box, Button, Divider, Stack, SxProps } from "@mui/material";
import { Counter } from "./Components.tsx";
import { ScoutLayout, ScoutPage } from "./Scout.tsx";

type AutoProps = {
  setPage: (value: ScoutPage) => void;
  match: TeamMatchEntry | HumanPlayerEntry;
  setMatch: (value: TeamMatchEntry | HumanPlayerEntry) => void;
};
export default function Auto({ setPage, match, setMatch }: AutoProps) {
  return (
    <ScoutLayout
      title="Auto"
      //TODO: uncomment when match is present as a prop
      // nowScouting={{
      //   teamNumber: match.teamNumber,
      //   alliance: match.alliance,
      //   robotPosition: math.robotNumbers,
      // }}
      nowScouting={{
        teamNumber: 3494,
        alliance: "Red",
        robotPosition: 2,
      }}
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
      <Stack
        direction="row"
        sx={{
          //width: 1 and height: 1 are the same as width: '100%' and height: '100%'
          width: 1,
          height: 1,
        }}>
        {(
          match.robotNumber === 4 // Scout is scouting human players? Human player robotNumber=4, robot robotNumber=1 or 2 or 3
        ) ?
          //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
          <></>
        : <>
            <Stack
              sx={{
                //This stack will take up as much space as possible without covering anything else
                flex: 1,
              }}>
              {
                //TODO: Field image w/ auto notes
              }
            </Stack>
            <Divider orientation="vertical" />
            <Stack
              sx={{
                flex: 1,
                padding: 2, //Add 2*8=16px padding
              }}
              gap={2} //Add a gap of 2*8=16px between each flex item
            >
              {
                //LabeledNumberInput function definition is in Components.tsx
              }
              <Counter
                label="Speaker"
                value={match.autoSpeaker}
                //   This (value) => {} is the same as function(value) {}
                setValue={(value) => {
                  //Set the variable match which has all the data for this match
                  setMatch({
                    ...match, //Include the rest of match that we didn't change
                    autoSpeaker: value, //Change the autoSpeaker value
                  });
                }}
              />
              <Counter
                label="Amp"
                value={match.autoAmp}
                setValue={(value) => {
                  setMatch({
                    ...match,
                    autoAmp: value,
                  });
                }}
              />
            </Stack>
          </>
        }
      </Stack>

      {/* <Stack
        direction="row"
        gap={2}>
        <NumberBox sx={{}}>box 1</NumberBox>
        <NumberBox
          sx={{
            position: "absolute", // Position the box absolutely
            right: "0", // Place it at the right side of the screen
            top: "20%", // Optionally center it vertically (adjust as needed)
            transform: "translateX(-400%)", // Optionally center it vertically (adjust as needed)
          }}>
          box 2
        </NumberBox>
      </Stack>
      <Stack
        direction="row"
        gap={2}>
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
      </Stack> */}
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

type NumberBoxProps = {
  sx: SxProps;
  children: React.ReactNode;
};
function NumberBox({ sx, children }: NumberBoxProps) {
  return (
    <Box
      sx={{
        ...sx,
        height: "60px", // Set height to 20px
        width: "60px", // Set width to 50px
        backgroundColor: "##f1dc8e", // Pink background color
        border: "7px solid #000f5d", // Orange border with 2px thickness
        borderRadius: "4px", // Optional: rounded corners
      }}>
      {children}
    </Box>
  );
}
