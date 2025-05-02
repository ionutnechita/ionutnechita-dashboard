<!-- pages/sign-up.vue -->
<template>
    <div class="login-container">
        <div class="login-card">
            <SignUp :redirect-url="'/dashboard'" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { SignUp } from '@clerk/vue'
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 2rem;
    background-color: hsl(var(--background));
}

.login-card {
    width: 100%;
    max-width: 400px;
    background-color: hsl(var(--card));
    border-radius: 0.5rem;
    border: 1px solid hsl(var(--border));
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    overflow: hidden;
}

.login-header {
    padding: 2rem 2rem 1rem;
    text-align: center;
}

.login-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: hsl(var(--foreground));
    margin-bottom: 0.5rem;
}

.login-subtitle {
    color: hsl(var(--muted-foreground));
    font-size: 0.875rem;
}

.login-form {
    padding: 1rem 2rem;
}

.form-group {
    margin-bottom: 1.25rem;
}

.form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: hsl(var(--foreground));
}

.form-input {
    width: 100%;
    padding: 0.625rem;
    background-color: hsl(var(--background));
    border: 1px solid hsl(var(--border));
    border-radius: 0.375rem;
    color: hsl(var(--foreground));
    font-size: 0.875rem;
    transition: border-color 0.2s;
}

.form-input:focus {
    outline: none;
    border-color: hsl(var(--primary));
    box-shadow: 0 0 0 1px hsl(var(--primary) / 0.5);
}

.form-actions {
    margin-top: 1.5rem;
}

.login-button {
    width: 100%;
    padding: 0.625rem;
    background-color: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
    border: none;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
}

.login-button:hover:not(:disabled) {
    background-color: hsl(var(--primary) / 0.9);
}

.login-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.login-footer {
    padding: 1rem 2rem 2rem;
    text-align: center;
    border-top: 1px solid hsl(var(--border));
    margin-top: 1rem;
}

.help-text {
    font-size: 0.875rem;
    color: hsl(var(--muted-foreground));
}

.help-link {
    color: hsl(var(--primary));
    text-decoration: none;
    font-weight: 500;
}

.help-link:hover {
    text-decoration: underline;
}

.loading-spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 640px) {
    .login-container {
        padding: 1rem;
    }

    .login-card {
        border-radius: 0.25rem;
    }

    .login-header {
        padding: 1.5rem 1.5rem 1rem;
    }

    .login-form {
        padding: 1rem 1.5rem;
    }

    .login-footer {
        padding: 1rem 1.5rem 1.5rem;
    }
}
</style>
