import React from "react";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { View } from "react-native";
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  SubTitle,
  StyledFormArea,
  // PageTitle
} from "../components/styles";

const Login = () => {
  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageLogo
          resizeMode="contain"
          source={require("../assets/rexLogoLinesWide.png")}
        />
        <SubTitle>Account Login</SubTitle>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <StyledFormArea></StyledFormArea>
          )}
        </Formik>
      </InnerContainer>
    </StyledContainer>
  );
};
const myTextInput = ({ label, icon, ...props }) => {};

export default Login;
