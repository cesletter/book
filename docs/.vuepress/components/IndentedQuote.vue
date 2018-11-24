<template>
  <q v-bind:class="className" v-html="mdQuote"></q>
</template>

<script>
export default {
  props: ['quote', 'className'],
  computed: {
    mdQuote: function() {
      const md = require('markdown-it')({ breaks: true });
      return md.renderInline(this.quote).replace(/\<br\>/g, '<div style="padding-top: 0.5rem;"></div>');
    }
  }
}
</script>

<style scoped>
q {
  quotes: "“" "‘" "”" "’";
  font-style: italic;
  font-family: Constantia, Lucida Bright, Lucidabright, Lucida Serif, Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif, Georgia, serif;
  margin: 0 2rem;
  display: block;
  line-height: 1.85rem;
}
q:before {
  content: open-quote;
}
q:after {
  content: open-quote;
}

@media only screen and (max-width: 600px) {
  q {
    margin-left: 0;
    margin-right: 0;
    padding-left: 20px;
    border-left: 5px solid #efefef;
  }
}
</style>
