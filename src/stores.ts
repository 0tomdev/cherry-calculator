import { writable } from "svelte/store";
import type { FuncType } from "./types";

export let func = writable<FuncType>("sin");
