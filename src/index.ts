class Dragon {
  constructor(
    public name: string,
    public type: string,
    public element: string,
    public age?: number,
    public specialAbility: string,
  ) { }
}

const form = document.getElementById('char-form') as HTMLFormElement | null;
const list = document.getElementById('dragons') as HTMLElement | null;

function createCard(c: Dragon) {
  const el = document.createElement('div');
  el.className = 'character';
  el.innerHTML = `
    <h3>${escapeHtml(c.name)}</h3>
    <p><strong>Type:</strong> ${escapeHtml(c.type)}</p>
    <p><strong>Age:</strong> ${c.age ?? '-'}</p>
    <p><strong>Element:</strong> ${escapeHtml(c.element)}</p>
    <p><strong>Special Ability:</strong> ${escapeHtml(c.specialAbility)}</p>
  `;
  return el;
}

function escapeHtml(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

if (form && list) {
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const type = (data.get('type') || '').toString().trim();  // Changed
    const ageRaw = data.get('age');
    const age = ageRaw ? Number(ageRaw) : undefined;
    const element = (data.get('element') || '').toString().trim();  // Changed
    const specialAbility = (data.get('specialAbility') || '').toString().trim();

    if (!name) {
      alert('Please enter a name');
      return;
    }

    const dragon = new Dragon(name, type, element, age, specialAbility);
    const card = createCard(dragon);
    list.prepend(card);
    form.reset();
  });
}
