<template>
    <div>
      <h1>News and Article</h1>
  
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
  
      <div class="announcement">   
      <br>
      <center>
      <img src="@/assets/CFC Houston Sept GA Flyer.jpg" alt="GA" style="max-width: flex;"></center>
      <br><br>
      <p class="has-text-centered">
      <!-- <router-link to="/ancop"><h2>See our students list</h2></router-link>-->
      </p>
      </div>
  
  
  
      <div class="announcement">   
      <br>
      <center>
      <img src="@/assets/ancop.png" alt="ancop" style="max-width: flex;"></center>
      <br><br>
      <p class="has-text-centered">
       <router-link to="/ancop"><h2>See our students list</h2></router-link>
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
  