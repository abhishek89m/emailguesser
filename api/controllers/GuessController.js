const helper = require('../helpers/EmailGuesserHelper');

function Validator() {
  this.errors = {};

  this.required = (attribute, value) => {
    if (value) {
      return this;
    }

    this.errors[attribute] = `${attribute} cannot be empty`;

    return this;
  }

  this.alphabetic = (attribute, value) => {
    if (/^[a-zA-Z]+$/.test(value)) {
      return this;
    }

    this.errors[attribute] = `${attribute} can only be alphabetic`;

    return this;
  }

  this.domain = (attribute, value) => {
    if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(value)) {
      return this;
    }

    this.errors[attribute] = `${attribute} can only be a domain string`;

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
    .required('firstName', firstName)
    .required('lastName', lastName)
    .required('domain', domain)
    .alphabetic('firstName', firstName)
    .alphabetic('lastName', lastName)
    .domain('domain', domain);

  if (Object.keys(validator.errors || {}).length) {
    res.status(422).json({ errors: validator.errors });
    return;
  }

  res.json({
    emailAddress: helper.getEmailAddress({ firstName, lastName, domain }),
  });
};
