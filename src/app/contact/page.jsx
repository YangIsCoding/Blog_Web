// src/app/contact/page.jsx
import Image from "next/image";
import styles from "./contact.module.css";
import ContactForm from "@/components/form/contactForm";

export const metadata = {
  title: "Contact Page",
  description: "Contact description",
};

const ContactPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <ContactForm /> 
      </div>
    </div>
  );
};

export default ContactPage;
