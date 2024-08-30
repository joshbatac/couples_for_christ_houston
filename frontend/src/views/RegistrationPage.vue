<template>
  <div class="form-container">
    <h1>2024 CFC Christmas Celebration!</h1>
    <p>NOTE: Participants over 18 must submit their own form.</p>
    <form @submit.prevent="submitForm">
      <!-- Fields Container for Chapter/Area and Ministry -->
      <div class="fields-container">
        <!-- Chapter/Area Field -->
        <div class="form-field half-width">
          <label for="chapter">CFC South Texas Unit</label>
          <select id="chapter" v-model="chapter" required>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="Southwest">Southwest</option>
            <option value="West">West</option>
            <option value="Austin">Austin</option>
            <option value="San Antonio">San Antonio</option>
            <option value="Guest">Guest</option>
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
            <option value="Guest">Guest</option>
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

      <h2><button type="button" class="add-member-button" @click="addPartyGuest">Add Party Guest</button>
      </h2>
<div v-for="(guest, index) in partyGuests" :key="index" class="guest-fields-container">
  <div class="fields-container">
    <div class="form-field half-width">
      <label :for="'guest-first-name-' + index">First Name:</label>
      <input type="text" :id="'guest-first-name-' + index" v-model="guest.firstName" required />
    </div>

    <div class="form-field half-width">
      <label :for="'guest-last-name-' + index">Last Name:</label>
      <input type="text" :id="'guest-last-name-' + index" v-model="guest.lastName" required />
    </div>
  </div>
  
  <div class="form-field">
    <label>Ministry:</label>
    <div class="radio-buttons">
      <label>
        <input type="radio" :name="'category-' + index" value="Youth" v-model="guest.category" />
        Youth
      </label>
      <label>
        <input type="radio" :name="'category-' + index" value="Kids" v-model="guest.category" />
        Kids
      </label>
      <label>
        <input type="radio" :name="'category-' + index" value="Guest" v-model="guest.category" />
        Guest
      </label>
    </div>
    <button type="button" class="remove-member-button" @click="removePartyGuest(index)">Remove Guest</button>
<hr>
  </div>
  
  <hr>
</div>



 
<div class="submit-container">
  <!-- Submit Button -->
  <button type="submit" :disabled="loading || !isFormValid">Submit</button>

  <!-- Loading Spinner -->
  <div v-if="loading" class="loading-spinner"></div>
</div>

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
      partyGuests: [],
      loading: false,
      message: '',
      messageType: ''
    };
  }, 
  watch: {
    ministry() {
      this.clearFields();
    }
  },
  computed: {
    isFormValid() {
      if (this.ministry === 'Couple') { return this.wifeFirstName && this.wifeLastName && this.wifeEmail && this.wifePhoneNumber && this.firstName && this.lastName && this.email && this.phoneNumber; }
      return this.firstName && this.lastName && this.email && this.phoneNumber;
    }
  },
  methods: {
    clearFields() {
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.phoneNumber = '';
      this.wifeFirstName = '';
      this.wifeLastName = '';
      this.wifeEmail = '';
      this.wifePhoneNumber = '';
      this.partyGuests = [];
    },
    validatePhoneNumber() {
      this.phoneNumber = this.phoneNumber.replace(/\D/g, '').slice(0, 10);
  },
  addPartyGuest() {
    this.partyGuests.push({
      firstName: '',
      lastName: '',
      category: 'Guest',
    });
  },
  removePartyGuest(index) {
    this.partyGuests.splice(index, 1);
  },
    async submitForm() {
      if (!this.isFormValid) {
        this.messageType = 'error-message';
        this.message = 'Please fill out all required fields.';
        return;
      }

      this.loading = true;
      this.message = '';
      this.messageType = '';

      try {
        if (this.ministry === 'Couple') {
          await this.submitIndividual(this.firstName, this.lastName, this.ministry,  this.email, this.phoneNumber, "Husband of " + this.wifeFirstName); //husband data if couple, otherwise personal info
          await this.submitIndividual(this.wifeFirstName, this.wifeLastName, this.ministry,  this.wifeEmail, this.wifePhoneNumber, "Wife of " + this.firstName); //insert wife data
        } else {
          await this.submitIndividual(this.firstName, this.lastName, this.ministry,  this.email, this.phoneNumber, "N/A"); //husband data if couple, otherwise personal info
        }

        for (const guest of this.partyGuests) {
          await this.submitIndividual(guest.firstName, guest.lastName, guest.category, 'N/A', 'N/A', "Guest of " + this.firstName + " " + this.lastName);
        }

        this.messageType = 'success-message';
        this.message = 'Registration Success! Redirecting to news...';
        setTimeout(() => {
          this.$router.push('/news');
        }, 3000);

      } catch (error) {
        this.messageType = 'error-message';
        this.message = 'Error submitting form. Please try again.';
      } finally {
        this.loading = false;
      }
    },
    async submitIndividual(firstName, lastName, ministry, email, phoneNumber,relation) {
      const currentDate = new Date().toISOString().split('T')[0];
      await axios.post('https://cfc-backend-246d6d84ddbc.herokuapp.com/submit', {
        firstName,
        lastName,
        chapter: this.chapter, //chapter is the same for everyone in form
        ministry,
        email,
        phoneNumber,
        date: currentDate,
        relation
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
  width: 25%;
}

.add-member-button:hover,
.remove-member-button:hover {
  opacity: 0.8;
}
.submit-container {
  display: flex;
  align-items: center; /* Align items vertically centered */
  gap: 1rem; /* Optional: Adds space between the button and spinner */
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