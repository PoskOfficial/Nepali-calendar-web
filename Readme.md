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

Clone the repository

```bash
git clone https://github.com/poskOfficial/Nepali-calendar-web.git
```


Login to Deta Space

```bash
space login
```

Create a new space

```bash
space new
```

Install dependencies for both backend and frontend

```bash
cd backend && pnpm install
```

```bash
cd frontend && pnpm install
```

Run on dev mode

```bash
space dev
```

Additionally to test if it works on prod, you can run the following command

```bash
space push
```

Note: Dude to current limitation of Deta Space, you need to run `cd backend && pnpm build` to compile typescript before running `space push` command.

```bash
space open
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`GOOGLE_CLIENT_ID`

`GOOGLE_CLIENT_SECRET`

To set environment variable on local you can pass it as a command line argument

```bash
GOOGLE_CLIENT_ID=your_client_id GOOGLE_CLIENT_SECRET=your_client_secret space dev
```

For more information on how to get `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` check [this](https://developers.google.com/identity/protocols/oauth2) out. You need to enable calendar api and create credentials to get these values.