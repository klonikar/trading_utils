function getSymbolDetails(parent_path, symbol_path, price_path, price_change_path) {
	symbol_path = parent_path + symbol_path
	price_path = parent_path + price_path
	price_change_path = parent_path + price_change_path

	let last_prices = document.querySelectorAll(price_path)
	let instrument_names = document.querySelectorAll(symbol_path)
	let price_changes = document.querySelectorAll(price_change_path)

	let instrument_price_delta_table = {}
	for(let i = 0;i < instrument_names.length;i++) {
	    console.log(instrument_names[i].innerText, last_prices[i].innerText, price_changes[i].innerText)
	    instrument_price_delta_table[instrument_names[i].innerText] = {'price': parseFloat(last_prices[i].innerText), 'delta': parseFloat(price_changes[i].innerText)}
	}
	return instrument_price_delta_table
}

function getSymbolDetailsFromHeader() {
	let parent_path = '.app > .header > .wrapper > .header-left > .pinned-instruments > .instrument-widget' // it can be with #app also
	let symbol_path = ' > .tradingsymbol > span'
	let price_path = '  > .wrap > .last-price'
	let price_change_path = ' .wrap > .price-change > span'

	return getSymbolDetails(parent_path, symbol_path, price_path, price_change_path)
}

function getSymbolDetailsFromWatchList() {
	let parent_path = '.app > .container > .container-left > .marketwatch-sidebar > .instruments > .vddl-list > .vddl-draggable.instrument > div > .info' // it can be with #app also
	let symbol_path = ' > .symbol-wrapper > .symbol > .nice-name'
	let price_path = '  > .price-wrapper > .price > .last-price'
	let price_change_path = ' .price-wrapper > .price-change > .dim > .price-absolute'

	return getSymbolDetails(parent_path, symbol_path, price_path, price_change_path)
}

/**

https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

Placing GTT:
POST https://kite.zerodha.com/oms/gtt/triggers
Form data:
condition: {"exchange":"NFO","tradingsymbol":"BANKNIFTY23FEB44400CE","trigger_values":[5.75],"last_price":5.25}
orders: 
[{"exchange":"NFO","tradingsymbol":"BANKNIFTY23FEB44400CE","transaction_type":"BUY","quantity":25,"price":5.75,"order_type":"LIMIT","product":"NRML"}]
type: single
expires_at: 2024-02-19 00:00:00

Request headers: accept: application/json, text/plain, */*
:authority: kite.zerodha.com
:method: POST
:path: /oms/gtt/triggers
:scheme: https
accept: application/json, text/plain, */*
accept-encoding: gzip, deflate, br
accept-language: en,mr;q=0.9,en-US;q=0.8,hi;q=0.7
authorization: enctoken fqWd2QIhwM36xEs1n2OI/BcgEgbT/y9YhdluXh7Lm5ruEIVseEn5DKR2Nkbjut6iWpjpYJVlKUycQYG1bP/xh1o2SMu3qozCDgahptbYl9Y6Mdqyjacfkg==
content-length: 445
content-type: application/x-www-form-urlencoded
cookie: _ga=GA1.2.1628222949.1664988141; kf_session=SRYZljlgyH7EYzy8ujuKtNRMtw1DMEbL; user_id=QXS926; public_token=OIgPr21qaO0Ny99RPYzoTDJnUaBL4T2v; enctoken=fqWd2QIhwM36xEs1n2OI/BcgEgbT/y9YhdluXh7Lm5ruEIVseEn5DKR2Nkbjut6iWpjpYJVlKUycQYG1bP/xh1o2SMu3qozCDgahptbYl9Y6Mdqyjacfkg==; _cfuvid=I5LU2KzxyKq31IFkbeBZUCusChDfq48M8.QYpVhV_dg-1676813437315-0-604800000
origin: https://kite.zerodha.com
referer: https://kite.zerodha.com/orders
sec-ch-ua: "Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "macOS"
sec-fetch-dest: empty
sec-fetch-mode: cors
sec-fetch-site: same-origin
user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36
x-kite-app-uuid: f19246cf-74c0-4494-8a2d-b55800821979
x-kite-userid: QXS926
x-kite-version: 3.0.13

Response headers: alt-svc: h3=":443"; ma=86400, h3-29=":443"; ma=86400
cache-control: no-cache
cf-cache-status: DYNAMIC
cf-ray: 79bf9deb7e04f34f-BOM
content-encoding: br
content-security-policy: frame-ancestors 'self' https://*.zerodha.com https://microapps.google.com/;
content-type: application/json
date: Sun, 19 Feb 2023 14:15:50 GMT
server: cloudflare
strict-transport-security: max-age=15552000
x-frame-options: SAMEORIGIN

Response:
{"status":"success","data":{"trigger_id":139288294}}

GET request:
Request Headers:
:authority: kite.zerodha.com
:method: GET
:path: /oms/gtt/triggers
:scheme: https
accept: application/json, text/plain, */*
accept-encoding: gzip, deflate, br
accept-language: en,mr;q=0.9,en-US;q=0.8,hi;q=0.7
authorization: enctoken fqWd2QIhwM36xEs1n2OI/BcgEgbT/y9YhdluXh7Lm5ruEIVseEn5DKR2Nkbjut6iWpjpYJVlKUycQYG1bP/xh1o2SMu3qozCDgahptbYl9Y6Mdqyjacfkg==
cookie: _ga=GA1.2.1628222949.1664988141; kf_session=SRYZljlgyH7EYzy8ujuKtNRMtw1DMEbL; user_id=QXS926; public_token=OIgPr21qaO0Ny99RPYzoTDJnUaBL4T2v; enctoken=fqWd2QIhwM36xEs1n2OI/BcgEgbT/y9YhdluXh7Lm5ruEIVseEn5DKR2Nkbjut6iWpjpYJVlKUycQYG1bP/xh1o2SMu3qozCDgahptbYl9Y6Mdqyjacfkg==; _cfuvid=I5LU2KzxyKq31IFkbeBZUCusChDfq48M8.QYpVhV_dg-1676813437315-0-604800000
referer: https://kite.zerodha.com/orders
sec-ch-ua: "Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "macOS"
sec-fetch-dest: empty
sec-fetch-mode: cors
sec-fetch-site: same-origin
user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36
x-kite-app-uuid: f19246cf-74c0-4494-8a2d-b55800821979
x-kite-userid: QXS926
x-kite-version: 3.0.13

Response Headers:
alt-svc: h3=":443"; ma=86400, h3-29=":443"; ma=86400
cache-control: no-cache
cf-cache-status: DYNAMIC
cf-ray: 79bf9dec3f95f34f-BOM
content-encoding: br
content-security-policy: frame-ancestors 'self' https://*.zerodha.com https://microapps.google.com/;
content-type: application/json
date: Sun, 19 Feb 2023 14:15:50 GMT
etag: W/"WUBwl7flhluvmq3K"
server: cloudflare
strict-transport-security: max-age=15552000
x-frame-options: SAMEORIGIN

Response:
{"status":"success","data":[{"id":139288294,"user_id":"QXS926","parent_trigger":null,"type":"single","created_at":"2023-02-19 19:45:50","updated_at":"2023-02-19 19:45:50","expires_at":"2023-02-24 00:00:00","status":"active","condition":{"exchange":"NFO","last_price":5.25,"tradingsymbol":"BANKNIFTY23FEB44400CE","trigger_values":[5.75],"instrument_token":14827522},"orders":[{"exchange":"NFO","tradingsymbol":"BANKNIFTY23FEB44400CE","product":"NRML","order_type":"LIMIT","transaction_type":"BUY","quantity":25,"price":5.75,"result":null}],"meta":{}}]}

Code to invoke GET GTTs:
fetch('/oms/gtt/triggers', {credentials: 'include', headers: {method: 'GET', 'authorization': 'enctoken fqWd2QIhwM36xEs1n2OI/BcgEgbT/y9YhdluXh7Lm5ruEIVseEn5DKR2Nkbjut6iWpjpYJVlKUycQYG1bP/xh1o2SMu3qozCDgahptbYl9Y6Mdqyjacfkg==', referer: 'https://kite.zerodha.com/orders', 'x-kite-app-uuid': 'f19246cf-74c0-4494-8a2d-b55800821979', 'x-kite-userid': 'QXS926', 'x-kite-version': '3.0.13', }}).then((response) => response.json())
  .then((data) => console.log(data))


Place order:
:authority: kite.zerodha.com
:method: POST
:path: /oms/orders/regular
:scheme: https
accept: application/json, text/plain, */*
accept-encoding: gzip, deflate, br
accept-language: en,mr;q=0.9,en-US;q=0.8,hi;q=0.7
authorization: enctoken fqWd2QIhwM36xEs1n2OI/BcgEgbT/y9YhdluXh7Lm5ruEIVseEn5DKR2Nkbjut6iWpjpYJVlKUycQYG1bP/xh1o2SMu3qozCDgahptbYl9Y6Mdqyjacfkg==
content-length: 247
content-type: application/x-www-form-urlencoded
cookie: _ga=GA1.2.1628222949.1664988141; kf_session=SRYZljlgyH7EYzy8ujuKtNRMtw1DMEbL; user_id=QXS926; public_token=OIgPr21qaO0Ny99RPYzoTDJnUaBL4T2v; enctoken=fqWd2QIhwM36xEs1n2OI/BcgEgbT/y9YhdluXh7Lm5ruEIVseEn5DKR2Nkbjut6iWpjpYJVlKUycQYG1bP/xh1o2SMu3qozCDgahptbYl9Y6Mdqyjacfkg==; _cfuvid=I5LU2KzxyKq31IFkbeBZUCusChDfq48M8.QYpVhV_dg-1676813437315-0-604800000
origin: https://kite.zerodha.com
referer: https://kite.zerodha.com/orders
sec-ch-ua: "Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "macOS"
sec-fetch-dest: empty
sec-fetch-mode: cors
sec-fetch-site: same-origin
user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36
x-kite-app-uuid: f19246cf-74c0-4494-8a2d-b55800821979
x-kite-userid: QXS926
x-kite-version: 3.0.13

Form data:
variety: regular
exchange: NFO
tradingsymbol: BANKNIFTY23FEB42000CE
transaction_type: BUY
order_type: LIMIT
quantity: 25
price: 0.05
product: NRML
validity: DAY
disclosed_quantity: 0
trigger_price: 0
squareoff: 0
stoploss: 0
trailing_stoploss: 0
user_id: QXS926

Response:
{"status":"error","message":"Markets are closed right now. Use GTT for placing long standing orders instead. [Read more.](https://support.zerodha.com/category/trading-and-markets/gtt/articles/what-is-the-good-till-triggered-gtt-feature)","data":null,"error_type":"InputException"}

Code to fetch orders:
fetch('https://kite.zerodha.com/oms/orders', {credentials: 'include', headers: {method: 'GET', 'authorization': 'enctoken fqWd2QIhwM36xEs1n2OI/BcgEgbT/y9YhdluXh7Lm5ruEIVseEn5DKR2Nkbjut6iWpjpYJVlKUycQYG1bP/xh1o2SMu3qozCDgahptbYl9Y6Mdqyjacfkg==', referer: 'https://kite.zerodha.com/orders', 'x-kite-app-uuid': 'f19246cf-74c0-4494-8a2d-b55800821979', 'x-kite-userid': 'QXS926', 'x-kite-version': '3.0.13', }}).then((response) => response.json())
  .then((data) => console.log(data))

*/