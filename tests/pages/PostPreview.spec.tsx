import { render, screen, waitFor } from "@testing-library/react";
import { mocked } from "jest-mock";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getStaticProps } from "../../src/pages";
import Post, { getServerSideProps } from "../../src/pages/Posts/[slug]";
import { getPrismicClient } from '../../src/services/prismic';

const post =
  { 
    slug: 'my-new-post', 
    title: 'My New Post', 
    content: '<p>Post excerpt</p>', 
    updatedAt: '18 de Abril'
  }

jest.mock('next-auth/react')
jest.mock('next/router')
jest.mock('../../src/services/prismic');

describe("Post preview page", () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false] as any)
 
  it("renders correctly", () => {
    render(<Post post={post} />);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  it("redirects user to full post when  user is subscribed", async () => {
        const useSessionMocked = mocked(useSession)
        const useRouterMocked = mocked(useRouter)
        const pushMocked = jest.fn()

        useSessionMocked.mockReturnValueOnce([
            { activeSubscription: "fake-active-subscription" },
            false
        ] as any)

        useRouterMocked.mockReturnValueOnce({
            push: pushMocked,
        } as any)

        render(<Post post={post} />)

        expect(pushMocked).toHaveBeenCalledWith('/posts/my-new-post')
    })

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
    
        const response = await waitFor(()=> {
          getStaticProps({ params: { slug: 'my-new-post' } })
        }) 
    
       waitFor(() => {
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
       }) 
      });

});