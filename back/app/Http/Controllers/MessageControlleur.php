<?php

namespace App\Http\Controllers;

use App\Enum\StatusEnum as EnumStatusEnum;
use App\Enums\StatusEnum;
use App\Events\NewMessageEvent;
use App\Http\Requests\MessageRequest;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MessageControlleur extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $allMessage = Message::with('user')
                            ->where('user_id', Auth::user()->id)
                            ->where('status',  \App\Enum\StatusEnum::UNREAD->value)
                            ->orderBy('created_at', 'desc')
                            ->paginate(10);
        $count = Message::with('user')
                            ->where('user_id', Auth::user()->id)
                            ->where('status',  \App\Enum\StatusEnum::UNREAD->value)
                            ->orderBy('created_at', 'desc')
                            ->count();
        return Inertia::render('messagerie/liste', [
            'messages' => $allMessage,
            'count' => $count
        ]);
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
    public function store(MessageRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        // Validate priority against the enum
        $priority = $validated['priority'] ?? 'normal';
        if (!in_array($priority, array_column(\App\Enum\PriorityEnum::cases(), 'value'))) {
            return redirect()->back()
            ->withErrors(['priority' => 'La priorité sélectionnée est invalide.'])
            ->withInput();
        }

        $message = Message::create([
            'user_id' => Auth::user()->id,
            'subject' => $validated['subject'],
            'content' => $validated['content'],
            'status' => EnumStatusEnum::UNREAD->value,
            'priority' => $priority,
        ]);

        broadcast(new NewMessageEvent($message))->toOthers();

        return redirect()->route('messagerie.show', $message->id)
            ->with('success', 'Message sent successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        $messageWithUser = Message::with('user')->findOrFail($message->id);

        $messageWithUser->update([
            'status' => EnumStatusEnum::READ->value,
            'read_at' => now(),
        ]);
        return Inertia::render('messagerie/showMessage', [
            'message' =>   $messageWithUser
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
