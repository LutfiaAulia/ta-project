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
        Schema::create('promosi', function (Blueprint $table) {
            $table->id('id_promosi');
            $table->string('nama_produk');
            $table->string('kategori_produk');
            $table->integer('harga_produk');
            $table->text('deskripsi_produk');
            $table->string('foto_produk');
            $table->string('nip')->nullable();
            $table->string('nib');

            $table->foreign('nip')->references('nip')->on('pegawai')->onDelete('cascade');
            $table->foreign('nib')->references('nib')->on('umkm')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promosi');
    }
};
