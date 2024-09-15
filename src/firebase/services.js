import { db, storage } from "./firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

class Services {
  createPost = async ({
    title,
    slug,
    status,
    imageUrl,
    content,
    filePath,
    userId,
  }) => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        title,
        slug,
        status,
        content,
        imageUrl,
        filePath,
        userId,
        time: serverTimestamp(),
      });
      return docRef;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  updatePost = async (
    postId,
    { title, slug, content, imageUrl, filePath, status, userId }
  ) => {
    const docRef = doc(db, "posts", postId);
    try {
      return await updateDoc(docRef, {
        title,
        slug,
        content,
        imageUrl,
        filePath,
        status,
        time: serverTimestamp(),
        userId,
      });
      // console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  deletePost = async (postId) => {
    try {
      await deleteDoc(doc(db, "posts", postId));
      return true;
    } catch (error) {
      console.error("Error deleting document: ", error);
      return false;
    }
  };

  getPost = async (postId) => {
    const docRef = doc(db, "posts", postId);
    try {
      const post = await getDoc(docRef);
      if (post.exists()) {
        return post.data();
      } else {
        console.log("no such doc");
        return null;
      }
    } catch (error) {
      console.log("error getting document: ", error);
    }
  };
  getAllPosts = async () => {
    const q = query(
      collection(db, "posts"),
      where("status", "==", "active"),
      orderBy("time", "desc")
    );
    try {
      const posts = await getDocs(q);
      if (posts.size == 0) {
        return null;
      } else {
        const activePosts = [];
        posts.forEach((doc) => {
          activePosts.push({ id: doc.id, ...doc.data() });
        });
        return activePosts;
      }
    } catch (error) {
      console.log("error getting All document: ", error);
    }
  };

  uploadFile = async (file) => {
    const storageRef = ref(storage, `uploads/${file.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, file);

      const filePath = snapshot.metadata.fullPath;
      const url = await getDownloadURL(snapshot.ref);
      return { url, filePath };
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  deleteFile = async (filePath) => {
    try {
      const imageRef = ref(storage, filePath);
      await deleteObject(imageRef);
      return true;
    } catch (error) {
      console.error("Error deleting file:", error);
      return false;
    }
  };
}

const services = new Services();
export default services;
