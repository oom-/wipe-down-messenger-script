var mouseOver = new MouseEvent('mouseover', {
    'view': window,
    'bubbles': true,
    'cancelable': true
});
(async () => {

    let sleep = (ms) => new Promise(res => setTimeout(res, ms));

    [...document.querySelectorAll('div[role="gridcell"][data-scope="messages_table"][tabIndex="0"]')].forEach(htmlelement => htmlelement.dispatchEvent(mouseOver));
    await sleep(2000);
    let plus = [...document.querySelectorAll('div[aria-expanded="false"][aria-label="Plus"]')];

    while (plus.length > 0) {
        [...document.querySelectorAll('div[role="gridcell"][data-scope="messages_table"][tabIndex="0"]')].forEach(htmlelement => htmlelement.dispatchEvent(mouseOver));
        plus = [...document.querySelectorAll('div[aria-expanded="false"][aria-label="Plus"]')];
        try {
            plus[0].click();
            await sleep(200);
        }
        catch (ex) { console.log(":)"); }
        try {
            document.querySelector('div[aria-label="Supprimer le message"]').click();
            await sleep(200);
        }
        catch (ex) { console.log(":|"); }
        try {
            [...document.querySelectorAll('div span span')].filter(html => html.innerText.trim().toLowerCase() == "supprimer")[0].click();
            await sleep(200);
        }
        catch (ex) { console.log(":(") }
    }
    console.log("wipe down finished!");
    alert("Clear");
})();
