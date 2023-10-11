import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDP7QFgbo5dXaup2Rla1MM5WfIQ1s_WiRc",
    authDomain: "yogaplanner-d1ec6.firebaseapp.com",
    projectId: "yogaplanner-d1ec6",
    storageBucket: "yogaplanner-d1ec6.appspot.com",
    messagingSenderId: "410043196507",
    appId: "1:410043196507:web:4809f46972917faa7e0b7e"
  };

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

// Upload an image
const uploadImage = async (file) => {
    const imageRef = ref(storage, file.name);
    await uploadBytes(imageRef, file);
    const downloadData = await getDownloadURL(imageRef);
    return downloadData;
};

export {
    storage,
    uploadImage
}


