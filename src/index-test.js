import React from 'react';
import ReactDOM from 'react-dom/client';

function TestApp() {
  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#4CAF50' }}>✅ Vite está funcionando correctamente!</h1>
      <p>El servidor de desarrollo está activo en el puerto 3001</p>
      <button 
        onClick={() => alert('¡El botón funciona!')}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Probar Interactividad
      </button>
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h3>Información del proyecto:</h3>
        <p>✓ React funcionando</p>
        <p>✓ Vite funcionando</p>
        <p>✓ Hot reload activo</p>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TestApp />);
