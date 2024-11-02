import React from "react";
import { Counter } from "./Counter.js";
import { Button } from "@mantine/core";

export default function Page() {
  return (
    <>
      <h1>My Vike app</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
        </li>
      </ul>
      <hr />
      <Button>Test</Button>
      <br />
      <Button variant="filled" size="md" radius="xl">
        Button
      </Button>
    </>
  );
}
