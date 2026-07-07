import {
  writeBatch,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/config";

/**
 * Actualiza únicamente los documentos cuyo orden cambió.
 */
export const updateMediaOrder = async (oldItems, newItems) => {
  const batch = writeBatch(db);

  let hasChanges = false;

  newItems.forEach((item, index) => {
    const oldItem = oldItems.find((i) => i.firestoreId === item.firestoreId);

    const newOrder = index + 1;

    if (!oldItem || oldItem.order !== newOrder) {
      batch.update(
        doc(db, "media", item.firestoreId),
        {
          order: newOrder,
        }
      );

      hasChanges = true;
    }
  });

  if (!hasChanges) return;

  await batch.commit();
};