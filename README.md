# Automated daily cat facts with GitHub Actions 🐈

**🐈 Fact of the day:**
```
A cat’s eyesight is both better and worse than humans. It is better because cats can see in much dimmer light and they have a wider peripheral view. It’s worse because they don’t see color as well as humans do. Scientists believe grass appears red to cats.
```

---

## Status
![status](https://github.com/hlhielkema/cat_facts_readme/workflows/Automated%20update%20README/badge.svg)

## How it works
This repository uses **GitHub Actions** to automatically update the cat fact in the `README.md`.

### Schedule
The GitHub action will run when a change is pushed and every 24 hours.

``` yaml
on:
  push:
    branches: [ master ]  
  schedule: 
    - cron:  '0 1 * * *'
```
> **WARNING:** I updated the action in this repository to run once a month to prevent creating too many commits.

### Steps
- Checkout the repository
- Run `build-md.js` with Node.js  
  - Fetch a random cat fact with a public API.
  - Read the template file from the repository.
  - Replace the placeholder tag by the cat fact.
  - Write the result of the previous step to README.md
- Add and commit the new Markdown file.

*Checkout the repository:*
```
    - uses: actions/checkout@v2
```

*Run `build-md.js` with Node.js:*
```
    - name: Use Node.js ${{ matrix.node-version }}    
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}        
    - run: node build-md.js    
```

*Add and commit the new MarkDown file:*
```
    - name: Commit changes
      uses: EndBug/add-and-commit@v4
      with:
        author_name: H.L. Hielkema
        author_email: hielkehielkema93@gmail.com
        message: "Update Cat fact"
        add: "*.md"
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

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
