import { rest } from 'msw'
import uuid4 from 'uuid4'

export const handlers = [
    rest.get('/api/books', async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                    isbn: '1',
                    name: 'The First Boook',
                    author: 'Sam Creator',
                },
                {
                    isbn: '2',
                    name: 'Greatest of All Time',
                    author: 'Mick John',
                },
            ])
        )
    }),

    rest.get('/api/books/1/detail', async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                isbn: '1',
                name: 'The First Boook',
                author: 'Sam Creator',
                language: 'English',
                pages: 352,
                reviews: 4.5,
                ebookLink: '/ebook/1',
            })
        )
    }),

    rest.get('/api/books/2/detail', async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                isbn: '2',
                name: 'Greatest of All Time',
                author: 'Mick John',
                language: 'Korean',
                pages: 998,
                reviews: 0,
            })
        )
    }),

    rest.get('/token', async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                accessToken: uuid4(),
                expiresAt: 3600,
            })
        )
    }),
]
