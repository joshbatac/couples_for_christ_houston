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
                <a href="https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2YvYy80MTA1ZjkwMTYzZTU3OTg1L0VoNzJibDY4U0lwUGlxbjJiOXNKMXFJQjFoUnBsWUl2MGF6NGVCblRwR1dJMWc%5FZT1UdUxhdVE&cid=4105F90163E57985&id=4105F90163E57985%21s3fa4b69fa0d84e6abfb5f6692489c1c4&parId=4105F90163E57985%21s5e6ef61e48bc4f8a8aa9f66fdb09d6a2&o=OneUp" target="_blank" rel="noopener noreferrer">Click to View Children for Sponsorship</a>
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
        <button class="button is-link" disabled>Donate Now</button>
      </p>
    </div>

    </div> 
  </template>
  
  <script>
  export default {
    name: 'LandingPage',
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
  </style>
  