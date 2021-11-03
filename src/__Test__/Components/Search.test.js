import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Search from "../../components/Search";
import { useLocateCep } from "../../providers/CepProvider";

const handleSearch = jest.fn();

describe("testando componente search", () => {
  it("impossivel fazer pesquisa com campo vazio", () => {
    render(<Search />);

    const inputFild = screen.getByPlaceholderText("Insira o CEP");
    const buttonElement = screen.getByText("Buscar pelo CEP");

    fireEvent.change(inputFild, { target: { value: "" } });
    expect(buttonElement).not.toBeEnabled();
  });

  it("botao de pesquisa habilidado caso tenha algo no input", async () => {
    render(<Search />);

    const inputFild = screen.getByPlaceholderText("Insira o CEP");
    const buttonElement = screen.getByText("Buscar pelo CEP");

    fireEvent.change(inputFild, { target: { value: 12345678 } });

    await waitFor(() => {
      expect(inputFild).toHaveValue(12345678);
      expect(buttonElement).toBeEnabled();
    });
  });

  it("possivel fazer uma busca pelo cep fornecido", async () => {
    render(<Search />);

    const inputFild = screen.getByPlaceholderText("Insira o CEP");
    const buttonElement = screen.getByText("Buscar pelo CEP");

    fireEvent.change(inputFild, { target: { value: 12345678 } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(inputFild).toHaveValue(12345678);
      expect(buttonElement).toBeEnabled();

      expect(handleSearch).toHaveBeenCalledWith(12345678);
    });
  });
});
