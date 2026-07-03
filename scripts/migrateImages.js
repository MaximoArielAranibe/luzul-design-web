import fs from "fs";
import path from "path";

import cloudinary from "./config/cloudinary.js";
import db from "./config/firebaseAdmin.js";

const IMAGES_FOLDER = path.resolve("public/images/full");

const IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
];

const uploadImages = async () => {
  const files = fs
    .readdirSync(IMAGES_FOLDER)
    .filter((file) =>
      IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase())
    );

  console.log(`\n${files.length} imágenes encontradas.\n`);

  for (const file of files) {
    try {
      console.log(`Subiendo ${file}...`);

      const filePath = path.join(IMAGES_FOLDER, file);

      const existing = await db
        .collection("media")
        .where("fileName", "==", file)
        .limit(1)
        .get();

      if (!existing.empty) {
        console.log(`⏭ ${file} ya existe. Se omite.`);
        continue;
      }

      const result = await cloudinary.uploader.upload(filePath, {
        folder: "luzul/images",
      });

      await db.collection("media").add({
        title: path.parse(file).name,
        fileName: file,
        url: result.secure_url,
        publicId: result.public_id,
        type: "image",
        span: "normal",
        createdAt: new Date(),
      });
      console.log(`✔ ${file}`);
    } catch (error) {
      console.error(`✖ ${file}`);
      console.error(error.message);
    }
  }

  console.log("\nMigración finalizada.");
};

export default uploadImages;