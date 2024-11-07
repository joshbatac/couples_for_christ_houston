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
              placeholder="123-456-7890"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
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
        bidAmount: this.item.currentBid + this.item.currentBid * 0.1, // Start with minimum bid
      };
    },
    computed: {
      minimumBid() {
        return Math.ceil(this.item.currentBid * 1.1); // 10% above current bid
      },
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
      phoneNumber: this.phoneNumber,
      bidAmount: this.bidAmount
    });
    this.closeModal();
  }
}
    },
  };
  </script>
  
  <style>
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
    padding: 20px;
    width: 350px;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    position: relative;
    z-index: 1001;
  }
  
  .modal-image {
    width: 100%;
    height: auto;
    max-height: 150px;
    object-fit: cover;
    margin-bottom: 10px;
  }
  
  .modal-details {
    margin: 10px 0;
  }
  
  /* Close "X" button on top-right */
  .close-button-top {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  
  .modal-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    text-align: left;
  }
  
  .form-group label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .form-group input {
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%;
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
    margin-right: 5px;
  }
  
  .bid-amount-input {
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 60%; /* Adjust width as needed */
  }
  
  .submit-button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .submit-button:hover {
    background-color: #0056b3;
  }
  
  /* Close button at the bottom */
  .close-button {
    background-color: #ddd;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    margin-top: 10px;
    cursor: pointer;
  }
  
  .close-button:hover {
    background-color: #bbb;
  }
  </style>
  