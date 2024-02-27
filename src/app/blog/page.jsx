"use client"
import React from "react";
import { useState } from "react";

import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";


const getData = async () => { 
  
  const host = process.env.HOST
  const url = "http://localhost:3000/api/posts"
  const url2 = `${host}/api/posts`
  console.log("URL:", url2);
  const res = await fetch(url2, { 
    method: 'GET', 
    cache: 'no-store' 
  });

  if (!res.ok) { 
    throw new Error("Failed to fetch data");
  }
  return res.json(); 
};




const BlogPage = async () => { 
  
  const posts = await getData();
  return (
    <div className={styles.container}>
      {
        posts.map((post) => (
          <div className={styles.post} key={post.id}>
            <PostCard post={post} />
          </div>
        ))
      }
      
    </div>);
}

export default BlogPage;