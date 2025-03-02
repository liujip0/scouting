# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.187.0/containers/typescript-node/.devcontainer/base.Dockerfile

ARG VARIANT="22-bookworm"
FROM mcr.microsoft.com/devcontainers/typescript-node:1-${VARIANT}

RUN su node -c "npm install -g pnpm@10 ts-node"
