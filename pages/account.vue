<!-- pages/account.vue -->
<template>
    <div class="account-container">
        <div class="auth-header">
            <h1 class="page-title">Account Settings</h1>
        </div>

        <div class="account-content">
            <div class="account-card">
                <div class="section-title">User Information</div>

                <div class="info-section">
                    <div class="info-item">
                        <span class="info-label">User Information</span>
                        <span class="info-value">
                            <ul>
                                <li v-if="user?.username">Username: {{ user.username }}</li>
                                <li v-if="user?.publicMetadata?.username">Public Username: {{
                                    user.publicMetadata.username }}</li>
                                <li v-if="user?.privateMetadata?.username">Private Username: {{
                                    user.privateMetadata.username }}</li>
                                <li v-if="user?.publicMetadata?.firstName">First Name: {{ user.publicMetadata.firstName
                                }}</li>
                                <li v-if="user?.privateMetadata?.firstName">Private First Name: {{
                                    user.privateMetadata.firstName }}</li>
                                <li v-if="user?.publicMetadata?.name">Full Name: {{ user.publicMetadata.name }}</li>
                                <li v-if="user?.privateMetadata?.name">Private Full Name: {{ user.privateMetadata.name
                                }}</li>
                            </ul>
                        </span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Email Addresses</span>
                        <span class="info-value">
                            <ul v-if="user?.emailAddresses">
                                <li v-for="email in user.emailAddresses" :key="email.id">
                                    {{ email.emailAddress }}
                                    <span v-if="email.isPrimary">(Primary)</span>
                                    <span v-if="email.isVerified">(Verified)</span>
                                </li>
                            </ul>
                            <span v-else>Not available</span>
                        </span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">User ID</span>
                        <span class="info-value">{{ user?.id || 'Not available' }}</span>
                    </div>
                    <div class="info-item" v-if="userProfile.value?.firstName">
                        <span class="info-label">First Name</span>
                        <span class="info-value">{{ userProfile.value.firstName }}</span>
                    </div>
                    <div class="info-item" v-if="userProfile.value?.lastName">
                        <span class="info-label">Last Name</span>
                        <span class="info-value">{{ userProfile.value.lastName }}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Browser</span>
                        <span class="info-value">{{ name }} {{ version }}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Platform</span>
                        <span class="info-value">{{ platform }}</span>
                    </div>
                </div>

                <!-- Organization section -->
                <div class="info-section">
                    <div class="section-title">Organizations</div>
                    <div class="current-org-message">
                        <span class="org-status">Current Organization:</span>
                        <span class="org-name">{{ organization?.name || 'No organization selected' }}</span>
                    </div>
                </div>

                <!-- Account Settings section -->
                <div class="info-section">
                    <div class="section-title">Account Actions</div>
                    <div class="logout-section">
                        <SignOutButton class="logout-button">
                            <template #default>
                                <span class="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                        <polyline points="16 17 21 12 16 7"></polyline>
                                        <line x1="21" y1="12" x2="9" y2="12"></line>
                                    </svg>
                                    <span>Logout</span>
                                </span>
                            </template>
                        </SignOutButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: ['auth']
})

import { useUser, useOrganization } from '@clerk/vue'
import { computed } from 'vue'
import { useBrowserInfo } from '~/composables/useBrowserInfo'
import { OrganizationSwitcher } from '@clerk/vue'
import { useAuth } from '@clerk/vue'
import { SignOutButton } from '@clerk/vue'

// Get user data
const { user } = useUser()
const { signOut } = useAuth()
const { name, version, platform } = useBrowserInfo()
const { organization } = useOrganization()

// Computed properties for user data
const userName = computed(() => {
    if (!user) return 'Not available'

    // Try different properties in order of preference
    const name = user.username ||
        user.publicMetadata?.username ||
        user.privateMetadata?.username ||
        user.publicMetadata?.firstName ||
        user.privateMetadata?.firstName ||
        user.publicMetadata?.name ||
        user.privateMetadata?.name ||
        user.id ||
        'Unknown'

    return name
})

const userEmail = computed(() => {
    if (!user) return 'Not available'

    // Try different email properties in order of preference
    const email = user.emailAddresses?.[0]?.emailAddress ||
        user.emailAddresses?.find(e => e.isPrimary)?.emailAddress ||
        user.emailAddresses?.find(e => e.isVerified)?.emailAddress ||
        user.emailAddresses?.[0]?.email ||
        user.email
    return email ? email : 'Not available'
})

// Check if user is authenticated
if (!user) {
    router.push('/login')
}

// Add additional computed properties for profile info
const userProfile = computed(() => {
    if (!user) return null
    return {
        firstName: user.publicMetadata?.firstName || user.privateMetadata?.firstName,
        lastName: user.publicMetadata?.lastName || user.privateMetadata?.lastName
    }
})

</script>

<style scoped>
.account-container {
    max-width: 1000px;
    margin: 2rem auto;
    padding: 2rem;
}

.auth-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid hsl(var(--border));
}

.page-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: hsl(var(--foreground));
}

.account-content {
    animation: fadeIn 0.5s ease-out;
}

/* Account Card Styles */
.account-card {
    background-color: hsl(var(--card));
    border-radius: 0.5rem;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid hsl(var(--border));
}

.section-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: hsl(var(--foreground));
}

.info-section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.info-item {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem;
    background-color: hsl(var(--muted) / 0.5);
    border-radius: 0.375rem;
}

.info-label {
    font-weight: 500;
    color: hsl(var(--muted-foreground));
}

.info-value {
    font-weight: 600;
    color: hsl(var(--foreground));
}

/* Organization Styles */
.current-org-message {
    padding: 1rem;
    background-color: hsl(var(--accent) / 0.1);
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.org-status {
    font-weight: 500;
    color: hsl(var(--accent-foreground));
}

.org-name {
    font-weight: 600;
    color: hsl(var(--accent-foreground));
}

.account-settings-section {
    margin-top: 2rem;
    padding: 1.5rem;
    background: hsla(var(--primary), 0.05);
    border-radius: 1rem;
    border: 1px solid hsla(var(--primary), 0.1);
}

.logout-section {
    display: flex;
    justify-content: flex-end;
}

.logout-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: 0.75rem;
    background: hsla(var(--primary), 0.1);
    border: 1px solid hsla(var(--primary), 0.2);
    color: hsl(var(--primary));
    font-weight: 600;
    transition: all 0.3s ease;
    cursor: pointer;
}

.logout-button:hover {
    background: hsla(var(--primary), 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Dark mode styles */
[data-theme="dark"] {
    .account-settings-section {
        background: hsla(var(--primary-dark), 0.05);
        border-color: hsla(var(--primary-dark), 0.1);
    }

    .logout-button {
        background: hsla(var(--primary-dark), 0.1);
        border-color: hsla(var(--primary-dark), 0.2);
        color: hsl(var(--primary-dark));
    }

    .logout-button:hover {
        background: hsla(var(--primary-dark), 0.2);
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
    .account-container {
        padding: 1rem;
    }

    .auth-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }

    .account-actions {
        flex-direction: column;
    }
}
</style>
