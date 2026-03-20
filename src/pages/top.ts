const demos = [
  { id: 'ch-01', title: 'There are dots' },
  { id: 'ch-02', title: 'The dot grid is rotated' },
  { id: 'ch-03', title: 'Anti aliasing is required' },
  { id: 'ch-04', title: 'The dots vary in size' },
  { id: 'ch-06', title: 'The dots have irregular edges' },
  { id: 'ch-07', title: 'The paper and the ink have internal texture' },
  { id: 'ch-08', title: 'The halftone pattern is in color' },
  { id: 'ch-09', title: 'The pattern still aliases at a distance' },
];

const list = document.getElementById('demo-list') as HTMLUListElement;

demos.forEach(demo => {
  const li = document.createElement('li');
  li.innerHTML = `<a href="/demo.html?id=${demo.id}">${demo.title}</a>`;
  list.appendChild(li);
});