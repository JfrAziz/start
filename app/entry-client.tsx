/// <reference types="vinxi/types/client" />

import { StrictMode } from "react";
import { createRouter } from "@/router";
import { StartClient } from "@tanstack/start";
import { hydrateRoot } from "react-dom/client";

const router = createRouter();

hydrateRoot(
  document,
  <StrictMode>
    <StartClient router={router} />
  </StrictMode>
);
