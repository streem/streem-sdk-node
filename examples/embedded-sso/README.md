# Embedded SSO Example

The Embedded SSO app demonstrates how to use the Streem SDK to generate a
token that will automatically log your users into the Streem Web portal.

## Server

In the `server` directory, first create your `.env` file:

```
cp .env.template .env
```

Then edit the `.env` file with your API Key ID and Secret. If you are not using a
production environment, you need to add the API_ENVIRONMENT variable as well (dev,
prod-us, etc.).

Next, install dependencies and start the server:

```
yarn && yarn start
```

## Client

With the server started above, go to the `client` directory, and simply install dependencies and start the client:

```
yarn && yarn start
```

This will open your web browser to the example app. Here you can specify the user details that
will login to Streem. Normally you would get these values from your logged-in user of your app,
but this example demonstrates the functionality without the need to authenticate first.

In production of course, you would only want to generate tokens for users that were authenticated
with your backend.

## License

This repo is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
