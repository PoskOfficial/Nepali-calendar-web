# Nepali Calendar 

This version of Nepali Calendar is an open source progressive web app that allows you to view and sync events with Google Calendar. 
Check live version of this application at [https://calendar.bikram.io](https://calendar.bikram.io).

# Local Development

## Prerequisites

Install Deta Space CLI

For mac os

```bash
curl -fsSL https://get.deta.dev/space-cli.sh | sh
```

For windows

```bash
iwr https://deta.space/assets/space-cli.ps1 -useb | iex
```

For linux

```bash
curl -fsSL https://deta.space/assets/space-cli.sh | sh
```

## Installation

Fork the repository and clone it to your local machine

```bash
git clone https://github.com/<your username>/Nepali-calendar-web.git
```


Login to Deta Space

- Sign up for a free account at [https://deta.space](https://deta.space) (enable developer mode)
- Skip onboarding
- Search for settings on the search bar at the buttom 
- Create access token
- Paste the access token on the terminal after running the following command

```bash
space login
```

Create a new space

```bash
space new
```

Install dependencies for both backend and frontend

```bash
pnpm install
```
Note: You need to use pnpm for package management. You can install pnpm by running `npm install -g pnpm`

Run on dev mode

```bash
space dev
```

If you are getting issues related to nodemon not being installed, you can install it globally by running `npm install -g nodemon`

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`GOOGLE_CLIENT_ID`

`GOOGLE_CLIENT_SECRET`

To set environment variable on local you can pass it as a command line argument

```bash
GOOGLE_CLIENT_ID=your_client_id GOOGLE_CLIENT_SECRET=your_client_secret space dev
```

```powershell
$env:GOOGLE_CLIENT_ID="your_client_id"
$env:GOOGLE_CLIENT_SECRET="your_client_secret"
space dev
```


For more information on how to get `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` check [this](https://developers.google.com/identity/protocols/oauth2) out. You need to enable calendar api and create credentials to get these values.

If you are having issues with this part, you can contact the team at our [Discord Server](https://discord.gg/W5DJv9zSaW).