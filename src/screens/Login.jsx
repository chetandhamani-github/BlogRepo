import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { showToast } from '../utils/Toast';

const Login = ({ navigation }) => {

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '81295370674-9ul3i91a0edscu59r1lvuek5dpm17mcu.apps.googleusercontent.com',
    });
  }, [])

  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the user's ID token
      const { idToken } = await GoogleSignin.signIn();
  
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ width: '100%', marginBottom: '10%' }}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Enter your Untitled account details.</Text>
      </View>

      <TouchableOpacity
        onPress={() => onGoogleButtonPress().then(() => {
          navigation.navigate('Home')
        })}
        style={styles.googleButton}
      >
        <Text style={styles.socialButtonText}>Log in with Google</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>


      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => {
          if (!values.email || !values.password) {
            showToast('Please provide valid email and password');
            return;
          }
          console.log(values);
          navigation.navigate('Home')
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <View style={{ width: '100%', alignItems: 'center' }}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange('email')}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              value={values.password}
            />

            <TouchableOpacity style={styles.signInButton} onPress={handleSubmit}>
              <Text style={styles.signInText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: '3%',
    textAlign: 'center',
    color: '#000000'
  },
  subtitle: {
    fontSize: 16,
    marginBottom: '5%',
    textAlign: 'center',
  },
  googleButton: {
    backgroundColor: '#4285F4',
    paddingVertical: '3%',
    width: '90%',
    borderRadius: 5,
    marginBottom: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  githubButton: {
    backgroundColor: '#24292E',
    paddingVertical: '3%',
    width: '90%',
    borderRadius: 5,
    marginBottom: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginVertical: '3%',
    color: '#999',
    fontWeight: 'bold'
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: '5%',
    paddingHorizontal: 10,
    width: '90%',
    backgroundColor: 'white',
  },
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: '5%',
  },
  checkText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },
  forgotPassword: {
    color: '#007AFF',
    fontSize: 14,
  },
  signInButton: {
    backgroundColor: '#000',
    paddingVertical: '3%',
    width: '90%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%'
  },
  signInText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Login;
