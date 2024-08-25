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
