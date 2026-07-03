import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

const useDeleteMedia = () => {
  const deleteMedia = async (id) => {
    await deleteDoc(doc(db, "media", id));
  };

  return { deleteMedia };
};

export default useDeleteMedia;