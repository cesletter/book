<template>
  <tr class="ComparisonTr">
    <td valign="middle">{{label}}</td>
    <td valign="middle" style="text-align: center;">
      &#10004;
      <div class="extra" v-if="leftText" v-html="mdLeftText"></div>
    </td>
    <td valign="middle" style="text-align: center;">
      &#10004;
      <div class="extra" v-if="rightText" v-html="mdRightText"></div>
    </td>
  </tr>
</template>

<script>
const md = require('markdown-it')({ breaks: true });

export default {
  props: ['label', 'leftText', 'rightText'],
  computed: {
    mdLeftText: function() {
      return md.renderInline(this.leftText);
    },
    mdRightText: function() {
      return md.renderInline(this.rightText);
    }
  }
}
</script>

<style scoped>
.ComparisonTr .extra {
  padding-top: 1rem;
}
</style>

