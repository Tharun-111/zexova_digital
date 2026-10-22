# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Deploy to Vercel

1. Import this repository into Vercel and select the `zexova-digital` project directory as the root directory.
2. Use `bun run build` as the build command. The Vercel Nitro preset is configured in `vite.config.ts` and generates Vercel's deployment output.
3. Add any required application environment variables in the Vercel project settings, then deploy.

For a local production build, run `bun install` followed by `bun run build`.

### Email notifications for inquiries

Contact and quote requests are sent directly through Resend; this flow does not use Supabase. Verify a sender domain in Resend, then configure these server-side environment variables in Vercel (and in `.env` for local development):

- `RESEND_API_KEY`: Resend API key.
- `INQUIRY_EMAIL_TO` (optional): Comma-separated notification recipients; defaults to `zexovadigital@gmail.com`. Resend's test sender only allows delivery to the email address associated with your Resend account. To send to other recipients, verify a domain and set `RESEND_VERIFIED_FROM`.
- `RESEND_VERIFIED_FROM` (optional): Sender on a domain verified with Resend, for example `Website inquiries <inquiries@yourdomain.com>`. Without this, the app uses Resend's `onboarding@resend.dev` test sender.

Redeploy after adding the Vercel environment variables. If email delivery is not configured or Resend rejects a message, the form reports that it could not send the inquiry. Submissions are not stored when email delivery fails.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
