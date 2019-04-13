<template>
  <section class="RedTitleBar">
    <div class="title">{{title}}</div>
    <div v-if="subtitle" class="subtitle">{{subtitle}}</div>
  </section>
</template>

<script>
export default {
  props: ['title', 'subtitle']
}
</script>

<style scoped>
.RedTitleBar {
  margin-left: -24px;
  margin-right: -24px;
}
section {
  background-color: #fa3725;
  color: white;
  padding: 1.5rem;
  text-align: center;
}
.title {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.subtitle {
  letter-spacing: 0.05em;
  font-style: italic;
  font-weight: 200;
  font-family: Constantia, Lucida Bright, Lucidabright, Lucida Serif, Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif, Georgia, serif;
}
</style>
