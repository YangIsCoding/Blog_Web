"use client"
import React, { useEffect, useState } from "react";
import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";

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
      .finally(() => setIsLoading(false)); // 無論成功或失敗，結束時都設置加載狀態為false
  }, []);

  if (isLoading) { // 判斷是否在加載中
    return <div className={styles.container}>Loading...</div>; // 顯示加載中提示
  }

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
