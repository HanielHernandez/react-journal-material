import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import { TurnedInNot } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { SideBarItem } from "./SidebarItem";
import { setActiveNote } from "../../store/journal/journalSlice";

export const SideBar = ({ drawerWidth = 240 }) => {
  const { notes } = useSelector((state) => state.journal);
 

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent" // temporary
        open
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Fernando Herrera
          </Typography>
        </Toolbar>
        <Divider />

        <List>
          {notes.map((note) => (
            <SideBarItem  {...note} key={note.id} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
