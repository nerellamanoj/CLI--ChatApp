import React, {useEffect} from 'react';
import {FlatList, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMessages} from '../features/chat/chatSlice';
import ChatMessage from '../components/ChatMessage';
import MessageInput from '../components/MessageInput';

const ChatScreen = () => {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.chat.messages);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  return (
    <View style={{flex: 1, padding: 10}}>
      <FlatList
        data={messages}
        renderItem={({item}) => <ChatMessage message={item} />}
        keyExtractor={item => item.id}
        inverted // To show the latest messages at the bottom
      />
      <MessageInput />
    </View>
  );
};

export default ChatScreen;
