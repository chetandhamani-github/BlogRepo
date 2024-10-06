import {ToastAndroid} from 'react-native';

const showToast = (children) => {
  
  ToastAndroid.show(`${children}`, ToastAndroid.SHORT);
};

export {showToast}