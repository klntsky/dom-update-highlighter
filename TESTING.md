# Testing

This document describes testing of DOM Update Highlighter extension.
There is no automated test suite for now.

## Possible issues

- outline remains visible after animation end
- performance drops

## Test cases

1. https://github.com/torvalds/linux
  - go to pull requests
  - go to code explorer

2. https://dexscreener.com/
  - main page table updates
  - go to any popular pair, eg. https://dexscreener.com/zksync/0x80115c708e12edd42e504c1cd52aea96c547c05c
    - price updates
    - scrolling the list to the bottom

3. https://www.dextools.io/app/en/ether/pair-explorer/0x8616b44b734817a2c954016a57cf2c4d72d6f838
  - see tx list
