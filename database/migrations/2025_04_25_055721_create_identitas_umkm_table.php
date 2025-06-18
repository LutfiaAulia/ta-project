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
            $table->unsignedBigInteger('id_umkm');
            $table->string('nama_usaha');
            $table->string('jenis_usaha');
            $table->string('kabupaten_kota');
            $table->string('kecamatan');
            $table->string('kanagarian_kelurahan');
            $table->text('alamat_detail');
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->text('deskripsi');
            $table->string('foto_usaha')->nullable();
            $table->foreign('id_umkm')->references('id')->on('umkm')->onDelete('cascade');
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
