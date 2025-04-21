import { useState } from 'react';

function App() {
  const [texto, setTexto] = useState('');
  const [resposta, setResposta] = useState(null);
  const [loading, setLoading] = useState(false);

  const enviarComando = async () => {
    setLoading(true);
    setResposta(null);
    try {
      const resp = await fetch('http://localhost:8000/llm/comando', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto }),
      });
      const data = await resp.json();
      setResposta(data);
    } catch (err) {
      setResposta({ erro: 'Erro ao conectar à API', detalhes: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded">
        <h1 className="text-2xl font-bold mb-4">💬 Comando Natural para Cadastro de Conta</h1>
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Ex: cadastre uma conta da AWS de 320 reais para todo dia 15"
          className="w-full border border-gray-300 rounded p-2 mb-4"
          rows={4}
        />
        <button
          onClick={enviarComando}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Enviando...' : 'Enviar Comando'}
        </button>

        {resposta && (
          <pre className="bg-gray-100 mt-6 p-4 border border-gray-300 rounded overflow-x-auto text-sm">
            {JSON.stringify(resposta, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}

export default App;
