This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Deployed Solution

You can find the live app here at the [deployed solution link](https://cet324-bi58cm.vercel.app)

## Getting Started

To run the program on your local machine, you'll need to do the following

### Environment Variables

To run the project locally, you will need to make sure that your .env file is correct with valid data

```bash
DATABASE_URL= <replace with your own postgresql db (local or remote)>
AUTH_SECRET= <can be anything really>

Follow this [link](https://docs.github.com/apps/building-oauth-apps/creating-an-oauth-app) to create a project and get your GitHub client id and secret

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

Follow this [link](https://support.google.com/cloud/answer/6158849?hl=en) to create a project and get your Google client id and secret

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

Follow this [link](https://cloud.google.com/recaptcha-enterprise/docs/create-key-website) to create a project and get your Google ReCAPTCHA site id and secret

GOOGLE_RECAPTCHA_SITE_KEY=6LfpLu0pAAAAAA9ocEVLlNb0MrMJY_EeGRnGH305
GOOGLE_RECAPTCHA_SECRET_KEY=6LfpLu0pAAAAACbkNMs0aZgrF6rvkz9eZ5RRJuV_

Create an account with [SendGrid](https://sendgrid.com/en-us) and create an api key to be able to send emails

SENDGRID_API_KEY=


NEXT_PUBLIC_APP_URL=<if you choose to deploy it on vercel, use that domain>
```

Now install the package dependencies

```bash
npm install
```

Generate Prisma Model and push to your database

```bash
npx prisma generate
npx prisma db push
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
