import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Search from "../../components/Search";
import Providers from "../../providers";
import MockAdapter from "axios-mock-adapter";
import api from "../../services";

const handleSearch = jest.fn();

const apiMock = new MockAdapter(api);

describe("testando componente search", () => {
  it("botao de pesquisa habilidado caso tenha algo no input", async () => {
    render(
      <Providers>
        <Search />
      </Providers>
    );

    const inputFild = screen.getByPlaceholderText("Insira o CEP");
    const buttonElement = screen.getByText("Buscar pelo CEP");

    fireEvent.change(inputFild, { target: { value: "12345678" } });

    await waitFor(() => {
      expect(inputFild).toHaveValue(12345678);
      expect(buttonElement).toBeEnabled();
    });
  });

  it("possivel fazer uma busca pelo cep fornecido", async () => {
    apiMock.onGet("12345678").replyOnce(200, {});
    render(
      <Providers>
        <Search />
      </Providers>
    );

    const inputFild = screen.getByPlaceholderText("Insira o CEP");
    const buttonElement = screen.getByText("Buscar pelo CEP");

    fireEvent.change(inputFild, { target: { value: "12345678" } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(inputFild).toHaveValue(12345678);
      expect(buttonElement).toBeEnabled();

      expect(handleSearch).toHaveBeenCalledWith(12345678);
    });
  });
});
