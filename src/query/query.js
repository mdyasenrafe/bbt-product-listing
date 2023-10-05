import { gql } from "@apollo/client";

export const GET_VEHICLE_LIST = gql`
  query VehicleList($page: Int, $size: Int, $search: String) {
    vehicleList(page: $page, size: $size, search: $search) {
      id
      naming {
        make
        model
        chargetrip_version
      }
      media {
        image {
          thumbnail_url
        }
      }
    }
  }
`;
