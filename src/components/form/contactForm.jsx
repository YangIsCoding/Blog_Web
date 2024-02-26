"use client";
import Image from "next/image";
import styles from "./contact.module.css";
import { useState } from "react";
import { PrismaClient } from '@prisma/client';


const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault(); 

  try {
    const savedForm = await prisma.contactForm.create({
      data: formState,
    });
    console.log('Saved form:', savedForm);
    setFormState({
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
    });
  } catch (error) {
    console.error("Error saving form to database:", error);
  }
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
