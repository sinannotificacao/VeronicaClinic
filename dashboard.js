const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  databaseURL: "https://SEU_PROJETO-default-rtdb.firebaseio.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const pacientesRef = db.ref('pacientes');

const form = document.getElementById('add-paciente-form');
const listDiv = document.getElementById('pacientes-list');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('paciente-nome').value;
  const idade = document.getElementById('paciente-idade').value;
  pacientesRef.push({nome, idade});
  form.reset();
});

pacientesRef.on('child_added', (snapshot) => {
  const data = snapshot.val();
  const div = document.createElement('div');
  div.classList.add('paciente');
  div.innerHTML = `<strong>${data.nome}</strong> - ${data.idade} anos 
  <button onclick="registrarAtendimento('${snapshot.key}', '${data.nome}')">Atender</button>`;
  listDiv.appendChild(div);
});

function registrarAtendimento(id, nome) {
  localStorage.setItem('pacienteId', id);
  localStorage.setItem('pacienteNome', nome);
  window.location.href = 'paciente.html';
}