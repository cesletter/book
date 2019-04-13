<template>
  <div class="UpdateBox">
    <strong>UPDATE:</strong>
    <span v-html="mdContent"/>
  </div>
</template>

<script>
export default {
  props: ['content'],
  computed: {
    mdContent: function() {
      const md = require('markdown-it')({ breaks: true });
      return md.renderInline(this.content).replace(/\<br\>/g, '<div style="padding-top: 0.5rem;"></div>');
    }
  }
}
</script>

<style scoped>
.UpdateBox {
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #555555;
  background-color: #efefef;
  border-color: #bcbebf;
  position: relative;
  padding: .75rem 1.25rem;
  border: 1px solid transparent;
  border-radius: .25rem;
  line-height: 1.5rem;
}
.UpdateBox strong {
  color: #990000;
}
</style>
