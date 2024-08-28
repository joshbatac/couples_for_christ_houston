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
header {
  background-color: #333;
  padding: 1rem;
}
nav ul {
  list-style: none;
  display: flex;
  gap: 1rem;
}
nav ul li {
  color: white;
}
a {
  text-decoration: none;
  color: white;
}
main {
  padding: 2rem;
}
</style>
