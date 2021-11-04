import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Search from "../../components/Search";
import MockAdapter from "axios-mock-adapter";
import api from "../../services";

const apiMock = new MockAdapter(api);

const mockhandleSearch = jest.fn();
const mocksetCeptNumber = jest.fn();
const mockCepNumber = "12345678";
const mockCeps = {
  cep: "",
};

jest.mock("./../../providers/CepProvider", () => {
  return {
    useLocateCep: () => ({
      handleSearch: mockhandleSearch,
      cepNumber: mockCepNumber,
      setCepNumber: mocksetCeptNumber,
      ceps: mockCeps,
    }),
  };
});

describe("testando componente search", () => {
  it("botao de pesquisa habilidado caso tenha algo no input", async () => {
    render(<Search />);

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
    render(<Search />);

    const inputFild = screen.getByPlaceholderText("Insira o CEP");
    const buttonElement = screen.getByText("Buscar pelo CEP");

    fireEvent.change(inputFild, { target: { value: "12345678" } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(inputFild.value).toBe("12345678");
      expect(buttonElement).toBeEnabled();
      expect(mockhandleSearch).toBeCalledWith("12345678");
    });
  });
});
