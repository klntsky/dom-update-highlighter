function injectedMain () {
    if (window.__DOM_UPDATE_HIGHLIGHTER) {
        window.__DOM_UPDATE_HIGHLIGHTER.disconnect();
        delete window.__DOM_UPDATE_HIGHLIGHTER;
        return;
    }

    const highlighted = new Map();

    const highlight = (node, color, bg, stepN) => {
        if (!node.style) {
            node = node.parentNode;
        }

        let cancelled = false;

        const cancel = () => cancelled = true;

        let oldFilter, oldOutline;

        if (!highlighted.has(node)) {
            highlighted.set(node, [ node.style.filter, node.style.outline, cancel ]);
        } else {
            let canceller;
            [ oldFilter, oldOutline, canceller ] = highlighted.get(node);
            canceller();
        }

        let i = 100;

        const step = () => {
            if (cancelled) return;
            if (!highlighted.has(node)) {
                node.style.filter = oldFilter;
                node.style.outline = oldOutline;
                return;
            }

            if (i <= 0) {
                const [ oldFilter, oldOutline, cancel ] = highlighted.get(node);
                !bg || (node.style.filter = oldFilter);
                node.style.outline = oldOutline;
                highlighted.delete(node);
            } else {
                !bg || (node.style.filter = 'invert(' + (i/4) + '%)');
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
                    mutation.attributeName !== 'style'
            ) {
                highlight(mutation.target, '255, 255, 0', false, 25);
            } else if (mutation.type === 'childList') {
                const nodes = mutation.addedNodes;
                nodes.forEach(node => {
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
