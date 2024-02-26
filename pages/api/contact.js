import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const prisma = new PrismaClient();
    try {
      const savedForm = await prisma.contactForm.create({
        data: req.body,
      });
      res.status(200).json({ savedForm });
    } catch (error) {
      console.error("Error saving form to database:", error);
      res.status(500).json({ error: "Error saving form to database" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    // 处理其他 HTTP 方法的情况
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
