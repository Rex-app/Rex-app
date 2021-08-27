import React from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const KeyboardShiftWrapper = ({children}) => {
  return (
    <KeyboardAvoidingView>
      <KeyboardAwareScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
}

export default KeyboardShiftWrapper;