```jsx
// resources/js/Pages/SecoursPost/Create.jsx
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { router } from '@inertiajs/react';

export default function Create() {
  const [form, setForm] = useState({
    name: '',
    type: '',
    address: '',
    region: '',
    latitude: '',
    longitude: '',
    phone_number: '',
    email: '',
    detail: {}
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
    router.post('/secours-posts', form);
  };

  const renderDetailFields = () => {
    switch (form.type) {
      case 'hospital':
        return (
          <>
            <label>Nombre de docteurs</label>
            <input type="number" name="nb_doctors" onChange={handleDetailChange} />

            <label>Nombre de lits</label>
            <input type="number" name="nb_beds" onChange={handleDetailChange} />

            <label>Unité d'urgence ? (true/false)</label>
            <input type="text" name="has_urgency_unit" onChange={handleDetailChange} />
          </>
        );
      case 'police':
        return (
          <>
            <label>Type de brigade</label>
            <input type="text" name="brigade_type" onChange={handleDetailChange} />

            <label>Juridiction</label>
            <input type="text" name="jurisdiction" onChange={handleDetailChange} />
          </>
        );
      case 'gendarmerie':
        return (
          <>
            <label>Rural ou Urbain</label>
            <input type="text" name="rural_or_urban" onChange={handleDetailChange} />

            <label>Région d'intervention</label>
            <input type="text" name="region_of_operation" onChange={handleDetailChange} />
          </>
        );
      case 'military':
        return (
          <>
            <label>Nom de la base</label>
            <input type="text" name="base_name" onChange={handleDetailChange} />

            <label>Zone d'affectation</label>
            <input type="text" name="operation_zone" onChange={handleDetailChange} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Créer un Poste de Secours</h1>

      <label>Nom</label>
      <input type="text" name="name" onChange={handleChange} />

      <label>Type</label>
      <select name="type" onChange={handleChange}>
        <option value="">-- Choisir --</option>
        <option value="hospital">Hôpital</option>
        <option value="police">Police</option>
        <option value="gendarmerie">Gendarmerie</option>
        <option value="military">Militaire</option>
      </select>

      <label>Adresse</label>
      <input type="text" name="address" onChange={handleChange} />

      <label>Région</label>
      <input type="text" name="region" onChange={handleChange} />

      <label>Latitude</label>
      <input type="number" name="latitude" step="0.0001" onChange={handleChange} />

      <label>Longitude</label>
      <input type="number" name="longitude" step="0.0001" onChange={handleChange} />

      <label>Téléphone</label>
      <input type="text" name="phone_number" onChange={handleChange} />

      <label>Email</label>
      <input type="email" name="email" onChange={handleChange} />

      <h2 className="font-semibold mt-4">Détails du poste</h2>
      {renderDetailFields()}

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Créer</button>
    </form>
  );
}
