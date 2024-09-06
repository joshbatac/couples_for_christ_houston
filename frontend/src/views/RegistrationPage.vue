<template>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <div class="container">
    <h1 class="title has-text-centered">2024 CFC Christmas Party Registration</h1>
    <h3 class="has-text-danger has-text-centered"><i>Theme: Be the light of the World</i></h3>
    <p class="left-justified"><strong>Date:</strong> December 7, 2024 (Saturday)</p>
    <p class="left-justified"><strong>Venue:</strong> St. Bernadette Catholic Church - FLC</p>
    <p class="left-justified"><strong>Address:</strong> 15500 El Camino Real, Houston, TX 77062</p>
    <p class="left-justified"><strong>Deadline to RSVP:</strong> September 15, 2024</p>
    <p class="left-justified"><strong>Contact:</strong> <a href="mailto:cfchouston@couplesforchristusa.org">cfchouston@couplesforchristusa.org</a></p>

    <p class="has-text-centered"><i>* All attendees ages 18 and above must submit their own form *</i></p>

    <form @submit.prevent="submitForm">
      <div class="field">
        <label class="label">Chapter</label>
        <div class="control">
          <div class="select is-fullwidth">
            <select v-model="chapter" id="chapter" required>
              <option v-for="option in chapterOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Ministry</label>
        <div class="control">
          <div class="select is-fullwidth">
            <select v-model="ministry" id="ministry" required>
              <option v-for="option in ministryOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Household Leader</label>
        <div class="control">
          <input class="input" type="text" id="household-leader" v-model="householdLeader" required />
        </div>
      </div>

      <div v-if="ministry === 'Couples for Christ'">
        <h3 class="title is-4">Husband Information:</h3>
        <div class="field">
          <label class="label">First Name</label>
          <div class="control">
            <input class="input" type="text" id="first-name" v-model="firstName" required />
          </div>
        </div>

        <div class="field">
          <label class="label">Last Name</label>
          <div class="control">
            <input class="input" type="text" id="last-name" v-model="lastName" required />
          </div>
        </div>

        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" type="email" id="email" v-model="email" required />
          </div>
        </div>

        <div class="field">
          <label class="label">Phone Number</label>
          <div class="control">
            <input class="input" type="tel" id="phoneNumber" v-model="phoneNumber" minlength="10" maxlength="10" required />
          </div>
        </div>

        <h3 class="title is-4">Wife Information:</h3>
        <div class="field">
          <label class="label">First Name</label>
          <div class="control">
            <input class="input" type="text" id="wife-first-name" v-model="wifeFirstName" required />
          </div>
        </div>

        <div class="field">
          <label class="label">Last Name</label>
          <div class="control">
            <input class="input" type="text" id="wife-last-name" v-model="wifeLastName" required />
          </div>
        </div>

        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" type="email" id="wife-email" v-model="wifeEmail" required />
          </div>
        </div>

        <div class="field">
          <label class="label">Phone Number</label>
          <div class="control">
            <input class="input" type="tel" id="wife-phoneNumber" v-model="wifePhoneNumber" minlength="10" maxlength="10" required />
          </div>
        </div>
      </div>

      <div v-else>
        <div class="field">
          <label class="label">First Name</label>
          <div class="control">
            <input class="input" type="text" id="first-name" v-model="firstName" required />
          </div>
        </div>

        <div class="field">
          <label class="label">Last Name</label>
          <div class="control">
            <input class="input" type="text" id="last-name" v-model="lastName" required />
          </div>
        </div>

        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" type="email" id="email" v-model="email" required />
          </div>
        </div>

        <div class="field">
          <label class="label">Phone Number</label>
          <div class="control">
            <input class="input" type="tel" id="phoneNumber" v-model="phoneNumber" minlength="10" maxlength="10" required />
          </div>
        </div>
      </div>

      <div v-if="ministry === 'Couples for Christ'" class="left-justified">
        Fee: $30.00
      </div>

      <div v-else class="left-justified">
        Fee: $15.00
      </div>

      <h2 class="title is-4 has-text-left">
        <a class="button is-primary" @click="addPartyGuest">+ Guest</a>
      </h2>

      <div v-for="(guest, index) in partyGuests" :key="index" class="guest-fields-container">
        <div class="guest-fields box">
          <div class="field">
            <label class="label">First Name</label>
            <div class="control">
              <input class="input" :id="'guest-first-name-' + index" v-model="guest.firstName" required />
            </div>
          </div>

          <div class="field">
            <label class="label">Last Name</label>
            <div class="control">
              <input class="input" :id="'guest-last-name-' + index" v-model="guest.lastName" required />
            </div>
          </div>

          <div class="field">
            <label class="label">Age</label>
            <div class="control">
              <input class="input" type="number" :id="'guest-age-' + index" v-model="guest.age" min="1" max="17" required />
            </div>
          </div>

          <div class="field">
            <label class="label">Ministry</label>
            <div class="control">
              <input class="input" :id="'guest-ministry-' + index" v-model="guest.category" required />
            </div>
          </div>

          <div class="field left-justified">
            Fee: ${{ calculateFee(guest) }}.00
          </div>
          <a class="button is-danger is-small" @click="removePartyGuest(index)">- Guest</a>
        </div>
      </div>

      <div class="has-text-centered">
        <div class="field">
          <button class="button is-large is-primary" type="submit" :disabled="loading || !isFormValid">Submit</button>
        </div>
        <div v-if="loading" class="has-text-centered">
          <div class="loader"></div>
        </div>
      </div>

      <div v-if="message" :class="messageType">{{ message }}</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
//import M from 'materialize-css';
export default { 
  name: 'RegistrationPage',
  mounted() {
    // Initialize Materialize dropdowns
    //var elems1 = document.querySelectorAll('select');
   // M.FormSelect.init(elems1, {});
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
      //const elems = document.querySelectorAll('select');
      //M.FormSelect.init(elems);
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
/* General Styles */
.container {
  padding: 2rem;
}

/* Header and Paragraph Styling */
h3.has-text-centered {
  margin-bottom: 1rem;
}

p.has-text-centered {
  margin: 0.5rem 0;
}

/* Form Field Styles */
.field {
  margin-bottom: 1rem;
}

/* Set width of all form elements to 80% of the page width */
.input,
.select {
  width: 100%;
  box-sizing: border-box; /* Ensure padding and border are included in the width */

}

/* Align the form fields to be centered within the container */
.control {
  margin-left: auto;
  margin-right: auto;
}

/* Guest Fields Styles */
.guest-fields-container {
  margin-top: 2rem;
}

.guest-fields {
  padding: 1rem;
  border-radius: 4px;
  background-color: #f5f5f5;
}

/* Fee Display */
.has-text-centered {
  margin: 1rem 0;
}

.button.is-primary {
  margin-top: 1rem;
}

/* Loader Styles */
.loader {
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Success and Error Messages */
.success-message {
  color: #4CAF50;
}

.error-message {
  color: #f44336;
}
</style>
