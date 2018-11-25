<template>
  <div class="IndentedQuote">
    <a class="reference" v-if="referenceLink && reference" :href="referenceLink" target="_blank">{{reference}}</a>
    <div class="reference" v-if="!referenceLink && reference">{{reference}}</div>
    <div class="above-quote" v-if="aboveQuote" v-html="mdAboveQuote"></div>
    <div v-if="speaker">
      <strong>{{speaker}}:</strong>
      <q v-bind:class="className" v-html="mdQuote"></q>
    </div>
    <q v-if="!speaker" v-bind:class="className" v-html="mdQuote"></q>
    <div class="below-quote" v-if="belowQuote" v-html="mdBelowQuote"></div>
    <footer v-if="attribution || link || source">
      &mdash; {{attribution}}<span v-if="attribution">,</span>
      <a v-if="link && source" :href="link" target="_blank" class="italic">{{source}}</a>
      <span v-if="!link && source" class="italic">{{source}}</span>
    </footer>
  </div>
</template>

<script>
const md = require('markdown-it')({ breaks: true });
const format = (text) => {
  return md
    .renderInline(text)
    .replace(/\<br\>/g, '<div style="padding-top: 0.5rem;"></div>')
    .replace(/\\n/g, '<br>');
}

export default {
  props: [
    'reference',
    'referenceLink',
    'quote',
    'aboveQuote',
    'belowQuote',
    'className',
    'attribution',
    'source',
    'link',
    'speaker'
  ],
  computed: {
    mdQuote: function() {
      return format(this.quote);
    },
    mdAboveQuote: function() {
      return format(this.aboveQuote);
    },
    mdBelowQuote: function() {
      return format(this.belowQuote);
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
q.no-quotation-marks {
  quotes: "" "" "" "";
}
q:before {
  content: open-quote;
}
q:after {
  content: open-quote;
}
.above-quote {
  margin-bottom: 1rem;
  line-height: 1.4rem;
  font-style: italic;
  text-align: center;
  font-family: Constantia, Lucida Bright, Lucidabright, Lucida Serif, Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif, Georgia, serif;
}
.below-quote {
  margin-top: 1rem;
  line-height: 1.4rem;
}
.reference {
  display: block;
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
