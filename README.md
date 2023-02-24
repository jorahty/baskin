# ![Baskin](UserApp/public/logo.svg)

- A social marketplace
- Full stack web application
- Group project for [CSE 187](https://courses.engineering.ucsc.edu/courses/cse187)

## Team Resources

- [Vision](https://www.figma.com/file/hkqIc1NAWjC28zoSLmA1uI/Baskin?node-id=0%3A1&t=Ze5xpN8lw7xfEws1-1)
- [Notes](https://docs.google.com/document/d/1zjuPqCsQpCjlhJ7SZhbAtzikMBd1pV0zPKcdK4fmx30)
- [Communication](https://app.slack.com/client/T04HECRSELF/C04KPBEV1U5)
- [Issue Tracking](https://github.com/users/jorahty/projects/2)

## Usage

Set a JWT Master Secret:
```
export ACCESS_TOKEN=some-long-secret-more-complex-than-this
```

Set environment variables in `AccountService/.env` and `UserApp/.env`:
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

## Ports

<table>
<tr>
  <th>Micro Service</th><th>Port</th>
</tr>
<tr>
  <td>AccountService</td><td>3011</td>
</tr>
<tr>
  <td>ImageService</td><td>3012</td>
</tr>
</table>
