///api/posts.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts); 
  } catch (e) {
    console.error(e); 
    res.status(500).json({ error: 'Unable to fetch posts' });
  }
}
