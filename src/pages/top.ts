const demos = [
  { id: 'ch-01', title: 'There are dots' },
  { id: 'ch-02', title: 'The dot grid is rotated' },
  { id: 'ch-03', title: 'Anti aliasing is required' },
];

const list = document.getElementById('demo-list') as HTMLUListElement;

demos.forEach(demo => {
  const li = document.createElement('li');
  li.innerHTML = `<a href="/demo.html?id=${demo.id}">${demo.title}</a>`;
  list.appendChild(li);
});