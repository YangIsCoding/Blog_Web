"use client";
import Image from "next/image";
import styles from "./contact.module.css";
import { useState } from "react";

const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  // 处理输入变化
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault(); // 阻止表单默认提交行为

    // 这里可以添加你处理表单数据的代码
    console.log(formState);

    // 重置表单状态或执行其他操作
  };

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/contact.png" alt="" fill className={styles.img} />
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="text" placeholder="Name and Surname" name="name" value={formState.name} onChange={handleChange} />
          <input type="text" placeholder="Email Address" name="email" value={formState.email} onChange={handleChange} />
          <input type="text" placeholder="Phone Number (Optional)" name="phoneNumber" value={formState.phoneNumber} onChange={handleChange} />
          <textarea name="message" cols="30" rows="10" placeholder="Message" value={formState.message} onChange={handleChange}></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
