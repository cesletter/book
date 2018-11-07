<template>
  <q> 
    {{quote}}
  </q>
</template>

<script>
export default {
  props: ['quote']
}
</script>

<style scoped>
q {
  quotes: "“" "‘" "”" "’";
  font-style: italic;
  font-family: Constantia, Lucida Bright, Lucidabright, Lucida Serif, Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif, Georgia, serif;
  margin: 0 2rem;
  display: block;
  line-height: 1.5rem;
}
q:before {
  content: open-quote;
}
q:after {
  content: open-quote;
}
</style>
