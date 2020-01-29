import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EmailIcon from "@material-ui/icons/Email";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  })
);

export const Actions: React.FC = () => {
  const classes = useStyles();

  const handleDeleteClick = (): void => {
    alert("delete clicked");
  };

  return (
    <>
      <IconButton
        size="small"
        className={classes.button}
        aria-label="delete"
        onClick={handleDeleteClick}
      >
        <DeleteIcon />
      </IconButton>
      <IconButton
        size="small"
        className={classes.button}
        aria-label="email"
        href="mailto:contact@rctech.club"
      >
        <EmailIcon />
      </IconButton>
    </>
  );
};
