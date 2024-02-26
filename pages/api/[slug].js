// pages/api/posts/[slug].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { slug } = req.query;

  const post = await prisma.post.findUnique({
    where: {
        id: Number(slug), 
    },
    include: {
        user: true, 
    },
  });

    
    
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
}
