import React from 'react';
import './App.css';
import { EmailGuesserService } from './services/EmailGuesserService';

const Field = React.forwardRef(({ label, placeholder }, ref) => {
  return (
    <div className="field-container">
      <label className="field-label">{label}</label>
      <input
        ref={ref}
        type="text"
        className="field-input"
        placeholder={placeholder}
      />
    </div>
  );
});

function App() {
  const firstNameRef = React.useRef();
  const lastNameRef = React.useRef();
  const domainRef = React.useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const domain = domainRef.current.value;

    const service = new EmailGuesserService();
    const success = await service.guessEmail({ firstName, lastName, domain });

    if (!success) {
      // Showing errors in console. This is to be shown in screen.
      console.error(service.errors);
    }

    console.log(service.emailAddress);
  };

  return (
    <div className="email-guesser-app">
      <header>
        <h1 className="app-title">EMAIL GUESSER</h1>
      </header>
      <main>
        <form className="guess-form" onSubmit={handleSubmit}>
          <Field
            ref={firstNameRef}
            label="FIRST NAME"
            placeholder="Enter first name" />

          <Field
            ref={lastNameRef}
            label="LAST NAME"
            placeholder="Enter last name" />

          <Field
            ref={domainRef} 
            label="DOMAIN" 
            placeholder="Enter domain" />

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
