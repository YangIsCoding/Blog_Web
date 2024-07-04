// prisma/seed.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  /*const user1 =  await prisma.user.create({
    data: {
      userId: 2,
      userName: "Bibbs",
      userImg: "/profile_yang.jpg"
    }
  });*/


  await prisma.post.create({
    data: {
      id:14,
      userId: 1,
      title: '[CHI]算法筆記',
      shortdesc: '感謝代碼隨想錄前輩的重點整理',
      content: "/posts/post14.md",
      postTime: "continue updating",
      postImg: "/algo.webp"
    }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
