import { ApolloServer, gql } from 'apollo-server'

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) starts with the hash (#) synbol.

  """
  This **Book** type defines the queryable fields for every book in our data source.
  """
  type Book {
    "It's a title"
    title: String

    "It's an author"
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that clients
  # can execute, along with the return type for each. In this case, the "books"
  # query returns an array of zero or more Books (defined above).
  type Query {
    "Fetch all books"
    books: [Book]
  }
`

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },

  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
]

const resolvers = {
  Query: {
    books: () => books,
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})

export default server
