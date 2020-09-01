# streem-sdk-node

Documentation, Examples, and Issue Tracking for the Streem SDK for Node


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

### Embedded SSO Token

To create an Embedded SSO Token, first create a `TokenBuilder`:

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

Now provide `token` to your front-end client.  This token can be placed on Streem URLs to automatically authenticate the user.

For example, to create an `iframe` to the embed page in streem, you might have:

```html
    <iframe src="https://{company-code}.streempro.app#token={token}"/>
```

Be sure to substitute `{company-code}` and `{token}` for the correct values. 

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
