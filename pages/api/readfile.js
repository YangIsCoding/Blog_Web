// pages/api/readFile.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // 指定文件路徑
  const filePath = path.join(process.cwd(), 'public', 'posts', 'post1.md');

  // 讀取文件內容
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read file' });
    }
    res.status(200).json({ content: data });
  });
}
