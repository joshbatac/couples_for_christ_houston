<template>
  <meta charset="utf-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <div class="container">
    <h3 class="center-align">2024 CFC Christmas Party Registration</h3>
    <h3 class="custom-theme"><i>Theme: Be the light of the World</i></h3>
    <p class="custom-paragraph"><strong>Date:</strong> December 7, 2024 (Saturday)</p>
      <p class="custom-paragraph"><strong>Venue:</strong> St. Bernadette Catholic Church - FLC</p>
      <p class="custom-paragraph"><strong>Address:</strong> 15500 El Camino Real, Houston, TX 77062</p>
      <p class="custom-paragraph"><strong>Deadline to RSVP:</strong> September 15, 2024</p>
      <p class="custom-paragraph"><strong>Contact:</strong> <a href="mailto:cfchouston@couplesforchristusa.org">cfchouston@couplesforchristusa.org</a></p>
      <p class ="center-align">* All attendees ages 18 and above must submit their own form *</p>
      
<form @submit.prevent="submitForm" class="col s12">
  <h6>Chapter & Ministry</h6>
      <!-- Fields Container for Chapter/Area and Ministry -->

      <div class="input-field col s12 m6">
      <select v-model="chapter" id="chapter" required>
        <option v-for="option in chapterOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>


    <!-- Ministry Dropdown -->
    <div class="input-field col s12 m6">
      <label for="ministry"></label>
      <select v-model="ministry" id="ministry" required>
        <option v-for="option in ministryOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>


        <div class="input-field col s12">
          <input type="text" id="household-leader" v-model="householdLeader" required />
          <label for="household-leader">Household Leader:</label>
        </div>
          





      <!-- Conditional First Name and Last Name Fields -->
      <div v-if="ministry === 'Couples for Christ'">
        <h3 class="left-align">Husband Information:</h3>
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
        <h3 class="left-align">Wife Information:</h3>
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


      <!-- fee stuff -->

      <div v-if="ministry === 'Couples for Christ'">
        Fee: $30.00
      </div>

      <div v-else>
        Fee: $15.00
      </div>

      <h2 class="left-align">
        <a class="btn" @click="addPartyGuest">+ Guest</a>
      </h2>

      <div v-for="(guest, index) in partyGuests" :key="index" class="guest-fields-container">
        <div class="guest-fields">
          <div class="input-field">
            <input type="text" :id="'guest-first-name-' + index" v-model="guest.firstName" required />
            <label :for="'guest-first-name-' + index">First Name:</label>
          </div>

          <div class="input-field">
            <input type="text" :id="'guest-last-name-' + index" v-model="guest.lastName" required />
            <label :for="'guest-last-name-' + index">Last Name:</label>
          </div>

          <div class="input-field">
            <input type="number" :id="'guest-age-' + index" v-model="guest.age" min="1" max="17" required />
            <label :for="'guest-age-' + index">Age:</label>
          </div>

          <div class="input-field">
            <input type="text" :id="'guest-ministry-' + index" v-model="guest.category" required />
            <label :for="'guest-ministry-' + index">Ministry:</label>
          </div>

          <div class="fee-display" >
          Fee: ${{ calculateFee(guest) }}.00
        </div>
          <a class="btn red remove-btn" @click="removePartyGuest(index)">- Guest</a>

      </div>

    </div>

      <div class="center-align">
        <div class="submit-button-wrapper">
          <button class="btn-large" type="submit" :disabled="loading || !isFormValid">Submit</button>
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
import M from 'materialize-css';
export default { 
  name: 'RegistrationPage',
  mounted() {
    // Initialize Materialize dropdowns
    var elems1 = document.querySelectorAll('select');
    M.FormSelect.init(elems1, {});
  },
  data() {
    return {
      chapterOptions: [
        { value: 'North', label: 'North' },
        { value: 'South', label: 'South' },
        { value: 'Southwest', label: 'Southwest' },
        { value: 'West', label: 'West' },
        { value: 'Austin', label: 'Austin' },
        { value: 'San Antonio', label: 'San Antonio' },
        { value: 'Guest', label: 'Guest' },
      ],
      ministryOptions: [
        { value: 'Single for Christ', label: 'Single for Christ' },
        { value: 'Youth for Christ', label: 'Youth for Christ' },
        { value: 'Couples for Christ', label: 'Couples for Christ' },
        { value: 'Servant of the Lord', label: 'Servant of the Lord' },
        { value: 'Handmaid of the Lord', label: 'Handmaid of the Lord' },
        { value: 'Guest', label: 'Guest' },
      ],
      chapter: '',
      ministry: '',
      householdLeader: '',
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
    },
    ministryOptions() {
    this.$nextTick(() => {
      const elems = document.querySelectorAll('select');
      M.FormSelect.init(elems);
    });
  }
  },
  computed: {
    isFormValid() {
      if (this.ministry === 'Couples for Christ') { return this.wifeFirstName && this.wifeLastName && this.wifeEmail && this.wifePhoneNumber && this.firstName && this.lastName && this.email && this.phoneNumber; }
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
    selectChapter(value) {
      this.chapter = value;
    },    
    selectMinistry(value) {
      this.ministry = value;
    },
    validatePhoneNumber() {
      this.phoneNumber = this.phoneNumber.replace(/\D/g, '').slice(0, 10);
  },
  addPartyGuest() {
    this.partyGuests.push({
      firstName: '',
      lastName: '',
      category: '',
      age: '',
      fee: 0
    });
  },
  removePartyGuest(index) {
    this.partyGuests.splice(index, 1);
  },
  calculateFee(guest) {
      var age = guest.age;
      if (age <= 5) guest.fee = 0;
      if (age >= 6 && age <= 12)  guest.fee = 5;
      if (age >= 13 && age <= 17) return guest.fee = 10;
      if (age > 17) return guest.fee = 15;

      return guest.fee;
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
        if (this.ministry === 'Couples for Christ') {
          await this.submitIndividual(this.firstName, this.lastName, this.ministry,  this.email, this.phoneNumber, "Husband of " + this.wifeFirstName + 
        " " + this.wifeLastName, 'Adult', 15); //husband data if couple, otherwise personal info
          await this.submitIndividual(this.wifeFirstName, this.wifeLastName, this.ministry,  this.wifeEmail, this.wifePhoneNumber, "Wife of " + this.firstName + " " + this.lastName,  'Adult', 15); //insert wife data
        } else {
          await this.submitIndividual(this.firstName, this.lastName, this.ministry,  this.email, this.phoneNumber, "N/A", 'Adult', 15);
        }

        for (const guest of this.partyGuests) {
          await this.submitIndividual(guest.firstName, guest.lastName, guest.category, 'N/A', 'N/A', "Guest of " + this.firstName + " " + this.lastName, guest.age, guest.fee);
        }

        this.messageType = 'success-message';
        this.message = 'Registration Success! Redirecting to News...';
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
    async submitIndividual(firstName, lastName, ministry, email, phoneNumber, relation, age, fee) {
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
        age,
        fee,
        householdLeader: this.householdLeader    
      });
    },
  },
};
</script>

<style scoped>

/* General Container Styles */
.container {
  padding: 5px;
}

/* Custom Dropdown Styles */
select {
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  width: 100%;
  box-shadow: none;
}

select:focus {
  border-color: #1976d2; /* Custom focus color */
  outline: none;
}

.dropdown-content {
  border-radius: 4px;
  background-color: #fff;
}

.dropdown-content li > a {
  color: #000;
}

.dropdown-content li > a:hover {
  background-color: #f0f0f0; /* Light gray on hover */
}

.dropdown-content li {
  padding: 0.5rem;
}

.dropdown-content li + li {
  border-top: 1px solid #ddd; /* Divider line between items */
}

/* Input Field Styles */
.input-field {
  margin-bottom: 1.5rem;
}

/* Guest Fields Styles */
.guest-fields-container {
  margin-top: 20px;
}

.guest-fields {
  display: flex;
  align-items: center; /* Vertically center align items */
  flex-wrap: wrap; /* Allow wrapping if there’s not enough space */
  margin-bottom: 10px; /* Add space between guests */
}

.guest-fields .input-field {
  flex: 1;
  min-width: 150px;
}

.remove-btn {
  margin-left: 1rem;
}

/* Custom Paragraph Styles */
.custom-paragraph {
  margin-bottom: 5px; /* Adjust the value as needed */
}

/* Custom Theme Styles */
.custom-theme {
  color: red; /* Set the text color to red */
  font-size: 1.2em; /* Adjust the size as needed; 1.2em is smaller than the default h3 size */
  margin-bottom: 10px; /* Optional: Adjust margin as needed */
}

/* Submit Button Styles */
.submit-button-wrapper {
  margin-top: 20px;
}

.submit-button-wrapper .btn-large {
  background-color: #1976d2; /* Blue color */
}

/* Spinner Styles */
.preloader-wrapper {
  margin-top: 10px;
}

/* Responsive Adjustments */
@media only screen and (max-width: 600px) {
  .guest-fields {
    flex-direction: column; /* Stack fields vertically on small screens */
  }
}

</style>