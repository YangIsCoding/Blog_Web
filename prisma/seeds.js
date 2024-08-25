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
      id:19,
      userId: 1,
      title: '[EN]EIP-1559 raw transaction algorithm, and RLP decode',
      shortdesc: 'To show the process of how a raw transaction data be decoded',
      content: "/posts/post4en.md",
      postTime: "2023.12.06",
      postImg: "/post4.webp"
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
