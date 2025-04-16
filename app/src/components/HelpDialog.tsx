import { Dialog, DialogContent, DialogTitle, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
interface HelpDialogProps {
  open: boolean;
  onClose: () => void;
}
const HelpDialog: React.FC<HelpDialogProps> = ({ open, onClose}) => {
 return (
        <Dialog open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
          slotProps={{
            paper: {
              sx: {
                backgroundColor: "#89cff0"
              }
            }
            }}>
  
    <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      Help
      <IconButton onClick={onClose} size="small">
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent dividers>
      <img
        src="/cageshelp.png"
        alt="Cages Example"
        style={{ maxWidth: "50%", marginBottom: "1rem", marginRight: "7rem" }}
      />
      <img
        src="/linecrosshelp.png"
        alt="Line Cross Example"
        style={{ maxWidth: "30%" }}
      />
    </DialogContent>
  </Dialog>
)
}
export { HelpDialog };