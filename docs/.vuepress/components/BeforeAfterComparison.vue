<template>
  <div class="BeforeAfterComparison">
    <q v-html="mdBefore"></q>
    <em>to</em>
    <q v-html="mdAfter"></q>
  </div>
</template>

<script>
const md = require('markdown-it')({ breaks: true });

export default {
  props: ['before', 'after'],
  computed: {
    mdBefore: function() {
      return md.renderInline(this.before);
    },
    mdAfter: function() {
      return md.renderInline(this.after);
    }
  }
}
</script>

<style scoped>
.BeforeAfterComparison {
  margin-bottom: 1.5rem;
}
q {
  quotes: "“" "‘" "”" "’";
  font-style: italic;
  font-family: Constantia, Lucida Bright, Lucidabright, Lucida Serif, Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif, Georgia, serif;
  margin: 1rem 2rem;
  display: block;
  line-height: 1.5rem;
  text-align: center;
}
q:before {
  content: open-quote;
}
q:after {
  content: open-quote;
}
em {
  text-align: center;
  margin: 0.9rem auto;
  display: block;
  font-size: 0.9rem;
}
</style>
