import uploadImages from "./migrateImages.js";
import uploadVideos from "./migrateVideos.js";

const migrateAll = async () => {
  console.log("\n========== MIGRACIÓN ==========\n");

  console.log("1) Imágenes");
  await uploadImages();

  console.log("\n2) Videos");
  await uploadVideos();

  console.log("\n✔ Todo migrado correctamente.");
};

migrateAll();