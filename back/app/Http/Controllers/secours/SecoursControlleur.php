<?php

namespace App\Http\Controllers\Secours;

use App\Http\Controllers\Controller;
use App\Models\Secours\SecoursPost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SecoursControlleur extends Controller
{
    public function index()
    {
        $posts = SecoursPost::with([
            'hospitalDetail',
            'policeDetail',
            'gendarmerieDetail',
            'militaryDetail',
        ])->paginate(10);

        return Inertia::render('secours/index', [
            'posts' => $posts,
        ]);
    }

    public function create()
    {
        return Inertia::render('secours/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string',
            'address' => 'required|string',
            'region' => 'required|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'phone_number' => 'nullable|string',
            'email' => 'nullable|email',
        ]);

        $post = SecoursPost::create($validated);

        return redirect()->route('secours.index')->with('success', 'Poste de secours créé.');
    }

    public function show(SecoursPost $secoursPost)
    {
        $secoursPost->load([
            'hospitalDetail',
            'policeDetail',
            'gendarmerieDetail',
            'militaryDetail',
        ]);

        return Inertia::render('secours/show', [
            'post' => $secoursPost,
        ]);
    }

    public function edit(SecoursPost $secoursPost)
    {
        $secoursPost->load([
            'hospitalDetail',
            'policeDetail',
            'gendarmerieDetail',
            'militaryDetail',
        ]);

        return Inertia::render('secours/Edit', [
            'post' => $secoursPost,
        ]);
    }

    public function update(Request $request, SecoursPost $secoursPost)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string',
            'address' => 'required|string',
            'region' => 'required|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'phone_number' => 'nullable|string',
            'email' => 'nullable|email',
        ]);

        $secoursPost->update($validated);

        return redirect()->route('secours.index')->with('success', 'Poste de secours mis à jour.');
    }

    public function destroy(SecoursPost $secoursPost)
    {
        $secoursPost->delete();

        return redirect()->route('secours.index')->with('success', 'Poste de secours supprimé.');
    }
}
