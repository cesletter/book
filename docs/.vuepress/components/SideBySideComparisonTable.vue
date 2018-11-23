<template>
  <section class="SideBySideComparisonTable">
    <table class="table" width="100%">
      <thead>
        <tr>
          <th>{{leftTitle}}</th>
          <th>{{rightTitle}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="itemPair in this.itemArray">
          <td width="50%" v-for="item in itemPair">
            {{ item }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import _ from 'lodash';

export default {
  props: ['leftTitle', 'rightTitle', 'leftItems', 'rightItems'],
  computed: {
    itemArray: function() {
      return _.zip(this.leftItems.split('|'), this.rightItems.split('|'));
    }
  }
}
</script>

<style scoped>
table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
}
th {
  border: none;
  border-bottom: 1px solid #dfe2e5;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
th:first-child {
  border-right: 1px solid #dfe2e5;
}
tr {
  border: none;
}
td {
  border: none;
  font-style: italic;
  font-family: Constantia, Lucida Bright, Lucidabright, Lucida Serif, Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif, Georgia, serif;
}
td:first-child {
  text-align: right;
  border-right: 1px solid #dfe2e5;
}
</style>
