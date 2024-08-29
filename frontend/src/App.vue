<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about-us">About Us</router-link></li>
          <li><router-link to="/news">News and Articles</router-link></li>
        </ul>
      </nav>
    </header>
    <main>
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
/* Import the Roboto font */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

/* Global Styles */
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #f4f4f4;
}

header {
  background-color: #004080; 
  padding: 1rem;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 1rem;
  padding: 0;
  margin: 0;
}

nav ul li {
  margin: 0;
}

a {
  text-decoration: none;
  color: #ffffff; /* White text for links */
}

a:hover {
  color: #b3c6ff; /* Light Blue on hover */
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
