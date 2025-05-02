<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <aside :class="[isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded', 'sidebar']">
      <div class="sidebar-header">
        <button class="collapse-btn" @click="toggleSidebar">
          <svg v-if="isCollapsed" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
        <h2 class="sidebar-title">Dashboard</h2>
      </div>

      <nav class="sidebar-nav">
        <router-link to="/dashboard" class="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span>Home</span>
        </router-link>

        <router-link to="/dashboard/users" class="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span>Users</span>
        </router-link>

        <router-link to="/dashboard/settings" class="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82L4.26 3a1.65 1.65 0 0 0-1.82-.33H1a2 2 0 0 1 0-4h4a2 2 0 0 1 2 2h.09A1.65 1.65 0 0 0 7.08 3a1.65 1.65 0 0 0 .33-1.82l.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1"/>
          </svg>
          <span>Settings</span>
        </router-link>
      </nav>
    </aside>

    <!-- Main Content -->
    <main :class="[isCollapsed ? 'main-content-collapsed' : 'main-content-expanded', 'main-content']">
      <div class="content-header">
        <h1>Dashboard</h1>
      </div>
      <div class="content-body">
        <!-- Add your dashboard content here -->
        <div class="dashboard-stats">
          <div class="stat-card">
            <h3>Users</h3>
            <p>1234</p>
          </div>
          <div class="stat-card">
            <h3>Projects</h3>
            <p>56</p>
          </div>
          <div class="stat-card">
            <h3>Tasks</h3>
            <p>234</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isCollapsed = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
}

/* Sidebar Styles */
.sidebar {
  background: hsl(var(--card));
  border-right: 1px solid hsl(var(--border));
  transition: width 0.3s ease;
}

.sidebar-expanded {
  width: 240px;
}

.sidebar-collapsed {
  width: 64px;
}

.sidebar-header {
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid hsl(var(--border));
}

.collapse-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
}

.collapse-btn:hover {
  background-color: hsl(var(--background));
}

.sidebar-title {
  font-size: 1.25rem;
  margin: 0;
  transition: opacity 0.3s ease;
}

.sidebar-collapsed .sidebar-title {
  opacity: 0;
}

.sidebar-nav {
  padding: 1rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.375rem;
  text-decoration: none;
  color: hsl(var(--foreground));
  transition: background-color 0.2s;
}

.nav-item:hover {
  background-color: hsl(var(--background));
}

.nav-item.active {
  background-color: hsl(var(--primary) / 0.1);
}

.nav-item svg {
  width: 20px;
  height: 20px;
}

.nav-item span {
  transition: opacity 0.3s ease;
}

.sidebar-collapsed .nav-item span {
  opacity: 0;
}

/* Main Content Styles */
.main-content {
  flex: 1;
  padding: 2rem;
  transition: margin-left 0.3s ease;
}

.main-content-expanded {
  margin-left: 240px;
}

.main-content-collapsed {
  margin-left: 64px;
}

.content-header {
  margin-bottom: 2rem;
}

.content-header h1 {
  font-size: 1.75rem;
  color: hsl(var(--foreground));
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.stat-card {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
  padding: 1.5rem;
  text-align: center;
}

.stat-card h3 {
  color: hsl(var(--muted-foreground));
  margin-bottom: 0.5rem;
}

.stat-card p {
  font-size: 2rem;
  font-weight: 600;
  color: hsl(var(--foreground));
  margin: 0;
}

/* Dark theme overrides */
[data-theme="dark"] {
  .sidebar {
    background: hsl(var(--card-dark));
    border-right-color: hsl(var(--border-dark));
  }

  .sidebar-header {
    border-bottom-color: hsl(var(--border-dark));
  }

  .nav-item {
    color: hsl(var(--foreground-dark));
  }

  .nav-item:hover {
    background-color: hsl(var(--background-dark));
  }

  .nav-item.active {
    background-color: hsl(var(--primary-dark) / 0.1);
  }

  .stat-card {
    background: hsl(var(--card-dark));
    border-color: hsl(var(--border-dark));
  }

  .stat-card h3 {
    color: hsl(var(--muted-foreground-dark));
  }

  .stat-card p {
    color: hsl(var(--foreground-dark));
  }
}
</style>
