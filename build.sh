#!/bin/bash

echo "Start building flox image..."
docker build -t flox .
echo "Flox image build complete."

echo "Start building flox-file-parser image..."
git submodule init
git submodule update
docker build -t flox-file-parser ./flox-file-parser
echo "Flox-file-parser image build complete."

echo "Building docker images done."
