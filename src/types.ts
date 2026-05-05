export type Customer = {
  firstname: string;
  lastname: string;
  streetaddress: string;
  postcode: string;
  city: string;
  email: string;
  phone: string;
};

export type CustomerData = Customer & {
  _links: {
    self: {
      href: string;
    };
  };
};