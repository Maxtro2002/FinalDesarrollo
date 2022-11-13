const { createHash } = require("../controllers/bcrypt");

class Users {
  constructor({
    userID,
    email,
    password,
    document,
    role,
    specialty,
    fullName,
    generalInformation,
  }) {
    this.userID = userID;
    this.email = email;
    this.password = password;
    this.document = document;
    this.role = role;
    this.specialty = specialty;
    this.fullName = fullName;
    this.generalInformation = generalInformation;
  }

  initUser() {
    const password = createHash(this.password);
    return {
      userID: this.userID,
      email: this.email,
      password: this.password,
      document: this.document,
      role: this.role,
      specialty: this.specialties,
      fullName: this.fullName,
      generalInformation: this.generalInformation,
    };
  }

  static removePassword(users) {
    return users.map((user) => {
      delete user.password;
      return user;
    });
  }
}

module.exports = Users;
