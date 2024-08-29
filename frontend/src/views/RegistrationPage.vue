<template>
  <div class="form-container">
    <h1>Register Page</h1>
    <p>Please register by filling out the form below.</p>
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
        <!-- Husband's First Name and Last Name -->
        <div class="fields-container">
          <div class="form-field half-width">
            <label for="husband-first-name">Husband's First Name:</label>
            <input type="text" id="husband-first-name" v-model="husbandFirstName" required />
          </div>

          <div class="form-field half-width">
            <label for="husband-last-name">Husband's Last Name:</label>
            <input type="text" id="husband-last-name" v-model="husbandLastName" required />
          </div>
        </div>

        <!-- Wife's First Name and Last Name -->
        <div class="fields-container">
          <div class="form-field half-width">
            <label for="wife-first-name">Wife's First Name:</label>
            <input type="text" id="wife-first-name" v-model="wifeFirstName" required />
          </div>

          <div class="form-field half-width">
            <label for="wife-last-name">Wife's Last Name:</label>
            <input type="text" id="wife-last-name" v-model="wifeLastName" required />
          </div>
        </div>
      </div>

      <div v-else>
        <!-- Single, Servant, or Handmaid First Name and Last Name -->
        <div class="fields-container">
          <div class="form-field half-width">
            <label for="first-name">First Name:</label>
            <input type="text" id="first-name" v-model="firstName" required />
          </div>

          <div class="form-field half-width">
            <label for="last-name">Last Name:</label>
            <input type="text" id="last-name" v-model="lastName" required />
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <button type="submit" :disabled="loading || !isFormValid">Submit</button>

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
      husbandFirstName: '',
      husbandLastName: '',
      wifeFirstName: '',
      wifeLastName: '',
      loading: false,
      message: '',
      messageType: ''
    };
  },
  computed: {
    isFormValid() {
      // Basic validation for the 'Couple' ministry
      if (this.ministry === 'Couple') {
        return this.husbandFirstName && this.husbandLastName && this.wifeFirstName && this.wifeLastName;
      }
      // Validation for other ministries
      return this.firstName && this.lastName;
    }
  },
  methods: {
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
          await this.submitIndividual('Husband', this.husbandFirstName, this.husbandLastName);
          await this.submitIndividual('Wife', this.wifeFirstName, this.wifeLastName);
        } else {
          await axios.post('http://localhost:3000/submit', {
            firstName: this.firstName,
            lastName: this.lastName,
            chapter: this.chapter,
            ministry: this.ministry,
          });
        }

        this.message = 'Registration Success!';
        this.messageType = 'success-message';
      } catch (error) {
        this.message = 'Error submitting form. Please try again.';
        this.messageType = 'error-message';
      } finally {
        this.loading = false;
      }
    },

    async submitIndividual(role, firstName, lastName) {
      await axios.post('http://localhost:3000/submit', {
        firstName,
        lastName,
        chapter: this.chapter,
        ministry: this.ministry,
        role,
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
  margin-bottom: 1.5rem; /* Add margin to create more space between fields */
}

.fields-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem; /* Increase the gap between fields */
  justify-content: center;
  width: 100%;
}

.half-width {
  flex: 1 1 45%;
  max-width: 325px; /* Set a maximum width for the input boxes */
}

.form-field label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.form-field input, .form-field select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  font-size: 1rem;
  color: #333;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-field input:focus, .form-field select:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  outline: none;
}

button {
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 2rem;
}

button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  margin-top: 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.success-message {
  color: #28a745;
  margin-top: 1rem;
  font-size: 1rem;
}

.error-message {
  color: #dc3545;
  margin-top: 1rem;
  font-size: 1rem;
}

</style>