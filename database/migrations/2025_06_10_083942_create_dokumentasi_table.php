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
        Schema::create('dokumentasi', function (Blueprint $table) {
            $table->id('id_dokumentasi');
            $table->unsignedBigInteger('id_laporan');
            $table->string('nama_file');
            $table->string('path_file');
            $table->timestamps();

            $table->foreign('id_laporan')->references('id_laporan')->on('laporan')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokumentasi');
    }
};
