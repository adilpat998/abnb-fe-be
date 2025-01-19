import { useState, useEffect, useRef } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission
  const { closeModal } = useModal();
  const modalRef = useRef(null);

  // Close modal if clicked outside
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors
    setIsSubmitting(true);
  
    try {
      await dispatch(sessionActions.login({ credential, password }));
      closeModal();
    } catch (res) {
      const data = await res.json();
      console.log("Error Response:", data); // Debugging
      if (data && data.errors) {
        setErrors(data.errors); // Use the `errors` object from the backend
      } else if (data && data.message) {
        setErrors({ general: data.message }); // Fallback for general errors
      }
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
  {/* Display field-specific errors */}
  {errors.credential && <p className="error-message">{errors.credential}</p>}
  {/* Display general errors */}
  {errors.general && <p className="error-message">{errors.general}</p>}
  <button
    type="submit"
    className="modal-button"
    disabled={isSubmitting}
  >
    {isSubmitting ? "Logging In..." : "Log In"}
  </button>
</form>

      </div>
    </div>
  );
}

export default LoginFormModal;
