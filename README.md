# streem-sdk-node

Server-side node library for interacting with the Streem API, and generation of Streem Tokens for use in client SDKs or Embedded SSO.

## Installation

Add the Streem SDK dependency to your project

```
yarn add @streem/sdk-node
```

Or

```
npm install @streem/sdk-node
```

## Usage

First, import the library:

```typescript
import Streem from "@streem/sdk-node"
```

Then initialize the library with your API Key ID and Secret:

```typescript
    Streem.init(apiKeyId, apiKeySecret)
```

### Streem Tokens

To create a Streem Token, first create a `TokenBuilder`:

```typescript
    const builder = new Streem.TokenBuilder()
```

Then specify the details for the currently logged-in user:
```typescript
    const user = // your logged in user

    // required
    builder.userId = user.id
    
    // recommended
    builder.name = user.name
    builder.email = user.email
    builder.avatarUrl = user.avatar
```

Finally, call `build()` to generate the token string:
```typescript
    const token = builder.build()
```

#### Embedded SSO

Embedded SSO allows you to create Streem Tokens server-side, and automatically log your users into the Streem web application.

First, provide the `token` created above to your front-end browser client.  Next, place the token in the hash portion of any Streem web application URL,
by appending `#token=...` with your token.

For example, to create an `iframe` to the root page in Streem, you might have:

```html
    <iframe src="https://{company-code}.streempro.app#token={token}"/>
```

Be sure to substitute `{company-code}` and `{token}` for the correct values.

#### Streem Client SDKs

If using the iOS or Android SDKs, you will provide the Streem Token to the client, and pass to the SDK via `Streem.identify()`.  More
details can be found in documentation of the individual SDKs

## License

This repo is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
