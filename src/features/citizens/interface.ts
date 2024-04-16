export type Citizen = {
  name: string;
  firstSurname: string;
  secondSurname: string;
  electorKey: string;
  electoralSectionId: string;
  Address?: Address;
};

export type Address = {
  phoneNumber: string;
  postalCode: string;
};

export type AddressForm = {
  phoneNumber: string;
  postalCode: string;
};
