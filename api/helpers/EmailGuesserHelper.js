const fs = require('fs');
const path = require('path');

const rawdata = fs.readFileSync(path.resolve(__dirname, '../data/sample.json'));
const sample = JSON.parse(rawdata);

// Taking the first sample
const [[fullName, emailAddress]] = Object.entries(sample);


const [sampleFirstName, sampleLastName] = fullName.split(' ');
const [formattedName] = emailAddress.split('@');

const isFullNameFormat =
  `${sampleFirstName}${sampleLastName}` === formattedName;

exports.getEmailAddress = ({ firstName, lastName, domain }) => {
  if (isFullNameFormat) {
    return `${firstName}${lastName}@${domain}`;
  }

  return `${firstName.charAt(0)}${lastName}@${domain}`;
}
