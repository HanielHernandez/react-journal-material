import React, { useMemo } from "react";
import { TurnedInNot } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  Grid,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";

export const SideBarItem = ({ title="", body, id = "",date, imageUrls = []}) => {
  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + "..." : title;
  }, [title]);

  const dispatch = useDispatch()
  const onSidebarItemClicked = ()=>{  
    console.log("sidebar item clicked")

    dispatch(setActiveNote({ title, body, id ,date, imageUrls }))
  }

  return (
    <ListItem disablePadding >
      <ListItemButton onClick={onSidebarItemClicked}>
        <ListItemIcon >
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
