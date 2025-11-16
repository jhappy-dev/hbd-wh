import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = './public/img-original';  // 원본 폴더
const outputDir = './public/img';          // 리사이즈 결과물 폴더
const size = 600;                           // 원하는 리사이즈 크기

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('폴더 읽기 오류:', err);
    return;
  }

  files.forEach(async (file) => {
    const ext = path.extname(file).toLowerCase();

    // 이미지 파일만 처리
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      return;
    }

    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace(ext, '.jpg')); // 통일해서 jpg로

    try {
      await sharp(inputPath)
        .resize(size, size, { fit: 'cover' }) // 정사각형 자르기 + 리사이즈
        .jpeg({ quality: 75 })               // JPG 품질 75%
        .toFile(outputPath);

      console.log(`변환 완료: ${file}`);
    } catch (error) {
      console.error(`변환 실패: ${file}`, error);
    }
  });
});
