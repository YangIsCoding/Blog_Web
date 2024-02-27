// prisma/seed.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const user1 =  await prisma.user.create({
    data: {
      userId: 1,
      userName: "Yang",
      userImg: "/profile_yang.jpg"
    }
  });

  const user2 = await prisma.user.create({
    data: {
      userId: 2,
      userName: "Nana",
      userImg: "/hero.gif"
    }
  });

  await prisma.post.create({
    data: {
      id:1,
      userId: user1.userId,
      title: 'First Post',
      shortdesc: 'This is the body of my 1 post',
      filePath: "public/posts/post1.md",
      postTime: "2024.07.07",
      postImg: "/about.jpg"
    }
  });
  await prisma.post.create({
    data: {
      id:2,
      userId: user2.userId,
      title: 'Second Post',
      shortdesc: 'This is the body of my 2 post',
      filePath: "public/posts/post1.md",
      postTime: "2024.07.07",
      postImg: "/about.jpg"
    }
  });
  await prisma.post.create({
    data: {
      id:3,
      userId: user2.userId,
      title: 'Third Post',
      shortdesc: 'This is the body of my 3 post',
      filePath: "public/posts/post1.md",
      postTime: "2024.07.07",
      postImg: "/about.jpg"
    }
  });
  await prisma.post.create({
    data: {
      id:4,
      userId: user1.userId,
      title: 'forth Post',
      shortdesc: 'This is the body of my 4 post',
      filePath: "public/posts/post1.md",
      postTime: "2024.07.07",
      postImg: "/about.jpg"
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
