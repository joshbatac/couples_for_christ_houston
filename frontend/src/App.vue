<template>
  <div id="app">
    <header>
      <nav class="navbar is-dark">
        <div class="container">
          <div class="navbar-brand">
            <a href="#" class="navbar-item">CFC South TX</a>
            <div
              class="navbar-burger burger"
              :class="{ 'is-active': isActive }"
              @click="toggleMenu"
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div
            id="navbarMenu"
            class="navbar-menu"
            :class="{ 'is-active': isActive }"
          >
            <div class="navbar-end">
              <router-link to="/" class="navbar-item" @click="closeMenu">Home</router-link>
              <router-link to="/about-us" class="navbar-item" @click="closeMenu">About Us</router-link>
              <router-link to="/ministry" class="navbar-item" @click="closeMenu">Ministry</router-link>
              <router-link to="/news" class="navbar-item" @click="closeMenu">News and Articles</router-link>
              <router-link to="/announcement" class="navbar-item" @click="closeMenu">Announcements</router-link>
              <router-link to="/contact-us" class="navbar-item" @click="closeMenu">Contact Us</router-link>

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
  data() {
    return {
      isActive: false, // To toggle the navbar menu
    };
  },
  methods: {
    toggleMenu() {
      this.isActive = !this.isActive; // Toggles the is-active class
    },
    closeMenu() {
      this.isActive = false; // Closes the menu
    },
  },
  mounted() {
    this.$router.beforeEach((to, from, next) => {
      this.closeMenu(); // Close the menu before navigating to a new page
      next(); // Continue with the navigation
    });
  },
};
</script>

<style>
/* Import Bulma CSS */
@import 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.4/css/bulma.min.css';

/* Optional: Custom Styles if needed */
</style>
