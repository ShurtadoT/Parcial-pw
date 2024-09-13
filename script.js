const apiKey = 'mbwrxHBImbcNB0RiU61NpEJdxltWDhw9L80EJJxt'; 

// Elementos del DOM
const datePicker = document.getElementById('datePicker');
const loadImageButton = document.getElementById('loadImageButton');
const nasaImage = document.getElementById('nasaImage');
const nasaDescription = document.getElementById('nasaDescription');
const imageContainer = document.getElementById('imageContainer');

// Creamos un elemento para el loader
const loader = document.createElement('div');
loader.classList.add('loader'); // Se añadirá la clase 'loader' para los estilos
imageContainer.appendChild(loader);

// Función para mostrar el loader
function showLoader() {
    loader.style.display = 'block';  // Mostramos el loader
    nasaImage.style.display = 'none'; // Ocultamos la imagen
}

// Función para ocultar el loader
function hideLoader() {
    loader.style.display = 'none';  // Ocultamos el loader
    nasaImage.style.display = 'block'; // Mostramos la imagen
}

// Función para cargar la imagen del día basada en una fecha
async function loadNasaImage(date = '') {
    const baseUrl = 'https://api.nasa.gov/planetary/apod';
    let url = `${baseUrl}?api_key=${apiKey}`;
    
    // Si hay una fecha seleccionada, la añadimos al parámetro de consulta
    if (date) {
        url += `&date=${date}`;
    }

    showLoader(); // Mostrar loader al iniciar la carga

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.media_type === 'image') {
            nasaImage.src = data.url;
            nasaImage.alt = data.title;
            nasaDescription.textContent = data.explanation;
        } else {
            nasaImage.src = '';
            nasaDescription.textContent = 'No hay imagen disponible para esta fecha.';
        }

    } catch (error) {
        nasaDescription.textContent = 'Hubo un error al cargar la imagen.';
        console.error(error);
    } finally {
        // Ocultar el loader y mostrar la imagen una vez cargada
        nasaImage.onload = hideLoader;
        nasaImage.onerror = hideLoader; // También ocultar el loader si hay un error al cargar la imagen
    }
}

// Cargar imagen del día actual por defecto
window.addEventListener('DOMContentLoaded', () => {
    loadNasaImage(); // Cargar la imagen del día por defecto
});

// Cargar imagen cuando el usuario seleccione una fecha
loadImageButton.addEventListener('click', () => {
    const selectedDate = datePicker.value; // Obtener la fecha seleccionada por el usuario
    if (selectedDate) {
        loadNasaImage(selectedDate);
    } else {
        nasaDescription.textContent = 'Por favor, selecciona una fecha válida.';
    }
});
