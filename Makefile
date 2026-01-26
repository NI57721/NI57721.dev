.DEFAULT_GOAL := help

## help: Display this message.
.PHONY: help
help:
	@grep --perl-regexp "^## [a-zA-Z_-]+: .[^\n]*$$" $(MAKEFILE_LIST) \
	| awk 'BEGIN {FS = "^## |: "}; {printf "\033[36m%-20s\033[0m %s\n", $$2, $$3}'

## dev: Run a develop server listening on all addresses.
.PHONY: dev
dev:
	pnpm run dev --host

## upgrade: Upgrade dependencies.
.PHONY: upgrade
upgrade:
	pnpm dlx @astrojs/upgrade

## check: Check Astro files.
.PHONY: check
check:
	pnpm astro check

## lint: Run eslint.
.PHONY: lint
lint:
	pnpm exec eslint src

## convert: Convert and resize image files.
.PHONY: convert
convert:
	scripts/convert.sh

## delete-exif: Delete exif data from all files to be uploaded.
.PHONY: delete-exif
delete-exif:
	scripts/delete-exif.sh

## remove-converted: Remove converted files.
.PHONY: remove-converted
remove-converted:
	scripts/remove-converted.sh

## upload-converted: Upload converted files under the upload directory.
.PHONY: upload-converted
upload-converted:
	scripts/upload-converted.sh

## upload-raw: Upload all files under the directory for upload as it is.
.PHONY: upload-raw
upload-raw:
	scripts/upload-raw.sh

## cur: Convert image files and then upload and remove them.
.PHONY: cur
cur: delete-exif convert upload-converted remove-converted

