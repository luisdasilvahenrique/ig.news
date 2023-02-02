import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import Posts, { getStaticProps } from "../../src/pages/Posts";
import { getPrismicClient } from "../../src/services/prismic";

const posts = [
  {
    slug: "my-new-post",
    title: "my-new-post",
    excerpt: "Post-excerpet",
    updatedAt: "02 de fevereiro",
  },
];

jest.mock("../../src/services/prismic.ts");

describe("Posts page", () => {
  it("renders correctly", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("my-new-post")).toBeInTheDocument();
  });

  it("load initial data", async () => {
    const getPrismicMocked = mocked(getPrismicClient);

    getPrismicMocked.mockRejectedValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: "my-new-post",
            data: {
              title: [{ type: "heading", text: "My new post" }],
              content: [{ type: "paragraph", text: "Post excerpt" }],
            },
            last_publication_date: "02-02-2023",
          },
        ],
      }),
    } as never);

    const response = getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "my-new-post",
              title: "my-new-post",
              excerpt: "excerpt",
              updatedAt: "02 de feveiro de 2023",
            }],
        },
      })
    );
  });
});
