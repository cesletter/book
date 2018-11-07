<template>
  <div class="scripture-quote">
    <div class="reference">{{reference}}</div>
    <div class="scripture" v-html="mdQuote"></div>
  </div>
</template>

<script>
export default {
  props: ['reference', 'quote'],
  computed: {
    mdQuote: function() {
      const md = require('markdown-it')();
      return md.renderInline(this.quote);
    }
  }
}
</script>

<style scoped>
.scripture-quote {
  padding: 0.5rem 1.5rem;
  text-align: center;
}
.reference {
  font-size: 1.1rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.scripture {
  font-style: italic;
  font-family: Constantia, Lucida Bright, Lucidabright, Lucida Serif, Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif, Georgia, serif;
  margin: 1rem 2rem;
  display: block;
  line-height: 1.5rem;
  text-align: justify;
}
</style>
