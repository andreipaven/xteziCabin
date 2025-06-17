const validator = require("validator");
const { parsePhoneNumberFromString } = require("libphonenumber-js");

class Booking {
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
    this.#firstName = firstName?.trim();
    this.#lastName = lastName?.trim();
    this.#email = email?.trim();
    this.#phone = phone?.trim();
    this.#startDate = new Date(startDate);
    this.#endDate = new Date(endDate);
    this.#numberPeoples = Number(numberPeoples);
    this.#price = Number(price);
    this.#status = status?.trim() || "pending";
  }

  // Getters
  get firstName() {
    return this.#firstName;
  }

  get lastName() {
    return this.#lastName;
  }

  get email() {
    return this.#email;
  }

  get phone() {
    return this.#phone;
  }

  get startDate() {
    return this.#startDate;
  }

  get endDate() {
    return this.#endDate;
  }

  get numberPeoples() {
    return this.#numberPeoples;
  }

  get price() {
    return this.#price;
  }

  get status() {
    return this.#status;
  }

  // Validations
  validateFirstName() {
    if (!this.#firstName) {
      return { valid: false, error: "Prenumele este obligatoriu." };
    }
    if (this.#firstName.length < 2) {
      return { valid: false, error: "Prenumele este prea scurt." };
    }
    return { valid: true, error: null };
  }

  validateLastName() {
    if (!this.#lastName) {
      return { valid: false, error: "Numele este obligatoriu." };
    }
    if (this.#lastName.length < 2) {
      return { valid: false, error: "Numele este prea scurt." };
    }
    return { valid: true, error: null };
  }

  validateEmail() {
    if (!this.#email || !validator.isEmail(this.#email)) {
      return { valid: false, error: "Email invalid." };
    }
    return { valid: true, error: null };
  }

  validatePhoneNumber() {
    if (!this.#phone) {
      return { valid: false, error: "Numărul de telefon este obligatoriu." };
    }
    const phone = parsePhoneNumberFromString(this.#phone);
    if (!phone || !phone.isValid()) {
      return { valid: false, error: "Număr de telefon invalid." };
    }
    return { valid: true, error: null };
  }

  validateDates() {
    if (!(this.#startDate instanceof Date) || isNaN(this.#startDate)) {
      return { valid: false, error: "Data de început este invalidă." };
    }
    if (!(this.#endDate instanceof Date) || isNaN(this.#endDate)) {
      return { valid: false, error: "Data de sfârșit este invalidă." };
    }
    if (this.#startDate >= this.#endDate) {
      return {
        valid: false,
        error: "Data de început trebuie să fie înaintea celei de sfârșit.",
      };
    }
    return { valid: true, error: null };
  }

  validateNumberPeoples() {
    if (
      !Number.isInteger(this.#numberPeoples) ||
      this.#numberPeoples <= 0 ||
      this.#numberPeoples > 100
    ) {
      return {
        valid: false,
        error: "Numărul de persoane trebuie să fie între 1 și 100.",
      };
    }
    return { valid: true, error: null };
  }

  validatePrice() {
    if (isNaN(this.#price) || this.#price <= 0) {
      return { valid: false, error: "Preț invalid." };
    }
    return { valid: true, error: null };
  }

  isValid() {
    const validations = [
      this.validateFirstName(),
      this.validateLastName(),
      this.validateEmail(),
      this.validatePhoneNumber(),
      this.validateDates(),
      this.validateNumberPeoples(),
      this.validatePrice(),
    ];

    const allValid = validations.every((v) => v.valid);
    return {
      valid: allValid,
      errors: validations.filter((v) => !v.valid).map((v) => v.error),
    };
  }

  toJSON() {
    return {
      firstName: this.#firstName,
      lastName: this.#lastName,
      email: this.#email,
      phone: this.#phone,
      startDate: this.#startDate.toISOString().split("T")[0],
      endDate: this.#endDate.toISOString().split("T")[0],
      numberPeoples: this.#numberPeoples,
      price: this.#price,
      status: this.#status,
    };
  }
}

module.exports = Booking;
