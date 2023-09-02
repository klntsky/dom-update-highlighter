# DOM update highlighter

This webextension highlights [DOM](https://en.wikipedia.org/wiki/Document_Object_Model) updates as they happen on a webpage.

It can be used by frontend developers to observe inefficiencies in working with DOM, such as excessive content updates or tree rebuilds.

Here's a cheat sheet:

- Tree updates are highlighted with red outline and fade-in transition animation
- Text content updates are highlighted with green
- Attribute updates are highlighted with yellow (but `style` attribute changes are ignored)

This extension is powered by [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) API.
