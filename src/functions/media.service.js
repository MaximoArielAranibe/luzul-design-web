import { doc, updateDoc } from "firebase/firestore"

import { db } from "../firebase/config"

export const updateMediaTitle = async (id, title) => {
  const ref = doc(db, "media", id);

  await updateDoc(ref, {
    title,
  });
};