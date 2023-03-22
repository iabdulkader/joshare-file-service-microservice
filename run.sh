#!/bin/bash
docker run -d -p 5000:5000 -v /uploads:/src/app/uploads joshare-server