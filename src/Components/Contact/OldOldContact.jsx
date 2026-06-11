// Contact.jsx
import React, { useRef, useState } from 'react';
import './Contact.css';
import theme_pattern from '../../assets/theme_pattern.svg';
import mail_icon from '../../assets/mail_icon.svg';
import location_icon from '../../assets/location_icon.svg';
import call_icon from '../../assets/call_icon.svg';

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState(''); // '', 'sending', 'success', 'error'
  const [messageText, setMessageText] = useState(''); // message detail for UI

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');
    setMessageText('');

    try {
      const form = event.target;
      const formData = new FormData(form);

      // NOTE: replace this access_key with your valid web3forms access key
      formData.append('access_key', '6ca29419-5c70-4ae5-bdde-be238af758a1');

      const payload = Object.fromEntries(formData.entries());
      const json = JSON.stringify(payload);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: json
      });

      // If network-level failure, response.ok will be false or response.json may throw
      const res = await response.json();

      if (res.success) {
        setStatus('success');
        setMessageText('Message sent successfully. Thank you!');
        // show alert (optional)
        alert('Message sent successfully!');
        // reset form fields
        if (formRef.current) formRef.current.reset();
      } else {
        // API returned a success: false — show reason if available
        setStatus('error');
        const errMsg = res.message || JSON.stringify(res);
        setMessageText(`Failed to send message: ${errMsg}`);
        console.error('Web3Forms error response:', res);
        alert(`Failed to send message: ${errMsg}`);
      }
    } catch (error) {
      console.error('Fetch / network error:', error);
      setStatus('error');
      setMessageText('Network error. Please check console or try again later.');
      alert('Network error. Please try again later.');
    }
  };

  return (
    <div id="contact" className="contact">
      <div className="contact-title">
        <h1>Get in touch</h1>
        <img src={theme_pattern} alt="" />
      </div>

      <div className="contact-section">
        <div className="contact-left">
          <h1>Let's talk</h1>
          <p>
            I'm currently open to new opportunities and collaborations. Whether you have a project in mind,
            need assistance with web development, or just want to say hello, feel free to reach out!
          </p>
          <div className="contact-details">
            <div className="contact-detail">
              <img src={mail_icon} alt="email icon" /> <p>nurabsystems@gmail.com</p>
            </div>
            <div className="contact-detail">
              <img src={call_icon} alt="" /> <p>+234-803-710-6942</p>
            </div>
            <div className="contact-detail">
              <img src={location_icon} alt="" /> <p>Lagos, Nigeria.</p>
            </div>
          </div>
        </div>

        <form ref={formRef} onSubmit={onSubmit} className="contact-right">
          <label>Your Name</label>
          <input type="text" placeholder="Enter your name" name="name" required />

          <label>Your Email</label>
          <input type="email" placeholder="Enter your email" name="email" required />

          <label>Write your message here</label>
          <textarea name="message" placeholder="Enter your message here..." rows="8" required></textarea>

          <button type="submit" className="contact-submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Submit now'}
          </button>

          {/* Inline status message */}
          {status === 'success' && <p className="contact-status success">{messageText}</p>}
          {status === 'error' && <p className="contact-status error">{messageText}</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
