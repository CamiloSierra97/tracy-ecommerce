const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const targetWidth = 1080;
const targetHeight = 1620;
const files = [
  "public/MujerBanner.webp",
  "public/HombreBanner.webp",
  "public/Ninabanner.webp",
];

async function processImages() {
  for (const file of files) {
    try {
      const inputPath = path.join(process.cwd(), file);
      // New filename: name-optimized.webp
      const p = path.parse(inputPath);
      const outputPath = path.join(p.dir, p.name + "-optimized" + p.ext);

      await sharp(inputPath)
        .resize(targetWidth, targetHeight, {
          fit: "cover",
          position: "center",
        })
        .toFile(outputPath);

      console.log(
        `Created ${path.basename(outputPath)} at ${targetWidth}x${targetHeight}`
      );
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

if (!process.env.npm_package_config_libvips) {
  process.env.npm_package_config_libvips = "8.14.5";
}

processImages();
