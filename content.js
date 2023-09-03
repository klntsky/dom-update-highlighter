function injectedMain () {
    if (window.__DOM_UPDATE_HIGHLIGHTER) {
        window.__DOM_UPDATE_HIGHLIGHTER.disconnect();
        delete window.__DOM_UPDATE_HIGHLIGHTER;
        return;
    }

    const highlighted = new Map();
    let counter = 1;

    const highlight = (node, color, changeStyleFilter, stepN) => {
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

        let ix;
        if (!node.dataset._duh) {
            ix = counter++;
            node.dataset._duh = ix;
        }

        if (highlighted.has(node.dataset._duh)) {
            const [ oldFilter, oldOutline, canceller ] = highlighted.get(node.dataset._duh);
            canceller();
            highlighted.set(node.dataset._duh, [ oldFilter, oldOutline, cancelAnimation ]);
        } else {
            highlighted.set(node.dataset._duh, [node.style.filter, node.style.outline, cancelAnimation ]);
        }

        let i = 100;

        const step = () => {
            if (cancelledByNewerHighlight) return;

            if (i <= 0) {
                const [ oldFilter, oldOutline, cancel ] = highlighted.get(node.dataset._duh);
                if (changeStyleFilter) {
                    node.style.filter = oldFilter;
                }
                node.style.outline = oldOutline;
                highlighted.delete(node.dataset._duh);
                delete node.dataset._duh;
            } else {
                if (changeStyleFilter) {
                    node.style.filter = 'invert(' + (i/4) + '%)';
                }
                node.style.outline = '2px solid rgba(' + color + ' , ' + (
                    1 - ((1 - i / 100) ** 2)
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
                highlight(mutation.target, '0, 255, 0', false, 10);
            } else if (
                mutation.type === 'attributes' &&
                    mutation.attributeName !== 'data-_duh' &&
                    mutation.attributeName !== 'style'
            ) {
                highlight(mutation.target, '255, 255, 0', false, 25);
            } else if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    highlight(node, '255, 0, 0', true, 10);
                });
            }
        }
    });

    observer.observe(window.document.body, {
        characterData: true,
        attributes: true,
        childList: true,
        subtree: true
    });

    window.__DOM_UPDATE_HIGHLIGHTER = observer;
}

injectedMain();
