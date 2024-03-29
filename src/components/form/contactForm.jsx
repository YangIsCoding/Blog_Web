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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);


  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

 const handleSubmit = async (e) => {
   e.preventDefault(); 
   if (!formState.name || !formState.message || !formState.email) {
     setMessage('Please at least enter your name, email and message.');
     return; // 阻止表单提交
   }
   setIsSubmitting(true);
    setMessage('Please wait for the data to input into database.')

  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formState),
  });

  if (response.ok) {
    console.log('Form submitted successfully');
    setMessage('I have received it, can send again after 10 secs!');
    setFormState({
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
    });
     setButtonDisabled(true);
      setTimeout(() => {
        setMessage('');
        setButtonDisabled(false);
      }, 10000); 
  } else {
    console.error("Error submitting form");
    setMessage('Submission failed, please contact me with another social media.');
  }
   setIsSubmitting(false);
};


  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
              <section className="cyberpunk both">
                <img
                  className="cyberpunk"
                  src="/contact.png"
                  alt=""
                />
              </section>
            </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
           
          <input class="cyberpunk" type="text" placeholder="Name and Surname" name="name" value={formState.name} onChange={handleChange} />
          <input class="" type="text" placeholder="Email Address" name="email" value={formState.email} onChange={handleChange} />
          <input class="" type="text" placeholder="Phone Number (Optional)" name="phoneNumber" value={formState.phoneNumber} onChange={handleChange} />
          <textarea class="" name="message" cols="30" rows="10" placeholder="Message" value={formState.message} onChange={handleChange}></textarea>
          <button type="submit" disabled={buttonDisabled} className="cybr-btn">Send<span aria-hidden>_</span>
                <span aria-hidden className="cybr-btn__glitch">Learn More_</span>
                <span aria-hidden className="cybr-btn__tag">g...glitch</span></button>
          <p className={styles.messageReceived}>{message}</p>

          

        </form>
      </div>
    </div>
  );
};

export default ContactForm;
