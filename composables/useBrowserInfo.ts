import { ref, onMounted } from 'vue'

export function useBrowserInfo() {
    const name = ref('')
    const version = ref('')
    const platform = ref('')

    const getBrowserInfo = () => {
        const userAgent = navigator.userAgent
        const platformInfo = navigator.platform

        // Get browser name and version
        if (userAgent.indexOf('Firefox') > -1) {
            name.value = 'Firefox'
            version.value = userAgent.substring(userAgent.indexOf('Firefox') + 8)
        } else if (userAgent.indexOf('Chrome') > -1) {
            name.value = 'Chrome'
            version.value = userAgent.substring(userAgent.indexOf('Chrome') + 7)
        } else if (userAgent.indexOf('Safari') > -1) {
            name.value = 'Safari'
            version.value = userAgent.substring(userAgent.indexOf('Version') + 8)
        } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1) {
            name.value = 'Internet Explorer'
            version.value = userAgent.substring(userAgent.indexOf('MSIE') + 5)
        } else {
            name.value = 'Unknown'
            version.value = 'Unknown'
        }

        // Get platform
        if (platformInfo.indexOf('Win') > -1) {
            platform.value = 'Windows'
        } else if (platformInfo.indexOf('Mac') > -1) {
            platform.value = 'MacOS'
        } else if (platformInfo.indexOf('Linux') > -1) {
            platform.value = 'Linux'
        } else if (platformInfo.indexOf('Android') > -1) {
            platform.value = 'Android'
        } else if (platformInfo.indexOf('iPhone') > -1 || platformInfo.indexOf('iPad') > -1) {
            platform.value = 'iOS'
        } else {
            platform.value = 'Unknown'
        }

        // Clean up version number
        version.value = version.value.split(' ')[0]
    }

    onMounted(() => {
        getBrowserInfo()
    })

    return {
        name,
        version,
        platform
    }
}
