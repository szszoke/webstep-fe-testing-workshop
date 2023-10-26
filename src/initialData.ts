import { nanoid } from "nanoid";

import { Todo } from "./App";

export const initialData: Todo[] = [
  {
    id: nanoid(),
    name: "Cool cats",
    completed: false,
  },
  {
    id: nanoid(),
    name: "Webstep and stuff",
    completed: false,
  },
  {
    id: nanoid(),
    name: "Hello world",
    completed: true,
  },
];
