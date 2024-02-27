import Image from "next/image"
import styles from "./postCard.module.css"
import Link from "next/link"

const PostCard = ({ }) => {
  return (
    <div className={styles.container}>

      <div className={styles.top}>
        {
          <div className={styles.imgContainer}>
            <Image src="/chips.gif" alt="" fill className={styles.img}/>
          </div>
        }
        <span className={styles.date}>2024.03.03</span>
      </div>

      <div className={styles.bottom}>
        <h1 className={styles.title}>Title</h1>
        <p className={styles.desc}>desc </p>
        <Link href = "/blog/post">READ MORE</Link>
      </div>
    </div>
  )
}

export default PostCard

/*import Image from "next/image"
import styles from "./postCard.module.css"
import Link from "next/link"

const PostCard = ({ post }) => {
  //console.log(post);
  return (
    <div className={styles.container}>

      <div className={styles.top}>
        {
          <div className={styles.imgContainer}>
            <Image src={post.postImg} alt="" fill className={styles.img}/>
          </div>
        }
        <span className={styles.date}>{post.postTime}</span>
      </div>

      <div className={styles.bottom}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.desc}>
          {post.shortdesc.length > 25 ? post.shortdesc.substring(0, 25) + "..." : post.shortdesc}
        </p>
        <Link className={styles.link} href={`/blog/${post.id}`}>READ MORE</Link>
      </div>
    </div>
  )
}

export default PostCard*/