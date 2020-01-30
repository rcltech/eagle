import React from "react";
import { FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormGroup from "@material-ui/core/FormGroup";

export const Login: React.FC = () => {
  return (
    <>
      <FormGroup>
        <FormControl required>
          <InputLabel>Username</InputLabel>
          <Input id="username" aria-describedby="username"/>
        </FormControl>
      </FormGroup>
    </>
  );
};
