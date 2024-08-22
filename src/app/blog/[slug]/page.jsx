"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from "./singlePost.module.css";
import 'highlight.js/styles/github.css';
import Head from 'next/head';

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

const SinglePostPage = ({ params }) => {
  const [post, setPost] = useState(null);
  const [markdownContent, setMarkdownContent] = useState('');
  const { slug } = params;
  const [postContent, setPostContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (slug) {
        try {
          const post = await getData(slug);
          setPost(post);
          const filePath = post.content;
          const response = await fetch(`${filePath}`);
          const text = await response.text();
          const { marked } = await import('marked');
          const htmlContent = marked(text);
          setPostContent(htmlContent);
          const hljs = (await import('highlight.js')).default;
          document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
          });
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, [slug]);

  useEffect(() => {
    if (postContent) {
      const highlightCode = async () => {
        const hljs = (await import('highlight.js')).default;
        document.querySelectorAll('pre code').forEach((block) => {
          hljs.highlightElement(block);
        });
      };
      highlightCode();
    }
  }, [postContent]);

  if (!post) return <div>Loading...</div>;

  return (
    <>
    <head>
       <meta property="og:image" content="https://www.chenpinyangdev.com/favicon.ico" />
    </head>

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
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: postContent }} />
        <p>Thank you!</p>
      </div>
      </div>
    </>
  );
};

export default SinglePostPage;
