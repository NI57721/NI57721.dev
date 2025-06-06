.DEFAULT_GOAL := help
.PHONY: help run upload upload-raw

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

## convert: Convert and resize image files.
convert:
	scripts/convert.sh

## remove: Remove converted image files.
remove:
	scripts/remove.sh

## upload: Upload all files under the upload directory after, if needed, resized and converted.
upload:
	scripts/upload.sh

## upload-raw: Upload all files under the directory for upload as it is.
upload-raw:
	scripts/upload-raw.sh

