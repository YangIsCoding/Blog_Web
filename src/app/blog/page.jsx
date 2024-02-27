"use client"
import React from "react";
import { useState } from "react";

import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";


const getData = async () => { 
  
  const host = process.env.HOST
  const url= `${host}/api/posts`
  const res = await fetch(url, { 
    method: 'GET', 
    cache: 'no-store' 
  });
9
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