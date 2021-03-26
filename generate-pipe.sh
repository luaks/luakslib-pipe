#!/bin/env sh

set -x

cat pipe.head.ts.tmpl > pipe.ts
node generate-pipe-method-signature.js 20 >> pipe.ts
cat pipe.tail.ts.tmpl >> pipe.ts
