<template>
  <div class="ImageWithCaption"> 
    <div class="title" v-if="title">{{title}}</div>
    <div class="above" v-if="above" v-html="mdAbove"></div>
    <img :src="src" />
    <div class="below" v-if="below" v-html="mdBelow"></div>
  </div>
</template>

<script>
const md = require('markdown-it')({ breaks: true });

export default {
  props: ['src', 'title', 'above', 'below'],
  computed: {
    mdAbove: function() {
      return md.renderInline(this.above);
    },
    mdBelow: function() {
      return md.renderInline(this.below);
    }
  }
}
</script>

<style scoped>
.ImageWithCaption {
  margin: 2rem auto;
  text-align: center;
}
.title {
  text-align: center;
  font-size: 1.1rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.above, .below {
  margin-top: 0.5rem;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 300;
  display: block;
  font-style: italic;
  font-family: Constantia, Lucida Bright, Lucidabright, Lucida Serif, Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif, Georgia, serif;
}
img {
  margin-top: 1rem;
}
</style>
