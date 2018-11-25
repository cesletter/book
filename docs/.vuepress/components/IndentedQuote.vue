<template>
  <div class="IndentedQuote">
    <div class="reference" v-if="reference">{{reference}}</div>
    <div v-if="speaker">
      <strong>{{speaker}}:</strong>
      <q v-bind:class="className" v-html="mdQuote"></q>
    </div>
    <q v-if="!speaker" v-bind:class="className" v-html="mdQuote"></q>
    <footer v-if="attribution || link || source">
      &mdash; {{attribution}}<span v-if="attribution">,</span>
      <a v-if="link && source" :href="link" target="_blank" class="italic">{{source}}</a>
      <span v-if="!link && source" class="italic">{{source}}</span>
    </footer>
  </div>
</template>

<script>
export default {
  props: ['reference', 'quote', 'className', 'attribution', 'source', 'link', 'speaker'],
  computed: {
    mdQuote: function() {
      const md = require('markdown-it')({ breaks: true });
      return md.renderInline(this.quote).replace(/\<br\>/g, '<div style="padding-top: 0.5rem;"></div>');
    }
  }
}
</script>

<style scoped>
.IndentedQuote {
  margin: 0.5rem 2rem;
}
q {
  quotes: "“" "‘" "”" "’";
  font-style: italic;
  font-family: Constantia, Lucida Bright, Lucidabright, Lucida Serif, Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif, Georgia, serif;
  line-height: 1.85rem;
}
q:before {
  content: open-quote;
}
q:after {
  content: open-quote;
}
.reference {
  text-align: center;
  font-size: 1.1rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 1.5rem;
  padding-bottom: 0.5rem;
}
footer {
  margin: 0.35rem 0 1.25rem;
  text-align: left;
  font-size: 0.8rem;
  line-height: 1.25rem;
  text-transform: uppercase;
}
.italic {
  font-style: italic;
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
