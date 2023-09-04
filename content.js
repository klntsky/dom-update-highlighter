function injectedMain () {
    if (window.__DOM_UPDATE_HIGHLIGHTER) {
        window.__DOM_UPDATE_HIGHLIGHTER.disconnect();
        delete window.__DOM_UPDATE_HIGHLIGHTER;
        return;
    }

    const highlighted = new Map();
    let counter = 1;

    const highlight = (node, color, stepN) => {
        if (node === null) return;;

        // text node
        if (!node.style || !node.dataset) {
            node = node.parentNode;
        }

        if (!node.dataset) {
            return;
        }

        let cancelledByNewerHighlight = false;

        const cancelAnimation = () => {
            cancelledByNewerHighlight = true;
        };

        if (!node.dataset._duh) {
            node.dataset._duh = counter++;
        }

        if (highlighted.has(node.dataset._duh)) {
            const [ oldOutline, canceller ] = highlighted.get(node.dataset._duh);
            canceller();
            highlighted.set(node.dataset._duh, [ oldOutline, cancelAnimation ]);
        } else {
            highlighted.set(node.dataset._duh, [ node.style.outline, cancelAnimation ]);
        }

        let i = 100;

        const step = () => {
            if (cancelledByNewerHighlight) return;

            if (i <= 0) {
                const [ oldOutline, cancel ] = highlighted.get(node.dataset._duh);
                node.style.outline = oldOutline;
                highlighted.delete(node.dataset._duh);
                delete node.dataset._duh;
            } else {
                node.style.outline = '2px solid rgba(' + color + ' , ' + (
                    i / 100
                ) + ')';
                i -= stepN;
                window.requestAnimationFrame(step);
            }
        };

        step();
    };

    const observer = new MutationObserver((mutationsList, observer) => {
        for(const mutation of mutationsList) {
            if (mutation.type === 'characterData') {
                highlight(mutation.target, '0, 255, 0', 10);
            } else if (
                mutation.type === 'attributes' &&
                    mutation.attributeName !== 'data-_duh'
            ) {
                if (mutation.attributeName !== 'style' || (
                    // if `attributeName` is `style`, and we are already highlighting
                    // the element, the update will be skipped.
                    !mutation.target.dataset._duh &&
                    // we want to make sure `outline` property was not present
                    // this breaks for elements that already have outline manually set.
                    // We can just ignore this case for now.
                    (mutation.oldValue || "").indexOf('outline') === -1 &&
                    (mutation?.target?.style?.cssText || "").indexOf('outline') === -1
                )) {
                    highlight(mutation.target, '255, 255, 0', 20);
                }
            } else if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    highlight(node, '255, 0, 0', 10);
                });
            }
        }
    });

    observer.observe(window.document.body, {
        characterData: true,
        attributes: true,
        childList: true,
        subtree: true,
        attributeOldValue: true
    });

    window.__DOM_UPDATE_HIGHLIGHTER = observer;
}

injectedMain();
