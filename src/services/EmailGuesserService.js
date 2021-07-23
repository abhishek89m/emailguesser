import axios from '../utils/axios';
import { Serialize } from '../utils/request';

export class EmailGuesserService {
  emailAddress = null;

  errors = null;

  /**
   * Calls the email guesser api and returns boolean for success
   *
   * @param {Object} payload 
   * @returns {Boolean}
   */
  async guessEmail(payload) {
    try {
      const {
        data: { emailAddress },
      } = await axios.get(`/guess?${Serialize(payload)}`);

      this.emailAddress = emailAddress;

      return true;
    } catch (e) {
      const { response: { data: { errors } } } = e;

      if (errors) {
        this.errors = errors;
      } else {
        this.errors = e;
      }
    }

    return false;
  }
}
