import { IconButton } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";

import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal";

export const JournalPage = () => {
  const dispatch = useDispatch();

  const onAdd = () => {
    console.log("ADDING NEW NOTE");
    dispatch(startNewNote());
  };
  const { isSaving, activeNote } = useSelector((state) => state.journal);
  return (
    <JournalLayout>
      {!!activeNote ? <NoteView /> : <NothingSelectedView />}

      <IconButton
        size="large"
        onClick={onAdd}
        disabled={isSaving}
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
