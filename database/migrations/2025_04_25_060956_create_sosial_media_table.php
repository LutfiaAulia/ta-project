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
        Schema::create('sosial_media', function (Blueprint $table) {
            $table->id('id_sosmed');
            $table->string('platform');
            $table->string('url');
            $table->unsignedBigInteger('id_identitas');
            $table->foreign('id_identitas')->references('id_identitas')->on('identitas_umkm')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sosial_media');
    }
};
