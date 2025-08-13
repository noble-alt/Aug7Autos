# Deployment Guide

This guide provides instructions for deploying the frontend application to Vercel and explains the project structure.

## Deploying to Vercel (Simplified)

This guide provides simplified instructions for deploying the application to Vercel.

### Step 1: Connect to Vercel

1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click the "**Add New...**" button and select "**Project**".
3.  **Import your Git Repository**: Find the GitHub repository for this project (`Aug7Autos`) and click "**Import**".
4.  When asked which branch to deploy, select `feat/simple-deployment`.

### Step 2: Configure and Deploy

Vercel is very smart and will detect that this is a Vite project. You should not need to change any settings.

-   **Framework Preset**: `Vite` (auto-detected)
-   **Root Directory**: Should be the default (root).
-   **Build and Output Settings**: Should be set automatically.

There is no need to configure Environment Variables for this simplified deployment.

### Step 3: A Note on Security

For this simplified deployment, the Supabase URL and public key have been placed directly into the code.

**This is not a secure practice for a final production application.**

For a real production launch, you should use Vercel's Environment Variables feature to keep your keys safe. This guide was simplified to get a working preview online quickly.

### Step 4: Deploy

1.  Click the "**Deploy**" button.
2.  Vercel will now build and deploy your application. When it's finished, you will be given the URL for your live site.

## Managing the "Backend"

The `/backend/supabase` folder is your "infrastructure as code" for your Supabase project. You do not deploy this folder to a service like Railway.

To make changes to your database schema in the future, you should:
1.  Create a new migration file locally inside `/backend/supabase/migrations`.
2.  Run `supabase db push` from your local machine to apply the changes to your live Supabase database.

You will need to have the Supabase CLI installed and linked to your project for this (`supabase link --project-ref <your-project-ref>`).

That's it! Your application should now be live and fully functional.
