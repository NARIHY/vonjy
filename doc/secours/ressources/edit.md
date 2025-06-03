```jsx

// resources/js/Pages/SecoursPost/Edit.jsx
import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Edit({ post }) {
  const [form, setForm] = useState({
    ...post,
    detail: post[`${post.type}_detail`] || {}
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, detail: { ...prev.detail, [name]: value } }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.put(`/secours-posts/${post.id}`, form);
  };

  const renderDetailFields = () => {
    switch (form.type) {
      case 'hospital':
        return (
          <>
            <label>Nombre de docteurs</label>
            <input type="number" name="nb_doctors" value={form.detail.nb_doctors || ''} onChange={handleDetailChange} />

            <label>Nombre de lits</label>
            <input type="number" name="nb_beds" value={form.detail.nb_beds || ''} onChange={handleDetailChange} />

            <label>Unité d'urgence ?</label>
            <input type="text" name="has_urgency_unit" value={form.detail.has_urgency_unit || ''} onChange={handleDetailChange} />
          </>
        );
      case 'police':
        return (
          <>
            <label>Type de brigade</label>
            <input type="text" name="brigade_type" value={form.detail.brigade_type || ''} onChange={handleDetailChange} />

            <label>Juridiction</label>
            <input type="text" name="jurisdiction" value={form.detail.jurisdiction || ''} onChange={handleDetailChange} />
          </>
        );
      case 'gendarmerie':
        return (
          <>
            <label>Rural ou Urbain</label>
            <input type="text" name="rural_or_urban" value={form.detail.rural_or_urban || ''} onChange={handleDetailChange} />

            <label>Région d'intervention</label>
            <input type="text" name="region_of_operation" value={form.detail.region_of_operation || ''} onChange={handleDetailChange} />
          </>
        );
      case 'military':
        return (
          <>
            <label>Nom de la base</label>
            <input type="text" name="base_name" value={form.detail.base_name || ''} onChange={handleDetailChange} />

            <label>Zone d'affectation</label>
            <input type="text" name="operation_zone" value={form.detail.operation_zone || ''} onChange={handleDetailChange} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Modifier le Poste</h1>

      <label>Nom</label>
      <input type="text" name="name" value={form.name} onChange={handleChange} />

      <label>Adresse</label>
      <input type="text" name="address" value={form.address} onChange={handleChange} />

      <label>Région</label>
      <input type="text" name="region" value={form.region} onChange={handleChange} />

      <label>Latitude</label>
      <input type="number" name="latitude" value={form.latitude} onChange={handleChange} />

      <label>Longitude</label>
      <input type="number" name="longitude" value={form.longitude} onChange={handleChange} />

      <label>Téléphone</label>
      <input type="text" name="phone_number" value={form.phone_number || ''} onChange={handleChange} />

      <label>Email</label>
      <input type="email" name="email" value={form.email || ''} onChange={handleChange} />

      <h2 className="font-semibold mt-4">Détails spécifiques</h2>
      {renderDetailFields()}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Mettre à jour</button>
    </form>
  );
}
