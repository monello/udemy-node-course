
module.exports = (tpl, product) => {
    let html = tpl.replace(/{%PRODUCT_NAME%}/g, product.productName);
    html = html.replace(/{%IMAGE%}/g, product.image);
    html = html.replace(/{%PRICE%}/g, product.price);
    html = html.replace(/{%FROM%}/g, product.from);
    html = html.replace(/{%NUTRIENTS%}/g, product.nutrients);
    html = html.replace(/{%QUANTITY%}/g, product.quantity);
    html = html.replace(/{%DESCRIPTION%}/g, product.description);
    html = html.replace(/{%ID%}/g, product.id);

    if (!product.organic) {
        html = html.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }

    return html;
};
