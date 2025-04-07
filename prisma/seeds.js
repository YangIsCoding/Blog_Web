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
      id:21,
      userId: 1,
      title: 'Leetcode 2',
      shortdesc: 'Now, You have done the part 1 congrats, let us continue',
      content: "/posts/post16.md",
      postTime: "2025.04.07",
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
