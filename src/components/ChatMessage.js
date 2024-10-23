import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { firestore } from '../services/firebase'; // Adjust import based on your file structure

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        await firestore.collection('messages').add({
          text: message,
          createdAt: new Date(),
          // You can add additional fields like user ID or display name if needed
        });
        setMessage(''); // Clear the input after sending
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = firestore.collection('messages')
      .orderBy('createdAt', 'asc') // Sort messages by creation time
      .onSnapshot(snapshot => {
        const newMessages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(newMessages); // Update the messages state with new data
      });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
        inverted // Display the latest message at the bottom
      />
      <TextInput
        style={styles.input}
        placeholder="Enter message"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send" onPress={handleSendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f7f9fc', // Light background color
  },
  messageContainer: {
    marginVertical: 5,
    padding: 20,
    backgroundColor: '#e0e0e0', // Light gray background for messages
    borderRadius: 5,
  },
  messageText: {
    fontSize: 16,
  },
  input: {
    height: 20,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5, // Rounded input field
  },
});

export default ChatScreen;
