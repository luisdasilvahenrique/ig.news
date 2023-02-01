import { render, screen } from "@testing-library/react";
import Home from "../../src/pages";

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}))

jest.mock('next-auth/react', () => {
    return {
        useSession: () => [null, false]
    }
})

describe("Home page", () => {
  it("renders correctly", () => {
    jest.mock('next/router', () => require('next-router-mock'));
    render(<Home product={{ priceId: "fake-price-id", amount: "R$10,00" }} />);

    expect(screen.getByText('for R$10,00 month')).toBeInTheDocument()
  });
});
