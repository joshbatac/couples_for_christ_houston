<template>
  <div>

    <h1>Announcements</h1>

    <!-- 
    <div class="announcement content">
              <dl>
                  <dt>For to us a child is born,</dt>
                      <dd>to us a son is given,</dd>
                      <dd>and the government will be on his shoulders.</dd>
                  <dt>and he will be called</dt>
                      <dd>Wonderful Counselor, Mighty God,</dd>
                      <dd> Everlasting Father, Prince of Peace.</dd>
              </dl>
              Isaiah 9:6
              <br><br>
              <p class="has-text-centered">Join us in celebrating our Saviour's birth on December 7. </p>
              <p class="has-text-centered"><button class="button"><router-link to="/register">Click here to register</router-link></button></p>
    </div>
    -->
    <!--
    <div class="announcement">   
            <br>
            <center>
            <img src="@/assets/CFC Houston Oct GA Flyer.jpg" alt="GA" style="max-width: flex;"></center>

            <br><br>
            <p class="has-text-centered">
            </p>
    </div>

    <div class="announcement">   
            <br>
            <center>
            <img src="@/assets/ancop.png" alt="ancop" style="max-width: flex;"></center>
            <br><br>
            <p class="has-text-centered">
            <a href="" target="_blank" rel="noopener noreferrer">Click to View Children for Sponsorship</a>
            </p>
    </div>
    -->

    <div class="announcement content">
      <h2>Welcome to the CFC Lantern Auction - Illuminate Lives with Your Support!</h2>
      <p>Join us in making a difference by bidding on beautifully crafted lanterns from around the world. Each lantern represents a light of hope and solidarity, supporting our mission to empower families and communities in need. Your participation helps spread the spirit of love, compassion, and service.</p>

      <h3>How It Works:</h3>
      <ul>
        <li><strong>Bid on Lanterns:</strong> Browse our collection of unique lanterns, each handcrafted with love and representing diverse cultures and traditions. Place your bid to take home a symbol of hope and transformation.</li>
        <li><strong>Make a Donation:</strong> Not interested in bidding? You can still support our cause by making a direct donation. Every contribution, big or small, helps us reach more families and extend our mission’s impact.</li>
      </ul>

      <h3>Why Your Support Matters:</h3>
      <p>Every dollar raised through this auction and your generous donations goes towards life-changing programs that uplift communities and foster unity. Together, we can light up the lives of countless individuals and families, bringing warmth and joy where it’s needed most.</p>

      <h3>Get Involved - Make a Difference:</h3>
      <p>Whether you’re bidding on a lantern or making a donation, you’re helping us shine a brighter light on the world. Thank you for your support, and let’s illuminate lives together!</p>

      <p class="has-text-centered">
        <button class="button is-primary"><router-link to="/auction">Bid Now</router-link></button> &nbsp; &nbsp;
        <button class="button is-link" @click="showDonationModal = true">Donate Now</button>
      </p>
    </div>

    <!-- Modal for Donation -->
    <div v-if="showDonationModal" class="modal is-active">
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-content">
        <div class="box">
          <h3 class="title">Make a Donation</h3>
          <p>Please send your donations to <strong>cfchouston@couplesforchristusa.org</strong> with the auction item (e.g., CFC North) as the memo/subject.</p>
          <div class="has-text-right">
            <button class="button is-link" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" @click="closeModal" aria-label="close"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      showDonationModal: false, // Controls visibility of the modal
    };
  },
  methods: {
    closeModal() {
      this.showDonationModal = false; // Close the modal
    }
  }
};
</script>

<style scoped>

p { text-indent: 2em; margin: 0 }

.has-text-indented-1 {
  margin: 4rem 0;
}

p.has-text-indented-2 {
  margin: 20rem 0;
}

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

p.has-text-centered {
  margin: 0.5rem 0;
}

/* Modal styles */
.modal.is-active {
  display: block;
}

.modal-background {
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  max-width: 500px;
  margin: 10% auto;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 30px;
  color: #333;
}

.modal-close:hover {
  color: #000;
}

.box {
  padding: 20px;
  text-align: center;
}

.has-text-right {
  text-align: right;
}

</style>
