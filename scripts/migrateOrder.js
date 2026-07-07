import db from "./config/firebaseAdmin.js";

const migrateOrder = async () => {
  console.log("\nAgregando campo 'order'...\n");

  const snapshot = await db
    .collection("media")
    .orderBy("createdAt", "desc")
    .get();

  let order = 1;

  for (const doc of snapshot.docs) {
    await doc.ref.update({
      order,
    });

    console.log(`✔ ${doc.id} -> ${order}`);
    order++;
  }

  console.log("\nMigración finalizada.\n");
};

migrateOrder().catch(console.error);