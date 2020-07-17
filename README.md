# Automated daily cats fact with GitHub actions

```
The world's largest cat measured 48.5 inches long.
```

---

## How it works
This repository uses **GitHub Actions** to automatically update the cat fact in the `README.md`.

### Schedule
The GitHub action will run when a change is pushed and every 24 hours.

``` yaml
on:
  push:
    branches: [ master ]  
  schedule: 
    - cron:  '*/15 * * * *'
```

### Steps
- Checkout the repository
- Run `build-md.js` with Node.js
  - Clone this repository.
  - Fetch a random cat fact with a public API.
  - Read the template file from the repository.
  - Replace the placeholder tag by the cat fact.
  - Write the result of the previous step to README.md
- Add and commit the new Markdown file.

### Cat facts source
The cat facts are fetched from a public API:

```
https://cat-fact.herokuapp.com/facts/random
```
> [Read more about this API](https://alexwohlbruck.github.io/cat-facts/docs/endpoints/facts.html)

### Read more

- [Checkout Action](https://github.com/actions/checkout)
- [Schedule GitHub Action](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#schedule)
- [Add & Commit (GitHub Action)](https://github.com/marketplace/actions/add-commit)