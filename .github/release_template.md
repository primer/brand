## ❗ Pre-merge checklist

Please ensure these items are checked before merging.

### ✅ Preliminary checks

- [ ] All CI checks pass on this pull request
- [ ] Docs and Storybook previews open in a browser

### 🔌 Integration smoke tests

#### Dotcom

- Performed successful integration test with `github/github-ui`, as a primary consumer of Primer Brand
  - [ ] Install RC: `npm install @primer/react-brand@{RC_VERSION} -w @github-ui/swp-core`
  - [ ] Run development server
  - [ ] Manually verify release-specific bugfixes and/or features on the following pages:
    - `/home`
    - `/features/copilot`
    - `/features/copilot/plans`
    - `/features/copilot/tutorials`
    - `/features/preview`
    - `/enterprise`
    - `/enterprise/contact`
    - `/security/advanced-security`
    - `/education`
    - `/mobile`
    - `/about/diversity`
    - `/newsroom`
    - `/resources/articles`
    - `/resources/articles/software-development`
    - `/resources/articles/software-development/what-is-cloud-native`
    - `/resources/whitepapers`
    - `/resources/whitepapers/how-the-c-suite-can-lead-ai-innovation`
    - `/solutions`
    - `/solutions/use-case/`
    - `/solutions/use-case/devops`
    - `/contentful-lp-tests/flex-example-dark` (requires a flag)
    - `/contentful-lp-tests/flex-example-light` (requires a flag)
  - [ ] Manually compare production site to local instance for any non-release specific regressions

#### Subdomain sites

- Performed successful integration test with `githubuniverse.com`, as a Tier 1 consumer of Primer Brand outside of the monolith.

  - [ ] Run development server and verify no **new** console warnings or regressions are found
  - [ ] Run local build to verify the release compiles correctly
  - [ ] Manually performed side-by-side comparison with production

- Performed successful integration test with `https://resources.github.com/`, as a Tier 1 consumer of Primer Brand outside of the monolith.
  - [ ] Run development server and verify no **new** console warnings or regressions are found
  - [ ] Run local build to verify the release compiles correctly
  - [ ] Manually performed side-by-side comparison with production

#### Sandboxes

- [ ] Works in CodeSandbox or StackBlitz
  - [ ] New components render successfully
  - [ ] (optional) Tested in both SPA and SSR apps if release contains build changes

### 🤔 Cross-check (aka sanity test)

- [ ] Release notes accurately describe the changes made
- [ ] All bugfixes in this release have resolved their corresponding issues
- [ ] The issues for reverted PRs have been re-opened and commented on with a link to the reverted PR
- [ ] No noticeable regressions or side-effects have not been introduced as a result of changes in this release.
  - If they have, determine severity of the issue and consider hotfixing

### After tests

- [ ] Add report summary of your findings, including any images. Use following template as a guide:

  ```markdown
  #### Smoke test results

  - Feature 1 🟢 🟡 🔴 (choose one, depending on success levels)

    {insert screenshot}

  Release testing status: Ready to release 🟢 | Paused 🟡 🔴 (choose one and provide reason)
  ```

### 🚢 After merge

- [ ] Issue release comms in `primer brand` Slack channel
- [ ] Add the preview deployment's link to releases as a way of permalinking to old version's docs. [Example](https://github.com/primer/brand/releases/tag/%40primer%2Freact-brand%400.34.3)
