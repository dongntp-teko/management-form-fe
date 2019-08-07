// Created by thanhpd on 6/17/2019

const fakeNotes = [
  {
    key: '1',
    title: 'Note 1',
    content: '10 Downing Street',
    createdAt: '2019-06-11T10:53:46.668543+07:00',
  },
  {
    key: '2',
    title: 'Note 2',
    content: 'Something different',
    createdAt: '2019-06-11T10:53:46.668543+07:00',
  },
  {
    key: '3',
    title: 'Note 3',
    content: 'Something different 1',
    createdAt: '2019-06-11T10:53:46.668543+07:00',
  },
];
const fetchNotes = () => {
  return new Promise(((resolve) => {
    setTimeout(() => {
      resolve({data: fakeNotes})
    }, 500)
  }))
};

export default {
  fetchNotes,
}
