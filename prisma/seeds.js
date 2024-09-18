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
      id:20,
      userId: 1,
      title: 'What is Web3.0?',
      shortdesc: 'Congratulations, you’re living in a time of transformation!',
      content: "/posts/post15.md",
      postTime: "2024.09.16",
      postImg: "/blockchain.webp"
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
