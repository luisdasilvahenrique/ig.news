import { render, screen, waitFor } from "@testing-library/react";
import Home, { getStaticProps } from "../../src/pages";
import { stripe } from "../../src/services/stripe";
import { mocked } from "jest-mock";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-auth/react", () => {
  return {
    useSession: () => [null, false],
  };
});

jest.mock("../../src/services/stripe");

describe("Home page", () => {
  it("renders correctly", () => {
    jest.mock("next/router", () => require("next-router-mock"));
    render(<Home product={{ priceId: "fake-price-id", amount: "R$10,00" }} />);

    expect(screen.getByText("for R$10,00 month")).toBeInTheDocument();
  });

  it("load initial data", async () => {
    const retriveStripeMocked = mocked(stripe.prices.retrieve);

    retriveStripeMocked.mockReturnValueOnce({
      id: "fake-price-id",
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});

    await waitFor(() => {
      expect(response).toEqual(
        expect.objectContaining({
          props: {
            product: {
              priceId: "fake-price-id",
              amount: "$10.00",
            },
          },
        })
      );
    })
    
  });
});
