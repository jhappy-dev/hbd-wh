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
    const outputPath = path.join(outputDir, file); // 확장자 그대로 유지

    try {
      await sharp(inputPath)
      .resize(size, size, { fit: 'cover' })
      .png({ compressionLevel: 9 })   // PNG로 출력
      .toFile(outputPath);

      console.log(`변환 완료: ${file}`);
    } catch (error) {
      console.error(`변환 실패: ${file}`, error);
    }
  });
});
