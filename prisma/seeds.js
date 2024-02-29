// prisma/seed.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  /*const user1 =  await prisma.user.create({
    data: {
      userId: 1,
      userName: "Yang",
      userImg: "/profile_yang.jpg"
    }
  });*/


  await prisma.post.create({
    data: {
      id:5,
      userId: 1,
      title: '唯物vs唯心',
      shortdesc: '探討我對於世界的看法，以及自我探索的過程',
      content: "/posts/post5.md",
      postTime: "2024.01.26",
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
