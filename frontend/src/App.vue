<template>
  <div id="app">
    <header>
      <nav class="navbar is-dark">
        <div class="container">
          <div class="navbar-brand">
            <a href="#" class="navbar-item">CFC South TX</a>
            <div class="navbar-burger burger" data-target="navbarMenu">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div id="navbarMenu" class="navbar-menu">
            <div class="navbar-end">
              <router-link to="/" class="navbar-item">Home</router-link>
              <router-link to="/about-us" class="navbar-item">About Us</router-link>
              <router-link to="/news" class="navbar-item">News and Articles</router-link>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <main class="section">
      <div class="container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Import Bulma CSS */
@import 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.4/css/bulma.min.css';

/* Optional: Custom Styles if needed */
</style>
