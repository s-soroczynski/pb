import React from "react";
import Container from "@mui/material/Container";
import { Header } from "../Header/Header";

type TemplateProps = {
  children: JSX.Element;
};

export const Template = (props: TemplateProps) => {
  return (
    <Container maxWidth="md">
      <Header />
      {props.children}
    </Container>
  );
};
