import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {sendMessage} from '../features/chat/chatSlice';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleSend = () => {
    if (message.trim()) {
      const messageData = {
        content: message,
        timestamp: new Date(),
      };
      dispatch(sendMessage(messageData));
      setMessage('');
    }
  };

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TextInput
        style={{flex: 1, borderColor: 'gray', borderWidth: 1, marginRight: 8}}
        placeholder="Type a message..."
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

export default MessageInput;
