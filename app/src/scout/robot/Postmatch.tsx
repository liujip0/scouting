import { TeamMatchEntry } from "@isa2025/api/src/utils/dbtypes.ts";
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";

type PostmatchProps = {
  match: TeamMatchEntry;
  setMatch: (value: TeamMatchEntry) => void;
};
export default function Postmatch({ match, setMatch }: PostmatchProps) {
  return (
    <Stack
      direction="row"
      sx={{
        width: 1,
        height: 1,
      }}>
      <Stack
        sx={{
          flex: 1,
          padding: 2,
          pl: 4,
        }}>
        <FormControl>
          <FormLabel>
            Did they do any of the following exceptionally well?
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={match.goodAtCoralL1!}
                  onChange={(event) => {
                    setMatch({
                      ...match,
                      goodAtCoralL1: event.currentTarget.checked,
                    });
                  }}
                />
              }
              label="Coral L1"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={match.goodAtCoralL2!}
                  onChange={(event) => {
                    setMatch({
                      ...match,
                      goodAtCoralL2: event.currentTarget.checked,
                    });
                  }}
                />
              }
              label="Coral L2"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={match.goodAtCoralL3!}
                  onChange={(event) => {
                    setMatch({
                      ...match,
                      goodAtCoralL3: event.currentTarget.checked,
                    });
                  }}
                />
              }
              label="Coral L3"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={match.goodAtCoralL4!}
                  onChange={(event) => {
                    setMatch({
                      ...match,
                      goodAtCoralL4: event.currentTarget.checked,
                    });
                  }}
                />
              }
              label="Coral L4"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={match.goodAtAlgaeNet!}
                  onChange={(event) => {
                    setMatch({
                      ...match,
                      goodAtAlgaeNet: event.currentTarget.checked,
                    });
                  }}
                />
              }
              label="Algae in Net"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={match.goodAtAlgaeProcessor!}
                  onChange={(event) => {
                    setMatch({
                      ...match,
                      goodAtAlgaeProcessor: event.currentTarget.checked,
                    });
                  }}
                />
              }
              label="Algae in Processor"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={match.goodAtClimb!}
                  onChange={(event) => {
                    setMatch({
                      ...match,
                      goodAtClimb: event.currentTarget.checked,
                    });
                  }}
                />
              }
              label="Climb"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={match.goodAtDefense!}
                  onChange={(event) => {
                    setMatch({
                      ...match,
                      goodAtDefense: event.currentTarget.checked,
                    });
                  }}
                />
              }
              label="Defense"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={match.goodAtWorkingWithAlliance!}
                  onChange={(event) => {
                    setMatch({
                      ...match,
                      goodAtWorkingWithAlliance: event.currentTarget.checked,
                    });
                  }}
                />
              }
              label="Working with Alliance"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={match.goodAtDriving!}
                  onChange={(event) => {
                    setMatch({
                      ...match,
                      goodAtDriving: event.currentTarget.checked,
                    });
                  }}
                />
              }
              label="Driving"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={match.goodAtAuto!}
                  onChange={(event) => {
                    setMatch({
                      ...match,
                      goodAtAuto: event.currentTarget.checked,
                    });
                  }}
                />
              }
              label="Auto"
            />
          </FormGroup>
        </FormControl>
      </Stack>
      <Divider
        orientation="vertical"
        flexItem
      />
      <Stack
        sx={{
          flex: 1,
          padding: 2,
        }}>
        <TextField
          label="Comments"
          value={match.comments}
          onChange={(event) => {
            setMatch({
              ...match,
              comments: event.currentTarget.value.replace(/"/g, "'"),
            });
          }}
          multiline
        />
      </Stack>
    </Stack>
  );
}
