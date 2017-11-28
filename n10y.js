var converted = new Set();
function convert(x) {
    let k = "";

    let fillBuffer = false;
    let buffer = "";

    let flush = () => {
        if (buffer.length <= 2) {
            k += buffer;
        } else {
            k += buffer[0] + (buffer.length - 2) + buffer[buffer.length - 1];
        }
        buffer = "";
    }

    for (let i = 0; i < x.length; i++) {
        const c = x[i];
        if (c.match(/[a-z]/i)) {
            fillBuffer = true;
            buffer += c;
        }
        else {
            if (fillBuffer) {
                flush();
                fillBuffer = false;
            }
            k += c;
        }
    }

    if (fillBuffer) {
        flush();
    }

    return k;
}

function n10y(root) {
    for (var child of root.childNodes || []) {
        n10y(child);
    }
    if (root.nodeName == "#text" && !converted.has(root)) {
        root.nodeValue = convert(root.nodeValue);
        converted.add(root);
    }
}

n10y(document.body);

var observer = new MutationObserver(function (changes) {
    for (var change of changes) {
        n10y(change.target);
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});