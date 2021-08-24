import React, {useState} from "react";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { View, Pressable } from "react-native";
import {
  StyledContainer,
  SignupPageLogo,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  StyledButton,
  ButtonText,
  Colors,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from "../components/styles";

//colors
const { green, blue, palePink, purple, pink } = Colors;

//icons
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';

//
import DateTimePicker from "@react-native-community/datetimepicker";

const Signup = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2000, 0, 1))

  //actual DOB to be sent
  const [dob, setDob] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
  }

  const showDatePicker = () => {
    setShow(true);
  }

  return (
    <StyledContainer>
      <StatusBar style="dark" />
        <SignupPageLogo
          resizeMode="contain"
          source={require("../assets/rexSolo.png")}
        />
        <SubTitle>Account Sign-Up</SubTitle>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode='date'
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

        <Formik
          initialValues={{ fullName: "", email: "", dateOfBirth: "", password: "", confirmPassword: "" }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (<StyledFormArea>
            <MyTextInput
              label="Full Name"
              icon="person"
              placeholder="Just Doe"
              placeholderTextColor={pink}
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              value={values.fullName}
            />

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
              label="Date of Birth"
              icon="calendar-today"
              placeholder="YYYY - MM - DD"
              placeholderTextColor={pink}
              onChangeText={handleChange('dateOfBirth')}
              onBlur={handleBlur('dateOfBirth')}
              value={dob ? dob.toDateString() : ""}
              isDate={true}
              editable={false}
              showDatePicker={showDatePicker}
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
                <TextLinkContent>
                  Log in!
                </TextLinkContent>
              </TextLink>
            </ExtraView>
          </StyledFormArea>)}
        </Formik>
    </StyledContainer>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <MaterialIcons name={icon} size={30} color={pink} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      {!isDate && <StyledTextInput {...props} />}
      {isDate && (<Pressable onPress={showDatePicker}>
        <StyledTextInput {...props} />
      </Pressable>)}
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={pink} />
        </RightIcon>
      )}
    </View>
  )
};

export default Signup;
