const helper = require('../helpers/EmailGuesserHelper');

function Validator() {
  this.errors = {};

  this.required = (attribute, label, value) => {
    if (value) {
      return this;
    }

    this.errors[attribute] = `${label} cannot be empty`;

    return this;
  }

  this.alphabetic = (attribute, label, value) => {
    if (/^[a-zA-Z]+$/.test(value)) {
      return this;
    }

    this.errors[attribute] = `${label} can only be alphabetic`;

    return this;
  };

  this.domain = (attribute, label, value) => {
    if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(value)) {
      return this;
    }

    this.errors[attribute] = `${label} can only be a domain string`;

    return this;
  }
};


exports.guessEmail = function (req, res) {
  let { firstName, lastName, domain } = req.query;

  firstName = firstName.trim().toLowerCase();
  lastName = lastName.trim().toLowerCase();
  domain = domain.trim().toLowerCase();

  const validator = new Validator();
 
  validator
    .required('firstName', 'First name', firstName)
    .required('lastName', 'Last name', lastName)
    .required('domain', 'Domain', domain)
    .alphabetic('firstName', 'First name', firstName)
    .alphabetic('lastName', 'Last name', lastName)
    .domain('domain', 'Domain', domain);

  if (Object.keys(validator.errors || {}).length) {
    res.status(422).json({ errors: validator.errors });
    return;
  }

  res.json({
    emailAddress: helper.getEmailAddress({ firstName, lastName, domain }),
  });
};
