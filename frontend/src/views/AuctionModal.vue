<template>
  <div class="modal-backdrop" @click.self="closeModal">
    <div class="modal-content">
      <button @click="closeModal" class="close-button-top">×</button>
      <h2>Auction Item {{ item.id }}</h2>
      <img :src="item.image" alt="Auction item" class="modal-image" />

      <div class="modal-details">
        <p><strong>Current Bid:</strong> ${{ item.currentBid }}</p>
        <p><strong>Minimum Bid:</strong> ${{ minimumBid }}</p>
      </div>

      <form @submit.prevent="submitBid" class="modal-form">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required />
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>

        <div class="form-group">
          <label for="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            v-model="phone"
            placeholder="1234567890"
            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
            required
          />
        </div>

        <div class="form-group bid-amount-group">
          <label for="bidAmount">Bid Amount:</label>
          <div class="bid-amount-wrapper">
            <span class="dollar-sign">$</span>
            <input
              type="number"
              id="bidAmount"
              v-model.number="bidAmount"
              :min="minimumBid"
              class="bid-amount-input"
              required
            />
          </div>
        </div>

        <button type="submit" class="submit-button">Place Bid</button>
      </form>

      <button @click="closeModal" class="close-button">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuctionModal',
  props: {
    item: Object,
  },
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      bidAmount: 0,
    };
  },
  computed: {
    minimumBid() {
      if (!this.item || !this.item.currentBid) return 0;

      const currentBid = this.item.currentBid;
      const increment = Math.floor(currentBid / 100) * 5 + 5; // Dynamic increment calculation

      return currentBid + increment;
    },
  },
  mounted() {
    this.bidAmount = this.minimumBid;
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    submitBid() {
      if (this.bidAmount < this.minimumBid) {
        alert(`Bid must be at least $${this.minimumBid}`);
      } else {
        // Emit a submit event with bid details
        this.$emit('submit-bid', {
          itemId: this.item.id,
          name: this.name,
          email: this.email,
          phoneNumber: this.phone,
          bidAmount: this.bidAmount,
        });
        this.closeModal();
      }
    },
  },
};
</script>

<style scoped>
/* Dark backdrop overlay */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* Darken the background */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* Modal content box */
.modal-content {
  background: white;
  padding: 40px; /* Increased padding for a bigger modal */
  width: 500px; /* Increased width for a larger modal */
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  position: relative;
  z-index: 1001;
}

/* Image styling */
.modal-image {
  width: 100%;
  height: auto;
  max-height: 200px; /* Increased max-height for image */
  object-fit: cover;
  margin-bottom: 15px;
}

.modal-details {
  margin: 20px 0;
  font-size: 1.4em; /* Increased font size for details */
}

/* Close "X" button on top-right */
.close-button-top {
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 28px; /* Larger close button */
  cursor: pointer;
}

/* Form styling */
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Increased gap between form elements */
  margin-top: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 8px; /* Increased space between label and input */
  font-size: 1.1em; /* Slightly larger font size for labels */
}

.form-group input {
  padding: 10px; /* Increased padding for input fields */
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  font-size: 1.1em; /* Slightly larger font size for inputs */
}

/* Bid amount input styling */
.bid-amount-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.bid-amount-wrapper {
  display: flex;
  align-items: center;
}

.dollar-sign {
  margin-right: 10px; /* Increased space between dollar sign and input */
  font-size: 1.3em; /* Increased font size of dollar sign */
}

.bid-amount-input {
  padding: 10px; /* Increased padding */
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 75%; /* Adjusted width for better balance */
  font-size: 1.1em; /* Larger font size for bid input */
}

/* Submit button styling */
.submit-button {
  padding: 14px; /* Increased padding for submit button */
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 1.4em; /* Larger font size for submit button */
}

.submit-button:hover {
  background-color: #0056b3;
}

/* Close button at the bottom */
.close-button {
  background-color: #ddd;
  padding: 10px 15px; /* Increased padding */
  border: none;
  border-radius: 4px;
  margin-top: 20px;
  cursor: pointer;
  font-size: 1.2em; /* Slightly larger font size for close button */
}

.close-button:hover {
  background-color: #bbb;
}
</style>
