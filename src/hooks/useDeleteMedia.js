/* import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

const useDeleteMedia = () => {
  const deleteMedia = async (id) => {
    await deleteDoc(doc(db, "media", id));
  };

  return { deleteMedia };
};

export default useDeleteMedia; */

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const useDeleteMedia = () => {
  const deleteMedia = async (id) => {
    try {
      await deleteDoc(doc(db, "media", id));

      console.log("Archivo eliminado");
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el archivo.");
    }
  };

  return {
    deleteMedia,
  };
};

export default useDeleteMedia;