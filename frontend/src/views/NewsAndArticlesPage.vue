<template>
  <div>
    <h1>News and Article</h1>

    <div class="announcement">
      <h2>CFC Houston Christmas Party 2024</h2>
      <p>We're excited to announce the CFC Houston Christmas Party for 2024!</p>
      <p><strong>Date:</strong> December 7, 2024 (Saturday)</p>
      <p><strong>Venue:</strong> St. Bernadette Catholic Church - FLC</p>
      <p><strong>Address:</strong> 15500 El Camino Real, Houston, TX 77062</p>
      <p><strong>Deadline to RSVP:</strong> September 15, 2024</p>
      <p><strong>Contact:</strong> <a href="mailto:cfchouston@couplesforchristusa.org">cfchouston@couplesforchristusa.org</a></p>
     <br> <p>* All attendees aged 18 and above must submit their own form *</p>
     <br>
     <p>Current Participants: <a href="https://docs.google.com/spreadsheets/d/1tYwJBL2rclennLopqiwCO91V98Vqobops6G_oYW620I/pubhtml?gid=1980918340&single=true" target="_blank" rel="noopener noreferrer">View List</a></p>
     <p><i>Please allow up to 5 minutes for the Particpant lists to refresh</i></p>
    </div>

    <button class="register-button"><router-link to="/register">Register</router-link></button>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
};
</script>

<style>
.announcement {
  border: 1px solid #ddd;
  padding: 15px;
  margin: 15px 0;
  border-radius: 8px;
  background-color: #f9f9f9;
}
.announcement h2 {
  margin-top: 0;
}
.announcement p {
  margin: 5px 0;
}
.announcement a {
  color: #007bff;
  text-decoration: none;
}
.announcement a:hover {
  text-decoration: underline;
}

.register-button {
  background-color: white;
  color: black;
  border: 2px solid black;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.register-button:hover {
  background-color: black;
  color: white;
  border-color: white;
}

.register-button:active {
  background-color: #333;
  color: #ccc;
  border-color: #ccc;
}

.register-button:focus {
  outline: none;
}
</style>
