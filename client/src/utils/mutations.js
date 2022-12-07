import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation Mutation($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const ADD_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
    }
  }
`;

export const SAVE_BOOK = gql`
mutation SaveBook($book: BookInput) {
    saveBook(book: $book) {
      _id
      username
      email
    }
  }
`;

export const REMOVE_BOOK = gql`
mutation Mutation($bookId: String!) {
  removeBook(bookId: $bookId) {
    _id
    username
    email
  }
}
`;