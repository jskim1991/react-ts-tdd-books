import { rest } from 'msw'

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
        return res(ctx.json(200), ctx.json({}))
    }),
]
