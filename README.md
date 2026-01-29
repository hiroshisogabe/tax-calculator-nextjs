# Tax calculator

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

> I decided to keep the line above from the scaffolding since it was indeed how I started the project.

## Table of Contents

- [History](#history)
  - [Why this project?](#why-this-project)
  - [Was AI used somehow?](#was-ai-used-somehow)
  - [How was the code merged into main?](#how-was-the-code-merged-into-main)
- [Finally, tech notes](#finally-tech-notes)
  - [Install and run the project](#install-and-run-the-project)
  - [Tests](#tests)
  - [Code lint and formatting](#code-lint-and-formatting)
  - [Form validation](#form-validation)
  - [React Suspense](#react-suspense)
- [Is this it?](#is-this-it)

## History

### Why this project?

The main idea behind it was to surface and understand how Server Components, Server Actions and related approaches work after dealing with legacy React Apps for a long time, more than I should have.

The tax calculator came from a friend that pointed me to a repository which has excellent guidelines and ways of working, thus I got inspired by the first [OOAD Challenge](https://github.com/diegopacheco/tech-resources/blob/master/src/react-resources.md#ooad-challenges---round-1), even though I actually just wanted something to build and basically jumped to the implementation of the Next.js App.

### Was AI used somehow?

Definitely yes. The main steps were tailored together with Gemini 3 Pro and most of the code was suggested there.

For additional assistance, Co-pilot Agent using Claude Haiku 4.5 also supported me, especially because it could see everything in the codebase I had written.

I reviewed and paid attention to almost everything I committed, except for the design using the classes from [tailwindcss](https://tailwindcss.com/) which I only touched to adjust when I was not satisfied at first glance.

My main goal wasn't how beautiful the UI looks, instead I invested time on understanding what Next.js has to offer and how it works, e.g. when using the [useActionState](https://react.dev/reference/react/useActionState) hook.

Double checking the response of AI alto took some time, however necessary even though the purpose is to study something new and the official documentation is quite well written.

### How was the code merged into main?

After working with git for some years and met great engineers in my journey, I decided to show what I've learned which is properly open PRs and split commits in a meaningful way. I hope I could meet your expectations.

Some description in the merged PRs also brings a bit of documentation, for sure connected to the changes introduced there but also for a general concept and principles of the project, e.g. in [PR#3](https://github.com/hiroshisogabe/tax-calculator-nextjs/pull/3) I explained the rationale about not adding a specific test.

In addition you might notice the adoption of [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). I'm so used to it that even though I don't have any automatic check for commit messages, e.g. as [husky](https://typicode.github.io/husky/) helped me a couple of times with the `pre-commit` hook, I think all my commit messages have at least the pattern `<type>: <message>`.

## Finally, tech notes

### Install and run the project

As this project was bootstrapped using [npm](https://www.npmjs.com/), I suggest you use it even though you can also install with other package managers.


```bash
# install the dependencies
npm install

# start dev server
npm run dev
```

> At the moment I'm writing this `README`, my node version is `v24.13.0` and npm version is `11.6.2`.  

Once the dev server is running, open [http://localhost:3000](http://localhost:3000) in your browser. You should see output similar to:

```bash
% npm run dev

> next-app-quick-start@0.1.0 dev
> next dev

▲ Next.js 16.1.4 (Turbopack)
- Local:         http://localhost:3000
```

### Tests

As you can see in the [`package.json`](./package.json), we use [jest](https://jestjs.io/) and [testing-library](https://testing-library.com/). In addition, the `scripts` related to `test` commands are:

```bash
# run tests once
npm test

# run tests in watch mode
npm run test:watch
```

> As I described better in [PR#2](https://github.com/hiroshisogabe/tax-calculator-nextjs/pull/2), we basically have only unit tests, nevertheless due to the fact we test the server action which depends on other functions which are placed in [`services`](./src/services/) (to fetch data) and [`lib`](./src/lib/) (to calculate tax) we could consider it an integration test to some extent.

### Code lint and formatting

When running the [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) it showed me the possibility to use [Biome](https://biomejs.dev/).

> It's the first time I haven't used the combo [`eslint`](https://eslint.org/) + [`prettier`](https://prettier.io/).

By the way, about auto `formatOnSave` when using `Biome`, I added a `settings.json` file within a `.vscode` folder in the root project that defines which formatting it will apply when saving a file, following the rules from `biome`:

```json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.biome": "explicit",
    "source.organizeImports.biome": "explicit"
  }
}
```

Currently the following scripts are available regarding `biome`:
```bash
# run lint checks, no fixes will be applied
npm run lint

# when possible automatically fixes formatting issues
npm run format
```

### Form validation

One more time after reading the `guide` section in the Next.js official documentation, the [forms](https://nextjs.org/docs/app/guides/forms) topic brought me something I had never used, even though I heard its benefits a couple of times in some videos through the internet: [Zod](https://zod.dev/).

Before we do anything in the server action [`tax-action.ts`](./src/actions/tax-actions.ts) we validate the formData with `Zod`.

The creation of a schema allows us to simply call the validation of the values. In addition it also provides us feedback in case we also specified in the schema as the following code snippet shows:

```typescript
const schema = z.object({
  amount: z.coerce.number().positive('Amount must be greater than zero'),
});

// { amount: 0 } 
const rawData = Object.fromEntries(formData.entries());
const validated = schema.safeParse(rawData);

if (!validated.success) {
  // {
  //   amount: ['Amount must be greater than zero'] 
  // }  
  console.error('Errors detected for the fields: ', flattenError(validated.error).fieldErrors);
}
```

### React `<Suspense>`

You might ask why I wrapped the Server Component [`SupportSummary`](./src/components/SupportSummary.tsx) which retrieves data from an static array with a `Suspense`, which means it'll be faster than any fallback skeleton.

The answer is I had never used and thought it'd be nice to try out after Gemini suggested me. Gemini was also aware that `SupportSummary` will never take longer than necessary to render the skeleton, so I followed its suggestion to add some delay.

As I didn't want to keep it in the codebase nevertheless wanted to bring this possibility to you to try out, I opened [PR#6](https://github.com/hiroshisogabe/tax-calculator-nextjs/pull/6). You'll see I committed and reverted the changes which introduces the mentioned delay. Feel free to try and the commit sha is [1cf1781](https://github.com/hiroshisogabe/tax-calculator-nextjs/pull/6/changes/1cf17816634caae0969d726f897c6bd75c461c3b).

I could say that "magically" when the Promise took 2 seconds to return, the [Skeleton](./src/components/SupportSummarySkeleton.tsx) was rendered as expected, I'd say effortless.

## Is this it?

Regarding implementation yes but I wish I could have more time to code more. I added some `TODOs` in the codebase but I'm happy I had the chance to at least understand a bit how Next.js works based on what I committed to this repo. 

Thanks for reading my thoughts and concerns! Looking forward to the "next" chapter!
