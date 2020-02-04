import { gql } from "apollo-boost";

export const GET_ALL_BOOKINGS = gql`
  query bookings {
    bookings {
      id
      start
      end
      remark
      room {
        number
        name
      }
      user {
        username
        first_name
        last_name
        room_no
      }
    }
  }
`;
