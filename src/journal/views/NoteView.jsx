import {
  DeleteOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { useRef } from "react";
import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { setActiveNote } from "../../store/journal/journalSlice";
import {
  startDeletingNote,
  startSavingNote,
  startUploadingFiles,
} from "../../store/journal/thunks";
import { ImageGallery } from "../components";

export const NoteView = () => {
  const { activeNote: note, isSaving } = useSelector((store) => store.journal);

  const { body, date, title, onInputChange, formState } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  const onSaveNote = () => {
    dispatch(startSavingNote());
  };

  const onFileInputChange = ({ target }) => {
    console.log(target.files);
    if (target.files == 0) return;
    dispatch(startUploadingFiles(target.files));
  };

  const onDelete = () => {
    dispatch(startDeletingNote());
  };

  const fileInputRef = useRef();
  return (
    <Grid
      className=""
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type="file"
          style={{
            display: "none",
          }}
          ref={fileInputRef}
          multiple
          onChange={onFileInputChange}
        />
        <IconButton
          color="primary"
          onClick={() => fileInputRef.current.click()}
          disabled={isSaving}
        >
          <UploadOutlined></UploadOutlined>
        </IconButton>

        <Button
          disabled={isSaving}
          onClick={onSaveNote}
          color="primary"
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió en el día de hoy?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>
      <Grid container justifyContent="end">
        <Button onClick={onDelete} sx={{ mt: 20 }} color="error">
          <DeleteOutlined></DeleteOutlined>
        </Button>
      </Grid>

      {/* Image gallery */}
      {note.imageUrls && <ImageGallery images={note.imageUrls} />}
    </Grid>
  );
};
