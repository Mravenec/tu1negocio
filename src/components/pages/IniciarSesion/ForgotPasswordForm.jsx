import React, { useState } from 'react';
import './ForgotPasswordForm.css';

function ForgotPasswordForm() {
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Aquí puedes agregar la lógica para procesar el formulario, como enviar el email
        // para el reseteo de contraseña usando axios u otra biblioteca.

        console.log('Solicitud de reseteo de contraseña enviada para:', email);
    };

    return (
        <div className="forgot-password-form">
            <h2>Restablecer Contraseña</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Enviar enlace de restablecimiento</button>
            </form>
        </div>
    );
}

export default ForgotPasswordForm;
