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
    />
  </div>
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
        { id: 1, image: 'path/to/image1.jpg', currentBid: 0 },
        { id: 2, image: 'path/to/image2.jpg', currentBid: 0 },
        { id: 3, image: 'path/to/image3.jpg', currentBid: 0 },
        { id: 4, image: 'path/to/image4.jpg', currentBid: 0 },
        { id: 5, image: 'path/to/image5.jpg', currentBid: 0 },
        { id: 6, image: 'path/to/image6.jpg', currentBid: 0 },
      ],
      showModal: false,
      selectedItem: null,
    };
  },
  mounted() {
    // Fetch the latest bids for all items when the page loads
    this.items.forEach(item => {
      this.fetchLatestBid(item.id);
    });
  },
  methods: {
    openModal(item) {
      this.selectedItem = item;
      this.showModal = true;
      // Fetch latest bid when opening the modal (if not already done)
      this.fetchLatestBid(item.id);
    },
    closeModal() {
      this.showModal = false;
      this.selectedItem = null;
    },
    handleBidSubmit(bidData) {
      axios
        .post('https://cfc-backend-246d6d84ddbc.herokuapp.com/submit-bid', bidData)
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          console.error('Error submitting bid:', error);
          alert('Error Submitting! Please try again');
        });
    },
    fetchLatestBid(itemId) {
      axios
        .get(`https://script.google.com/macros/s/AKfycbyzC3pgt3y0gStu_VNk3K5rRYpazVVi9bOF7-5bPkR0m1_mToA_jNqY_04XhZ2MuDqxMA/exec?itemId=${itemId}`)
        .then((response) => {
          const latestBid = response.data.latestBid;
          const item = this.items.find((item) => item.id === itemId);
          if (item) {
            item.currentBid = latestBid;  // Update current bid with the latest bid from Google Sheets
          }
        })
        .catch((error) => {
          console.error('Error fetching latest bid:', error);
          alert('error catching latest bid');
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
