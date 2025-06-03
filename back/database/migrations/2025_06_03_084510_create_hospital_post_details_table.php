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
        Schema::create('hospital_post_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('secours_post_id')->constrained()->onDelete('cascade');
            $table->integer('nb_doctors');
            $table->integer('nb_beds');
            $table->boolean('has_urgency_unit')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hospital_post_details');
    }
};
