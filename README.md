# DOM update highlighter

This WebExtension highlights [DOM](https://en.wikipedia.org/wiki/Document_Object_Model) updates as they happen on a webpage.

[![Mozilla Add-on Users](https://img.shields.io/amo/users/dom-update-highlighter?logo=firefox&label=Install%20for%20Firefox)](https://addons.mozilla.org/en-US/firefox/addon/dom-update-highlighter/) [![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/ngbjjfmkdbnkobmnenaclacogdkalimn?logo=chrome&label=Install%20for%20Chrome)](https://chrome.google.com/webstore/detail/dom-update-highlighter/ngbjjfmkdbnkobmnenaclacogdkalimn) [![donate](https://img.shields.io/badge/donate-333333)](https://klntsky.dev/donate.html)

It can be used by frontend developers to observe inefficiencies in working with DOM, such as excessive content updates or tree rebuilds.

## Video preview

[![Watch the video](https://img.youtube.com/vi/x03lGEKPElk/0.jpg)](https://youtu.be/x03lGEKPElk)

## Usage Instructions

See [the website](https://dom-up.date).


## Cheat sheet

- Tree updates - red outline
- Text content updates - green outline
- Attribute updates - blue outline

## Implementation

This extension is powered by [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) API.
