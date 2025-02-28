# 2025 Indiana Scouting Alliance App

This repository houses a React app serving as the offline-first scouting app custom designed for use by the Indiana Scouting Alliance in the 2025 FIRST Robotics Competition game, Reefscape.

## Development Instructions

### 1. Clone the repo locally

Use either GitHub CLI:

```zsh
gh repo clone liujip0/scouting
```

or git:

```zsh
git clone https://github.com/liujip0/scouting.git
```

### 2. Navigate to scouting directory

```zsh
cd scouting
```

### 3. Install dependencies

```zsh
pnpm install
```

### 4. Add environment variables

Create a file called `.env.local` in `app/src/`

```env
VITE_SERVER_URL="http://localhost:8787"
```

Create a file called `.dev.vars` in `api/`

```vars
ADMIN_ACCOUNT_USERNAME="admin"
ADMIN_ACCOUNT_PASSWORD="adminpassword"

FIRST_API_TOKEN=<Direct message @liujip0 on Discord>

JWT_PRIVATE_KEY="xc03o1xblf4rga87xss3ebztlc8f5r9l"
```

### 5. Run local development server

```zsh
pnpm dev
```
