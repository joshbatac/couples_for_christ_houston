<template>
  <div>
    <h1>Register Page</h1>
    <p>Please register by filling out the form below.</p>
    <form @submit.prevent="submitForm">
      <!-- Chapter/Area Field -->
      <div>
        <label for="chapter">Chapter/Area:</label>
        <select id="chapter" v-model="chapter">
          <option value="Austin">Austin</option>
          <option value="Dallas">Dallas</option>
          <option value="Houston">Houston</option>
        </select>
      </div>

      <!-- Ministry Field -->
      <div>
        <label for="ministry">Ministry:</label>
        <select id="ministry" v-model="ministry">
          <option value="Single">Single</option>
          <option value="Couple">Couple</option>
          <option value="Servant">Servant</option>
        </select>
      </div>

      <!-- Submit Button -->
      <button type="submit">Submit</button>
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
    };
  },
  methods: {
    async submitForm() {
      const formData = {
        chapter: this.chapter,
        ministry: this.ministry,
      };

      try {
        const response = await axios.post('http://localhost:3000/submit', formData);
        console.log('Form Submitted and Data Added to Google Sheets:', response.data);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
  },
};
</script>

<style scoped>
form {
  max-width: 400px;
  margin: 0 auto;
}
div {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}
input,
select {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
}
button {
  padding: 0.5rem 1rem;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
