# Deployment Guide

This guide provides instructions for deploying the frontend application to Vercel and explains the project structure.

## Project Structure

This project is now organized into two main folders:

-   `/frontend`: Contains the complete Vite + React frontend application. This is the part you will deploy.
-   `/backend`: Contains the configuration and database migrations for your Supabase project. This folder is for managing your database schema and is not deployed to a traditional hosting service like Railway. Your actual backend and database are hosted by Supabase.

## Deploying the Frontend to Vercel

Follow these steps to deploy your application.

### Step 1: Connect to Vercel

1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click the "**Add New...**" button and select "**Project**".
3.  **Import your Git Repository**: Find the GitHub repository for this project (`Aug7Autos`) and click "**Import**".

### Step 2: Configure the Project

Vercel is very smart and will likely detect that this is a Vite project automatically. However, here are the settings to confirm:

-   **Framework Preset**: Should be automatically set to `Vite`.
-   **Root Directory**: Since all your frontend code is now in the `/frontend` folder, you must set the Root Directory.
    -   Click the "**Edit**" button next to "Root Directory".
    -   Select `frontend` from the dropdown list.
-   **Build and Output Settings**: These should be configured automatically by the `Vite` preset.
    -   **Build Command**: `vite build`
    -   **Output Directory**: `dist`
    -   **Install Command**: `npm install`

### Step 3: Add Environment Variables

This is the most important step to connect your frontend to your Supabase backend.

1.  In the project configuration screen, expand the "**Environment Variables**" section.
2.  You need to add two variables. You can find the required values in your Supabase project dashboard.
    -   Go to your Supabase Project -> Settings -> API.

3.  **Add the first variable:**
    -   **Name**: `VITE_SUPABASE_URL`
    -   **Value**: Copy the **Project URL** from your Supabase API settings and paste it here.

4.  **Add the second variable:**
    -   **Name**: `VITE_SUPABASE_ANON_KEY`
    -   **Value**: Copy the **`anon` `public` key** from your Supabase API settings and paste it here.

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
