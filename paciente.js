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

const pacienteId = localStorage.getItem('pacienteId');
const pacienteNome = localStorage.getItem('pacienteNome');
document.getElementById('paciente-nome').value = pacienteNome;

const form = document.getElementById('atendimento-form');
const historicoDiv = document.getElementById('historico');
const atendimentosRef = db.ref(`pacientes/${pacienteId}/atendimentos`);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const observacoes = document.getElementById('observacoes').value;
  const profissional = localStorage.getItem('profissional');
  atendimentosRef.push({observacoes, profissional, timestamp: Date.now()});
  form.reset();
});

atendimentosRef.on('child_added', (snapshot) => {
  const data = snapshot.val();
  const div = document.createElement('div');
  div.classList.add('atendimento');
  const date = new Date(data.timestamp).toLocaleString();
  div.innerHTML = `<strong>${date} - ${data.profissional}:</strong> ${data.observacoes}`;
  historicoDiv.appendChild(div);
});