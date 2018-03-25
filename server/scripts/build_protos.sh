#!/bin/bash
npx pbjs -t static-module -w commonjs -o ../src/protos/protos.js ../src/protos/*.proto
cp ../src/protos/protos.js ../build/src/protos/
cp ../src/protos/protos.js ../../client/src/app/protos/
npx pbts -o ../src/protos/protos.d.ts ../src/protos/protos.js
cp ../src/protos/protos.d.ts ../build/src/protos/
cp ../src/protos/protos.d.ts ../../client/src/app/protos/
