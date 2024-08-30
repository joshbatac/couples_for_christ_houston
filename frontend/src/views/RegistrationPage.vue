<template>
  <div class="form-container">
    <h1>2024 CFC Christmas Celebration!</h1>
    <p>NOTE: Participants over 18 must submit their own form.</p>
    <form @submit.prevent="submitForm">
      <!-- Fields Container for Chapter/Area and Ministry -->
      <div class="fields-container">
        <!-- Chapter/Area Field -->
        <div class="form-field half-width">
          <label for="chapter">Chapter/Area:</label>
          <select id="chapter" v-model="chapter" required>
            <option value="Austin">Austin</option>
            <option value="Dallas">Dallas</option>
            <option value="Houston">Houston</option>
          </select>
        </div>

        <!-- Ministry Field -->
        <div class="form-field half-width">
          <label for="ministry">Ministry:</label>
          <select id="ministry" v-model="ministry" required>
            <option value="Single">Single</option>
            <option value="Couple">Couple</option>
            <option value="Servant">Servant</option>
            <option value="Handmaid">Handmaid</option>
          </select>
        </div>
      </div>

      <!-- Conditional First Name and Last Name Fields -->
      <div v-if="ministry === 'Couple'" class="couple-fields">
        <h2>Husband Information:</h2>
        <div class="fields-container">
          <div class="form-field half-width">
            <label for="first-name">First Name:</label>
            <input type="text" id="first-name" v-model="firstName" required />
          </div>

          <div class="form-field half-width">
            <label for="last-name">Last Name:</label>
            <input type="text" id="last-name" v-model="lastName" required />
          </div>

          <div class="form-field half-width">
            <label for="email">Email:</label>
            <input type="text" id="email" v-model="email" required />
          </div>
          
          <div class="form-field half-width">
            <label for="phoneNumber">Phone Number:</label>
            <input type="text" id="phoneNumber" @input="validatePhoneNumber" v-model="phoneNumber" minlength="10" maxlength="10" required />
          </div>
          
        </div>


        <br>
        <h2>Wife Information:</h2>
        <div class="fields-container">
          <div class="form-field half-width">
            <label for="wife-first-name">First Name:</label>
            <input type="text" id="wife-first-name" v-model="wifeFirstName" required />
          </div>

          <div class="form-field half-width">
            <label for="wife-last-name">Last Name:</label>
            <input type="text" id="wife-last-name" v-model="wifeLastName" required />
          </div>

          <div class="form-field half-width">
            <label for="wife-email">Email:</label>
            <input type="text" id="wife-email" v-model="wifeEmail" required />
          </div>
          
          <div class="form-field half-width">
            <label for="wife-phoneNumber">Phone Number:</label>
            <input type="tel" id="wife-phoneNumber" v-model="wifePhoneNumber"  @input="validatePhoneNumber" minlength="10" maxlength="10" required />
          </div>
        </div>
      </div>

      <div v-else>
        <h2>Personal Information:</h2>
        <div class="fields-container">
          <div class="form-field half-width">
            <label for="first-name">First Name:</label>
            <input type="text" id="first-name" v-model="firstName" required />
          </div>

          <div class="form-field half-width">
            <label for="last-name">Last Name:</label>
            <input type="text" id="last-name" v-model="lastName" required />
          </div>

          <div class="form-field half-width">
            <label for="email">Email:</label>
            <input type="text" id="email" v-model="email" required />
          </div>
          
          <div class="form-field half-width">
            <label for="phoneNumber">Phone Number:</label>
            <input type="text" id="phoneNumber" @input="validatePhoneNumber" v-model="phoneNumber" minlength="10" maxlength="10" required />
          </div>
        </div>
      </div>

 
      <!-- Submit Button -->
      <button type="submit" :disabled="loading || !isFormValid" >Submit</button>

      <!-- Loading Spinner -->
      <div v-if="loading" class="loading-spinner"></div>

      <!-- Success/Failure Messages -->
      <div v-if="message" :class="messageType">{{ message }}</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegistrationPage',
  data() {
    return {
      chapter: 'Houston',
      ministry: 'Single',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      wifeFirstName: '',
      wifeLastName: '',
      wifeEmail: '',
      wifePhoneNumber: '',
      loading: false,
      message: '',
      messageType: ''
    };
  },
  computed: {
    isFormValid() {
      if (this.ministry === 'Couple') { return this.firstName && this.lastName && this.wifeFirstName && this.wifeLastName; }
      return this.firstName && this.lastName;
    }
  },
  methods: {
    validatePhoneNumber() {
      this.phoneNumber = this.phoneNumber.replace(/\D/g, '').slice(0, 10);
  },
    async submitForm() {
      if (!this.isFormValid) {
        this.message = 'Please fill out all required fields.';
        this.messageType = 'error-message';
        return;
      }

      this.loading = true;
      this.message = '';
      this.messageType = '';

      try {
        if (this.ministry === 'Couple') {
          await this.submitIndividual(this.wifeFirstName, this.wifeLastName, this.ministry,  this.wifeEmail, this.wifePhoneNumber); //insert wife data
        }
          await this.submitIndividual(this.firstName, this.lastName, this.ministry,  this.email, this.phoneNumber); //husband data if couple, otherwise personal info

        this.message = 'Registration Success!';
        this.messageType = 'success-message';
      } catch (error) {
        this.message = 'Error submitting form. Please try again.';
        this.messageType = 'error-message';
      } finally {
        this.loading = false;
      }
    },
    async submitIndividual(firstName, lastName, ministry, email, phoneNumber) {
      await axios.post('https://cfc-backend-246d6d84ddbc.herokuapp.com/submit', {
        firstName,
        lastName,
        chapter: this.chapter, //chapter is the same for everyone in form
        ministry,
        email,
        phoneNumber
      });
    },
  },
};
</script>

<style scoped>
.form-container {
  max-width: 75%;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
}

p {
  font-size: 1.125rem;
  color: #666;
  margin-bottom: 2rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1.5rem;
}

.fields-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  width: 100%;
}

.half-width {
  flex: 1 1 45%;
  max-width: 325px;
}

.form-field label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.form-field input,
.form-field select {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.radio-container {
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.radio-buttons {
  display: flex;
  gap: 1rem;
}

.radio-buttons label {
  font-weight: 400;
  font-size: 0.9rem;
  color: #333;
}

button[type='submit'] {
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.125rem;
  cursor: pointer;
}

button[type='submit']:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.add-member-button,
.remove-member-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
}

.remove-member-button {
  background-color: #dc3545;
}

.add-member-button:hover,
.remove-member-button:hover {
  opacity: 0.8;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.message {
  font-size: 1rem;
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
  width: 100%;
  text-align: center;
}

.message.success {
  background-color: #28a745;
  color: white;
}

.message.error {
  background-color: #dc3545;
  color: white;
}
</style>