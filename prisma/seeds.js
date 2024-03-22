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
      id:13,
      userId: 1,
      title: '[CHI]斜槓青年',
      shortdesc: '沒有自控力與實力作為前提的自由是任性',
      content: "/posts/post13.md",
      postTime: "2021.03.13",
      postImg: "/versatile.webp"
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
