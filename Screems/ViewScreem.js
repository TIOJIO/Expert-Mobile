import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { IconButton } from 'react-native-paper';

const PALM_API_KEY = 'AIzaSyA7zZ2RJfWIQ0IMc21hfpCIRfmY6Rv3iBg';

const ChatbotScreen = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'model', text: 'Bonjour ! \n\nComment puis-je vous aider aujourd\'hui ?' },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const newChatHistory = [
      ...chatHistory,
      { role: 'user', text: userMessage },
    ];
    setChatHistory(newChatHistory);
    setUserMessage('');
    setLoading(true);

    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?'+PALM_API_KEY,
        {
          prompt: userMessage,
          temperature: 1,
          maxOutputTokens: 8192,
          topP: 0.95,
          topK: 64,
          responseMimeType: 'text/plain',
        },
        {
          headers: {
            'Authorization': `Bearer ${PALM_API_KEY}`,
          },
        }
      );

      const botMessage = response.data.text || "Désolé, je n'ai pas pu comprendre votre message.";
      setChatHistory([...newChatHistory, { role: 'model', text: botMessage }]);
    } catch (error) {
      console.error(error);
      setChatHistory([...newChatHistory, { role: 'model', text: 'Une erreur est survenue, veuillez réessayer.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {chatHistory.map((msg, index) => (
          <View key={index} style={msg.role === 'user' ? styles.userMessage : styles.botMessage}>
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre message"
          value={userMessage}
          onChangeText={setUserMessage}
        />
        <IconButton
          icon="send"
          size={24}
          onPress={handleSendMessage}
          disabled={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 20,
  },
});

export default ChatbotScreen;
