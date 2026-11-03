import { createFileRoute } from "@tanstack/react-router";
import { Outpost } from "../components/Outpost";

export const Route = createFileRoute("/")({ component: Outpost });
