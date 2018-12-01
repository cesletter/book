<template>
  <blockquote>
    <p class="quotation" v-html="mdQuote"></p>
    <footer>
      &mdash; {{attribution}}<span v-if="attribution">,</span>
      <a v-if="link && source" :href="link" class="italic" target="_blank">{{source}}</a>
      <span v-if="!link && source" class="italic">{{source}}</span>
      <span v-if="source2">|</span>
      <a v-if="link2 && source2" :href="link2" class="italic" target="_blank">{{source2}}</a>
      <span v-if="!link2 && source2" class="italic">{{source2}}</span>
    </footer>
  </blockquote>
</template>

<script>
export default {
  props: ['quote', 'attribution', 'source', 'link', 'source2', 'link2'],
  computed: {
    mdQuote: function() {
      const md = require('markdown-it')({ breaks: true });
      return md.renderInline(this.quote).replace(/\<br\>/g, '<div style="padding-top: 0.5rem;"></div>');
    }
  }
}
</script>

<style scoped>
blockquote{
  color: #666;
  font-size: 1rem;
  margin: 0.5rem 1rem;
  quotes: "“" "‘" "”" "’";
  line-height: 1rem;
  border-left: none;
}

blockquote:before {
  content: '"';
  font-family: Constantia, Lucida Bright, Lucidabright, Lucida Serif, Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif, Georgia, serif;
  display: inline;
  line-height: 0;
  left: -20px;
  position: relative;
  top: 30px;
  color: #ccc;
  font-size: 3rem;
}

p {
  margin: 0;
  font-style: italic;
  font-family: Constantia, Lucida Bright, Lucidabright, Lucida Serif, Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif, Georgia, serif;
}

footer {
  margin: 1rem 0 1.25rem;
  text-align: left;
  font-size: 0.8rem;
  line-height: 1.25rem;
  text-transform: uppercase;
}
.italic {
  font-style: italic;
}

@media only screen and (max-width: 600px) {
  blockquote {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
