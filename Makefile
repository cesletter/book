VERSION := 1.0.0

_release:
	mkdir _release _release/$(VERSION)
	./pandoc_epub.sh -o _release/$(VERSION)/ces-letter.epub
	epubcheck _release/$(VERSION)/ces-letter.epub
	set -o pipefail && ./pandoc.sh --self-contained --css='pandoc/pdf.css' --template='pandoc/pdf.html' | wkhtmltopdf -s B5 -L 20mm -R 20mm -T 15mm -B 15mm - _release/$(VERSION)/complete-guide-to-rails-performance.pdf
	./pandoc.sh -o _release/$(VERSION)/ces-letter.html --self-contained --css='pandoc/html.css' --template='pandoc/book.html'
	./pandoc.sh -o _release/$(VERSION)/ces-letter.txt
	#kindlegen -dont_append_source -c1 _release/$(VERSION)/ces-letter.epub
	#tar -zcvf _release/ces-letter-$(VERSION).tar.gz _release/$(VERSION)
	#zip -r _release/ces-letter-$(VERSION).zip _release/$(VERSION)

clean:
	rm -rf _release

wordcount:
	wc -w `find . -name "*.md"`