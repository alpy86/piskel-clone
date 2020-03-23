const btnOpenPiskel = document.getElementById('btn-open-piskel');
const htmlLanding = document.getElementById('wrapper-landing');
const htmlPiskel = document.getElementById('wrapper-piskel');

btnOpenPiskel.addEventListener('click', (e) => openPagePiskel(e));

export default function openPagePiskel(data) {
  if (data) {
    htmlLanding.style.display = 'none';
    htmlPiskel.style.display = 'block';
  }
}
