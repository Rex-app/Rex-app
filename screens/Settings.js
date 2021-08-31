import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import firebase from '../config/firebase';
import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

// Styled component imports
import {
  InnerContainer,
  LongButton,
  StyledContainer,
} from "../components/styles";

// Responsive Design
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

const auth = firebase.auth();

export default function Settings({ navigation }) {
  const { user } = useContext(AuthenticatedUserContext);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <StyledContainer>
      <InnerContainer>
        <StatusBar style='dark-content' />
        <View style={styles.row}>
          <Text style={styles.title}>Welcome {user.email}!</Text>
        </View>
        {/* UID is generated and assigned to every user who registers with the Firebase Auth service */}
        <Text style={styles.text}>Your UID is: {user.uid} </Text>
        <LongButton onPress={handleSignOut} >
          <Image
            resizeMode="contain"
            style={{ width: wp('90%'), height: hp('8%') }}
            source={require("../assets/logoutButton.png")}
          />
        </LongButton>
        <LongButton onPress={() => navigation.navigate('Home')} >
          <Image
            resizeMode="contain"
            style={{ width: wp('90%'), height: hp('8%') }}
            source={require("../assets/Mainscreen.png")}
          />
        </LongButton>
      </InnerContainer>
    </StyledContainer>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
  }
});
