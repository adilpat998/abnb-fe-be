import { useState, useEffect, useRef } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';
import { useCallback } from 'react';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { closeModal } = useModal();
  const modalRef = useRef(null);

  const handleClickOutside = useCallback((e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  }, [closeModal]);
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
  

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors({});
  setIsSubmitting(true);

  try {
    await dispatch(sessionActions.login({ credential, password }));
    closeModal();
  } catch (res) {
    if (res.status === 401) {  // Unauthorized - Invalid credentials
      const data = await res.json();
      if (data && data.errors) {
        setErrors({ general: data.errors.message || 'Invalid credentials. Please try again.' });
      }
    } else {
      setErrors({ general: 'An unexpected error occurred. Please try again later.' });
    }
  } finally {
    setIsSubmitting(false);
  }
};


  const handleDemoLogin = async () => {
    setIsSubmitting(true);
    try {
      await dispatch(sessionActions.login({ 
        credential: 'demouser@demo.com', 
        password: 'thisisademo' 
      }));
      closeModal();
    } catch (res) {
    
      setErrors({ general: "Demo login failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username or Email
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.credential && <p className="error-message">{errors.credential}</p>}
          {errors.general && <p className="error-message">{errors.general}</p>}
          <button
            type="submit"
            className="modal-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging In..." : "Log In"}
          </button>
          <button
            type="button"
            className="modal-button demo-button"
            onClick={handleDemoLogin}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging In..." : "Demo User"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;
