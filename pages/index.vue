<template lang="pug">
.bg-black.text-white.h-screen.flex.flex-col.items-center.justify-center.overflow-hidden
  .text-center.px-4
    .absolute.top-5.left-5.fade-in
      img.logo-hover(src="/assets/NUMA-logo.svg")
    .absolute.top-5.right-5.flex.gap-4.fade-in(style="animation-delay: 0.3s")
      a.social-link(
        href="https://twitter.com/NUMAsocial"
        target="_blank"
      )
        img.w-5.h-5(src="/assets/X-logo.svg")
      a.social-link(
        href="https://t.me/NUMASocialBot"
        target="_blank"
      )
        img.w-5.h-5(src="/assets/Telegram-logo.svg")
    .hero-content
      img.coming-soon.inline-block.mb-8.fade-in(src="/assets/comingsoon.svg" style="animation-delay: 0.5s")
      h1.hero-title.fade-in(style="animation-delay: 0.7s")
        | The Social
        br
        | Compute Network
      p.hero-description.fade-in(style="animation-delay: 0.9s")
        | Transform Your Idle Devices to Power the AI Agent Revolution
  .bottom-image-container.parallax
</template>

<script setup>
// Component logic goes here if needed
useHead({
  title: "The Social Compute Network",
})

// Optional: Add this if you want to handle mouse movement for parallax effect
onMounted(() => {
  if (process.client) {
    const parallaxElement = document.querySelector(".parallax")

    document.addEventListener("mousemove", (e) => {
      const mouseX = e.clientX / window.innerWidth
      const mouseY = e.clientY / window.innerHeight

      if (parallaxElement) {
        parallaxElement.style.transform = `translate(${mouseX * -15}px, ${mouseY * -15}px)`
      }
    })
  }
})
</script>

<style lang="postcss">
@font-face {
  font-family: "PolySans Median";
  src: url("/fonts/PolySans-Median.otf") format("opentype");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "PolySans Slim";
  src: url("/fonts/PolySans-Slim.otf") format("opentype");
  font-weight: normal;
  font-style: normal;
}

/* Base classes */
.social-link {
  @apply w-8 h-8 border border-gray-400 rounded-md flex items-center justify-center;
  transition: all 0.3s ease;
}

.social-link:hover {
  @apply border-white bg-gray-900;
  transform: translateY(-2px);
}

.hero-content {
  @apply absolute top-28 transform -translate-x-1/2 z-20 bg-black w-full backdrop-blur-sm;
}

.hero-title {
  @apply text-4xl sm:text-5xl lg:text-6xl font-bold mb-4;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
}

.hero-description {
  @apply text-gray-400 text-base sm:text-lg bg-black px-10 font-slim;
}

/* Animation classes */
.fade-in {
  opacity: 0;
  transform: translateY(10px);
  animation: fadeIn 0.8s ease forwards;
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

.logo-hover {
  transition: transform 0.3s ease;
}

.logo-hover:hover {
  transform: scale(1.05);
}

.coming-soon {
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Background noise animation */
.bottom-image-container::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("/assets/noise.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.4;
  z-index: 1;
  animation: noiseShift 8s infinite alternate;
}

@keyframes noiseShift {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 0.35;
  }
}

.bottom-image-container {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70vh;
  background-image: url("/assets/door.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-blend-mode: overlay;
  transition: transform 0.2s ease-out;
}

@media (max-width: 640px) {
  .bottom-image-container {
    height: 60vh;
    bottom: -5vh;
  }
}

/* Optional: Add a subtle glow to text on hover */
.hero-title:hover {
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
}
</style>
