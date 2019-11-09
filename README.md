# Privacy API

Privacy API is an NPM Package for for communicating with the privacy.com API

## Installation

Use the package manager [npm](https://www.npmjs.com/get-npm) to install `privacy-api`.

```bash
$ npm install privacy-api
```

## Usage

Responses are returned as standard [axios responses](https://github.com/axios/axios#response-schema)

Constructor: `privacy(API_KEY, sandbox = true, version = 1)`
    - `API_KEY`: Your developer environment API Key
    - `sandbox`: Whether you want to use the sandbox API or the production API
    - `version`: The API version to use (currently only supports version 1)

```javascript
const privacy = require('privacy-api');
let privacy_api = new privacy(<API-KEY>); // Initialize the privacy object with your API key
let response = await privacy_api.list_cards(); // Async functions

console.log(response.data);
```

## Available Functions

### list_cards
- Lists all available cards for the authenticated user
- Documentation available at: [https://developer.privacy.com/docs#endpoints-list-cards](https://developer.privacy.com/docs#endpoints-list-cards)

```javascript
let response = await list_cards(page, page_size, begin, end, card_token);
```

### list_transactions
- Lists all transactions for the given `approval_status`
- Documentation available at: [https://developer.privacy.com/docs#endpoints-list-transactions](https://developer.privacy.com/docs#endpoints-list-transactions)

```javascript
let response = await list_transactions(approval_status, page, page_size, begin, end, card_token, transaction_token);
```

### create_card
- Creates a new card for the authenticated user of the given `type`
- Documentation available at: [https://developer.privacy.com/docs#endpoints-create-card](https://developer.privacy.com/docs#endpoints-create-card)

```javascript
let response = await create_card(type, memo, spend_limit, spend_limit_duration);
```

### update_card
- Updates an existing card (given the `card_token`) for the authenticated user
- Documentation available at: [https://developer.privacy.com/docs#endpoints-update-card](https://developer.privacy.com/docs#endpoints-update-card)

```javascript
let response = await update_card(card_token, state, memo, spend_limit, spend_limit_duration);
```

### simulate_authorization `Sandbox Only`
- Simulates an authorization transaction as if it came from a Merchant
- The transaction is immediately marked as _pending_
- The `pan` field is the 16-digit card number
- Documentation available at: [https://developer.privacy.com/docs#endpoints-simulate-authorization](https://developer.privacy.com/docs#endpoints-simulate-authorization)

```javascript
let response = await simulate_authorization(descriptor, pan, amount);
```

### simulate_void `Sandbox Only`
- Simulates a void transaction on a _pending_ transaction
- The `token` field is the transaction token
- Documentation available at: [https://developer.privacy.com/docs#endpoints-simulate-void](https://developer.privacy.com/docs#endpoints-simulate-void)

```javascript
let response = await simulate_void(token, amount);
```

### simulate_clearing `Sandbox Only`
- Simulates clearing (or authorizing) a _pending_ transaction
- The transaction is marked as authorized
- The `token` field is the transaction token
- Documentation available at: [https://developer.privacy.com/docs#endpoints-simulate-clearing](https://developer.privacy.com/docs#endpoints-simulate-clearing)

```javascript
let response = await simulate_clearing(token, amount);
```

### simulate_return `Sandbox Only`
- Simulates a return (or refund) transaction
- The transaction is immediately marked as authorized
- The `pan` field is the 16-digit card number
- Documentation available at: [https://developer.privacy.com/docs#endpoints-simulate-return](https://developer.privacy.com/docs#endpoints-simulate-return)

```javascript
let response = await simulate_return(descriptor, pan, amount);
```

### hosted_card_ui
- Provides an `iframe` body (with an option for custom CSS)
- Allows the card provider ([privacy.com](https://privacy.com)) to directly show card details to the user
- The `card_uuid` field is card `token` provided by the API
- The `css_url` field is the location of the `CSS` file (example: https://example.com/default.css)
- Generates the embed request as well as a PCI Compliant HMAC for you
- Documentation available at: [https://developer.privacy.com/docs#hosted-card-ui](https://developer.privacy.com/docs#hosted-card-ui)

```javascript
let response = await hosted_card_ui(api_key, card_uuid, css_url);
```

*Returns an HTML string of the form:*

```HTML
<div id="card">
  <div id="pan">{PAN}</div>
  <div id="expiry">
    <span id="month">{expMonth}</span>
    <span id="separator">/</span>
    <span id="year">{expYear}</span>
  </div>
  <div id="cvv">{CVV}</div>
</div>
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)