import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import DeleteIcon from "@material-ui/icons/Delete";
import EmailIcon from "@material-ui/icons/Email";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    optionsButton: {
      height: "18px",
      width: "18px",
      marginRight: theme.spacing(1),
    },
  })
);

export const Actions: React.FC = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleDeleteClick = (): void => {
    alert("delete clicked");
    handleClose();
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="more actions"
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="more actions"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDeleteClick}>
          <DeleteIcon className={classes.optionsButton} />
          <Typography variant={"body2"}>Delete</Typography>
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component={Link}
          color="inherit"
          underline="none"
          href="mailto:contacts@rctech.club"
          target="_blank"
          referrerPolicy="no-referrer"
        >
          <EmailIcon className={classes.optionsButton} />
          <Typography variant={"body2"}>Email user</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
