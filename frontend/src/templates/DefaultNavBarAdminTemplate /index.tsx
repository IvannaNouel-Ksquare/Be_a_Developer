//...react, hooks
import * as React from "react";
import { useNavigate } from "react-router-dom";
//component
import CustomModal from "../../components/LogOutModal";
import "./style.css";
//MUI
import AppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Toolbar, IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import QuizIcon from "@mui/icons-material/Quiz";
import GridViewIcon from "@mui/icons-material/GridView";
import EditIcon from '@mui/icons-material/Edit';

interface Props extends MuiAppBarProps {
  children: React.ReactNode;
}

const DefaultNavBarAdminTemplate = ({ children }: Props) => {
  const navigate = useNavigate();

  //use states
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [clicked1, setClicked1] = React.useState(false);
  const [clicked2, setClicked2] = React.useState(false);
  const [clicked3, setClicked3] = React.useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const buttonClassName2 = clicked2 ? "Button-1-clicked" : "Button-1";
  const buttonClassName1 = clicked1 ? "Button-2-clicked" : "Button-2";
  const buttonClassName3 = clicked3 ? "Button-3-clicked" : "Button-3";

  const handleDashboard = () => {
    setClicked1(true);
    navigate("/dashboard");
  };

  const handleListQuestions = () => {
    setClicked2(true);
    navigate("/questionList");
  };

    const handleEditQuestions = () => {
    setClicked3(true);
    navigate("/editQuestion");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
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
                className={buttonClassName1}
                onClick={() => handleDashboard()}
              >
                <h4>Table Questions</h4>
                <QuizIcon style={{ margin: 10 }}/>
              </button>

              <button
                className={buttonClassName2}
                onClick={() => handleListQuestions()}
              >
                <h4>Questions</h4>
                
                <GridViewIcon style={{ margin: 10 }}/>
              </button>
              <button
                className={buttonClassName3}
                onClick={() => handleEditQuestions()}
              >
                <h4>Edit Questions</h4>
                
                <EditIcon style={{ margin: 10 }}/>
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
                horizontal: "center",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem id="logout" onClick={() => setOpenModal(true)}>
                <LogoutIcon sx={{ fontSize: "25px" }} />
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

export default DefaultNavBarAdminTemplate;
