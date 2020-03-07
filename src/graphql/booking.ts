import { gql } from "apollo-boost";

export const GET_ALL_BOOKINGS = gql`
  query bookings {
    bookings {
      start
      end
      room {
        name
      }
      user {
        email
      }
    }
  }
`;
