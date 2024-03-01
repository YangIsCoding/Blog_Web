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
      id:6,
      userId: 2,
      title: 'Cross-Site Request Forgery',
      shortdesc: '是一種網路攻擊方式，發生於使用者已經通過身份驗證並信任某應用程式的情況下，稱為跨站請求偽造。',
      content: "/posts/post6.md",
      postTime: "2024.02.26",
      postImg: "/post5.webp"
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
