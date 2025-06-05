<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('actualite_models', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')                 // l'auteur (utilisateur connecté)
                  ->constrained()                        // fait référence à users.id
                  ->onDelete('cascade');
            $table->string('titre')->unique();
            $table->string('slug')->unique();
            $table->text('contenu')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('actualite_models');
    }
};
