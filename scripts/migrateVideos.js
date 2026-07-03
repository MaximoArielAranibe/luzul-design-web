import fs from "fs";
import path from "path";

import cloudinary from "./config/cloudinary.js";
import db from "./config/firebaseAdmin.js";

const VIDEOS_FOLDER = path.resolve("public");

const VIDEO_EXTENSIONS = [
  ".mp4",
  ".mov",
  ".webm",
];

const uploadVideos = async () => {
  const files = fs
    .readdirSync(VIDEOS_FOLDER)
    .filter((file) =>
      VIDEO_EXTENSIONS.includes(path.extname(file).toLowerCase())
    );

  console.log(`\n${files.length} videos encontrados.\n`);

  for (const file of files) {
    try {
      console.log(`Subiendo ${file}...`);

      const filePath = path.join(VIDEOS_FOLDER, file);
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
        folder: "luzul/videos",
        resource_type: "video",
      });

      await db.collection("media").add({
        title: path.parse(file).name,
        fileName: file,
        url: result.secure_url,
        publicId: result.public_id,
        type: "video",
        span: "normal",
        createdAt: new Date(),
      });

      console.log(`✔ ${file}`);
    } catch (error) {
      console.error(`✖ ${file}`);
      console.error(error.message);
    }
  }

  console.log("\nMigración de videos finalizada.");
};

export default uploadVideos;