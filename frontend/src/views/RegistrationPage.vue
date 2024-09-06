<template>
  <div class="container">
    <h1 class="center-align">2024 CFC Christmas Party RSVP</h1>
    <p class="center-align">NOTE: Participants over 18 must submit their own form.</p>




    <form @submit.prevent="submitForm" class="col s12">
      <!-- Fields Container for Chapter/Area and Ministry -->
      <h2 class="center-align">Chapter and Ministry Information: </h2>

      <div class="row">
        <!-- Chapter Dropdown Trigger -->
        <div class="input-field col s12 m6">
          <a class="dropdown-trigger btn" href="#" data-target="dropdown-chapter">
            {{ chapter || 'Select Chapter/Area' }}
          </a>
          <ul id="dropdown-chapter" class="dropdown-content">
            <li v-for="chapterOption in chapterOptions" :key="chapterOption.value">
              <a @click="selectChapter(chapterOption.value)">{{ chapterOption.label }}</a>
            </li>
          </ul>
        </div>

        <!-- Ministry Dropdown Trigger -->
        <div class="input-field col s12 m6">
          <a class="dropdown-trigger btn" href="#" data-target="dropdown-ministry">
            {{ ministry || 'Select Ministry' }}
          </a>
          <ul id="dropdown-ministry" class="dropdown-content">
            <li v-for="ministryOption in ministryOptions" :key="ministryOption.value">
              <a @click="selectMinistry(ministryOption.value)">{{ ministryOption.label }}</a>
            </li>
          </ul>
        </div>

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
        <a class="btn" @click="addPartyGuest">Add Party Guest</a>
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
          <a class="btn red" @click="removePartyGuest(index)">Remove Guest</a>
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
import M from 'materialize-css';
export default { 
  name: 'RegistrationPage',
  mounted() {
    // Initialize Materialize dropdowns
    const elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, {});
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

/* Custom Dropdown Button Styles */
.dropdown-trigger {
  background-color: #1976d2; /* Blue color */
  color: #fff;
  border-radius: 4px;
  padding: 0 1rem;
  height: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
  width: 100%; /* Adjust this to match the width of the dropdown */
}

/* Dropdown Menu Styles */
.dropdown-content {
  width: 200px; /* Fixed width for the dropdown menu */
  border-radius: 4px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.dropdown-content li > a {
  color: #000;
}

.dropdown-content li > a:hover {
  background-color: #f0f0f0; /* Light gray on hover */
}

/* Add padding and border radius to make dropdown look like standard dropdown */
.dropdown-content li {
  padding: 0.5rem;
}

.dropdown-content li + li {
  border-top: 1px solid #ddd; /* Divider line between items */
}

.input-field {
  margin-bottom: 1.5rem;
}


.input-field {
  margin-bottom: 1.5rem;
}
</style>