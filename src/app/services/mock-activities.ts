export let ACTIVITIES = [
  {
    id: 1,
    type: 'contribution',
    image: './assets/img/card/img_1.png',
    user: {
      id: 1,
      username: 'HyeJin',
      avatar: './assets/img/user/adam.jpg',
    },
    place: {
      id: 1,
      name: 'Fashion Island',
      address: '1st street, Newport Beach',
    },
    is_liked: false,
    number_of_parking_spots: 4,
    content: 'new parking spots near fashion island parking lot',
  },
  {
    id: 2,
    type: 'badge',
    image: './assets/img/card/img_2.png',
    user: {
      id: 1,
      username: 'Mohd Affendi',
      avatar: './assets/img/user/ben.png',
    },
    is_liked: true,
    content: 'I saved 10kg of CO2 emission this year.',
  },
];
