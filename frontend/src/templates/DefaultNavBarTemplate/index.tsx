//...react, hooks
import * as React from "react";

//component 
import CustomModal from "../../components/LogOutModal";

//MUI 
import AppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";


//interaface passed to the 'DefaultTemplateMenu'
interface Props extends MuiAppBarProps {
  children: React.ReactNode;
}

const DefaultNavBarTemplate = ({ children }: Props) => {
  
  //use states
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = React.useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }
   
  return (
    <Box >
    <AppBar style={{ backgroundColor:"#06060c"}}>
      <Toolbar style={{ justifyContent: "flex-end" }}>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center"
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem id="logout" onClick={() => setOpenModal(true)}>
            <LogoutIcon sx={{ fontSize: '25px' }} />
            Log Out
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
    {children}
    <CustomModal open={openModal} setOpen={setOpenModal} />
  </Box>
  );
};

export default DefaultNavBarTemplate;
