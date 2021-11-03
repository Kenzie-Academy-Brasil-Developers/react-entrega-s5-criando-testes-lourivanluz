import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "semantic-ui-react";

describe("testando o botão", () => {
  test("se o botão foi renderizado", () => {
    render(<Button>Buscar pelo CEP</Button>);
    expect(screen.getByText("Buscar pelo CEP")).toBeTruthy();
  });
});
