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
        Schema::create('umkm_kategori', function (Blueprint $table) {
            $table->id('id_umka');
            $table->unsignedBigInteger('id_identitas');
            $table->unsignedBigInteger('id_kategori');
            $table->timestamps();

            $table->foreign('id_identitas')->references('id_identitas')->on('identitas_umkm')->onDelete('cascade');
            $table->foreign('id_kategori')->references('id_kategori')->on('kategori')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('umkm_kategori');
    }
};
