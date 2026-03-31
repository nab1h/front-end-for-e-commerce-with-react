/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string; // المتغير اللي عندك في .env
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
