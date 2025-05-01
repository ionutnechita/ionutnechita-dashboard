<template>
  <div class="hello-world-container">
    <h1 class="title">Hello World!</h1>
    <p class="subtitle">Welcome to your first Nuxt.js application.</p>
    <button @click="incrementCounter" class="button">
      Press me! ({{ counter }})
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0
    }
  },
  methods: {
    incrementCounter() {
      this.counter++
    }
  }
}
</script>

<style scoped>
.hello-world-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
  font-family: 'Arial', sans-serif;
}

.title {
  font-size: 4rem;
  color: #41b883;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.5rem;
  color: #35495e;
  margin-bottom: 2rem;
}

.button {
  background-color: #41b883;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #3aa876;
}
</style>
