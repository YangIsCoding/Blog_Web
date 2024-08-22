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
    <head>
        <title>P.Y,Chen - Blog</title>
        <meta name="description" content="Chen Pin Yang's personal portfolio, showcasing skills, experience, and projects in Fintech and software development." />
        <meta property="og:title" content="P.Y,Chen - Home" />
        <meta property="og:description" content="Chen Pin Yang's personal portfolio, showcasing skills, experience, and projects in Fintech and software development." />
        {/* 确保 og:image 的路径是静态且可访问的 */}
        <meta property="og:image" content="https://www.chenpinyangdev.com/profile_yang.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.chenpinyangdev.com/" />
      </head>

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
