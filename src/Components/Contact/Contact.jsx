// Contact.jsx
// Client-only Web3Forms implementation reading access_key from Vite env.
// Includes honeypot spam trap, floating success animation, dismissible toast,
// auto-hide, and short success/error tones. No eslint-disable comments.

import React, { useRef, useState, useEffect } from 'react';
import './Contact.css';
import theme_pattern from '../../assets/theme_pattern.svg';
import mail_icon from '../../assets/mail_icon.svg';
import location_icon from '../../assets/location_icon.svg';
import call_icon from '../../assets/call_icon.svg';

// Read the access key from Vite env (must begin with VITE_)
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';

const Contact = () => {
  const formRef = useRef(null);

  // UI state
  const [status, setStatus] = useState(''); // '', 'sending', 'success', 'error'
  const [messageText, setMessageText] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [shakeForm, setShakeForm] = useState(false);

  // timers ref so we can clear them on unmount/dismiss
  const timersRef = useRef([]);

  /* Audio helpers */
  const playSuccessTone = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const now = ctx.currentTime;
      const o1 = ctx.createOscillator();
      const o2 = ctx.createOscillator();
      const gain = ctx.createGain();

      o1.type = 'sine';
      o1.frequency.value = 880;
      o2.type = 'sine';
      o2.frequency.value = 660;

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.08, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      o1.connect(gain);
      o2.connect(gain);
      gain.connect(ctx.destination);

      o1.start(now);
      o2.start(now);
      o1.stop(now + 0.7);
      o2.stop(now + 0.7);

      const t = setTimeout(() => {
        try {
          ctx.close();
        } catch (err) {
          console.warn('Audio close error:', err);
        }
      }, 900);
      timersRef.current.push(t);
    } catch (err) {
      console.warn('playSuccessTone error:', err);
    }
  };

  const playErrorTone = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const now = ctx.currentTime;
      const o = ctx.createOscillator();
      const g = ctx.createGain();

      o.type = 'sawtooth';
      o.frequency.value = 220;

      g.gain.setValueAtTime(0.001, now);
      g.gain.exponentialRampToValueAtTime(0.12, now + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.36);

      o.connect(g);
      g.connect(ctx.destination);
      o.start(now);
      o.stop(now + 0.36);

      const t = setTimeout(() => {
        try {
          ctx.close();
        } catch (err) {
          console.warn('Audio close error:', err);
        }
      }, 600);
      timersRef.current.push(t);
    } catch (err) {
      console.warn('playErrorTone error:', err);
    }
  };

  /* Show toast and auto-hide */
  const showAutoToast = (message, isError = false) => {
    setMessageText(message);
    setShowToast(true);
    setStatus(isError ? 'error' : 'success');

    if (isError) {
      playErrorTone();
      setShakeForm(true);
      const unshake = setTimeout(() => setShakeForm(false), 700);
      timersRef.current.push(unshake);
    } else {
      playSuccessTone();
      setShowSuccess(true);
      const hideCheck = setTimeout(() => setShowSuccess(false), 2200);
      timersRef.current.push(hideCheck);
    }

    const duration = isError ? 5200 : 2800;
    const hideToast = setTimeout(() => {
      setShowToast(false);
      setMessageText('');
      setStatus('');
    }, duration);
    timersRef.current.push(hideToast);
  };

  const dismissToast = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
    setShowToast(false);
    setShowSuccess(false);
    setMessageText('');
    setStatus('');
  };

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
    };
  }, []);

  /* Submit handler */
  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');
    setMessageText('');
    setShowToast(false);

    const form = event.target;
    const fd = new FormData(form);

    // honeypot check
    const honeypotValue = fd.get('bot_field');
    if (honeypotValue) {
      showAutoToast('Message sent.', false);
      if (formRef.current) formRef.current.reset();
      return;
    }

    // Build payload and attach client-side key from Vite env
    const payload = Object.fromEntries(fd.entries());
    payload.access_key = WEB3FORMS_ACCESS_KEY;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const res = await response.json();

      if (res && res.success) {
        setStatus('success');
        setMessageText('Message sent successfully. Thank you!');
        showAutoToast('Message sent successfully. Thank you!', false);
        if (formRef.current) formRef.current.reset();
      } else {
        const errMsg = (res && res.message) ? res.message : JSON.stringify(res);
        setStatus('error');
        setMessageText(`Failed to send message: ${errMsg}`);
        showAutoToast(`Failed to send message: ${errMsg}`, true);
        console.error('Web3Forms error response:', res);
      }
    } catch (err) {
      console.error('Fetch / network error:', err);
      setStatus('error');
      setMessageText('Network error. Please try again later.');
      showAutoToast('Network error. Please try again later.', true);
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
              <img src={call_icon} alt="call icon" /> <p>+234-803-710-6942</p>
            </div>
            <div className="contact-detail">
              <img src={location_icon} alt="location icon" /> <p>Lagos, Nigeria.</p>
            </div>
          </div>
        </div>

        <form ref={formRef} onSubmit={onSubmit} className={`contact-right ${shakeForm ? 'shake' : ''}`}>
          <label>Your Name</label>
          <input type="text" placeholder="Enter your name" name="name" required />

          <label>Your Email</label>
          <input type="email" placeholder="Enter your email" name="email" required />

          <label>Write your message here</label>
          <textarea name="message" placeholder="Enter your message here..." rows="8" required></textarea>

          {/* Honeypot field */}
          <input
            type="text"
            name="bot_field"
            tabIndex="-1"
            autoComplete="off"
            className="honeypot"
            aria-hidden="true"
          />

          <button type="submit" className="contact-submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Submit now'}
          </button>

          {status === 'success' && <p className="contact-status success">{messageText}</p>}
          {status === 'error' && <p className="contact-status error">{messageText}</p>}
        </form>
      </div>

      {/* Floating success animation */}
      <div className={`success-anim ${showSuccess ? 'show' : ''}`} aria-hidden="true">
        <svg className="check" viewBox="0 0 52 52">
          <path d="M14 27 L22 35 L38 17" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Dismissible toast/snackbar */}
      <div
        className={`contact-toast ${showToast ? 'visible' : ''} ${status === 'error' ? 'error' : 'success'}`}
        role="status"
        aria-live={status === 'error' ? 'assertive' : 'polite'}
      >
        <div className="toast-content">
          <strong>{status === 'error' ? 'Error' : 'Success'}</strong>
          <span className="toast-message">{messageText}</span>
        </div>

        <button type="button" className="toast-close" aria-label="Dismiss notification" onClick={dismissToast}>
          ×
        </button>
      </div>
    </div>
  );
};

export default Contact;
