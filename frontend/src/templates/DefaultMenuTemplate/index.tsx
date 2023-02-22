//...react, hooks
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { SyntheticEvent } from "react";

//component 
import CustomModal from "../../components/LogOutModal";

//MUI 
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import CreateIcon from '@mui/icons-material/Create';
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  Toolbar,
  IconButton,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";

//side menu width is defined by this variable 
const drawerWidth = 240;

//the side menu 
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

//interaface passed to the 'DefaultTemplateMenu'
interface Props extends MuiAppBarProps {
  open?: boolean;
  children: React.ReactNode;
  isOpen: boolean;
}

//styles 
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const DefaultMenuTemplate = ({ children, isOpen = false }: Props) => {

  const navigate = useNavigate();

  //use states
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  /* handleDrawerOpen and handleDrawerClose which set the
   value of the open state variable to true and false  */
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //handle for the buttons inside the side menu
  const handleDrawerButtonClick = (e: SyntheticEvent) => {
    navigate(`/${e.currentTarget.id}`);
  };

  return (
    <Box>
      <Toolbar disableGutters>
        <IconButton
          color="inherit"
          onClick={handleDrawerOpen}
          sx={{ ...(open && { display: "none" }) }}
        >
          <MenuIcon sx={{ fontSize: "40px" }} />
        </IconButton>
      </Toolbar>
      <Main open={open}>{children}</Main>
      <Drawer
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon sx={{ fontSize: "40px" }} />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            disablePadding
            sx={{ marginBottom: "2vh", marginTop: "2vh" }}
          >
            <ListItemButton id="home" onClick={handleDrawerButtonClick}>
              <ListItemIcon>
                <HomeIcon sx={{ fontSize: "35px" }} />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ marginBottom: "2vh", marginTop: "2vh" }}
          >
            
              <ListItemButton id="createQuestion" onClick={handleDrawerButtonClick}>
                <ListItemIcon>
                  <CreateIcon sx={{ fontSize: "35px" }} />
                </ListItemIcon>
                <ListItemText primary={"Create a Question"} />
              </ListItemButton>
          
          </ListItem>
        </List>
        <List sx={{ marginTop: "auto" }}>
          <ListItem
            disablePadding
            sx={{ marginBottom: "2vh", marginTop: "2vh" }}
          >
            <ListItemButton id="logout" onClick={() => setOpenModal(true)}>
              <ListItemIcon>
                <LogoutIcon sx={{ fontSize: "35px" }} />
              </ListItemIcon>
              <ListItemText primary={"Log Out"} />
            </ListItemButton>
          </ListItem>
        </List>
        <CustomModal open={openModal} setOpen={setOpenModal} />
      </Drawer>
    </Box>
  );
};

export default DefaultMenuTemplate;
