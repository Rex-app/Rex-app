import { Formik } from "formik";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

// Component Imports
import {
  ButtonText,
  Colors,
  ExtraText,
  ExtraView,
  LeftIcon,
  Line,
  LoginPageLogo,
  MsgBox,
  RightIcon,
  SubTitle,
  StyledButton,
  StyledContainer,
  StyledFormArea,
  StyledInputLabel,
  StyledTextInput,
  TextLink,
  TextLinkContent,
} from "../components/styles";


const { green, blue, palePink, purple, pink } = Colors

//icons
import { MaterialIcons } from "@expo/vector-icons"
import { Ionicons } from '@expo/vector-icons';

const Login = () => {
  const [hidePassword, setHidePassword] = useState(true)

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <LoginPageLogo
        resizeMode="contain"
        source={require("../assets/rexLogoV1.png")}
      />
      <SubTitle>Account Login</SubTitle>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (<StyledFormArea>
          <MyTextInput
            label="Email Address"
            icon="email"
            placeholder="rex@rexapp.com"
            placeholderTextColor={pink}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            keyboardType="email-address"
          />

          <MyTextInput
            label="Password"
            icon="lock"
            placeholder="********"
            placeholderTextColor={pink}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry={hidePassword}
            isPassword={true}
            hidePassword={hidePassword}
            setHidePassword={setHidePassword}
          />
          <MsgBox>...</MsgBox>
          <StyledButton onPress={handleSubmit}>
            <ButtonText>
              Login
            </ButtonText>
          </StyledButton>
          <Line />
          <ExtraView>
            <ExtraText>
              Don't have an account?
            </ExtraText>
            <TextLink>
              <TextLinkContent>
                Sign up!
              </TextLinkContent>
            </TextLink>
          </ExtraView>
        </StyledFormArea>)}
      </Formik>
    </StyledContainer>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <MaterialIcons name={icon} size={30} color={pink} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={pink} />
        </RightIcon>
      )}
    </View>
  )
};

export default Login;
