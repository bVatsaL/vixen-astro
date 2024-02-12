export const getCarfaxLogo = (carFaxOne: number) =>
  !carFaxOne
    ? 'https://cdn-pods.foxdealer.com/foxdealer/carfax_general_27b537a4a5.png'
    : 'https://cdn-pods.foxdealer.com/foxdealer/carfax_first_owner_bcd339e765.png';
