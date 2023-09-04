# DOM update highlighter

This WebExtension highlights [DOM](https://en.wikipedia.org/wiki/Document_Object_Model) updates as they happen on a webpage.

![Mozilla Add-on Users](https://img.shields.io/amo/users/dom-update-highlighter?logo=firefox&label=Install%20for%20Firefox) / [![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/ngbjjfmkdbnkobmnenaclacogdkalimn?logo=chrome&label=Install%20for%20Chrome)](https://chrome.google.com/webstore/detail/dom-update-highlighter/ngbjjfmkdbnkobmnenaclacogdkalimn)

It can be used by frontend developers to observe inefficiencies in working with DOM, such as excessive content updates or tree rebuilds.

## Video preview

[![Watch the video](https://img.youtube.com/vi/x03lGEKPElk/0.jpg)](https://youtu.be/x03lGEKPElk)

## Cheat sheet

- Tree updates are highlighted with red outline and fade-in transition animation
- Text content updates are highlighted with green
- Attribute updates are highlighted with yellow (but `style` attribute changes are ignored)

## Implementation

This extension is powered by [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) API.
