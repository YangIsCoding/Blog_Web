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
      id:8,
      userId: 1,
      title: '給愛姪',
      shortdesc: '愛姪，願妳似花, 願妳開朗似豔陽下的向日葵。堅定如孟仲夏的木棉花。純潔若青草上的小白花。平安像呵護中的水仙花。',
      content: "/posts/post7.md",
      postTime: "2022.09.22",
      postImg: "/post7.webp"
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
