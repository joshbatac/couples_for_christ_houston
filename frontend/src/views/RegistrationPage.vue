<template>
  <div class="container">
    <h1 class="center-align">2024 CFC Christmas Party RSVP</h1>
    <p class="center-align">NOTE: Participants over 18 must submit their own form.</p>
    <form @submit.prevent="submitForm" class="col s12">
      <!-- Fields Container for Chapter/Area and Ministry -->
      <div class="row">
        <!-- Chapter/Area Field -->
        <div class="input-field col s12 m6">
          <select id="chapter" v-model="chapter" required>
            <option value="" disabled>Select Chapter/Area</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="Southwest">Southwest</option>
            <option value="West">West</option>
            <option value="Austin">Austin</option>
            <option value="San Antonio">San Antonio</option>
            <option value="Guest">Guest</option>
          </select>
          <label for="chapter">CFC South Texas Unit</label>
        </div>

        <!-- Ministry Field -->
        <div class="input-field col s12 m6">
          <select id="ministry" v-model="ministry" required>
            <option value="" disabled>Select Ministry</option>
            <option value="Single">Single for Christ</option>
            <option value="Youth">Youth for Christ</option>
            <option value="Couple">Couples for Christ </option>
            <option value="Servant">Servant of the Lord</option>
            <option value="Handmaid">Handmaid of the Lord</option>
            <option value="Guest">Guest</option>
          </select>
          <label for="ministry">Ministry:</label>
        </div>
      </div>

      <div class="input-field col s12 m6">
          <input type="text" id="household-leader" v-model="householdLeader" required />
          <label for="household-leader">Household Leader:</label>
      </div>

      

      <!-- Conditional First Name and Last Name Fields -->
      <div v-if="ministry === 'Couple'">
        <h2 class="center-align">Husband Information:</h2>
        <div class="row">
          <div class="input-field col s12 m6">
            <input type="text" id="first-name" v-model="firstName" required />
            <label for="first-name">First Name:</label>
          </div>

          <div class="input-field col s12 m6">
            <input type="text" id="last-name" v-model="lastName" required />
            <label for="last-name">Last Name:</label>
          </div>

          <div class="input-field col s12 m6">
            <input type="email" id="email" v-model="email" required />
            <label for="email">Email:</label>
          </div>
          
          <div class="input-field col s12 m6">
            <input type="tel" id="phoneNumber" v-model="phoneNumber" minlength="10" maxlength="10" required />
            <label for="phoneNumber">Phone Number:</label>
          </div>
        </div>

        <br>
        <h2 class="center-align">Wife Information:</h2>
        <div class="row">
          <div class="input-field col s12 m6">
            <input type="text" id="wife-first-name" v-model="wifeFirstName" required />
            <label for="wife-first-name">First Name:</label>
          </div>

          <div class="input-field col s12 m6">
            <input type="text" id="wife-last-name" v-model="wifeLastName" required />
            <label for="wife-last-name">Last Name:</label>
          </div>

          <div class="input-field col s12 m6">
            <input type="email" id="wife-email" v-model="wifeEmail" required />
            <label for="wife-email">Email:</label>
          </div>
          
          <div class="input-field col s12 m6">
            <input type="tel" id="wife-phoneNumber" v-model="wifePhoneNumber" minlength="10" maxlength="10" required />
            <label for="wife-phoneNumber">Phone Number:</label>
          </div>
        </div>
      </div>

      <div v-else>
        <h2 class="center-align">Personal Information:</h2>
        <div class="row">
          <div class="input-field col s12 m6">
            <input type="text" id="first-name" v-model="firstName" required />
            <label for="first-name">First Name:</label>
          </div>

          <div class="input-field col s12 m6">
            <input type="text" id="last-name" v-model="lastName" required />
            <label for="last-name">Last Name:</label>
          </div>

          <div class="input-field col s12 m6">
            <input type="email" id="email" v-model="email" required />
            <label for="email">Email:</label>
          </div>
          
          <div class="input-field col s12 m6">
            <input type="tel" id="phoneNumber" v-model="phoneNumber" minlength="10" maxlength="10" required />
            <label for="phoneNumber">Phone Number:</label>
          </div>
        </div>
      </div>

      <h2 class="center-align">
        <a class="waves-effect waves-light btn" @click="addPartyGuest">Add Party Guest</a>
      </h2>

      <div v-for="(guest, index) in partyGuests" :key="index" class="guest-fields-container">
        <div class="row">
          <div class="input-field col s12 m6">
            <input type="text" :id="'guest-first-name-' + index" v-model="guest.firstName" required />
            <label :for="'guest-first-name-' + index">First Name:</label>
          </div>

          <div class="input-field col s12 m6">
            <input type="text" :id="'guest-last-name-' + index" v-model="guest.lastName" required />
            <label :for="'guest-last-name-' + index">Last Name:</label>
          </div>

          <div class="input-field col s12 m6">
            <input 
              type="number" 
              :id="'guest-age' + index" 
              v-model="guest.age" 
              min="1" 
              max="17" 
              required 
            />
            <label :for="'guest-age' + index">Age:</label>
          </div>
        </div>

        <div class="input-field col s12">
          <span>Ministry:</span>
          <div class="input-field col s12">
            <p>
              <label>
                <input type="radio" :name="'category-' + index" value="Youth" v-model="guest.category" />
                <span>Youth</span>
              </label>
            </p>
            <p>
              <label>
                <input type="radio" :name="'category-' + index" value="Kids" v-model="guest.category" />
                <span>Kids</span>
              </label>
            </p>
            <p>
              <label>
                <input type="radio" :name="'category-' + index" value="Guest" v-model="guest.category" />
                <span>Guest</span>
              </label>
            </p>
          </div>
          <a class="waves-effect waves-light btn red" @click="removePartyGuest(index)">Remove Guest</a>
        </div>
      </div>

      <div class="center-align">
        <div class="submit-button-wrapper">
          <button class="waves-effect waves-light btn-large" type="submit" :disabled="loading || !isFormValid">Submit</button>
          <div v-if="loading" class="preloader-wrapper small active">
            <div class="spinner-layer spinner-blue-only">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div>
              <div class="gap-patch">
                <div class="circle"></div>
              </div>
              <div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
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
          await this.submitIndividual(this.firstName, this.lastName, this.ministry,  this.email, this.phoneNumber, "N/A", 'Adult');
        }

        for (const guest of this.partyGuests) {
          await this.submitIndividual(guest.firstName, guest.lastName, guest.category, 'N/A', 'N/A', "Guest of " + this.firstName + " " + this.lastName, guest.age);
        }

        this.messageType = 'success-message';
        this.message = 'Registration Success!';

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
.container {
  padding: 20px;
}

.guest-fields-container {
  margin-top: 20px;
}

.submit-button-wrapper {
  margin-top: 20px;
}
</style>