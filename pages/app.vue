<template lang="pug">
.flex.flex-col.items-center.justify-center.min-h-screen.bg-gray-900
  .mb-6
    img.w-96.h-24.rounded-xl(src="/assets/NUMA-logo.svg" alt="App Logo")

  // App Title & Description
  //- h1.text-2xl.font-bold.mb-2.text-white Numa
  //- p.text-muted.mb-8.max-w-xs Experience the best way to...

  // Loading State
  .flex.flex-col.items-center.gap-3(v-if="isRedirecting")
    UIcon(ic="i-heroicons-arrow-path" class="w-10 h-10 animate-spin text-primary")
    p.text-muted Redirecting to app...

  // Action Buttons
  .flex.flex-col.w-full.max-w-xs.gap-4(v-else)
    // Open App Button
    UButton(
      color="primary"
      size="lg"
      block
      @click="openApp"
    ) Open App

    // Divider
    UDivider Or download

    // App Stores
    .flex.flex-col.gap-3
      UButton( variant="outline" size="lg"
        block
        icon="i-heroicons-device-phone-mobile"
        :to="appStoreUrl"
        target="_blank"
      ) Download for iOS

      UButton(
        variant="outline"
        size="lg"
        block
        icon="i-heroicons-device-tablet"
        :to="playStoreUrl"
        target="_blank"
      ) Download for Android

  // Referral Info
  UCard.mt-6.max-w-xs(v-if="referralCode")
    p.text-sm
      | Your referral code:
      span.font-bold.text-primary {{ referralCode }}
    p.text-xs.text-muted.mt-1 This code will be applied automatically when you open the app
</template>

<script setup>
const route = useRoute()
const isRedirecting = ref(false)

const config = {
  app: {
    name: "numa",
    scheme: "numa://",
    androidPackage: "com.numasocial.app",
    appleAppId: "6742755409",
  },
  timeout: 2500,
}

// Extract parameters from URL
const referralCode = route.query.ref || null
const deepLinkPath = route.query.path || ""
const otherParams = { ...route.query }
delete otherParams.ref
delete otherParams.path

// Construct deep link URL with all parameters
const constructDeepLink = () => {
  let url = config.app.scheme + (deepLinkPath || "")

  // Add parameters to URL
  const params = new URLSearchParams()
  if (referralCode) params.append("ref", referralCode)

  // Add any other parameters from the URL
  Object.entries(otherParams).forEach(([key, value]) => {
    params.append(key, value)
  })

  const paramString = params.toString()
  if (paramString) {
    url += (url.includes("?") ? "&" : "?") + paramString
  }

  return url
}

// Store URLs with parameters
const appStoreUrl = computed(() => {
  return `https://apps.apple.com/app/id${config.app.appleAppId}?pt=123456&ct=website&mt=8${referralCode ? "&referral=" + referralCode : ""}`
})

const playStoreUrl = computed(() => {
  return `https://play.google.com/store/apps/details?id=${config.app.androidPackage}&referrer=utm_source%3Dwebsite%26utm_campaign%3Dredirect${referralCode ? "%26referral%3D" + encodeURIComponent(referralCode) : ""}`
})

// Store parameters in local storage for retrieval after app install
const storeReferralData = () => {
  if (referralCode || Object.keys(otherParams).length > 0) {
    localStorage.setItem(
      "appReferralData",
      JSON.stringify({
        ref: referralCode,
        otherParams,
        timestamp: new Date().getTime(),
      })
    )
  }
}

// Handle app opening
const openApp = () => {
  isRedirecting.value = true
  storeReferralData()

  const deepLink = constructDeepLink()
  const start = Date.now()

  // Try to open the app first
  window.location.href = deepLink

  // Set a timeout to redirect to store if app doesn't open
  setTimeout(() => {
    if (Date.now() - start > config.timeout) {
      // App didn't open, redirect to appropriate store
      const userAgent = navigator.userAgent || navigator.vendor || window.opera

      if (/android/i.test(userAgent)) {
        window.location.href = playStoreUrl.value
      } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        window.location.href = appStoreUrl.value
      } else {
        isRedirecting.value = false // Show buttons again if neither detected
      }
    }
  }, config.timeout)
}

// Check for stored referral data on page load
onMounted(() => {
  // Auto-redirect on first load if parameters present
  if (referralCode || deepLinkPath) {
    openApp()
  }
})
</script>
