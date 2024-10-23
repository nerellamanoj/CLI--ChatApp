import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from '../services/firebase'; // Ensure this is correctly pointing to your firebase config file
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import this function

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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
      console.error('Signup Error:', error.message);
      Alert.alert('Signup Failed', error.message); // Alert user on error
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.secondaryButtonText}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
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
    marginBottom: 15,
    paddingHorizontal: 15,
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
});

export default SignupScreen;
