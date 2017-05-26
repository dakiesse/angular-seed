export type User = {
  id?: number
  name: string
  username: string
  email: string
  address: UserAddress
  phone: string
  website: string
  company: UserCompany
}

export type UserAddress = {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: UserAddressGeo
}

export type UserAddressGeo = {
  lat: string | number
  lng: string | number
}

export type UserCompany = {
  name: string
  catchPhrase: string
  bs: string
}

export const blankModel: User = {
  name: null,
  username: null,
  email: null,
  address: <UserAddress>{
    street: null,
    suite: null,
    city: null,
    zipcode: null,
    geo: <UserAddressGeo>{
      lat: 0,
      lng: 0,
    },
  },
  phone: null,
  website: null,
  company: <UserCompany>{
    name: null,
    catchPhrase: null,
    bs: null,
  },
}
