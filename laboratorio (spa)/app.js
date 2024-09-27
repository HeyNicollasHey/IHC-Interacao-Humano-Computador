const apiURL = 'http://localhost:3000/patients';

const patientNameInput = document.getElementById('patient-name');
const addPatientButton = document.getElementById('add-patient-button');
const patientList = document.getElementById('patient-list');
const examsListDiv = document.getElementById('exams-list');

const predefinedExams = [
  'Hemograma Completo',
  'Glicemia',
  'Colesterol total e frações',
  'Triglicerídeos',
  'Creatinina',
  'Ureia',
  'TSH',
  'Vitamina D',
  'PCR',
  'Vitamina B-12'
];

const renderPredefinedExams = () => {
  examsListDiv.innerHTML = '';

  predefinedExams.forEach((exam, index) => {
    const div = document.createElement('div');
    div.classList.add('col-md-6', 'mb-2');

    div.innerHTML = `
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="${exam}" id="exam-${index}">
        <label class="form-check-label" for="exam-${index}">
          ${exam}
        </label>
      </div>
    `;
    examsListDiv.appendChild(div);
  });
};

const fetchPatients = async () => {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error('Erro ao buscar pacientes.');
    }
    const patients = await response.json();
    
    renderPatients(patients);
  } catch (error) {
    console.error(error);
    alert('Falha ao carregar os pacientes.');
  }
};

const renderPatients = (patients) => {
  patientList.innerHTML = '';
  
  if (patients.length === 0) {
    patientList.innerHTML = '<li class="list-group-item">Nenhum paciente cadastrado.</li>';
    return;
  }

  patients.forEach(patient => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    
    const examsFormatted = patient.exams.join(', ');
    
    li.innerHTML = `
      <div>
        <strong>${patient.name}</strong><br>
        <small>Exames: ${examsFormatted}</small>
      </div>
      <button class="btn btn-danger btn-sm" data-id="${patient.id}">Remover</button>
    `;
    
    patientList.appendChild(li);
    
    li.querySelector('button').addEventListener('click', () => deletePatient(patient.id));
  });
};

const addPatient = async () => {
  const name = patientNameInput.value.trim();
  if (!name) {
    alert('Por favor, insira o nome do paciente.');
    return;
  }

  const selectedExams = Array.from(document.querySelectorAll('#exams-list input[type="checkbox"]:checked'))
    .map(checkbox => checkbox.value);

  if (selectedExams.length === 0) {
    alert('Por favor, selecione pelo menos um exame.');
    return;
  }

  const newPatient = {
    name: name,
    exams: selectedExams
  };

  try {
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPatient)
    });

    if (!response.ok) {
      throw new Error('Erro ao adicionar paciente.');
    }

    patientNameInput.value = '';
    document.querySelectorAll('#exams-list input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    
    fetchPatients();
  } catch (error) {
    console.error(error);
    alert('Falha ao adicionar o paciente.');
  }
};

const deletePatient = async (id) => {
  if (!confirm('Tem certeza que deseja remover este paciente?')) return;

  try {
    const response = await fetch(`${apiURL}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Erro ao remover paciente.');
    }

    fetchPatients();
  } catch (error) {
    console.error(error);
    alert('Falha ao remover o paciente.');
  }
};

addPatientButton.addEventListener('click', addPatient);

document.addEventListener('DOMContentLoaded', () => {
  renderPredefinedExams();
  fetchPatients();
});
