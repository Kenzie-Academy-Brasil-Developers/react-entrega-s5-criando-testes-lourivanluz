import React from "react";
import { render, screen } from "@testing-library/react";
import { Input } from "semantic-ui-react";

describe("testando o input", () => {
  test("se input foi renderizado", () => {
    render(<Input placeholder="Insira o CEP" />);
    expect(screen.getByPlaceholderText("Insira o CEP")).toBeTruthy();
  });
});
