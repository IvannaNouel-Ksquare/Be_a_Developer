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
import { useNavigate } from "react-router-dom";
import HistoryIcon from '@mui/icons-material/History';
import WindowIcon from '@mui/icons-material/Window';
import './style.css';
//interaface passed to the 'DefaultTemplateMenu'
interface Props extends MuiAppBarProps {
  children: React.ReactNode;
}

const DefaultNavBarTemplate = ({ children }: Props) => {
  
  const navigate= useNavigate();

  //use states
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = React.useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }
  const handleDashboard = () => {
    navigate("/home");
  };
   
  return (
    <Box >
  <AppBar position="fixed" style={{ backgroundColor: "#06060c" }}>
        <Toolbar style={{ justifyContent: "flex-end" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
            <div
              className="navItems"
              style={{
                justifyContent: "start",
                display: "flex",
                position: "absolute",
                left: 0,
                padding: "10px",
                paddingLeft: "20px",
              }}
            >
              <button 
                className="button-home"
                onClick={() => handleDashboard()}
              >
                <h4>Home</h4>
                <WindowIcon style={{ margin: 10 }}/>
              </button>

            </div>
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
            <MenuItem id="logout" onClick={() => navigate('/match-history')}>
            <HistoryIcon sx={{ fontSize: '20px', marginRight:1 }} />
             History
            </MenuItem>
            <MenuItem id="logout" onClick={() => setOpenModal(true)}>
            <LogoutIcon sx={{ fontSize: '20px', marginRight:1 }} />
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
