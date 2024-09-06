<template>
  <div id="app">
    <header>
      <nav class="blue darken-3">
        <div class="container">
          <div class="nav-wrapper">
            <a href="#" class="brand-logo">CFC South TX</a>
            <ul class="right hide-on-med-and-down">
              <li><router-link to="/" class="white-text">Home</router-link></li>
              <li><router-link to="/about-us" class="white-text">About Us</router-link></li>
              <li><router-link to="/news" class="white-text">News and Articles</router-link></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Import Materialize CSS */
/*@import url('https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css');*/

/* Import Roboto font */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

/* Global Styles */
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #f4f4f4;
}

nav .brand-logo {
  font-size: 1.5rem;
}

main {
  padding: 2rem;
}

/* Button styles */
button {
  font-family: 'Roboto', sans-serif;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  background-color: #004080; 
  color: #ffffff; 
}

button:hover {
  background-color: #003366;
}
</style>
