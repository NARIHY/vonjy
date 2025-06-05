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
        Schema::create('media_actualite_models', function (Blueprint $table) {
            $table->id();
             $table->foreignId('actualite_id')
                  ->constrained('actualite_models')
                  ->onDelete('cascade');
            $table->enum('type', ['photo','video']);
            $table->string('path');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media_actualite_models');
    }
};
