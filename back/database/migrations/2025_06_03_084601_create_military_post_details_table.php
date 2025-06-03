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
        Schema::create('military_post_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('secours_post_id')->constrained()->onDelete('cascade');
            $table->string('base_name');
            $table->string('commander_name');
            $table->integer('nb_soldiers');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('military_post_details');
    }
};
