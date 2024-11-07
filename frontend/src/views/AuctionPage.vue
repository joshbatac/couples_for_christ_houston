<template>
    <div>
      <p>Auction</p>
      <div class="auction-grid">
        <div v-for="item in items" :key="item.id" class="auction-item">
          <img :src="item.image" alt="Auction item" class="auction-image" />
          <p>Current Bid: ${{ item.currentBid }}</p>
          <button @click="openModal(item)">Bid Now</button>
        </div>
      </div>
  
      <!-- Modal component for placing a bid -->
      <AuctionModal
  v-if="showModal"
  :item="selectedItem"
  @close="closeModal"
  @submit-bid="handleBidSubmit"
/>    </div>
  </template>
  
  <script>
    import axios from 'axios';
    import AuctionModal from './AuctionModal.vue';
  
  export default {
    name: 'AuctionPage',
    components: {
        AuctionModal,
    },
    data() {
      return {
        items: [
          { id: 1, image: 'path/to/image1.jpg', currentBid: 100 },
          { id: 2, image: 'path/to/image2.jpg', currentBid: 150 },
          { id: 3, image: 'path/to/image3.jpg', currentBid: 200 },
          { id: 4, image: 'path/to/image4.jpg', currentBid: 120 },
          { id: 5, image: 'path/to/image5.jpg', currentBid: 300 },
          { id: 6, image: 'path/to/image6.jpg', currentBid: 180 },
        ],
        showModal: false,
        selectedItem: null,
      };
    },
    methods: {
      openModal(item) {
        this.selectedItem = item;
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
        this.selectedItem = null;
      },
      handleBidSubmit(bidData) {
    axios.post('https://cfc-backend-246d6d84ddbc.herokuapp.com/submit-bid', bidData)
      .then(response => {
        alert(response.data.message);
      })
      .catch(error => {
        console.error('Error submitting bid:', error);
      });
  },
    },
  };
  </script>
  
  <style>
  .auction-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  
  .auction-item {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }
  
  .auction-image {
    width: 100%;
    height: auto;
    max-height: 150px;
    object-fit: cover;
  }
  </style>
  