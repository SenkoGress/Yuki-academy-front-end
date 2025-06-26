import React from 'react';
import estilos from './Footer.module.css';
import { FiGlobe, FiTwitter, FiLinkedin, FiInstagram, FiMapPin, FiPhone, FiMail } from 'react-icons/fi'; // Nuevos iconos
import logoYuki from '../../assets/yuki.png'; // ¡IMPORTACIÓN FALTANTE AÑADIDA AQUÍ!

const columnasDeLinks = [
    {
        titulo: 'Yuki',
        links: ['Yuki Business', 'Enseña en Yuki', 'Consigue la aplicación', 'Sobre nosotros', 'Contacto']
    },
    {
        titulo: 'Carreras',
        links: ['Blog', 'Ayuda y asistencia', 'Afiliado', 'Inversores']
    },
    {
        titulo: 'Legal',
        links: ['Condiciones', 'Política de privacidad', 'Mapa del sitio', 'Declaración de accesibilidad']
    },
    // --- NUEVA COLUMNA DE CONTACTO ---
    {
        titulo: 'Contacto',
        tipo: 'contacto', // Un tipo especial para identificarla en el renderizado
        datos: [
            { icono: <FiMapPin />, texto: 'Avenida Pedro Montt 123, Valparaíso' },
            { icono: <FiPhone />, texto: '+569 12345678' },
            { icono: <FiMail />, texto: 'info@yukiacademy.com' }
        ]
    }
    // --- FIN NUEVA COLUMNA DE CONTACTO ---
];

const Footer = () => {
    return (
        <footer className={estilos.footer}>
            <div className={estilos.contenidoPrincipal}>
                <div className={estilos.columnas}>
                    {columnasDeLinks.map(columna => (
                        <div key={columna.titulo} className={estilos.columnaLinks}>
                            <h4>{columna.titulo}</h4>
                            {columna.tipo === 'contacto' ? (
                                // Renderizado especial para la columna de contacto
                                <ul className={estilos.listaContacto}>
                                    {columna.datos.map((item, index) => (
                                        // Asegúrate de que el tipo de icono es correcto para el mailto
                                        <li key={index} className={estilos.itemContacto}>
                                            {item.icono} <a href={item.icono.props.type === FiMail ? `mailto:${item.texto}` : '#'}>{item.texto}</a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                // Renderizado normal para columnas de links
                                <ul>
                                    {columna.links.map(link => (
                                        <li key={link}><a href="#">{link}</a></li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
                <div className={estilos.selectorIdioma}>
                    <button><FiGlobe /> <span>Español</span></button>
                </div>
            </div>
            <div className={estilos.barraInferior}>
                <div className={estilos.logoWrapper}>
                    <img src={logoYuki} alt="Logo Yuki" className={estilos.logoFooter} />
                    <p className={estilos.logoTexto}>Digital Technologies</p>
                </div>
                <p className={estilos.copyright}>© 2025 Yuki, Inc.</p>
                <div className={estilos.redesSociales}>
                    <a href="#"><FiTwitter /></a>
                    <a href="#"><FiLinkedin /></a>
                    <a href="#"><FiInstagram /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;