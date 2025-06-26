import { kv } from '@vercel/kv';

// Esta função agora lida com TODAS as requisições para /api
export default async function handler(request, response) {
    // Se a requisição for GET, lê os dados do Vercel KV
    if (request.method === 'GET') {
        try {
            const tasks = await kv.get('magesta-tasks');
            // Se não houver tarefas, retorna um array vazio
            return response.status(200).json(tasks || []);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    // Se a requisição for POST, salva os dados no Vercel KV
    if (request.method === 'POST') {
        try {
            const newTasks = request.body;
            await kv.set('magesta-tasks', newTasks);
            return response.status(200).json({ message: 'Tarefas salvas com sucesso.' });
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    // Se for outro método, retorna erro
    return response.status(405).json({ message: 'Método não permitido.' });
}
