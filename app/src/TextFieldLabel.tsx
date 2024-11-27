import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type TextFieldDoubleLabelProps = {
  label: string;
  children: React.ReactNode;
};
export function TextFieldDoubleLabel({
  label,
  children,
}: TextFieldDoubleLabelProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 1,
      }}>
      <Box>
        <TextFieldLabelTypography>{label}</TextFieldLabelTypography>
      </Box>
      <Box
        sx={{
          ml: 1,
          mr: 1,
          width: "35vw",
          maxWidth: "25rem",
        }}>
        {children}
      </Box>
      <Box
        sx={{
          visibility: "hidden",
        }}>
        <TextFieldLabelTypography>{label}</TextFieldLabelTypography>
      </Box>
    </Box>
  );
}

type TextFieldLabelTypographyProps = {
  children: React.ReactNode;
};
function TextFieldLabelTypography({ children }: TextFieldLabelTypographyProps) {
  return <Typography variant="body1">{children}</Typography>;
}
