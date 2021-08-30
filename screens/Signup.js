import firebase from "../config/firebase";
import { Formik } from "formik";
import { Pressable, View } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import KeyboardShiftWrapper from '../components/KeyboardShift';

// Component imports
import ErrorMessage from "../components/ErrorMessage";

import {
  ButtonText,
  Colors,
  ExtraText,
  ExtraView,
  LeftIcon,
  Line,
  MsgBox,
  RightIcon,
  SignupPageLogo,
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
const { pink } = Colors;

// Icon imports
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from "@expo/vector-icons";

const auth = firebase.auth();

const Signup = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [signupError, setSignupError] = useState('');


  // Registers a user based on their email and password values
  // Values provided by Formik when its onClick is triggered
  const onHandleSignup = async ({ email, password }) => {
    try {
      if (email !== '' && password !== '') {
        // createUserWithEmailAndPassword() provided by Firebase Auth
        await auth.createUserWithEmailAndPassword(email, password);
      }
    } catch (error) {
      // Message is human-readable and thrown by the Firebase Auth service
      // See: https://firebase.google.com/docs/auth/admin/errors for list of errors
      setSignupError(error.message);
    }
  };

  return (
    <KeyboardShiftWrapper>
    <StyledContainer>
      <StatusBar style="dark" />
      <SignupPageLogo
        resizeMode="contain"
        source={require("../assets/rexSolo.png")}
      />
      <SubTitle>Account Sign-Up</SubTitle>

      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        onSubmit={onHandleSignup}
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

          <MyTextInput
            label="Confirm Password"
            icon="lock"
            placeholder="********"
            placeholderTextColor={pink}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            value={values.password}
            secureTextEntry={hidePassword}
            isPassword={true}
            hidePassword={hidePassword}
            setHidePassword={setHidePassword}
          />

          <MsgBox>...</MsgBox>
          {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
          <StyledButton onPress={handleSubmit}>
            <ButtonText>
              Sign-Up
            </ButtonText>
          </StyledButton>
          <Line />
          <ExtraView>
            <ExtraText>
              Already have an account?
            </ExtraText>
            <TextLink>
              <TextLinkContent onPress={() => navigation.navigate('Login')}>
                Log in!
              </TextLinkContent>
            </TextLink>
          </ExtraView>
        </StyledFormArea>)}
      </Formik>
    </StyledContainer>
    </KeyboardShiftWrapper>
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

export default Signup;
