import sharp from "sharp";
import fs from "fs";
import path from "path";

// 👇 TU CARPETA ORIGINAL
const inputDir = "C:/Users/Maxim/Desktop/luzul/Luzul-Drive/luzul";

// 👇 SALIDA DIRECTA AL PROYECTO
const outputDir = "./public/images";

const thumbsDir = path.join(outputDir, "thumbs");
const fullDir = path.join(outputDir, "full");

// crear carpetas
[thumbsDir, fullDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const convertImages = async () => {
  const files = fs.readdirSync(inputDir);

  // 🔥 filtrar solo imágenes válidas
  const imageFiles = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return [".jpg", ".jpeg", ".png"].includes(ext);
  });

  // 🔥 OPCIONAL: ordenar para consistencia
  imageFiles.sort();

  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    const inputPath = path.join(inputDir, file);

    const newName = `foto${String(i + 1).padStart(2, "0")}`;

    try {
      // THUMB
      await sharp(inputPath)
        .resize(800)
        .webp({ quality: 75 })
        .toFile(path.join(thumbsDir, `${newName}.webp`));

      // FULL
      await sharp(inputPath)
        .resize(1600)
        .webp({ quality: 90 })
        .toFile(path.join(fullDir, `${newName}.webp`));

      console.log(`✔ ${file} → ${newName}.webp`);
    } catch (err) {
      console.error(`❌ Error con ${file}`, err);
    }
  }

  console.log("🔥 TODAS LISTAS");
};

convertImages();