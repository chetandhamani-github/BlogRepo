import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { showToast } from '../utils/Toast';

const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
};

const BlogApp = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [blogs, setBlogs] = useState([]);

  const handleAddBlog = () => {
    if (title && content) {
      const newBlog = { title, content, id: generateRandomId() };
      setBlogs([...blogs, newBlog]);
      setTitle('');
      setContent('');
    } else {
      showToast('Title and content both are required')
    }
  };
  

  const BlogCard = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={{ width: '90%', height: '90%' }}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardContent}>{item.content}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create a Blog Post</Text>

      <TextInput
        style={styles.input}
        placeholder="Blog Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Blog Content"
        value={content}
        onChangeText={setContent}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleAddBlog}>
        <Text style={styles.buttonText}>Submit Blog</Text>
      </TouchableOpacity>

      <FlatList
        data={blogs}
        renderItem={BlogCard}
        keyExtractor={(item) => item.id}
        style={{ width: '100%', marginTop: 10 }}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cardContainer: {
    backgroundColor: '#EDE8DC',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3, // Shadow effect (Android)
    shadowColor: '#000', // Shadow effect (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginBottom: 20,
    width: '100%', // Adjust card width as per need
    justifyContent: 'center',
    alignItems: 'center',
    height: 350
  },
  
  cardTitle:{
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10
  },
  cardContent:{
    fontSize: 18,
    fontWeight: '300',
  },
});

export default BlogApp;
