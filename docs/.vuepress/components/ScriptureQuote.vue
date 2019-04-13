<template>
  <div class="ScriptureQuote">
    <a class="reference" v-if="link" :href="link" target="_blank">{{reference}}</a>
    <div class="reference" v-else>{{reference}}</div>
    <div v-if="description" class="description">{{description}}</div>
    <div class="scripture" v-html="mdQuote"></div>
  </div>
</template>

<script>
export default {
  props: ['reference', 'description', 'link', 'quote'],
  computed: {
    mdQuote: function() {
      const md = require('markdown-it')({ breaks: true });
      return md.renderInline(this.quote).replace(/\<br\>/g, '<div style="padding-top: 0.5rem;"></div>');
    }
  }
}
</script>

<style scoped>
.ScriptureQuote {
  padding: 0.5rem 1.5rem;
  text-align: center;
}
.reference {
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.description {
  margin-top: 0.5rem;
  font-weight: 300;
  display: block;
  font-style: italic;
  font-family: Constantia, Lucida Bright, Lucidabright, Lucida Serif, Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif, Georgia, serif;
}
.scripture {
  font-style: italic;
  font-family: Constantia, Lucida Bright, Lucidabright, Lucida Serif, Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif, Georgia, serif;
  margin: 1rem 2rem;
  display: block;
  color: #333333;
  font-size: 1.1rem;
  line-height: 1.75rem;
  text-align: justify;
}

@media only screen and (max-width: 600px) {
  .scripture-quote {
    padding-left: 0;
    padding-right: 0;
  }
  .scripture {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
