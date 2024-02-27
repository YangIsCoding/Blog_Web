// 使用 React, useState, useEffect, useRouter, Image
"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from "./singlePost.module.css";
import { marked } from 'marked';


const getData = async (slug) => {
  const res = await fetch(`/api/${slug}`, {
    method: 'GET',
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const SinglePostPage = ({params}) => {
  const [post, setPost] = useState(null);
  const [markdownContent, setMarkdownContent] = useState('');
  const { slug } = params;
  
  useEffect(() => {
    if (slug) {
      getData(slug)
        .then(post => {
          setPost(post);
        })
        .catch(error => console.error(error));
    }
  }, [slug]);

  
  if (!post) return <div>Loading...</div>;
  const dataHTML = marked(post.content);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image className={styles.img} src={post.postImg || '/default-image.png'} alt="picture" layout="fill" />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          <Image className={styles.avatar} src={post.user.userImg || '/default-avatar.png'} alt="avatar" width={50} height={50} />
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Author</span>
            <span className={styles.detailValue}>{post.user.userName}</span>
          </div>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>{post.postTime}</span>
          </div>
        </div>
        <article dangerouslySetInnerHTML={{ __html: dataHTML || '' }} />
        <p>here</p>
      </div>
    </div>
  );
};

export default SinglePostPage;
