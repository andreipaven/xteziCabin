import validator from "validator";
import {
  isValidPhoneNumber,
  isPossiblePhoneNumber,
} from "react-phone-number-input";

class Rental {
  #idBooking;
  #firstName;
  #lastName;
  #email;
  #phone;
  #startDate;
  #endDate;
  #numberPeoples;
  #price;
  #status;

  constructor({
    firstName,
    lastName,
    email,
    phone,
    startDate,
    endDate,
    numberPeoples,
    price,
    status,
  }) {
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#email = email;
    this.#phone = phone;
    this.#startDate = startDate;
    this.#endDate = endDate;
    this.#numberPeoples = numberPeoples;
    this.#price = price;
    this.#status = status;
  }
  //getters and setters
  get idBooking() {
    return this.#idBooking;
  }

  get firstName() {
    return this.#firstName;
  }
  set firstName(value) {
    this.#firstName = value;
  }

  get lastName() {
    return this.#lastName;
  }
  set lastName(value) {
    this.#lastName = value;
  }

  get email() {
    return this.#email;
  }
  set email(value) {
    this.#email = value;
  }

  get phone() {
    return this.#phone;
  }
  set phone(value) {
    this.#phone = value;
  }

  get startDate() {
    return this.#startDate;
  }
  set startDate(value) {
    this.#startDate = value;
  }

  get endDate() {
    return this.#endDate;
  }
  set endDate(value) {
    this.#endDate = value;
  }

  get numberPeoples() {
    return this.#numberPeoples;
  }
  set numberPeoples(value) {
    this.#numberPeoples = value;
  }

  get price() {
    return this.#price;
  }
  set price(value) {
    this.#price = value;
  }

  get status() {
    return this.#status;
  }
  set status(value) {
    this.#status = value;
  }

  //validations
  validateEmail() {
    return validator.isEmail(this.#email);
  }

  validateFirstName() {
    if (!this.#firstName || this.#firstName.trim() === "") {
      return { valid: false, error: "Prenumele este obligatoriu." };
    }
    return { valid: true, error: null };
  }
  validateLastName() {
    if (!this.#lastName || this.#lastName.trim() === "") {
      return { valid: false, error: "Numele este obligatoriu." };
    }
    return { valid: true, error: null };
  }

  validatePhoneNumber() {
    if (!this.#phone) {
      return { valid: false, error: "Numărul de telefon este obligatoriu." };
    }
    if (!isValidPhoneNumber(this.#phone)) {
      return { valid: false, error: "Număr de telefon invalid." };
    }
    if (!isPossiblePhoneNumber(this.#phone)) {
      return {
        valid: false,
        error: "Numărul nu pare valid (lungime incorectă sau prefix greșit).",
      };
    }

    return { valid: true, error: null };
  }

  validateDates() {
    if (!(this.#startDate instanceof Date) || isNaN(this.#startDate)) {
      return false;
    }

    if (!(this.#endDate instanceof Date) || isNaN(this.#endDate)) {
      return false;
    }

    return this.#startDate < this.#endDate;
  }

  validateNumberPeoples() {
    return Number.isInteger(this.#numberPeoples) && this.#numberPeoples > 0;
  }

  isValid() {
    const emailValid = this.validateEmail();
    const phoneValidation = this.validatePhoneNumber();
    const datesValid = this.validateDates();
    const peoplesValid = this.validateNumberPeoples();
    return emailValid && phoneValidation.valid && datesValid && peoplesValid;
  }
}
export default Rental;
