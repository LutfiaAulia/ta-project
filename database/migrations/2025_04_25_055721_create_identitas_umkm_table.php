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
        Schema::create('identitas_umkm', function (Blueprint $table) {
            $table->id('id_identitas');
            $table->string('nama_usaha');
            $table->string('jenis_usaha');
            $table->string('alamat_usaha');
            $table->string('lokasi');
            $table->text('deskripsi');
            $table->string('nib');
            
            $table->foreign('nib')->references('nib')->on('umkm')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('identitas_umkm');
    }
};
