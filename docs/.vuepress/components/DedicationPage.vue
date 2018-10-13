<template>
  <section>
    <p>
      {{line1}}
      <br/>
      {{line2}}
    </p>
  </section>
</template>

<script>
export default {
  props: ['line1', 'line2']
}
</script>

<style scoped>
section {
  padding-top: 8rem;
  padding-bottom: 8rem;
  display: flex;
  flex-flow: col wrap;
  justify-content: space-around;
}
p {
  align-self: center;
  font-style: italic;
  font-family: Constantia, Lucida Bright, Lucidabright, Lucida Serif, Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif, Georgia, serif;
}
</style>
