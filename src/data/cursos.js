// Archivo: src/data/cursos.js

import imagenCurso1 from '../assets/curso1.webp';
import imagenCurso2 from '../assets/curso2.webp';
import imagenCurso3 from '../assets/curso3.jpg';
import imagenCurso4 from '../assets/curso4.jpg';

export const todosLosCursos = [
  {
    id: 1,
    titulo: 'Curso de Genexus con ChatGPT-4',
    instructor: 'Yuki',
    rating: '⭐4.8',
    precio: '2990 CLPs',
    imagen: imagenCurso1,
    categoria: 'ChatGPT',
    descripcionLarga: 'Aprende a integrar la potencia de ChatGPT-4 en tus aplicaciones Genexus para crear soluciones más inteligentes y automatizadas.',
    temario: [
      'Introducción a las APIs de OpenAI',
      'Configuración del entorno en Genexus',
      'Llamadas a la API de ChatGPT',
      'Creación de un chatbot inteligente',
      'Proyecto final: App con IA'
    ]
  },
  {
    id: 2,
    titulo: 'VR con Unity y ChatGPT',
    instructor: 'Yuki',
    rating: '⭐4.9',
    precio: '5000 CLPs',
    imagen: imagenCurso2,
    categoria: 'VR',
    descripcionLarga: 'Sumérgete en el mundo de la Realidad Virtual. Aprenderás a crear experiencias inmersivas con Unity y a dar vida a tus personajes con diálogos generados por IA.',
    temario: [
      'Fundamentos de Unity para VR',
      'Interacción con objetos en VR',
      'Diseño de niveles inmersivos',
      'Integrando ChatGPT para NPCs',
      'Publicación en Oculus Quest'
    ]
  },
  {
    id: 3,
    titulo: 'Python para Ciencia de Datos',
    instructor: 'Yuki Coder',
    rating: '⭐5.0',
    precio: 'Gratis',
    imagen: imagenCurso3,
    categoria: 'Python',
    descripcionLarga: 'El curso definitivo para dominar Python y sus librerías más importantes (Pandas, NumPy, Matplotlib) para el análisis y visualización de datos.',
    temario: [
      'Conceptos básicos de Python',
      'Análisis de datos con Pandas',
      'Computación numérica con NumPy',
      'Visualización con Matplotlib y Seaborn',
      'Caso de estudio práctico'
    ]
  },
  {
    id: 4,
    titulo: 'Fundamentos de Machine Learning',
    instructor: 'Yuki',
    rating: '⭐4.7',
    precio: '14290 CLPs',
    imagen: imagenCurso4,
    categoria: 'Gwen',
    descripcionLarga: 'Entiende los algoritmos que mueven el mundo. Este curso cubre los conceptos teóricos y prácticos de los principales modelos de Machine Learning.',
    temario: [
      '¿Qué es el Machine Learning?',
      'Regresión Lineal y Logística',
      'Árboles de Decisión y Random Forests',
      'Clustering con K-Means',
      'Evaluación de modelos'
    ]
  }
];