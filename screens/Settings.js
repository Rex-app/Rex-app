import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import firebase from '../config/firebase';
import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

// Styled component imports
import { LongButton } from "../components/styles";

const auth = firebase.auth();

export default function Settings() {
  const { user } = useContext(AuthenticatedUserContext);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar style='dark-content' />
      <View style={styles.row}>
        <Text style={styles.title}>Welcome {user.email}!</Text>
      </View>
      {/* UID is generated and assigned to every user who registers with the Firebase Auth service */}
      <Text style={styles.text}>Your UID is: {user.uid} </Text>
      <LongButton onPress={handleSignOut} >
        <Image source={require("../assets/logoutButton.png")} />
      </LongButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 12
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
