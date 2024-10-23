import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { auth } from '../services/firebase'; // Ensure this imports the initialized auth
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import the signIn function

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(
        login({
          user: {
            email: userCredential.user.email,
            uid: userCredential.user.uid,
          },
        }),
      );
      navigation.navigate('Chat');
    } catch (error) {
      console.error('Login Error:', error.message);
      Alert.alert('Login Failed', error.message); // Alert user on error
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email" // Helps with autocomplete
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCompleteType="password" // Helps with autocomplete
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.secondaryButtonText}>Go to Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#f7f9fc', // Light background color for better contrast
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Center the title
    color: '#333', // Dark text color for better readability
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 8, // Rounded input fields
    backgroundColor: '#fff', // White background for input fields
  },
  button: {
    height: 50,
    backgroundColor: '#007bff', // Primary button color
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3, // Shadow effect for elevation
  },
  buttonText: {
    color: '#fff', // White text for button
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    height: 50,
    backgroundColor: '#f7f9fc', // Background color for secondary button
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007bff', // Border color to match primary button
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#007bff', // Primary button color for text
    fontSize: 18,
    fontWeight: '600',
  },
  // Adding hover-like effect for TouchableOpacity on both buttons
  buttonHover: {
    opacity: 0.8,
  },
  secondaryButtonHover: {
    opacity: 0.8,
  },
});

export default LoginScreen;
