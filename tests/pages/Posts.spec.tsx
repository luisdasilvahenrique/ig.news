import { render, screen, waitFor } from "@testing-library/react";
import { mocked } from "jest-mock";
import Posts, { getStaticProps } from "../../src/pages/Posts";
import { getPrismicClient } from '../../src/services/prismic';

const posts = [
  { 
    slug: 'my-new-post', 
    title: 'My new post', 
    excerpt: '<p>Post excerpt</p>', 
    updatedAt: '18 de Abril'
  },
]

jest.mock('../../src/services/prismic');

describe("Posts page", () => {
  it("renders correctly", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
            results: [
                {
                    uid: 'my-new-post',
                    data: {
                        title: [
                            { type: 'heading' , text: 'My new post'}
                        ],
                        content: [
                            { type: 'paragraph', text: 'Post excerpt'}
                        ]
                    },
                    last_publication_date: '04-01-2021',
                }
            ]
        })
    }as any)

    const response = await getStaticProps({});
   
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [{
            slug: 'my-new-post',
            title: 'My new post',
            excerpt: 'Post excerpt',
            updatedAt: '01 de abril de 2021'
          }],
        },
      })
    );
   
  });
});