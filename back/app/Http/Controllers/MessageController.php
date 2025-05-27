<?php

namespace App\Http\Controllers;

use App\Events\NewMessageEvent;
use App\Http\Requests\MessageRequest;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('messagerie/liste');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): \Inertia\Response
    {
        return Inertia::render('messagerie/message');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request):JsonResponse
    {
            $validated = $request->validated();

        $message = Message::create([
            'user_id' => Auth::user()->workos_id,
            'subject' => $validated['subject'],
            'content' => $validated['content'],
        ]);

        broadcast(new NewMessageEvent($message))->toOthers();

        return response()->json(['message' => $message]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        return Inertia::render('messagerie/showMessage', [
            'message' => $message
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message)
    {
        // Cannot edit
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        // cannot Update
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        // cannot remove
    }
}
