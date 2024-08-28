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

      <!-- Additional Party Member Field -->
      <div>
        <label for="additionalMembers">Additional Party Members:</label>
        <select id="additionalMembers" v-model="additionalMembers">
          <option v-for="n in 11" :key="n" :value="n - 1">{{ n - 1 }}</option>
        </select>
      </div>

      <!-- Party Member Information Fields -->
      <div v-for="(member, index) in totalMembers" :key="index">
        <h3>Member {{ index + 1 }}</h3>
        <label :for="'firstName' + index">First Name:</label>
        <input type="text" :id="'firstName' + index" v-model="member.firstName" />

        <label :for="'lastName' + index">Last Name:</label>
        <input type="text" :id="'lastName' + index" v-model="member.lastName" />
      </div>

      <!-- Submit Button -->
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegistrationPage',
  data() {
    return {
      chapter: '',
      ministry: 'Single',
      additionalMembers: 0,
      members: [],
    };
  },
  computed: {
    // Calculate the total number of members based on the selected ministry and additional members
    totalMembers() {
      const baseMembers = this.ministry === 'Couple' ? 2 : 1;
      const total = baseMembers + parseInt(this.additionalMembers);
      this.adjustMembersArray(total);
      return this.members;
    },
  },
  methods: {
    // Adjust the members array to match the total number of members
    adjustMembersArray(total) {
      while (this.members.length < total) {
        this.members.push({ firstName: '', lastName: '' });
      }
      while (this.members.length > total) {
        this.members.pop();
      }
    },
    submitForm() {
      console.log("Form Submitted!", this.chapter, this.ministry, this.members);
      // Handle the form submission logic here
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
