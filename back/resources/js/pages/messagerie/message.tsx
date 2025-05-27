import React from 'react';
import { useForm } from '@inertiajs/react';

const Message: React.FC = () => {
  const { data, setData, post, processing, errors } = useForm({
    subject: '',
    content: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/messages');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Nouveau message</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold">Objet</label>
          <input
            type="text"
            className="border rounded w-full p-2"
            value={data.subject}
            onChange={(e) => setData('subject', e.target.value)}
          />
          {errors.subject && <p className="text-red-500">{errors.subject}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Contenu</label>
          <textarea
            className="border rounded w-full p-2"
            value={data.content}
            onChange={(e) => setData('content', e.target.value)}
          />
          {errors.content && <p className="text-red-500">{errors.content}</p>}
        </div>

        <button
          type="submit"
          disabled={processing}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default Message;
