#!/bin/sh -c '
  mkdir -p tmp/data && \
  echo "{\"follow_host\":\"tile38-leader\",\"follow_port\":9851,\"logconfig\":{\"level\":\"debug\",\"encoding\":\"json\",\"outputPaths\":[\"stdout\"],\"errorOutputPaths\":[\"stderr\"],\"encoderConfig\":{\"messageKey\":\"message\",\"levelKey\":\"level\",\"levelEncoder\":\"lowercase\",\"timeKey\":\"timestamp\",\"timeEncoder\":\"ISO8601\"}}}" > tmp/data/config && \
  tile38-server -d ./data -vv -p 9852 -l json \
  FOLLOW tile38-leader 9581'