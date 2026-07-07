import {
  collection,
  writeBatch,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/config";

const useMediaSort = () => {
  const saveOrder = async (items) => {
    const batch = writeBatch(db);

    items.forEach((item, index) => {
      batch.update(
        doc(db, "media", item.firestoreId),
        {
          order: index,
        }
      );
    });

    await batch.commit();
  };

  return {
    saveOrder,
  };
};

export default useMediaSort;