<template>
  <section>
    <h1 class="title">{{title}}</h1>
    <h3 class="subtitle">{{subtitle}}</h3>
    <div class="author">{{author}}</div>
    <div class="dates">{{dates}}</div>
  </section>
</template>

<script>
export default {
  props: ['title', 'subtitle', 'author', 'dates']
}
</script>

<style scoped>
section {
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
}
h1.title {
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  text-align: center;
  padding: 1.25rem;
  font-size: 3rem;
  font-weight: 800;
}
h3.subtitle {
  text-align: center;
  padding: 1.25rem 3rem 8rem;
  font-weight: 500;
  font-size: 1.25rem;
  letter-spacing: 0.05em;
}
.author {
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}
.dates {
  text-align: center;
  font-style: italic;
  font-weight: 200;
  font-family: Constantia, Lucida Bright, Lucidabright, Lucida Serif, Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif, Georgia, serif;
  margin-bottom: 1.5rem;
  margin-top: 0;
}
</style>