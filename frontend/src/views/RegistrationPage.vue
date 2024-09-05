<template>
  <div class="form-container">  
    <h1>2024 CFC Christmas Party RSVP</h1>
    <p>NOTE: Participants over 18 must submit their own form.</p>
    <form @submit.prevent="submitForm">
      <!-- Fields Container for Chapter/Area and Ministry -->
      <div class="fields-container">
        <!-- Chapter/Area Field -->
        <div class="form-field large-width">
          <label for="chapter">CFC South Texas Unit</label>
          <select id="chapter" v-model="chapter" required>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="Southwest">Southwest</option>
            <option value="West">West</option>
            <option value="Austin">Austin</option>
            <option value="San Antonio">San Antonio</option>
          </select>
        </div>

        <!-- Ministry Field -->
        <div class="form-field large-width">
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
          <div class="form-field small-width">
            <label for="first-name">First Name:</label>
            <input type="text" id="first-name" v-model="firstName" required />
          </div>

          <div class="form-field small-width">
            <label for="last-name">Last Name:</label>
            <input type="text" id="last-name" v-model="lastName" required />
          </div>

          <div class="form-field small-width">
            <label for="email">Email:</label>
            <input type="text" id="email" v-model="email" required />
          </div>
          
          <div class="form-field small-width">
            <label for="phoneNumber">Phone Number:</label>
            <input type="text" id="phoneNumber" @input="validatePhoneNumber" v-model="phoneNumber" minlength="10" maxlength="10" required />
          </div>
        </div>

        <br>
        <h2>Wife Information:</h2>
        <div class="fields-container">
          <div class="form-field small-width">
            <label for="wife-first-name">First Name:</label>
            <input type="text" id="wife-first-name" v-model="wifeFirstName" required />
          </div>

          <div class="form-field small-width">
            <label for="wife-last-name">Last Name:</label>
            <input type="text" id="wife-last-name" v-model="wifeLastName" required />
          </div>

          <div class="form-field small-width">
            <label for="wife-email">Email:</label>
            <input type="text" id="wife-email" v-model="wifeEmail" required />
          </div>
          
          <div class="form-field small-width">
            <label for="wife-phoneNumber">Phone Number:</label>
            <input type="tel" id="wife-phoneNumber" v-model="wifePhoneNumber" @input="validatePhoneNumber" minlength="10" maxlength="10" required />
          </div>
        </div>
      </div>

      <div v-else>
        <h2>Personal Information:</h2>
        <div class="fields-container">
          <div class="form-field small-width">
            <label for="first-name">First Name:</label>
            <input type="text" id="first-name" v-model="firstName" required />
          </div>

          <div class="form-field small-width">
            <label for="last-name">Last Name:</label>
            <input type="text" id="last-name" v-model="lastName" required />
          </div>

          <div class="form-field small-width">
            <label for="email">Email:</label>
            <input type="text" id="email" v-model="email" required />
          </div>
          
          <div class="form-field small-width">
            <label for="phoneNumber">Phone Number:</label>
            <input type="text" id="phoneNumber" @input="validatePhoneNumber" v-model="phoneNumber" minlength="10" maxlength="10" required />
          </div>
        </div>
      </div>

      <h2><button type="button" class="add-member-button" @click="addPartyGuest">Add Party Guest</button></h2>

      <div v-for="(guest, index) in partyGuests" :key="index" class="guest-fields-container">
        <div class="fields-container">
          <div class="form-field small-width">
            <label :for="'guest-first-name-' + index">First Name:</label>
            <input type="text" :id="'guest-first-name-' + index" v-model="guest.firstName" required />
          </div>

          <div class="form-field small-width">
            <label :for="'guest-last-name-' + index">Last Name:</label>
            <input type="text" :id="'guest-last-name-' + index" v-model="guest.lastName" required />
          </div>

          <div class="form-field narrow-width">
            <label :for="'guest-age' + index">Age:</label>
            <input 
              type="number" 
              :id="'guest-age' + index" 
              v-model="guest.age" 
              min="1" 
              max="17" 
              required 
            />
          </div>
        </div>

        <div class="form-field ">
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
        </div>

      </div>



      <div class="submit-container">
  <div class="submit-button-wrapper">
    <button type="submit" :disabled="loading || !isFormValid">Submit</button>
    <div v-if="loading" class="loading-spinner"></div>
  </div>
</div>

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
      age: '',
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
          await this.submitIndividual(this.firstName, this.lastName, this.ministry,  this.email, this.phoneNumber, "Husband of " + this.wifeFirstName + 
        " " + this.wifeLastName, 'Adult'); //husband data if couple, otherwise personal info
          await this.submitIndividual(this.wifeFirstName, this.wifeLastName, this.ministry,  this.wifeEmail, this.wifePhoneNumber, "Wife of " + this.firstName + " " + this.lastName,  'Adult'); //insert wife data
        } else {
          await this.submitIndividual(this.firstName, this.lastName, this.ministry,  this.email, this.phoneNumber, "N/A", 'Adult'); //husband data if couple, otherwise personal info
        }

        for (const guest of this.partyGuests) {
          await this.submitIndividual(guest.firstName, guest.lastName, guest.category, 'N/A', 'N/A', "Guest of " + this.firstName + " " + this.lastName, guest.age);
        }

        this.messageType = 'success-message';
        this.message = 'Registration Success!';

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
    async submitIndividual(firstName, lastName, ministry, email, phoneNumber, relation, age) {
      const currentDate = new Date().toISOString().split('T')[0];
      await axios.post('https://cfc-backend-246d6d84ddbc.herokuapp.com/submit', {
        firstName,
        lastName,
        chapter: this.chapter, //chapter is the same for everyone in form
        ministry,
        email,
        phoneNumber,
        date: currentDate,
        relation,
        age
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
  background-image: url('../assets/christmas-banner-2.png');
  background-size: contain; /* Keeps the image the same size */
  background-position: center top;
  background-repeat: no-repeat;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8); /* Optional: adds a white overlay to soften the background */
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: black;
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

.large-width {
  flex: 1 1 60%;
  max-width: 400px;
}

.small-width {
  flex: 1 1 30%;
  max-width: 200px;
}

.narrow-width {
  flex: 1 1 20%;
  max-width: 100px;
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
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: block;
  margin: 2rem auto 0;
}

button[type='submit']:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

button[type='submit']:hover:enabled {
  background-color: #0056b3;
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 4px solid #ccc;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.add-member-button {
  padding: 0.75rem 1.5rem;
  background-color: #28a745;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
  display: block;
  margin: 0 auto;
}

.add-member-button:hover {
  background-color: #218838;
}

.remove-member-button {
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: white;
  font-size: 0.875rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background-color 0.3s ease;
  width: 26%;
  align-self: center;
}

.remove-member-button:hover {
  background-color: #c82333;
}

.guest-fields-container {
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.guest-fields-container:not(:last-child) {
  margin-bottom: 1.5rem;
}

.submit-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
}

.submit-button-wrapper {
  position: relative;
}

.message {
  margin-top: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
  text-align: center;
}

.success-message {
  color: #28a745;
}

.error-message {
  color: #dc3545;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>