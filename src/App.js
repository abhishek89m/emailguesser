import React, { useState } from 'react';
import './App.css';
import { EmailGuesserService } from './services/EmailGuesserService';

const Field = React.forwardRef(({ label, placeholder, disabled, value = '' }, ref) => {
  const containerClass = `field-container ${disabled ? 'disabled' : ''}`;

  return (
    <div className={containerClass}>
      <label className="field-label">{label}</label>
      <input
        ref={ref}
        type="text"
        className="field-input"
        placeholder={placeholder}
        disabled={disabled}
        defaultValue={value}
      />
    </div>
  );
});

function App() {
  const firstNameRef = React.useRef();
  const lastNameRef = React.useRef();
  const domainRef = React.useRef();

  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const domain = domainRef.current.value;

    const service = new EmailGuesserService();
    const success = await service.guessEmail({ firstName, lastName, domain });

    if (!success) {
      setError(Object.values(service.errors)[0]);
      setResult('');
      return;
    }

    setResult(service.emailAddress);
    setError('');
  };

  return (
    <div className="email-guesser-app">
      <header>
        <h1 className="app-title">EMAIL GUESSER</h1>
      </header>
      <main>
        <form className="guess-form" onSubmit={handleSubmit}>
          {error ? <div className="error-alert">{error}</div> : ''}

          <Field
            ref={firstNameRef}
            label="FIRST NAME"
            placeholder="Enter first name"
          />

          <Field
            ref={lastNameRef}
            label="LAST NAME"
            placeholder="Enter last name"
          />

          <Field ref={domainRef} label="DOMAIN" placeholder="Enter domain" />

          <Field label="Result" disabled={true} value={result} />

          <div>
            <button className="guess-form__submit-button" type="submit">
              SUBMIT
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default App;
