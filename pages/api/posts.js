// pages/api/posts.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const posts = await prisma.post.findMany();
    //console.log(posts); 
    res.status(200).json(posts); 
  } catch (e) {
    console.error(e); // 打印錯誤到控制台
    res.status(500).json({ error: 'Unable to fetch posts' }); // 發送錯誤響應
  }
}
