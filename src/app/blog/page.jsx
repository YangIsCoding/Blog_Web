"use client"
import React, { useEffect, useState } from "react";
import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";
import Head from 'next/head';

const getData = async () => {
  const res = await fetch('/api/posts', { 
    method: 'GET', 
    cache: 'no-store',
  });
  if (!res.ok) { 
    throw new Error("Failed to fetch data");
  }
  return res.json(); 
};

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 新增加載狀態

  useEffect(() => {
    getData()
      .then(setPosts)
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false)); 
  }, []);

  if (isLoading) { 
    return <div className={styles.container}>Loading...</div>; // 顯示加載中提示
  }

  return (
    <>
    <Head>
       <title>Your Blog Title</title>
        <meta name="description" content="This is a brief description of your blog. Make sure it is at least 100 characters long." />
        <meta property="og:title" content="Your Blog Title" />
        <meta property="og:description" content="This is a brief description of your blog. Make sure it is at least 100 characters long." />
        <meta property="og:image" content="https://www.chenpinyangdev.com/contact.png" />
        <meta property="og:url" content="https://www.chenpinyangdev.com/blog" />
        <meta property="og:type" content="website" />
    </Head>
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
      </div>
      </>
  );
};

export default BlogPage;
