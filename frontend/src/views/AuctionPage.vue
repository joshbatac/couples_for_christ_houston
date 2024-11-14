<template>
  <div>
    <!-- Loading Screen -->
    <p v-if="loading" class="loading-screen">Loading... Please Wait...</p>

    <!-- Main Content -->
    <div v-else>
      <h1 class="loading-screen">CFC Lantern Auction</h1>
      <div class="auction-grid">
        <div v-for="item in items" :key="item.id" class="auction-item">
          <h2>{{ item.name }}</h2>
          <p>Current Bid: ${{ item.currentBid }}</p>
          <hr>

          <!-- Image Slider with Click Event for Preview -->
          <div class="image-slider">
            <img
              :src="item.images[currentImageIndex(item)]"
              alt="Auction item"
              class="auction-image"
              @click="openImagePreview(item.images[currentImageIndex(item)])"
            />
            <button @click="prevImage(item)" class="prev-btn">&lt;</button>
            <button @click="nextImage(item)" class="next-btn">&gt;</button>
          </div>

          <button @click="openModal(item)">Bid Now</button>
        </div>
      </div>
    </div>

    <!-- Modal Component for Placing a Bid -->
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

//import Temp from "../assets/temp.png"

import CFC_North_1 from "../assets/CFC_North/CFC_North_1.png"
import CFC_North_2 from "../assets/CFC_North/CFC_North_2.png"
import CFC_North_3 from "../assets/CFC_North/CFC_North_3.png"
import CFC_North_4 from "../assets/CFC_North/CFC_North_4.png"
import CFC_North_5 from "../assets/CFC_North/CFC_North_5.png"

import CFC_Southwest_1 from "../assets/CFC_Southwest/CFC_Southwest_1.png"
import CFC_Southwest_2 from "../assets/CFC_Southwest/CFC_Southwest_2.png"
import CFC_Southwest_3 from "../assets/CFC_Southwest/CFC_Southwest_3.png"
import CFC_Southwest_4 from "../assets/CFC_Southwest/CFC_Southwest_4.png"
import CFC_Southwest_5 from "../assets/CFC_Southwest/CFC_Southwest_5.png"

import CFC_Southwest2_1 from "../assets/CFC_Southwest_2/CFC_Southwest_2_1.png"
import CFC_Southwest2_2 from "../assets/CFC_Southwest_2/CFC_Southwest_2_2.png"
import CFC_Southwest2_3 from "../assets/CFC_Southwest_2/CFC_Southwest_2_3.png"
import CFC_Southwest2_4 from "../assets/CFC_Southwest_2/CFC_Southwest_2_4.png"
import CFC_Southwest2_5 from "../assets/CFC_Southwest_2/CFC_Southwest_2_5.png"
import CFC_Southwest2_6 from "../assets/CFC_Southwest_2/CFC_Southwest_2_6.png"

import CFC_South_1 from "../assets/CFC_South/CFC_South_1.png"
import CFC_South_2 from "../assets/CFC_South/CFC_South_2.png"
import CFC_South_3 from "../assets/CFC_South/CFC_South_3.png"
import CFC_South_4 from "../assets/CFC_South/CFC_South_4.png"
import CFC_South_5 from "../assets/CFC_South/CFC_South_5.png"

import CFC_HOLD_South_1 from "../assets/CFC-HOLD-South-1.png";
import CFC_HOLD_South_2 from "../assets/CFC-HOLD-South-2.png";
import CFC_HOLD_South_3 from "../assets/CFC-HOLD-South-3.png";

import CFC_West_1 from "../assets/CFC_West/CFC_West_1.png"
import CFC_West_2 from "../assets/CFC_West/CFC_West_2.png"


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
          name:"CFC North",
          images: [CFC_North_1, CFC_North_2, CFC_North_3, CFC_North_4, CFC_North_5], 
          currentBid: 0 
        },
        { 
          id: 2, 
          name:"CFC Southwest",
          images: [CFC_Southwest_1, CFC_Southwest_2, CFC_Southwest_3, CFC_Southwest_4, CFC_Southwest_5], 
          currentBid: 0 
        },
        { id: 3, 
          name:"CFC Southwest 2", 
          images: [CFC_Southwest2_1, CFC_Southwest2_2, CFC_Southwest2_3, CFC_Southwest2_4, CFC_Southwest2_5, CFC_Southwest2_6], 
          currentBid: 0 
        },
        { id: 4, 
          name:"CFC South", 
          images: [CFC_South_1, CFC_South_2, CFC_South_3, CFC_South_4, CFC_South_5], 
          currentBid: 0 
        },
        { id: 5, 
          name:"CFC HOLD South", 
        images: [CFC_HOLD_South_1, CFC_HOLD_South_2, CFC_HOLD_South_3], 
        currentBid: 0 
        },
        
        { id: 6, 
          name:"CFC West", 
          images: [CFC_West_1, CFC_West_2], 
          currentBid: 0 
        },

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
        .get(`https://script.google.com/macros/s/AKfycbycVTlaRWZ9C-cPMfm9n7iI8sjcIKbCO4o0MrcuTYMPTdQRyatVNiubIL1uYj7oPy8dqQ/exec?itemId=${itemId}`)
        .then((response) => {
          const latestBid = response.data.latestBid;
          const item = this.items.find((item) => item.id === itemId);
          if (item) {
            item.currentBid = latestBid;
          }
        })
        .catch((error) => {
          console.error('Error fetching latest bid:', error);
        });
    },
  },
};
</script>

<style scoped>
.loading-screen {
  text-align: center;
  font-size: 2em; /* Increase loading screen font size */
  padding: 30px; /* Add more padding for better spacing */
  color: #333;
}

.auction-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 columns per row on larger screens */
  gap: 30px; /* Gap between items */
}

/* Media query for screens smaller than 768px (typical for phones) */
@media (max-width: 1024px) {
  .auction-grid {
    grid-template-columns: 1fr; /* 1 column per row on smaller screens */
  }
}

.auction-item {
  border: 1px solid #ddd;
  padding: 30px;
  text-align: center;
  position: relative;
  min-height: 800px;
  max-width: 900px;
  font-size: 1.2em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.auction-item h2 {
  font-size: 2em; /* Increase font size for item name */
  margin-bottom: 20px; /* Add space between name and content */
}

.auction-image {
  width: 100%; /* Make the image take full width of the container */
  height: 500px; /* Increase max height for larger display */
  object-fit: contain;
}
.image-slider {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px; /* Add space below image slider */
}

.prev-btn,
.next-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 15px;
  cursor: pointer;
  font-size: 1.5em; /* Increase button size */
}

.prev-btn {
  left: 10px;
}

.next-btn {
  right: 10px;
}

button {
  font-size: 1.2em; /* Increase font size of buttons */
  padding: 15px;
  margin-top: 20px; /* Add space between button and other content */
}
</style>
