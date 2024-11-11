<template>
  <div>
    <p v-if="loading" class="loading-screen">Loading Page! Please Wait...</p>

    <div v-else>
      <p>Auction</p>
      <div class="auction-grid">
        <div v-for="item in items" :key="item.id" class="auction-item">
          <!-- Slider -->
          <div class="image-slider">
            <img :src="item.images[currentImageIndex(item)]" alt="Auction item" class="auction-image" />
            <button @click="prevImage(item)" class="prev-btn">&lt;</button> <!-- Use < for prev -->
            <button @click="nextImage(item)" class="next-btn">&gt;</button> <!-- Use > for next -->
          </div>
          <button @click="openModal(item)">Bid Now</button>
        </div>
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
import CFC_HOLD_South_1 from "../assets/CFC-HOLD-South-1.png";
import CFC_HOLD_South_2 from "../assets/CFC-HOLD-South-2.png";
import CFC_HOLD_South_3 from "../assets/CFC-HOLD-South-3.png";

export default {
  name: 'AuctionPage',
  components: {
    AuctionModal,
  },
  data() {
    return {
      items: [
        { 
          id: 1, 
          images: [CFC_HOLD_South_1, CFC_HOLD_South_2, CFC_HOLD_South_3], 
          currentBid: 0 
        },
        { 
          id: 2, 
          images: [CFC_HOLD_South_1, CFC_HOLD_South_2, CFC_HOLD_South_3], 
          currentBid: 0 
        },
        { id: 3, images: [CFC_HOLD_South_1, CFC_HOLD_South_2, CFC_HOLD_South_3], currentBid: 0 },
        { id: 4, images: [CFC_HOLD_South_1, CFC_HOLD_South_2, CFC_HOLD_South_3], currentBid: 0 },
        { id: 5, images: [CFC_HOLD_South_1, CFC_HOLD_South_2, CFC_HOLD_South_3], currentBid: 0 },
        { id: 6, images: [CFC_HOLD_South_1, CFC_HOLD_South_2, CFC_HOLD_South_3], currentBid: 0 },
      ],
      showModal: false,
      selectedItem: null,
      loading: true, // Loading state
    };
  },
  mounted() {
    // Fetch the latest bids for all items when the page loads
    Promise.all(this.items.map(item => this.fetchLatestBid(item.id)))
      .then(() => {
        this.loading = false; // Set loading to false once all bids are loaded
      });
  },
  methods: {
    // Track current image index
    currentImageIndex(item) {
      return item.currentImageIndex || 0;
    },
    
    // Show previous image
    prevImage(item) {
      const index = item.images.indexOf(this.currentImage(item));
      item.currentImageIndex = index === 0 ? item.images.length - 1 : index - 1;
    },
    
    // Show next image
    nextImage(item) {
      const index = item.images.indexOf(this.currentImage(item));
      item.currentImageIndex = index === item.images.length - 1 ? 0 : index + 1;
    },
    
    // Get the current image based on the index
    currentImage(item) {
      return item.images[this.currentImageIndex(item)];
    },

    openModal(item) {
      this.selectedItem = item;
      this.showModal = true;
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
          setTimeout(() => {
            window.location.reload();
          }, 500);
        })
        .catch((error) => {
          console.error('Error submitting bid:', error);
          alert('Error Submitting! Please try again');
        });
    },
    fetchLatestBid(itemId) {
      return axios
        .get(`https://script.google.com/macros/s/AKfycbyzC3pgt3y0gStu_VNk3K5rRYpazVVi9bOF7-5bPkR0m1_mToA_jNqY_04XhZ2MuDqxMA/exec?itemId=${itemId}`)
        .then((response) => {
          const latestBid = response.data.latestBid;
          const item = this.items.find((item) => item.id === itemId);
          if (item) {
            item.currentBid = latestBid;
          }
        })
        .catch((error) => {
          console.error('Error fetching latest bid:', error);
          alert('Error fetching latest bid');
        });
    },
  },
};
</script>

<style scoped>
.loading-screen {
  text-align: center;
  font-size: 1.5em;
  padding: 20px;
  color: #333;
}

.auction-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.auction-item {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  position: relative;
}

.auction-image {
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: contain;
}

.image-slider {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.prev-btn,
.next-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.prev-btn {
  left: 10px;
}

.next-btn {
  right: 10px;
}
</style>
