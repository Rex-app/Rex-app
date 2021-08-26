import firebase from "../config/firebase";
import { Formik } from "formik";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

// Component Imports
import ErrorMessage from "../components/ErrorMessage";
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
  StyledButton,
  StyledContainer,
  StyledFormArea,
  StyledInputLabel,
  StyledTextInput,
  SubTitle,
  TextLink,
  TextLinkContent,
} from "../components/styles";

// Color imports
const { pink } = Colors

// Icon imports
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from "@expo/vector-icons"

// Firebase Auth
const auth = firebase.auth();

const Login = ({ navigation }) => {
  // Screen's State
  const [hidePassword, setHidePassword] = useState(true);
  const [loginError, setLoginError] = useState('');

  // Handles whether to log in the user based on their email and password values
  // Values provided by Formik
  const onLogin = async ({ email, password }) => {
    try {
      if (email !== '' && password !== '') {
        // signInWithEmailAndPassword() is provided by Firebase Auth
        await auth.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      // Message is human-readable and thrown by the Firebase Auth service
      // See: https://firebase.google.com/docs/auth/admin/errors for list of errors
      setLoginError(error.message);
    }
  };

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <LoginPageLogo
        resizeMode="contain"
        source={require("../assets/rexLogoV1.png")}
      />
      <SubTitle>Account Login</SubTitle>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={onLogin}
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

          <MsgBox>
            {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
          </MsgBox>

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
            <TextLink onPress={() => navigation.navigate('Signup')}>
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
