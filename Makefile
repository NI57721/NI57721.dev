.DEFAULT_GOAL := help
.PHONY: help run upgrade check convert delete-exif remove upload upload-raw

## help: Display this message.
help:
	@grep --perl-regexp "^## [a-zA-Z_-]+: .[^\n]*$$" $(MAKEFILE_LIST) \
	| awk 'BEGIN {FS = "^## |: "}; {printf "\033[36m%-20s\033[0m %s\n", $$2, $$3}'

## run: Run a develop server listening on all addresses.
run:
	pnpm run dev --host

## upgrade: Upgrade dependencies.
upgrade:
	pnpm dlx @astrojs/upgrade

## check: Check Astro files.
check:
	pnpm astro check

## convert: Convert and resize image files.
convert:
	scripts/convert.sh

## delete-exif: Delete exif data from all files to be uploaded.
delete-exif:
	scripts/delete-exif.sh

## remove: Remove converted files.
remove-converted:
	scripts/remove-converted.sh

## upload-converted: Upload converted files under the upload directory.
upload-converted:
	scripts/upload-converted.sh

## upload-raw: Upload all files under the directory for upload as it is.
upload-raw:
	scripts/upload-raw.sh

## cur: Convert image files and then upload and remove them.
cur: delete-exif convert upload-converted remove-converted

