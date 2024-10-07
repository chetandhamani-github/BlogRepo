import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Button, Image } from 'react-native';
import { showToast } from '../utils/Toast';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
};

const BlogApp = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  const uploadImage = async () => {
    if (selectedImage == null) {
      return null;
    }

    const uploadUri = selectedImage;
    let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    const extension = fileName.split('.').pop();
    const name = fileName.split('.').slice(0, -1).join('.');
    fileName = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${fileName}`);
    const task = storageRef.putFile(uploadUri);

    task.on('state_changed', (snapshot) => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
    });

    try {
      await task;
      const url = await storageRef.getDownloadURL();
      setUploading(false);
      return url;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const handleAddBlog = async () => {
    if (title && content) {
      const imageUrl = await uploadImage();

      const newBlog = {
        title,
        content,
        id: generateRandomId(),
        imageUrl
      };

      setBlogs([...blogs, newBlog]);
      setTitle('');
      setContent('');
      setSelectedImage(null);
    } else {
      showToast('Title and content both are required');
    }
  };

  const BlogCard = ({ item }) => (
    <View style={styles.cardContainer}>
      {item.imageUrl && (
        <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
      )}
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

      <Button title="Choose Image from Device" onPress={openImagePicker} />
      <View style = {{height: '5%'}}></View>

      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.previewImage} />
      )}

      <TouchableOpacity style={styles.button} onPress={handleAddBlog}>
        <Text style={styles.buttonText}>
          {uploading ? `Uploading ${transferred}%` : 'Submit Blog'}
        </Text>
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginBottom: 20,
    width: '100%', 
    justifyContent: 'center',
    alignItems: 'center',
    height: 350,
  },
  cardImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 18,
    fontWeight: '300',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default BlogApp;
