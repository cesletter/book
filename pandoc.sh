pandoc $@ --metadata-file pandoc/metadata.yml \
  --toc --toc-depth=1 --fail-if-warnings --data-dir pandoc \
  docs/README.md \
  docs/preface/*.md \
  docs/dedication/*.md \
  docs/introduction/*.md \
  docs/bom/*.md \
  docs/bom-translation/*.md \
  docs/first-vision/*.md \
  docs/boa/*.md \
  docs/polygamy/*.md \
  docs/prophets/*.md \
  docs/kinderhook/*.md \
  docs/testimony/*.md \
  docs/priesthood/*.md \
  docs/witnesses/*.md \
  docs/temples/*.md \
  docs/science/*.md \
  docs/other/*.md \
  docs/conclusion/*.md \
  docs/epilogue/*.md
