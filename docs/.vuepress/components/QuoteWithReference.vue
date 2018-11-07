<template>
  <blockquote>
    <p class="quotation"> 
      {{quote}}
    </p>
    <footer>
      &mdash; {{attribution}}<span v-if="source">,</span>
      <a v-if="link" :href="link" class="italic">{{source}}</a>
      <span v-else class="italic">{{source}}</span>
    </footer>
  </blockquote>
</template>

<script>
export default {
  props: ['quote', 'attribution', 'source', 'link']
}
</script>

<style scoped>
blockquote{
  color: #666;
  font-size: 1rem;
  margin: 0.5rem, 1rem;
  quotes: "“" "‘" "”" "’";
  line-height: 1rem;
  border-left: none;
}

blockquote:before {
  content: open-quote;
  display: inline;
  line-height: 0;
  left: -10px;
  position: relative;
  top: 30px;
  color: #ccc;
  font-size: 3rem;
}

p{
  margin: 0;
  font-style: italic;
  font-family: Constantia, Lucida Bright, Lucidabright, Lucida Serif, Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif, Georgia, serif;
}

footer {
  margin: 1rem 0 1.25rem;
  text-align: left;
  font-size: 0.8rem;
  text-transform: uppercase;
}
.italic {
  font-style: italic;
}
</style>
