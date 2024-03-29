# ![Baskin](UserApp/public/logo.svg)

- A social marketplace
- Full stack web application


<img src="https://misc.jorahty.repl.co/slide1.1.png" height="300">
<img src="https://misc.jorahty.repl.co/slide2.png" height="300">
<a href="https://www.figma.com/file/hkqIc1NAWjC28zoSLmA1uI/Baskin?node-id=0%3A1&t=Ze5xpN8lw7xfEws1-1">
  <img src="https://misc.jorahty.repl.co/slide3.png" height="300">
</a>
<br/>
<a href="https://baskin.app">
  <img src="https://misc.jorahty.repl.co/slide4.png" height="300">
</a>

## Team Resources

- [Vision](https://www.figma.com/file/hkqIc1NAWjC28zoSLmA1uI/Baskin?node-id=0%3A1&t=Ze5xpN8lw7xfEws1-1)
- [Notes](https://docs.google.com/document/d/1zjuPqCsQpCjlhJ7SZhbAtzikMBd1pV0zPKcdK4fmx30)
- [Communication](https://app.slack.com/client/T04HECRSELF/C04KPBEV1U5)
- [Issue Tracking](https://github.com/users/jorahty/projects/2)

## Ports

<table>
<tr><td>UserApp</td><td>3000</td></tr>
<tr><td>AdminApp</td><td>3001</td></tr>
<tr><td>ModeratorApp</td><td>3002</td></tr>
<tr><td>AccountService</td><td>4000</td></tr>
<tr><td>ImageService</td><td>4001</td></tr>
<tr><td>ProductService</td><td>4002</td></tr>
<tr><td>MessageService</td><td>4003</td></tr>
</table>

## Usage

Set a JWT Master Secret:

```
export ACCESS_TOKEN=some-long-secret-more-complex-than-this
```

For all micro services that use Postgres
(AccountService, ProductService, MessageService)
set environment variables:

```
POSTGRES_DB=dev
POSTGRES_USER=some-user
POSTGRES_PASSWORD=some-password
```

- Install all node packages: `npm run cis`
- Lint all code: `npm run lints`[^1]
- Start all databases: `npm run docker-up`
- Run all tests: `npm run tests`
- Start all development servers: `npm run dev`
- Stop all databases: `npm run docker-down`

[^1]: [.eslintrc](https://github.com/jorahty/baskin/blob/main/.eslintrc) is a single source of truth for the entire monolith
